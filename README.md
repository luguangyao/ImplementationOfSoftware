# ImplementationOfSoftware
 中级软件实作

软件结构

前端：

  css,image,js静态资源在/public文件夹下，新的静态资源文件也请写在里面
  html页面请写在view里，其中
      templete文件用于存放常用的页面块，如footer，header
      
后端：app.js,router.js都在根目录下，其它请自行添加

注意！：不要修改和删除.git,.idea,.gitattributes文件

> （=w=）：在项目运行前请下载依赖  npm install, 上传文件无需上传node_moudles
>> 
### （=w=）一开始分析的页面结构，参考
- 前端页面
	+ 静态数据页
		* 左侧需要有一个静态导航，中间的内容根据左侧的点击动态改变
	+ 动态数据页
		* 同理左侧的导航静态， 中间的内容需要请求数据然后动态改变
			- 因为静态页面与动态页面互通，所以请将形式做统一
	+ 主页
	+ 公共部分
		* 顶端导航
		* 底部版权所有
		* 404页面
		* 403页面
	+ 伪界面
		* 模拟登录的登录界面
		* 模拟管理后台的管理界面
			- 该界面提供增改新闻功能
			- 该界面同时是个人主页，管理员可以管理新闻，普通用户没有（考虑扩展收藏新闻的功能）
	+ 新闻页
		* 显示动态的新闻数据
			- 请注意标题与内容将会分为两个部分传递
		* 上下换页
	+ 新闻编辑页面后端
		* 在一端编辑页面，另一端实时显现编辑效果
			- 因为需要合理的预览效果，需要实际的新闻页完成后进行
		* 上传按钮

### （=w=）url映射 （还待补全）
- /  ===  index.html
- /login  === login.html
- /update post方法获取图片
- /upload_img 适应Ajax写法， post方法获取图片，具体使用看/template/upload_img_demo.html
- /new/:id  === detail.html
- /edit/:id  === newsEdit.html
- /info/:click  === news.html
- /data/:type/:num === 根据需求返回数据
- /title_news/:type/:num === 获取头条新闻
- /EditNew 上传编辑数据
- /loginCheck 用户登录确认
- /captcha 验证码位置
- 公开
	+ /template/ 映射 /view/template 文件夹
	+ /public/ 映射 /public/ 文件夹

(=w=) 数据字典 （可以自己访问后台获取数据对照，/data/0/id 为单条数据，/data/n/num 为多条数据）
单条：
nid:新闻id
title：标题
content：内容
type：所属板块
visit：访问量
publishtime：发布时间
author_id：作者id
url：头条图片

多条
[
	{nid:新闻id，title：标题}
]

此处若数据为空，统一变更为返回	{nid:-1} 以统一处理形式，注意变更

> 对应\
> 1 学院动态\
> 2 通知公告\
> 3 党建工作\
> 4 本科生培养\
> 5 研究生教育\
> 6 科学研究\
> 7 师资队伍\人才招聘\
> 8 国际化办学\
> 9 招生就业\招生宣传

