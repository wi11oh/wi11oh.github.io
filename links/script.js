const rectangles = document.querySelectorAll('.card')




// 動かすやつ
function getRandomSpeed() {
    return (Math.floor(Math.random() * 80) + 5) / 10;
}
const speedsX = [getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed()]
const speedsY = [getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed()]
console.log(speedsX, speedsY)
function moveRectangles() {
    rectangles.forEach((rectangle, index) => {
        let posX = rectangle.offsetLeft
        let posY = rectangle.offsetTop

        posX += speedsX[index]
        posY += speedsY[index]

        if (posX + rectangle.offsetWidth > window.innerWidth) {
            posX = window.innerWidth - rectangle.offsetWidth
            speedsX[index] = -speedsX[index]
        } else if (posX < 0) {
            posX = 0
            speedsX[index] = -speedsX[index]
        }

        if (posY + rectangle.offsetHeight > window.innerHeight) {
            posY = window.innerHeight - rectangle.offsetHeight
            speedsY[index] = -speedsY[index]
        } else if (posY < 0) {
            posY = 0
            speedsY[index] = -speedsY[index]
        }

        rectangle.style.left = posX + 'px'
        rectangle.style.top = posY + 'px'
    })
    requestAnimationFrame(moveRectangles)
}




// リダイレクト関係
function badfeeling() {
    let countdown = 100
    document.getElementById("countspan").innerText = countdown

    const intervalsec = setInterval(() => {
        document.getElementById("countspan").innerText = countdown
        countdown--
        if (countdown < 0) {
            window.location.href = "https://suki-kira.com"
        }
    }, 1000)
}




//クリック挙動
function clickcard() {
    rectangles.forEach(div => {
        div.addEventListener("click", (e) => {
            console.log(e.target)
            const link = e.target.getAttribute("data-linkfor")
            console.log(link)
            window.location.href = link
        })
    })
}




//初期スポーン
function randomspone() {
    rectangles.forEach(card => {
        card.style.top = Math.floor(Math.random() * 101) + "%"
        card.style.left = Math.floor(Math.random() * 101) + "%"
    })
}




randomspone()
badfeeling()
// clickcard()
moveRectangles()