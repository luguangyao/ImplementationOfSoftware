function upload(){
    let from = new FormData()
    let fileObj = document.getElementById("file").files[0]
    console.log(fileObj)
    console.log('------------------')
    console.log(document.getElementById("file").files[0])
    console.log('------------------')
    from.append("img", fileObj)
    // 开启同步
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () =>{
        // 当请求成功
        if (xhr.readyState === 4 && xhr.status === 200) {
            let data =  JSON.parse(xhr.responseText)
            if (data.status === 200) {
                var nimg = document.createElement("img")
                console.log("/public/image/NEWSimage/" + data.img)
                nimg.setAttribute("src", "/public/image/NEWSimage/" + data.img)
                document.body.appendChild(nimg)
            }else if(data.status === 500){
                console.log(data.err)
            }
        }
    }
    // post方式 位置 是否同步
    xhr.open('POST', "http://localhost:3000/upload_img", true)
    xhr.send(from)
}