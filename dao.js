//引入mysql模块
const mysql = require('mysql');

//创建连接池对象
const pool = mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'87654321',
    database:'scnu',
    connectionLimit:'20'

});

/*用户登录方法
callback函数返回值(String,result),String为错误提示,
result为user的全部内容,发生错误时result为空,未发生错误时String为空*/
var UserLogin = (uid, upass,callback) =>{
    //验证数据是否为空
    if(uid===null){
        return;
    }
    if(upass===null){
        return;
    }

    //到数据库中查询是否有账号和密码同时匹配的数据
    pool.query("SELECT * FROM user WHERE uid=? AND password=?",[uid,upass],(err,result)=>{
        if(err) callback(err);
        //返回空数组，长度为0 ，说明登录失败
        else if(result.length===0){
            callback("账号或密码错误");
        }else{//查询到匹配的用户  登录成功
            callback(null,result);
        }
    })
}

/*查询新闻,返回类型为type的最新的num条新闻的nid和title和publishtime
callback函数返回值(String,result),String为错误提示,
result为news的nid和title,publishtime,发生错误时result为空,未发生错误时String为空*/
var SearchData = (type, num,callback) =>{
    //返回对应数据类型的一定数量的数据
    //到数据库中查询相应类型的最新插入的num条新闻
    pool.query('select nid,title,publishtime from news where type=? order by nid desc limit 0,?',[type,num],(err,result)=>{
        //如果输入数量超出已有数量则出错
        if(err) callback(err);
        //返回空数组，长度为0 ，说明没有该类型的新闻
        else if(result.length===0){
            callback("没有该类型的新闻");
        }else{//查询到匹配的新闻  返回
            callback(null,result);
        }
    })
}

/*查看新闻
callback函数返回值(String,result),String为错误提示,
result为news的全部内容,发生错误时result为空,未发生错误时String为空*/
var SearchNews = (id,callback) =>{
    //返回新闻的标题与内容
    //到数据库中查询对应新闻
    pool.query('select * from news WHERE nid=?',[id],(err,result)=>{
        if(err) callback(err);
        //返回空数组，长度为0 ，说明没有该新闻
        else if(result.length===0){
            callback("没有该新闻");
        }else{//查询到匹配的新闻  返回
            callback(null,result);
        }
    })
}

/*新增新闻
callback函数返回值(String),String为错误提示,为0时表示失败，1时表示成功*/
var AddNews = (title,content,type,visit,publishtime,author_id,url,callback) =>{
    //到数据库中插入新新闻
    pool.query('INSERT INTO news VALUES (null,?,?,?,?,?,?,?)',
        [title,content,type,visit,publishtime,author_id,url],(err,result)=>{
        if(err) callback(err);
        //返回0 ，说明插入失败
        else if(result===0){
            callback(null,0);
        }else{//返回1
            callback(null,1);
        }
    })
}

/*修改新闻
callback函数返回值(String),String为错误提示,为0时表示失败，1时表示成功*/
var UpdateNews = (nid,title,content,type,url,callback) =>{
    //到数据库中插更新新闻
    pool.query('UPDATE news SET title=?,content=?,type=?,url=? WHERE nid=?',[title,content,type,url,nid],(err,result)=>{
            if(err) callback(err);
            //返回0 ，说明更新失败
            else if(result===0){
                callback(null,0);
            }else{//返回1
                callback(null,1);
            }
    })
}

/*删除新闻
callback函数返回值(String),String为错误提示,为0时表示失败，1时表示成功*/
var DeleteNews = (nid,callback) =>{
    //到数据库中删除新闻
    pool.query('DELETE FROM news WHERE nid=?',[nid],(err,result)=>{
        if(err) callback(err)
        //返回0 ，说明删除失败
         else if(result===0){
            callback(null,0);
        }else{//返回1
            callback(null,1);
        }
    })
}

/*增加点击量
callback函数返回值(String),String为错误提示,为0时表示失败，1时表示成功*/
var UpdateVisit = (nid,callback) =>{
    //到数据库中插更新新闻
    pool.query('UPDATE news SET visit=visit+1 WHERE nid=?',[nid],(err,result)=>{
        if(err) callback(err);
        //返回0 ，说明更新失败
        else if(result===0){
            callback(null,0);
        }else{//返回1
            callback(null,1);
        }
    })
}

/*查询新闻图片url,返回类型为type的最新的num条新闻的,且新闻必须url不为空
callback函数返回值(String,result),String为错误提示,
result为news的全部内容,发生错误时result为空,未发生错误时String为空*/
var SearchNewsWithUrl = (type, num,callback) =>{
    //返回对应数据类型的一定数量的数据
    //到数据库中查询相应类型的最新插入的num条新闻
    pool.query('select * from news WHERE type=? and url is not NULL order by nid desc limit 0,?',[type,num],(err,result)=>{
        //如果输入数量超出已有数量则出错
        if(err) callback(err);
        //返回空数组，长度为0 ，说明没有该类型的新闻
        else if(result.length===0){
            callback("没有该类型的新闻");
        }else{//查询到匹配的新闻  返回
            callback(null,result);
        }
    })
}

/*查询新闻图片url,返回最新的num条新闻的url且url不能为空
callback函数返回值(String,result),String为错误提示,
result为news的全部内容,发生错误时result为空,未发生错误时String为空*/
var SearchNewsWithUrlNoType = ( num,callback) =>{
    //返回对应数据类型的一定数量的数据
    //到数据库中查询相应类型的最新插入的num条新闻
    pool.query('select * from news where url is not NULL order by nid desc limit 0,?',[num],(err,result)=>{
        //如果输入数量超出已有数量则出错
        if(err) callback(err);
        //返回空数组，长度为0 ，说明没有该类型的新闻
        else if(result.length===0){
            callback("没有该类型的新闻");
        }else{//查询到匹配的新闻  返回
            callback(null,result);
        }
    })
}

/*查询新闻,返回最新的num条新闻的nid和title和publishtime
callback函数返回值(String,result),String为错误提示,
result为news的nid和title,publishtime,发生错误时result为空,未发生错误时String为空*/
var SearchDataNoType = (num,callback) =>{
    //返回一定数量的最新的几条数据
    //到数据库中查询最新插入的num条新闻
    pool.query('select nid,title,publishtime from news order by nid desc limit 0,?',[num],(err,result)=>{
        //如果输入数量超出已有数量则出错
        if(err) callback(err);
        //返回空数组，长度为0 ，说明没有新闻
        else if(result.length===0){
            callback("没有该类型的新闻");
        }else{//查询到新闻  返回
            callback(null,result);
        }
    })
}

/*查询新闻,返回最新的一条新闻nid
callback函数返回值(String,result),String为错误提示,
result为news的nid发生错误时result为空,未发生错误时String为空*/
var SearchNewNews = (callback) =>{
    //返回对应数据类型的一定数量的数据
    //到数据库中查询最新插入的一条新闻和最旧的一条新闻
    pool.query('select nid from news order by nid desc limit 0,1',(err,result)=>{
        //如果输入数量超出已有数量则出错
        if(err) callback(err);
        //返回空数组，长度为0 ，说明没有新闻
        else if(result.length===0){
            callback("没有该类型的新闻");
        }else{//查询到新闻  返回
            callback(null,result);
        }
    })
}

/*查询新闻,返回最旧的一条新闻的nid
callback函数返回值(String,result),String为错误提示,
result为news的nid,发生错误时result为空,未发生错误时String为空*/
var SearchOldNews = (callback) =>{
    //返回对应数据类型的一定数量的数据
    //到数据库中查询最新插入的一条新闻和最旧的一条新闻
    pool.query('select nid from news order by nid limit 0,1',(err,result)=>{
        //如果输入数量超出已有数量则出错
        if(err) callback(err);
        //返回空数组，长度为0 ，说明没有新闻
        else if(result.length===0){
            callback("没有该类型的新闻");
        }else{//查询到新闻  返回
            callback(null,result);
        }
    })
}

/*查询数据库，返回当前的新闻数量
callback函数返回值(String,result),String为错误提示,
result为news的数量,发生错误时result为空,未发生错误时String为空*/
var SearchNewsCount = (callback) =>{
    //返回对应数据类型的一定数量的数据
    //到数据库中查询最新插入的一条新闻和最旧的一条新闻
    pool.query('select count(*) from news',(err,result)=>{
        //如果输入数量超出已有数量则出错
        if(err) callback(err);
        //返回空数组，长度为0 ，说明没有新闻
        else if(result.length===0){
            callback("没有该类型的新闻");
        }else{//查询到新闻  返回
            callback(null,result);
        }
    })
}

exports.UserLogin = UserLogin
exports.SearchData = SearchData
exports.SearchNews = SearchNews
exports.AddNews = AddNews
exports.UpdateNews = UpdateNews
exports.DeleteNews = DeleteNews
exports.UpdateVisit = UpdateVisit
exports.SearchNewsWithUrl = SearchNewsWithUrl
exports.SearchNewsWithUrlNoType = SearchNewsWithUrlNoType
exports.SearchDataNoType = SearchDataNoType
exports.SearchNewNews = SearchNewNews
exports.SearchOldNews = SearchOldNews
exports.SearchNewsCount = SearchNewsCount