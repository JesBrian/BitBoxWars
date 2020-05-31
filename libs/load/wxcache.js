// 加载小游戏包体资源加载
const wxpath = wx.env.USER_DATA_PATH;
// 微信文件管理器
const fs = wx.getFileSystemManager();
// 文件缓存
const cachemap = {};
// 文件目录缓存
const dircachemap = {};
// 项目cdn
let cdn = "";

function isRemotePath(p) {
    return p.indexOf("http://") == 0 || p.indexOf("https://") == 0;
}

function walkFile(dirname, out) {
    if (/\.[\w-]+$/.test(dirname)) {
        out[dirname] = 1;
    } else {
        const files = fs.readdirSync(dirname);
        dircachemap[dirname] = 1;
        for (let i = 0; i < files.length; i++) {
            const file = dirname + "/" + files[i];
            walkFile(file, out)
        }
    }
}

// 得到wx路径
function toWxPath(url) {
    let newUrl = url.replace(cdn, wxpath);
    return newUrl;
}

function existPath(path) {
    return dircachemap[path]
}

// 创建文件目录
function createFileDir(file) {
    let path = file.replace(wxpath + "/", "");
    let arr = path.split("/");
    arr.pop();
    let curPath = wxpath;
    for (let i = 0; i < arr.length; i++) {
        curPath += "/" + arr[i];
        if (!existPath(curPath)) {
            fs.mkdirSync(curPath);
            dircachemap[curPath] = 1;
        }
    }
}

function needCache(url) {
    if (isRemotePath(url)) {
        let filePath = toWxPath(url);
        return !(cachemap[filePath]);
    } else {
        return false;
    }
}

function isTextType(extname) {
    return extname == "json" || extname == "atlas" || extname == "xml"
}

export default class WXLoadPlugin {
    static boot(baseurl) {
        let time = Date.now();
        cdn = baseurl;
        walkFile(wxpath, cachemap);
        console.log(Date.now() - time, ".....消耗时间")
    }

    static hasCache(url) {
        let wxpath = toWxPath(url);
        return cachemap[wxpath]
    }

    static getUrl(name) {
        if (name.indexOf(cdn) < 0) {
            return cdn + name;
        }
        return name;
    }

    static toWxPath(url) {
        return toWxPath(url);
    } 

    static download(url) {
        if (/https?:\/\//.test(url)) {
            let filePath = toWxPath(url);
            wx.downloadFile({url, filePath, success:()=>{
                cachemap[filePath] = 1;
            }});
        }
    }

    static pre(resource, next) {
        let { url, extension } = resource;
        if (isRemotePath(url)) {
            let wxpath = toWxPath(url);
            if (cachemap[wxpath]) {
                if (isTextType(extension)) {
                    let content = fs.readFileSync(wxpath, "utf8")
                    if (extension == "json") {
                        content = JSON.parse(content);
                    }
                    if (extension == "xml") {
                        content = new DOMParser().parseFromString(content, "text/xml");
                    }
                    resource._flags = 2;
                    resource.type = 1;
                    resource.data = content;
                } else {
                    resource.url = wxpath;
                }
                next();
            } else {
                next();
            }
        } else {
            if (isTextType(extension)) {
                let content = fs.readFileSync(url, "utf8")
                if (extension == "json") {
                    content = JSON.parse(content);
                }
                if (extension == "xml") {
                    content = new DOMParser().parseFromString(content, "text/xml");
                }
                resource._flags = 2;
                resource.type = 1;
                resource.data = content;
                next();
            } else {
                next();
            }
        }
    }

    static use(resource, next) {
        let { url, extension, data } = resource;
        let filePath = toWxPath(url);
        if (needCache(url)) {
            createFileDir(filePath);
            if (isTextType(extension)) {
                let content = data;
                if (extension == "json" && typeof content != "string") {
                    content = JSON.stringify(data);
                }
                fs.writeFile({ filePath, data: content })
            } else {
                wx.downloadFile({ url, filePath });
            }
            next();
        } else {
            next();
        }
    }
}
