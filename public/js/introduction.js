curId=0
$(function (){
    for(i=0;i<title.length ;i++){
        $($(".nav_Intro")[i]).html(title[i])

    }
    $("#title").html(title[0])
    $("#content").html(text[0])
})
function switchContent(i){
    if(curId==i)return
    curId=i
    $("#title").html(title[i])
    $("#content").slideUp(500,function (){
        $("#content").html(text[i])
    })

    $("#content").slideDown(500)
}