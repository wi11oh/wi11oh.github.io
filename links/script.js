






const rectangles = document.querySelectorAll(".card")






function getRandomSpeed() {
    return (Math.floor(Math.random() * 80) + 5) / 10
}
const speedsX = [getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed()]
const speedsY = [getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed(), getRandomSpeed()]
console.log(speedsX, speedsY)

function moveRectangles() {
    rectangles.forEach((rectangle, index) => {
        if (!rectangle.classList.contains("paused")) {
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

            rectangle.style.left = posX + "px"
            rectangle.style.top = posY + "px"
            rectangle.querySelector(".loc").innerText = `${("0000" + Math.floor(posX)).slice(-4)}px * ${("0000" + Math.floor(posY)).slice(-4)}px`
        }
    })
    requestAnimationFrame(moveRectangles)
}






// ホバー時ストップ
function stopOnHover() {
    document.querySelectorAll(".movable").forEach(rectangle => {
        rectangle.addEventListener("mouseover", () => {
            rectangle.classList.add("paused")
            rectangle.style.zIndex = "1"
        })

        rectangle.addEventListener("mouseout", () => {
            rectangle.classList.remove("paused")
            rectangle.style.zIndex = "0"
        })

        rectangle.addEventListener("touchstart", () => {
            rectangle.classList.add("paused", "sp")
            rectangle.style.zIndex = "1"
        })

        rectangle.addEventListener("touchend", () => {
            setTimeout(() => {
                rectangle.classList.remove("paused", "sp")
                rectangle.style.zIndex = "0"
            }, 500)
        })
    })

}






// ドラックドロップ
let activeCard = null
document.querySelectorAll(".movable").forEach(rectangle => {
    rectangle.querySelector(".title").addEventListener("mousedown", (e) => {
        activeCard = e.target.parentElement.parentElement
        activeCard.style.opacity = "0.5"
        activeCard.style.zIndex = "1"

        const offsetX = e.clientX - activeCard.getBoundingClientRect().left
        const offsetY = e.clientY - activeCard.getBoundingClientRect().top

        function dragMove(e) {
            if (activeCard) {
                const posX = e.clientX - offsetX
                const posY = e.clientX - offsetY
                activeCard.style.left = e.clientX - offsetX + "px"
                activeCard.style.top = e.clientY - offsetY + "px"
                rectangle.querySelector(".loc").innerText = `${("0000" + Math.floor(posX)).slice(-4)}px * ${("0000" + Math.floor(posY)).slice(-4)}px`
            }
        }

        function dragEnd() {
            if (activeCard) {
                activeCard.style.opacity = "1"
                activeCard.style.zIndex = "0"
            }
            activeCard = null
            window.removeEventListener("mousemove", dragMove)
            window.removeEventListener("mouseup", dragEnd)
        }

        window.addEventListener('mousemove', dragMove)
        window.addEventListener('mouseup', dragEnd)
    })
})






// タッチスワイプ
document.querySelectorAll(".movable").forEach(rectangle => {
    const titleElement = rectangle.querySelector(".title")

    titleElement.addEventListener("mousedown", startDrag)
    titleElement.addEventListener("touchstart", startDrag)

    function startDrag(e) {
        activeCard = e.target.parentElement.parentElement
        activeCard.style.opacity = "0.5"
        activeCard.style.zIndex = "1"

        const offsetX = e.type === "mousedown" ? e.clientX - activeCard.getBoundingClientRect().left : e.touches[0].clientX - activeCard.getBoundingClientRect().left
        const offsetY = e.type === "mousedown" ? e.clientY - activeCard.getBoundingClientRect().top : e.touches[0].clientY - activeCard.getBoundingClientRect().top

        function dragMove(e) {
            if (activeCard) {
                const posX = e.type === "mousemove" ? e.clientX - offsetX : e.touches[0].clientX - offsetX
                const posY = e.type === "mousemove" ? e.clientY - offsetY : e.touches[0].clientY - offsetY
                activeCard.style.left = posX + "px"
                activeCard.style.top = posY + "px"
                rectangle.querySelector(".loc").innerText = `${("0000" + Math.floor(posX)).slice(-4)}px * ${("0000" + Math.floor(posY)).slice(-4)}px`
            }
            e.preventDefault()
        }

        function dragEnd() {
            if (activeCard) {
                activeCard.style.opacity = "1"
                activeCard.style.zIndex = "0"
            }
            activeCard = null
            window.removeEventListener("mousemove", dragMove)
            window.removeEventListener("touchmove", dragMove)
            window.removeEventListener("mouseup", dragEnd)
            window.removeEventListener("touchend", dragEnd)
        }

        window.addEventListener('mousemove', dragMove)
        window.addEventListener('touchmove', dragMove, { passive: false })
        window.addEventListener('mouseup', dragEnd)
        window.addEventListener('touchend', dragEnd)
    }
})






// リダイレクト関係
const birthDay = new Date('2000-11-29T00:00:00+09:00').getTime()
function badfeeling() {
    let countdown = 100
    document.querySelectorAll(".countspan").forEach(cs => {
        cs.innerHTML = countdown
    })
    const intervalsec = setInterval(() => {
        document.querySelectorAll(".countspan").forEach(cs => {
            cs.innerHTML = countdown
        })
        countdown--
        if (countdown < 0) {
            window.location.href = "https://suki-kira.com"
        }

        const currentTime = new Date().getTime()
        const elapsedSeconds = Math.floor((currentTime - birthDay) / 1000)
        try {
            document.querySelectorAll(".birth").forEach(span => {
                span.innerText = elapsedSeconds
            })
        } catch (error) {
        }

    }, 1000)
}






// クリック挙動
// function clickcard() {
//     rectangles.forEach(div => {
//         div.addEventListener("click", (e) => {
//             console.log(e.target)
//             const link = e.target.getAttribute("data-linkfor")
//             console.log(link)
//             window.location.href = link
//         })
//     })
// }






// 初期スポーン
function randomspone() {
    rectangles.forEach(card => {
        card.style.top = Math.floor(Math.random() * 81) + "%"
        card.style.left = Math.floor(Math.random() * 81) + "%"
        document.querySelectorAll(".loc").forEach(loc => {
            loc.clientLeft
            loc.innerText = `${("0000" + Math.floor(card.offsetLeft)).slice(-4)}px * ${("0000" + Math.floor(card.offsetTop)).slice(-4)}px`
        })
    })

}






// 閉じるボタン挙動
function close() {
    document.querySelectorAll(".close").forEach(element => {
        element.addEventListener("click", () => {
            element.parentElement.parentElement.classList.add("hide")
        })
    })
}






// cmd
function pressEnter() {
    const cl = document.querySelector(".currentline")
    let out
    const inlist = cl.innerText.split(" ")
    switch (inlist[0]) {
        case "help":
            out = '<span class="helpcommand">status</span> :  introduce willoh in more detail<br>詳細な自己紹介<br>' +
                '<span class="helpcommand">mail **</span> : Send a message to willoh with the content **.<br>メールを俺に。内容はスペースを開けたあとに<br>' +
                '<span class="helpcommand">stop</span> : Stops the animation moving around.<br>アニメーションをストップ<br>' +
                '<span class="helpcommand">restart</span> : animation restart<br>アニメーションを再開<br>'
            break
        case "status":
            out = `<span class="birth">*</span>秒前生まれ`
            break
        case "":
            out = null
            break
        case "stop":
            document.querySelectorAll(".movable").forEach(rectangle => {
                rectangle.classList.add("paused")
            })
            out = "animation is stopped"
            break
        case "restart":
            document.querySelectorAll(".movable").forEach(rectangle => {
                rectangle.classList.remove("paused")
                out = "animation is restarted"
            })
            break
        case "mail":
            out = null
            break
        case "badfeeling":
            out = '<span class="countspan">*</span> 秒以内にリンクをクリックしなければ 好き嫌い.com に飛ばされて嫌な気持ち になります。'
            break
        case "exit":
            document.querySelector(".cmd").remove()
            break
        default:
            out = "command not found. You can refer to the commands in 'HELP'"
    }

    const output = document.createElement("p")
    output.className = "consoleline output"
    output.innerHTML = out

    const newline = document.createElement("p")
    newline.className = "consoleline currentline"
    cl.after(output, newline)

    cl.classList.remove("currentline")

    document.querySelector(".cmd .mainarea").scrollTop = document.querySelector(".cmd .mainarea").scrollHeight
}
function keyinput() {
    document.addEventListener("keypress", (e) => {
        const cl = document.querySelector(".currentline")
        if (e.key == "Enter") {
            pressEnter()
        } else {
            cl.innerText += e.key
        }
    })

    document.addEventListener("keydown", (e) => {
        const cl = document.querySelector(".currentline")
        if (e.keyCode == 8 && cl.innerText.length > 0) {
            cl.innerText = cl.innerText.slice(0, -1)
        }
    })
}






// スマホキーボード
function spKey() {
    if (window.matchMedia('(max-width: 480px)').matches) {
        document.querySelectorAll(".keys").forEach(elem => {
            elem.addEventListener("touchstart", () => {
                if (elem.classList.contains("fn")) {
                    if (elem.innerText == "↵") {
                        pressEnter()
                    } else if (elem.innerText == "←") {
                        document.querySelector(".currentline").innerText = document.querySelector(".currentline").innerText.slice(0, -1)
                    } else if (elem.innerText == "␣") {
                        document.querySelector(".currentline").innerText += " "
                    } else {
                        ;
                    }
                } else {
                    document.querySelector(".currentline").innerText += elem.innerText
                }

            })
        })
        document.querySelector(".cmd .mainarea").addEventListener("click", () => {
            document.querySelector(".keybord").classList.remove("hide")
        })
    }
}







stopOnHover()
close()
randomspone()
badfeeling()
// clickcard()
moveRectangles()
keyinput()
spKey()