import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

const scenes = []
const cameras = []
const renderers = []
const loaders = []
const lights = []

let blobResponse = []
let sheetResponse
let filesResponse

let apiMessage = "Error occurred. Try to clear cache and reload this page"
async function someBrowsersDoNotSupportGlobalAwaits() {
    try {
        filesResponse = await (await fetch("https://www.googleapis.com/drive/v3/files?q='1BHeR3ZdgC78LlmGCWX-VjlHYXkfbC0YVWngzeaQ5S5GXXUo5jMQicIOlS9hlYOyo0p4p2cXT'+in+parents&key=")).json()
    } catch (e) {
        alert(apiMessage)
    }
    for (let elem of filesResponse["files"]) {
        let placeholder = document.createElement("div")
        placeholder.classList.add("grid__placeholder-item")
        document.querySelector(".grid").appendChild(placeholder)
    }
    try {
        sheetResponse = await (await fetch("https://sheets.googleapis.com/v4/spreadsheets/1zAAbzVA5-qK7UevrBGPiIJ0uHYu9wcegUK0pTES0JSw/values/Sheet1?key=")).json()
    } catch (e) {
        alert(apiMessage)
    }
    sheetResponse["values"].reverse()
    for (let [i, file] of filesResponse["files"].entries()) {
        let response
        try {
            response = await (await fetch(`https://www.googleapis.com/drive/v3/files/${file["id"]}?key=&alt=media`)).blob()
        } catch (e) {
            alert(apiMessage)
        }
        blobResponse.push(response)
        try {
            createModelWindow(i, blobResponse[i], sheetResponse)
        } catch (e) {
            alert("Error occurred! Perhaps the information from the last submitted form had no time to be processed. Try to reload the page in a minute")
        }
        renderers[i].domElement.classList.add("grid__placeholder-item__viewer")
        addEventListeners(renderers[i].domElement)
        renderers[i].domElement.setAttribute("data-identifier", i)
        document.querySelectorAll(".grid__placeholder-item")[i].appendChild(renderers[i].domElement)
        document.querySelectorAll(".grid__placeholder-item")[i].style = "background: unset;"
    }

}
someBrowsersDoNotSupportGlobalAwaits()
function createModelWindow(i, blobResponse, sheetResponse) {
    let forModel = sheetResponse["values"][i][0]

    scenes.push(new THREE.Scene())
    cameras.push(new THREE.PerspectiveCamera(75, 1, 0.1, 1000))
    renderers.push(new THREE.WebGLRenderer({ antialias: true }))
    loaders.push(new GLTFLoader())
    lights.push(new THREE.HemisphereLight(0xffffff, 0x000000, 3))

    loaders[i].load({
        "T-Shirt": "/models/TShirt.glb",
        "Cap": "/models/Cap.glb",
        "Trousers": "/models/Pants.glb",
        "Sweatpants": "/models/SportPants.glb"
    }[forModel], function (gltf) {
        scenes[i].add(gltf.scene)
        gltf.scene.traverse(o => {
            if (o.isMesh) {
                let texture = (new THREE.TextureLoader()).load(URL.createObjectURL(blobResponse))
                texture.flipY = false
                o.material = new THREE.MeshStandardMaterial({ map: texture })
            }
        })
    }, undefined, function (error) {
        console.error(error)
    })

    cameras[i].position.z = 100
    scenes[i].add(lights[i])
    renderers[i].setSize(2560, 2560)
    renderers[i].setClearColor(sheetResponse["values"][i].length == 2 ? parseInt(sheetResponse["values"][i][1].replace("#", ""), 16) : 0x16161a, 1)
    renderers[i].setAnimationLoop(() => {
        renderers[i].render(scenes[i], cameras[i])
    })
}

let globalSensetivity = 1 / 100
let sensetivity = 0
// change the sensetivity
document.querySelector("form").addEventListener("change", (event) => {
    sensetivity = document.querySelector("#k").value / 1000
    globalSensetivity = sensetivity
})
document.querySelector("#k").addEventListener("click", () => {
    document.querySelector("#k").classList.toggle("none")
})

let previousTouchX = 0
let previousTouchY = 0
let previousTouchXX = null
let previousTouchYY = null
let scaleMode = false
function addEventListeners(element) {
    element.addEventListener("click", expand)

    element.addEventListener("mousemove", event => {
        if (event.buttons == 1) {
            scenes[element.getAttribute("data-identifier")].rotation.y += event.movementX * sensetivity
            scenes[element.getAttribute("data-identifier")].rotation.x += event.movementY * sensetivity
        }
    })
    element.addEventListener("wheel", event => {
        cameras[element.getAttribute("data-identifier")].position.z += event.deltaY * 5 * sensetivity
    })

    element.addEventListener("touchstart", (event) => {
        previousTouchX = event.touches[0].screenX
        previousTouchY = event.touches[0].screenY
        if (event.touches.length > 1) {
            scaleMode = true
            previousTouchXX = event.touches[1].screenX
            previousTouchYY = event.touches[1].screenY
        }
    })
    element.addEventListener("touchmove", (event) => {
        if (scaleMode) {
            let delta = Math.sqrt((previousTouchX - previousTouchXX) ** 2 + (previousTouchY - previousTouchYY) ** 2)
            delta -= Math.sqrt((event.touches[1].screenX - event.touches[0].screenX) ** 2 + (event.touches[1].screenY - event.touches[0].screenY) ** 2)
            cameras[element.getAttribute("data-identifier")].position.z += delta * 25 * sensetivity
            previousTouchXX = event.touches[1].screenX
            previousTouchYY = event.touches[1].screenY
        } else {
            scenes[element.getAttribute("data-identifier")].rotation.y += (event.touches[0].screenX - previousTouchX) * sensetivity
            scenes[element.getAttribute("data-identifier")].rotation.x += (event.touches[0].screenY - previousTouchY) * sensetivity
        }
        previousTouchX = event.touches[0].screenX
        previousTouchY = event.touches[0].screenY
    })
    element.addEventListener("touchend", (event) => {
        if (event.touches.length == 0) {
            scaleMode = false
        }
    })
}


function expand(event) {
    let i = event.target.getAttribute("data-identifier")
    document.querySelector("#get").setAttribute("href", URL.createObjectURL(blobResponse[i]))
    document.querySelector("#get").setAttribute("download", `T_${sheetResponse["values"][i][0].replace("-", "")}_BC`)
    // the length of the response is 1 time greater than actual response 
    document.querySelector("#id").innerHTML = `#&nbsp;${sheetResponse["values"].length - 2 - event.target.getAttribute("data-identifier")}`
    sensetivity = globalSensetivity
    document.body.classList.add("hide-y-overflow")
    event.target.removeEventListener("click", expand)
    document.querySelector(".window").classList.toggle("transparent")
    event.target.classList.add("grid__placeholder-item__viewer_big")
    document.querySelector("#viewerplace").appendChild(event.target)
}

function unexpand() {
    sensetivity = 0
    document.body.classList.remove("hide-y-overflow")
    let number = parseInt(document.querySelector("#id").textContent.replace("#", ""))
    number = sheetResponse["values"].length - 2 - number
    renderers[number].domElement.addEventListener("click", expand)
    document.querySelector(".window").classList.toggle("transparent")
    renderers[number].domElement.classList.remove("grid__placeholder-item__viewer_big")
    let array = [...document.querySelectorAll(".grid__placeholder-item")]
    array.filter(elem => elem.children.length == 0)[0].appendChild(renderers[number].domElement)
}
document.querySelector(".cross").addEventListener("click", unexpand)


document.querySelector("#forward").addEventListener("click", () => {
    let number = parseInt(document.querySelector("#id").textContent.replace("#", ""))
    number = sheetResponse["values"].length - 2 - number
    let event = { target: renderers[(number + 1) % (sheetResponse["values"].length - 1)].domElement }
    unexpand()
    expand(event)
})
document.querySelector("#backward").addEventListener("click", () => {
    let number = parseInt(document.querySelector("#id").textContent.replace("#", ""))
    number = sheetResponse["values"].length - 2 - number
    let difference = number - 1
    let event
    if (difference < 0)
        event = { target: renderers[sheetResponse["values"].length - 1 - Math.abs(difference)].domElement }
    else
        event = { target: renderers[difference % (sheetResponse["values"].length - 1)].domElement }
    unexpand()
    expand(event)
})