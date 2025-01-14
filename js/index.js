import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

let currentModelIdentifier = 1
let identifiers = [0, 1, 2, 3, 4]
const models = ["/models/TShirt.glb", "/models/Cap.glb", "/models/Pants.glb", "/models/SportPants.glb", "/models/Lantern.glb"]
const scenes = []
const cameras = []
const renderers = []
const loaders = []
const lights = []
for (let i of identifiers) {
    scenes.push(new THREE.Scene())
    cameras.push(new THREE.PerspectiveCamera(75, 1, 0.1, 1000))
    renderers.push(new THREE.WebGLRenderer({ antialias: true }))
    loaders.push(new GLTFLoader())
    lights.push(new THREE.HemisphereLight(0xffffff, 0x000000, 3))
}


for (let i of identifiers) {
    loaders[i].load(models[i], function (gltf) {
        scenes[i].add(gltf.scene)
        if (i != 4) {
            gltf.scene.traverse(o => {
                if (o.isMesh) {
                    o.material = new THREE.MeshStandardMaterial({})
                    models[i] = o
                }
            })
        } else {
            models[i] = gltf.scene
        }
    }, undefined, function (error) {
        console.error(error)
    })

    cameras[i].position.z = 100
    scenes[i].add(lights[i])
    renderers[i].setSize(2560, 2560)
    renderers[i].setClearColor(0x16161a, 0)
    renderers[i].setAnimationLoop(() => {
        renderers[i].render(scenes[i], cameras[i])
    })
    if (i == 4) {
        document.querySelector(".horizontal-text-block").appendChild(renderers[i].domElement)
        renderers[i].domElement.classList.add("single-3d")
        continue
    }
    document.querySelector(".slide__window").appendChild(renderers[i].domElement)
    renderers[i].domElement.classList.add("slide__window__model")
    renderers[i].domElement.setAttribute("id", `icon${i}`)
    renderers[i].domElement.addEventListener("click", () => {
        currentModelIdentifier = i
        updatePreviews()
    })
}
updatePreviews()


function updatePreviews() {
    for (let i of identifiers) {
        if (i == 4)
            break
        let currentIcon = document.querySelector(`#icon${i}`)
        for (let style of ["moved_up", "moved_down", "disclosed_up", "disclosed_down"]) {
            currentIcon.classList.remove(style)
        }
        let difference = currentModelIdentifier - i
        let absoluteDifference = Math.abs(difference)
        if (absoluteDifference > 1) {
            currentIcon.classList.add(difference > 0 ? "disclosed_up" : "disclosed_down")
        } else if (absoluteDifference == 1) {
            currentIcon.classList.add(difference > 0 ? "moved_up" : "moved_down")
        }
    }
    for (let elem of document.querySelectorAll(".button"))
        elem.parentElement.setAttribute("href", elem.parentElement.getAttribute("data-paths").split(",")[currentModelIdentifier])
}

// interactions
let previous_scroll_location = window.scrollY
document.addEventListener("scroll", (event) => {
    for (let i of identifiers) {
        try {
            models[i].rotation.y += (previous_scroll_location - window.scrollY > 0 ? 1 : -1) * 0.03
        } catch { }
    }
    previous_scroll_location = window.scrollY
})



// burger
document.querySelector(".burger").addEventListener("click", burger)
function burger() {
    document.querySelector(".burger__line-1").classList.toggle("burger__line-1_full")
    document.querySelector(".navigation-bar__menu").classList.toggle("top-100")
}


// Intersection observer
let intersectionObserver = new IntersectionObserver(events => {
    for (let event of events) {
        if (event.isIntersecting) {
            document.querySelector(".curve").classList.add("curve_animation")
        } else {
            // document.querySelector(".curve").classList.remove("curve_animation")
        }
    }
}, { root: null, rootMargin: "0px", threshold: 0 })
intersectionObserver.observe(document.querySelector(".curve"))

// css can't
window.addEventListener("resize", Up)
function Up(event) {
    if (event.target.innerHeight <= event.target.innerWidth)
        return
    for (let elem of document.querySelectorAll(".slide")) {
        try {
            if (elem.children[1].classList.contains("rounded-image-60")) {
                elem.children[1].setAttribute("style", `height: calc(100% - ${elem.children[0].offsetHeight}px);`)
            }
        } catch { }
    }
}
Up({target: window})

// to bottom
document.querySelector("#tobottom").addEventListener("click", () => {
    window.scrollTo({"behavior": "smooth", "top": document.querySelector("#contacts").offsetTop})
    if (document.querySelector(".burger__line-1").classList.contains("burger__line-1_full"))
        burger()
})
