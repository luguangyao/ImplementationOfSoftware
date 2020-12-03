const DAO = require("./dao")
/**
 * 测试登录，返回用户数据
 * @param {*} uid 用户id
 * @param {String} upass 密码
 * @param {Function} callback 带有err 和 data 参数， 当正常时err为null 否则data为null
 */
var UserLogin = (uid, upass, callback) =>{
    uid = Number.parseInt(uid)
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
 * @param {Function} callback 带有err 和 data 参数， 当正常时err为null 否则data为null
 */
var SearchData = (type, num, callback) =>{
    // 返回对应数据类型的一定数量的数据
    type = Number.parseInt(type)
    num = Number.parseInt(num)
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
 * @param {Function} callback 带有err 和 data 参数， 当正常时err为null 否则data为null
 */
var SearchNews = (id, callback) =>{
    // 返回新闻的标题与内容
    id = Number.parseInt(id)
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
 * 当前时间的时间戳
 */
var nowATime = () =>{
    return (new Date()).valueOf()
}

/**
 * 创建一条新闻， 默认作者为1号角色
 * @param {*} title 新闻标题
 * @param {*} content 新闻内容
 * @param {*} type 新闻归属板块
 * @param {*} url 可以上头条时的图片， 同时标记是否应该上头条
 * @param {Function} callback 有err, state 参数 发生错误err为错误信息，否则为null state为1时成功，为1时失败
 */
var Create = (title, content, type, url, callback) =>{
    let now = nowATime()
    type = Number.parseInt(type)
    DAO.AddNews(title, content, type, 0, now, 1, url?url:"", (err, state) =>{
        //
        if (err) callback(err)
        else{
            callback(null, state)
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

/**
 * 获取可以上头条的新闻
 * @param {*} type 请求的数据类型， 为0时默认请求所有类型
 * @param {*} num 请求的数量，不足全返回
 * @param {Function} callback 带 err 与 data 属性， 若出错则data为null 否则err为null
 */
var GetTitleNews = (type, num, callback) =>{
    // 等待DAO
    let _type = Number.parseInt(type)
    let _num = Number.parseInt(num)
    if (_type === 0){

        DAO.SearchNewsWithUrlNoType(num, (err, data) =>{
            if (err) callback(err)
            else{
                callback(null, data)
            }
        })
    }else{

        DAO.SearchNewsWithUrl(type, num, (err, data) =>{
            if (err) callback(err)
            else{
                callback(null, data)
            }
        })
    }
}

exports.UserLogin = UserLogin
exports.SearchData = SearchData
exports.SearchNews = SearchNews
exports.Update = Update
exports.Create = Create
exports.GetTitleNews = GetTitleNews