//引入mysql模块
const mysql = require('mysql');

//创建连接池对象
const pool = mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'12345678',
    database:'scnu',
    connectionLimit:'20'

});

//用户登录方法
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
        if(result.length===0){
            callback("账号或密码错误");
        }else{//查询到匹配的用户  登录成功
            callback(null,result);
        }
    })


}

//查询新闻
var SearchData = (type, num,callback) =>{
    // 返回对应数据类型的一定数量的数据
    //到数据库中查询相应类型的最新插入的num条新闻
    pool.query('select nid,title from news order by nid desc limit 0,? WHERE type=?',[num,type],(err,result)=>{
        //如果输入数量超出已有数量则出错
        if(err) callback(err);
        //返回空数组，长度为0 ，说明没有该类型的新闻
        if(result.length===0){
            callback("没有该类型的新闻");
        }else{//查询到匹配的新闻  返回
            callback(null,result);
        }
    })
}

//查看新闻
var SearchNews = (id,callback) =>{
    //返回新闻的标题与内容
    //到数据库中查询对应新闻
    pool.query('select * from news WHERE nid=?',[id],(err,result)=>{
        if(err) callback(err);
        //返回空数组，长度为0 ，说明没有该新闻
        if(result.length===0){
            callback("没有该新闻");
        }else{//查询到匹配的新闻  返回
            callback(null,{
                title: result.title,
                content: result.content
            });
        }
    })
}

//新增新闻
var AddNews = (title,content,type,visit,publishtime,author_id,callback) =>{
    //到数据库中插入新新闻
    pool.query('INSERT INTO news VALUES (null,?,?,?,?,?,?)',
        [title,content,type,visit,publishtime,author_id],(err,result)=>{
        if(err) callback(err);
        //返回0 ，说明插入失败
        if(result===0){
            callback(0);
        }else{//返回1
            callback(1);
        }
    })
}

//修改新闻
var UpdateNews = (nid,title,content,type,callback) =>{
    //到数据库中插更新新闻
    pool.query('UPDATE news SET title=?,content=?,type=?, WHERE nid=?',[title,content,type,nid],(err,result)=>{
            if(err) callback(err);
            //返回0 ，说明更新失败
            if(result===0){
                callback(0);
            }else{//返回1
                callback(1);
            }
    })
}

//删除新闻
var DeleteNews = (nid,callback) =>{
    //到数据库中删除新闻
    pool.query('DELETE FROM news WHERE nid=?',[nid],(err,result)=>{
        if(err) callback(err)
        //返回0 ，说明删除失败
        if(result===0){
            callback(0);
        }else{//返回1
            callback(1);
        }
    })
}

exports.UserLogin = UserLogin
exports.SearchData = SearchData
exports.SearchNews = SearchNews
exports.AddNews = AddNews
exports.UpdateNews = UpdateNews
exports.DeleteNews = DeleteNews