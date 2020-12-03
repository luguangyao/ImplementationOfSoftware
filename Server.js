const DAO = require("./dao")
const { get } = require("./router")
/**
 * 测试登录，返回用户数据
 * @param {*} uid 用户id
 * @param {*} upass 密码
 * @param {*} callback 带有err 和 data 参数， 当正常时err为null 否则data为null
 */
var UserLogin = (uid, upass, callback) =>{
    
    DAO.UserLogin(uid, upass, (err, data)=>{
        if (err) callback(err)
        else{
            console.log(data)
            callback(null, data)
        }
    })
}

/**
 * 请求type类型的num条数据。
 * @param {*} type 请求新闻的类型
 * @param {*} num 数量
 * @param {*} callback 带有err 和 data 参数， 当正常时err为null 否则data为null
 */
var SearchData = (type, num, callback) =>{
    // 返回对应数据类型的一定数量的数据
    DAO.SearchData(type, num, (err, data) =>{
        if(err) callback(err)
        else{
            callback(null, data)
        }
    })
}

/**
 * 访问查找单条数据，每次访问均为其增加访问量
 * @param {*} id 新闻的id
 * @param {*} callback 带有err 和 data 参数， 当正常时err为null 否则data为null
 */
var SearchNews = (id, callback) =>{
    // 返回新闻的标题与内容
    DAO.UpdateVisit(id,(err,state) =>{
        if (err) callback(err)
        else if (state === 1){
            DAO.SearchNews(id, (err, data) =>{
                if (err) callback(err)
                else{
                    callback(null, data)
                }
            })
        }else{
            callback("false to search")
        }
    })
}

/**
 * 更新新闻数据。
 * @param {*} nid 新闻id
 * @param {*} title 新的新闻标题
 * @param {*} context 新的新闻内容
 * @param {*} callback 带有state的状态回调，true表示成功
 */
var Update = (nid, title, context, type, url, callback) =>{
    // 写入文件
    DAO.UpdateNews(nid, title, context, type, url, (err, state) =>{
        if (err) callback(false)
        if (state == 1) callback(true)
        else callback(false)
    })
}

var GetTitleNews = (type, num) =>{
    // 等待DAO
    return null
}



exports.UserLogin = UserLogin
exports.SearchData = SearchData
exports.SearchNews = SearchNews
exports.Update = Update
exports.GetTitleNews = GetTitleNews