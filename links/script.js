const rectangles = document.querySelectorAll(".card")
let max_zindex = 10






// 動かし
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
    document.querySelectorAll(".card").forEach(rectangle => {
        rectangle.addEventListener("mouseover", () => {
            rectangle.classList.add("paused")
            rectangle.style.zIndex = "calc(infinity)"
        })

        rectangle.addEventListener("mouseout", () => {
            rectangle.classList.remove("paused")
            max_zindex += 1
            rectangle.style.zIndex = max_zindex
        })

        rectangle.addEventListener("touchstart", () => {
            rectangle.classList.add("paused", "sp")
            rectangle.style.zIndex = "calc(infinity)"
        })

        rectangle.addEventListener("touchend", () => {
            setTimeout(() => {
                rectangle.classList.remove("paused", "sp")
                max_zindex += 1
                rectangle.style.zIndex = max_zindex
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
        max_zindex += 1
        activeCard.style.zIndex = max_zindex


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
        max_zindex += 1
        activeCard.style.zIndex = max_zindex

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
let killcountdown = false
function badfeeling() {
    let countdown = 100
    document.querySelectorAll(".countspan").forEach(cs => {
        cs.innerHTML = countdown
    })
    const intervalsec = setInterval(() => {
        if (killcountdown == false) {
            document.querySelectorAll(".countspan").forEach(cs => {
                cs.innerHTML = countdown
            })
            countdown--
            if (countdown < 0) {
                window.location.href = "https://suki-kira.com"
            }
        } else {
            clearInterval(intervalsec)
        }

    }, 1000)
}



// birthday
const birthDay = new Date('2000-11-29T00:00:00+09:00').getTime()
function btd() {
    const birthsec = setInterval(() => {
        const currentTime = new Date().getTime()
        const elapsedSeconds = Math.floor((currentTime - birthDay) / 1000)
        try {
            document.querySelectorAll(".birth").forEach(span => {
                span.innerText = elapsedSeconds
            })
        } catch (error) {
        }
    }, 1000);

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
            loc.innerText = `${("0000" + Math.floor(card.offsetLeft)).slice(-4)}px` +
                `* ${("0000" + Math.floor(card.offsetTop)).slice(-4)}px`
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
function hSpenit(indata) {
    document.querySelector(".currentline").innerText = indata
    pressEnter()
}

function pressEnter() {
    const cl = document.querySelector(".currentline")
    let out
    const inlist = cl.innerText.split(" ")
    switch (inlist[0]) {
        case "help":
            out = `<span class="helpcommand h-snippet" onclick="hSpenit('status')">status</span> : 詳細な自己紹介<br>` +
                `<span class="helpcommand h-snippet" onclick="hSpenit('kill')">kill</span> : 嫌な気持ちカウントダウンを止める<br>` +
                `<span class="helpcommand h-snippet" onclick="hSpenit('mail')">mail</span> : メールを俺に。<br>` +
                `<span class="helpcommand h-snippet" onclick="hSpenit('anim')">anim (</span><span class="helpcommand h-snippet" onclick="hSpenit('anim stop')">stop|</span><span class="helpcommand h-snippet" onclick="hSpenit('anim restart')">restart)</span> : アニメーションをストップorリスタート<br>` +
                `<span class="helpcommand h-snippet" onclick="hSpenit('exit')">exit</span> : コンソールを閉じる。<br>`;
            btd()
            break
        case "status":
            out = `<span class="birth">*</span>秒前生まれ、幼稚園を卒業しています。ニートをしてます雇ってください行政書士資格もってますんで。`
            break
        case "":
            out = null
            break
        case "anim":
            if (inlist[1] == "stop") {
                document.querySelectorAll(".movable").forEach(rectangle => {
                    rectangle.classList.add("paused")
                    out = "アニメーション止めるよ"
                })
            } else if (inlist[1] == "restart") {
                document.querySelectorAll(".movable").forEach(rectangle => {
                    rectangle.classList.remove("paused")
                    out = "じゃあ、動くね…"
                })
            } else {
                out = "そのコマンドが見つかりません。'HELP'で使用できるコマンドを参照できます"
            }
            break
        case "kill":
            killcountdown = true
            out = "はい。"
            break
        case "mail":
            out = "メールアプリを起動します"
            location.href = `mailto:uiroumachine@gmail.com`
            break
        case "badfeeling":
            out = '<span class="countspan">*</span> 秒以内にリンクをクリックしなければ 好き嫌い.com に飛ばされて嫌な気持ち になります。'
            break
        case "exit":
            document.querySelector(".cmd").remove()
            break
        case "":
            out = null
            break
        default:
            out = "そのコマンドが見つかりません。'HELP'で使用できるコマンドを参照できます"
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
btd()
badfeeling()
// clickcard()
moveRectangles()
keyinput()
spKey()