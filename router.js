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
    let uname = req.body.userid
    let upass = req.body.password
    let code = req.body.yzm.toLowerCase()

    // 错误验证
    if (!uname || uname === '')
        res.end("0")
    if (!upass || upass === '')
        res.end("1")
    if (!code || code === '')
        res.end("2")

    if (code != req.session.captcha){
        res.end("4")
    }

    Ser.UserLogin(uname, upass, (err, data) =>{
        if (err){
            let e = _Err
            e = e.toString().replace("#errmessage#", "登录错误" + uname + " : " + upass)
            res.end("3")
        }else{
            req.session.uname = data.username
            req.session.power = 1
            // res.redirect("/")
            res.end(data.name)
        }
    })
})

router.post("/update", (req, res, next) =>{
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.keepExtensions = true //扩展名
    form.uploadDir = path.join(__dirname, "./public/image/NEWSimage")

    form.parse(req, (err, fields, files) =>{
        // console.log(files)
        // console.log(fields)

        fs.stat(files.pict.path, (err, stats) =>{

            if (err){

                fs.rename(files.pict.path, path.join(__dirname, "/public/image/NEWSimage", files.pict.name),(err) =>{

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

// 适应ajax请求上传图片的路由
router.post("/upload_img", (req, res) =>{
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.keepExtensions = true //扩展名
    form.uploadDir = path.join(__dirname, "./public/image/NEWSimage")

    form.parse(req, (err, fields, files) =>{
        // console.log(files)

        fs.stat(files.img.path, (err, stats) =>{

            if (!err){

                let li = files.img.name.split(".")
                let name = ""
                if (li.length > 1){
                    name = Ser.timeStap()+"." +li[1]
                }else{
                    name = Ser.timeStap() + ".jpg"
                }
                fs.rename(files.img.path, path.join(__dirname, "/public/image/NEWSimage", name),(err) =>{

                    if (err) {
                        console.log(err)
                    }
                    else{
                        res.status(200).json({
                            "status":200,
                            "img": name
                        })
                    }
                })
            }else{
                res.json({
                    'state': 500,
                    "err":"重名"
                })
            }
        })
    })
})

/**
 * 上传新闻数据
 * 需要的数据：
 * {
 *  nid -1时创建新新闻，否则更新新闻
 *  context 内容
 *  title 标题
 *  type 所属板块
 *  url 为空不能作为头条
 * }
 */
router.post("/EditNew", (req, res) =>{
    let nid = req.body.nid
    nid = Number.parseInt(nid)
    let context = req.body.context
    let title = req.body.title.toString()
    let type = req.body.type
    type = Number.parseInt(type)
    let url = req.body.url
    if (nid === -1){
        // 创建新新闻
        Ser.Create(title, context, type, url, (err, state) =>{
            if (err) res.end("false")
            else{
                if (state === 1){
                    res.end("true")
                }else{
                    res.end("false")
                }
            }
        })
    }else{
        // 更新新闻
        Ser.Update(nid, title, context, type, url, (err, state) =>{
            if (err) res.end("false")
            else{
                if (state === 1){
                    res.end("true")
                }else{
                    res.end("false")
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
    }else if (type < 0){
        // 特殊功能部分
        if (type === -1){
            // 指定数量的无关类型的数据
            Ser.SearchData(0, num, (err, data) =>{
                if (err) res.json({nid:-1})
                else{
                    res.json(data)
                }
            })
        }else if (type === -2){

            if (num === -2){

                Ser.maxAndMin((err, data) =>{
                    if (err) res.json({
                        nid:-1
                    })
                    else{
                        res.json(data)
                    }
                })
            }
        }
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

router.get("/new/:id", (req, res) =>{

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
    res.render("news")
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
    let captcha = svgCaptcha.create({
        size: 4, //
        ignoreChars: "0o1i", 
        noise: 6,
        color:true,
        fontSize:40,
        width:120,
        height:40,
        background:'#00aaff'
    })
    req.session.captcha = captcha.text.toLowerCase()

    res.send(captcha.data)
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