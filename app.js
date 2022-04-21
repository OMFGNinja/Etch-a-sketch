const container = document.getElementById("container")
const clear = document.getElementById("clear")
const colorPicker = document.getElementById("colorPicker")
const eraser = document.getElementById("eraser")
const rainbow = document.getElementById("rainbow")

let rows = document.getElementsByClassName("gridRow")
let size = document.getElementById("size")
let sizeValue = document.getElementById("sizeValue")

let value = size.value
let mouseDown = false
let white = '#fefefe'
let currentColor = '#333333'
let cMode = 'none'
document.getElementById("container").onmousedown = () => (mouseDown = true)
document.getElementById("container").onmouseup = () => (mouseDown = false)

defaultGrid(value)

function newColor(color){
    if (cMode === 'eraser'){
        currentColor = white
    }
    else if (cMode === 'rainbow') {
        const R = Math.floor(Math.random()*256)
        const G = Math.floor(Math.random()*256)
        const B = Math.floor(Math.random()*256)
        currentColor = `rgb(${R}, ${G}, ${B})`
    }
    else currentColor = color
}

function defaultGrid(e){
    makeRows(e)
}

function resetGrid(){
    while (container.firstChild){
        container.removeChild(container.firstChild)
    }
    sizeValue.innerHTML = `Grid size = ${value}x${value}`
    defaultGrid(value)
}

function makeRows(num){
    for (r=0; r<num; r++){
        let row = document.createElement("div")
        container.appendChild(row).className = "gridRow"
    }
    for (i=0; i<num; i++){
        for (j=0; j<num; j++){
            let newCell = document.createElement("div")
            rows[j].appendChild(newCell).className = "cell"
        }
    }
}

function changeColor(e){
    if (e.type==='mouseover' && mouseDown===true){
        if (e.target.matches('.cell')){
            e.target.style.cssText = `background-color: ${currentColor};`
        }
    }
}

function changeMode(mode){
    cMode = mode
    newColor()
}

function normalColor(e){
    cMode = 'none'
    newColor(e)
}

eraser.onclick = () => changeMode('eraser')
rainbow.onclick = () => changeMode('rainbow')
colorPicker.onchange = (e) => normalColor(e.target.value)

clear.addEventListener('click', resetGrid)
container.addEventListener('mousedown', changeColor)
container.addEventListener('mouseover', changeColor)
size.addEventListener('input', function (e){
    value = size.value
    resetGrid(value)
})