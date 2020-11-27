const express = require("express")
const formidable = require("formidable")
const path = require("path")
const fs = require("fs")
const Ser = require("./Server")

const router = express.Router()
// 公开目录
let publicList = ["/node_modules/", "/public/", "/workPackage/"]
let baseFileRoot = "/view/"
// 公共数据
const _Nav = fs.readFileSync(path.join(__dirname, "./view/template/nav.tmp"))
const _End = fs.readFileSync(path.join(__dirname, "./view/template/end.tmp"))
const _Err = fs.readFileSync(path.join(__dirname, "./view/template/err.tmp"))

var speak = function()
{
    console.log("现在加载的是 /bootstrap/router.js 下的路由")
    console.log("将公开：")

    for (let i=0;i<publicList.length; i++)
    {
        console.log(publicList[i])
    }

    console.log("此外还可以默认访问经模板渲染的 " + baseFileRoot + "下的文件")
}   

// 最先匹配执行命令
router.use((req, res, next)=>{
    next()
})

// 公开目标目录
for (let i=0;i<publicList.length; i++)
{
    router.use(publicList[i] , express.static(path.join(__dirname, publicList[i])))
}

// 处理登录请求
router.post("/login", (req, res, next)=>{
    let uname = req.body.uname
    let upass = req.body.upass
    let ret = Ser.UserLogin(uname, upass)
    if (ret){
        req.session.uname = ret.name
        res.redirect("/test-index.html")
    }
    else{
        let e = _Err
        e = e.toString().replace("#errmessage#", "登录错误" + uname + " : " + upass)
        res.render("test-index", {
            nav: _Nav,
            end: _End,
            errmassage: e
        })
    }
        
})

router.post("/update", (req, res, next) =>{
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.keepExtensions = true //扩展名
    form.uploadDir = path.join(__dirname, "./public/img/")

    form.parse(req, (err, fields, files) =>{
        // console.log(files)
        // console.log(fields)

        fs.stat(files.pict.path, (err, stats) =>{

            if (err){

                fs.rename(files.pict.path, path.join(__dirname, "/public/img/", files.pict.name),(err) =>{

                    if (err) {
                        next()
                    }
                    else{
                        res.redirect("/test-index.html")
                    }
                })
            }else{
                res.end("重名")
            }
        })
    })
})

router.get("/data/:type/:num", (req, res, next)=>{
    // 根据请求的type返回对应数据
    // num 为标记查询的数量, 应当被限定在1、5、15等固定数字
    if (req.params.type == "news") {

        res.json( Ser.SearchNews(req.params.num))
    }else if (req.params.type) {

        res.json( Ser.SearchData(req.params.type, req.params.num))
    }else {
        next()
    }
})

router.get("/*", (req, res, next)=>{
    // 默认访问 baseFileRoot (view)下的页面
    if (req.url.indexOf("/data/") === 0){
        return next()
    }
    let url = req.url.split("?")[0]
    fs.stat(path.join(__dirname, baseFileRoot, url), (err, state)=>{

        if (err){
            console.log("不该发生的文件读取错误 在 : " + path.join(__dirname, baseFileRoot, url))
            next()
        }else{

            if (url.endsWith("html")){
                
                res.render(url.slice(1),{
                    nav: _Nav,
                    end: _End
                })
            }else if (url.endsWith("ico")){

                fs.readFile(path.join(__dirname, baseFileRoot, url), (err, data)=>{

                    if (err){
                        next()
                    }else{
                        res.end(data)
                    }
                })
            }else{

                next()
            }
        }
    })
})

router.use((req, res)=>{
    res.end("404")
})

// speak()
module.exports = router