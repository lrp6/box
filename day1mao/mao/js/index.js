var xhr = new XMLHttpRequest()
xhr.open("GET", "/list")
xhr.send()
xhr.onload = function(e) {
    var content = document.querySelector(".S-content")
    var data = JSON.parse(e.target.responseText)
    console.log(data.data)
    var html = '';
    data.data.map(function(v, i) {
        html += ` <div class="S-cont">
                    <img src="${v.src}" alt="">
                    <div class="cont">
                        <h4>${v.name}</h4>
                        <p>${v.guige}</p>
                        <div><span>${v.qian}</span><span>+</span></div>
                    </div>
                </div>`
        content.innerHTML = html
    })
}