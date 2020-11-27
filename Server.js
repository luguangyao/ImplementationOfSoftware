var UserLogin = (uname, upass) =>{
    // 用户登录模拟
    if (uname === upass)
        return {
            name :"fish",
            pow : 0
        }
    else
        return null
}

var SearchData = (type, num) =>{
    // 返回对应数据类型的一定数量的数据
    return {
        data: [
            {
                title: "123",
                data: "http://localhost:3000/test-index.html"
            },
            {
                title: "456",
                data: "http://localhost:3000/test-index.html"
            }
        ]
    }
}

var SearchNews = (id) =>{
    // 返回新闻的标题与内容
    return {
        title: "Title",
        data : "<h1>Contine</h1>"
    }
}

var Update = (title, context) =>{
    // 写入文件
    return {
        code : 1
    }
}

exports.UserLogin = UserLogin
exports.SearchData = SearchData
exports.SearchNews = SearchNews
exports.Update = Update