const express = require("express")
const path = require("path")
const bodyp = require("body-parser")
const session = require("express-session")
const router = require("./router")
const os = require('os')
const fs = require("fs")

let app = express()
let port = 3000
// 初始化session
app.use(session({
    secret: "my secret sign", // 反篡改签名key
    resave: false, // 是否强制再次存储
    name:"sessionID",
    saveUninitialized: true, //未设定前初始化
    cookie: ('name', 'value',{maxAge:  5*60*1000, 
                                secure: false, name: "seName", 
                                resave: false})
}))

// 初始化post获取
app.use(bodyp.urlencoded({extended:false}))
app.use(bodyp.json())

// 初始化模板
app.engine('html', (filePath, options, callback)=>{

    fs.readFile(filePath, (err, data)=>{

        if (err) return callback(err)
        // 模板部分
        var rendered = data.toString()
            .replace('#nav#', options.nav)
            .replace('#end#', options.end)

        if (options.errmassage)
        {
            rendered = rendered.toString().replace('#err#', options.errmassage)
        }else{
            rendered = rendered.toString().replace('#err#', "")
        }

        return callback(null, rendered)
    })
})
// 路径 与 渲染目标
app.set('views', 'view')
app.set('view engine', 'html')

// 使用路由
app.use("/", router)

// 开始监听
app.listen(port, ()=>{
    console.log("linsten in port : " + port)
    console.log("ip is :" + getIPAdress())
})

// 获取ip的函数
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                // 因为有两张虚拟网卡，特化
                if (alias.address[1] == '9') continue;
                return alias.address;
            }
        }
    }
}
