const express = require("express")
const formidable = require("formidable")
const path = require("path")
const fs = require("fs")
const Ser = require("./Server")
const svgCaptcha = require("svg-captcha")
const { title } = require("process")
const { url } = require("inspector")
const { serialize } = require("v8")
const session = require("express-session")

const router = express.Router()
// 公开目录
let publicList = ["/node_modules/", "/public/"]
let baseFileRoot = "/view/"
// 公共数据
const _Nav = ""
const _End = ""
const _Err = ""
// const _Nav = fs.readFileSync(path.join(__dirname, "./view/template/nav.tmp"))
// const _End = fs.readFileSync(path.join(__dirname, "./view/template/end.tmp"))
// const _Err = fs.readFileSync(path.join(__dirname, "./view/template/err.tmp"))

var speak = function()
{
    console.log("现在加载的是 /bootstrap/router.js 下的路由")
    console.log("将公开：")

    for (let i=0;i<publicList.length; i++)
    {
        console.log(publicList[i])
    }

    console.log("默认经模板渲染 " + baseFileRoot + "下的文件")
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
router.post("/loginCheck", (req, res, next)=>{
    let uname = req.body.username
    let upass = req.body.password
    let code = req.body.yzm
    if (code != req.session.captcha){
        res.redirect("/login")
    }
    Ser.UserLogin(uid, upass, (err, data) =>{
        if (err){
            let e = _Err
            e = e.toString().replace("#errmessage#", "登录错误" + uname + " : " + upass)
            res.redirect("/login")
        }else{
            req.session.uname = data.name
            req.session.power = 1
            res.redirect("/")
        }
    })
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
                        res.redirect("/")
                    }
                })
            }else{
                res.end("重名")
            }
        })
    })
})

router.post("/EditNew", (req, res) =>{
    let nid = req.body.nid
    nid = Number.parseInt(nid)
    let context = req.body.context
    let type = req.body.type
    type = Number.parseInt(type)
    let url = req.body.url
    if (nid === -1){
        // 创建新新闻
        Ser.Create(title, context, type, url, (err, state) =>{
            if (err) res.end(false)
            else{
                if (state === 1){
                    res.end(true)
                }else{
                    res.end(false)
                }
            }
        })
    }else{
        // 更新新闻
        Ser.Update(nid, title, context, type, url, (err, state) =>{
            if (err) res.end(false)
            else{
                if (state === 1){
                    res.end(true)
                }else{
                    res.end(false)
                }
            }
        })
    }
})

router.get("/data/:type/:num", (req, res, next)=>{
    // 根据请求的type返回对应数据
    // num 为标记查询的数量, 应当被限定在1、5、15等固定数字
    // 当type为0时，请求的是单条数据，num为id
    let type = parseInt(req.params.type)
    let num = parseInt(req.params.num)
    if (type === 0) {

        Ser.SearchNews(num, (err, data) =>{
            if (err) res.json({nid:-1})
            else{
                res.json(data)
            }
        })
    }else if (type>0) {

        Ser.SearchData(type, num, (err, data) =>{
            if (err) {
                console.log(err)
                res.json({nid:-1})
            }
            else{
                res.json(data)
            }
        })
    }else {
        next()
    }
})

router.get("/title_news/:type/:num", (req, res, next) =>{
    // 可以上头条的数据
    let type = parseInt(req.params.type)
    let num  = parseInt(req.params.num)
    Ser.GetTitleNews(type, num, (err, data) =>{

        if (err) res.end({nid:-1})
        else{
            res.json(data)
        }
    })
})

router.get("/new/:type/:num", (rep, res) =>{

    res.render("detail")
})

router.get("/edit/:id", (req, res) =>{
    // 必定给过
    if (true || (req.session.uname && req.session.power === 1)) {
        res.render("newsEdit")
    }else{
        res.render("403")
    }
})

router.get("/info/:click", (req, res) =>{
    // 二级页面
    render("news")
})

router.get("/", (req, res, next) =>{
    res.render("index")
})

router.get("/login", (req, res, next) =>{
    res.render("login")
})

router.get("/favicon.ico", (req, res) =>{
    res.sendFile(path.join(__dirname, "/view/favicon.ico"))
})

router.get("/captcha", (req, res) =>{
    let captcha = svgCaptcha.create()
    req.session.captcha = captcha.text

    res.type('svg')
    res.status(200).send(captcha.data)
})

router.get("/template/*", (req, res, next)=>{
    // 默认访问 baseFileRoot (view)下的页面
    if (req.url.indexOf("/data/") === 0){
        return next()
    }
    let url = req.url.split("?")[0]
    fs.stat(path.join(__dirname, baseFileRoot, url), (err, state)=>{

        if (err){
            // console.log("不该发生的文件读取错误 在 : " + path.join(__dirname, baseFileRoot, url))
            next()
        }else{

            if (url.endsWith("html")){
                
                res.render(url.slice(1),{
                    nav: _Nav,
                    end: _End
                })
            }else{

                next()
            }
        }
    })
})

router.use((req, res)=>{
    res.render('404')
})

// speak()
module.exports = router