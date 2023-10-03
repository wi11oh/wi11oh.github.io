const rectangles = document.querySelectorAll('.card')




function getRandomSpeed() { return Math.random() * 8 }
const speedsX = [getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed()]
const speedsY = [getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed()]

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




function badfeeling() {
    let countdown = 25
    document.getElementById("countspan").innerText = countdown

    const intervalsec = setInterval(() => {
        document.getElementById("countspan").innerText = countdown
        countdown--
        if (countdown < 0) {
            window.location.href = "https://suki-kira.com"
        }
    }, 1000)
}




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






badfeeling()
// clickcard()
moveRectangles()