import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

let currentViewer = 0
const models = ["/models/TShirt.glb", "/models/Cap.glb"]
const scenes = [new THREE.Scene(), new THREE.Scene()]
const cameras = [new THREE.PerspectiveCamera(75, 1, 0.1, 1000), new THREE.PerspectiveCamera(75, 1, 0.1, 1000)]
const renderers = [new THREE.WebGLRenderer({ antialias: true }), new THREE.WebGLRenderer({ antialias: true })]
const loaders = [new GLTFLoader(), new GLTFLoader()]
const lights = [new THREE.HemisphereLight(0xffffff, 0x000000, 3), new THREE.HemisphereLight(0xffffff, 0x000000, 3)]


let minimodels = ["/models/TShirt.glb", "/models/Cap.glb"]
let miniscenes = [new THREE.Scene(), new THREE.Scene()]
let minicameras = [new THREE.PerspectiveCamera(50, 1, 0.1, 1000), new THREE.PerspectiveCamera(50, 1, 0.1, 1000)]
let minirenderers = [new THREE.WebGLRenderer({ antialias: true }), new THREE.WebGLRenderer({ antialias: true })]
const miniloaders = [new GLTFLoader(), new GLTFLoader()]
const minilights = [new THREE.HemisphereLight(0xffffff, 0x000000, 1), new THREE.HemisphereLight(0xffffff, 0x000000, 1)]

let identifiers = [0, 1]

// initialize models
for (let i of identifiers) {
    loaders[i].load(models[i], function (gltf) {
        scenes[i].add(gltf.scene)
        gltf.scene.traverse(o => {
            if (o.isMesh) {
                models[i] = o
                let texture = (new THREE.TextureLoader()).load("/images/T_TShirt_BC_8K.png")
                texture.flipY = false
                o.material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide })
            }
        })
    }, undefined, function (error) {
        console.error(error)
    })

    cameras[i].position.z = 100
    scenes[i].add(lights[i])
    renderers[i].setSize(2560, 2560)
    renderers[i].setClearColor(0x16161a, 1)
    renderers[i].setAnimationLoop(() => {
        renderers[i].render(scenes[i], cameras[i])
    })
    document.querySelector(`#viewer${i}`).appendChild(renderers[i].domElement)
    renderers[i].domElement.classList.add("viewer__window")
}

// initialize minimodels
for (let i of identifiers) {
    miniloaders[i].load(minimodels[i], function (gltf) {
        miniscenes[i].add(gltf.scene)
        gltf.scene.traverse(o => {
            if (o.isMesh) {
                minimodels[i] = o
                o.material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide })
            }
        })
    }, undefined, function (error) {
        console.error(error)
    })

    minicameras[i].position.z = 150
    miniscenes[i].add(minilights[i])
    minirenderers[i].setSize(500, 500)
    minirenderers[i].setClearColor(0x2b2b2c, 1)
    minirenderers[i].setAnimationLoop(() => {
        minirenderers[i].render(miniscenes[i], minicameras[i])
        try {
        minimodels[i].rotation.y += 0.01 } catch {}
    })
    document.querySelector(".control-panel__window").appendChild(minirenderers[i].domElement)
    minirenderers[i].domElement.classList.add("control-panel__window__model")
    minirenderers[i].domElement.setAttribute("id", `icon${i}`)
    minirenderers[i].domElement.addEventListener("click", () => {
        currentViewer = i
        updateEverything()
    })
}
updateEverything()



// scene manipulations
let sensetivity = 0.01
document.addEventListener("mousemove", (event) => {
    if (event.buttons == 1) {
        models[currentViewer].rotation.y += event.movementX * sensetivity
        models[currentViewer].rotation.x += event.movementY * sensetivity
    }
})

let previousTouchX = 0 
let previousTouchY = 0

document.addEventListener("touchstart", (event) => {
    previousTouchX = event.changedTouches[0].screenX
    previousTouchY = event.changedTouches[0].screenY
})

document.addEventListener("touchmove", (event) => {

    models[currentViewer].rotation.y += (event.changedTouches[0].screenX - previousTouchX) * sensetivity
    models[currentViewer].rotation.x += (event.changedTouches[0].screenY - previousTouchY)* sensetivity

    previousTouchX = event.changedTouches[0].screenX
    previousTouchY = event.changedTouches[0].screenY
})

//change the texture
document.addEventListener("change", () => {
    let reader = new FileReader()
    reader.readAsDataURL(document.querySelector("input").files[0])
    console.log("duh")
    reader.onload = (e) => {
        let textureLoader = new THREE.TextureLoader()
        let texture = textureLoader.load(e.target.result)
        texture.flipY = false
        models[currentViewer].material.map = texture
    }
})


function updateEverything() {
    for (let i of identifiers) {
        let currentIcon = document.querySelector(`#icon${i}`)
        for (let style of ["moved_up", "moved_down", "disclosed_up", "disclosed_down"]) {
            currentIcon.classList.remove(style)
        }
        if (Math.abs(currentViewer - i) > 1) {
            currentIcon.classList.add(currentViewer - i > 0 ? "disclosed_up" : "disclosed_down")
        } else if (Math.abs(currentViewer - i) == 1) {
            currentIcon.classList.add(currentViewer - i > 0 ? "moved_up" : "moved_down")
        }
    }
    document.querySelector(".viewers").style.transform = `translateX(calc(${document.querySelector(".viewer").clientWidth}px * -${currentViewer}))`
    document.querySelector("form").reset()
}

document.addEventListener("wheel", event => {
    cameras[currentViewer].position.z += event.deltaY * 5 * sensetivity
})
