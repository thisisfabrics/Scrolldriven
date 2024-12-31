import * as THREE from "three"
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js"

// setup 3D scene 1
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50)
const light = new THREE.HemisphereLight(0xffffff, 0x000000, 3)
const renderer = new THREE.WebGLRenderer({antialias: true})

document.querySelectorAll(".resources__item")[0].appendChild(renderer.domElement)
renderer.domElement.classList.add("canvas")

let model
const loader = new GLTFLoader()
loader.load("/models/TShirt.glb", function (gltf) {
    model = gltf.scene
	scene.add(gltf.scene)
}, undefined, function (error) {
	console.error(error)
})

// adjust scene
camera.position.z = 100
scene.add(light)
renderer.setClearColor(0x16161a, 1)
renderer.setSize(1500, 1500)

// start the render loop
renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
})



// setup 3D scene 2
const scene_2 = new THREE.Scene()
const camera_2 = new THREE.PerspectiveCamera(50)
const light_2 = new THREE.HemisphereLight(0xffffff, 0x000000, 3)
const renderer_2 = new THREE.WebGLRenderer({antialias: true})

// append the render window to the DOM
document.querySelectorAll(".resources__item")[1].appendChild(renderer_2.domElement)
renderer_2.domElement.classList.add("canvas")

// initialize the 3D model to be displayed
let model_2
const loader_2 = new GLTFLoader()
loader_2.load("/models/Cap.glb", function (gltf) {
    model_2 = gltf.scene
	scene_2.add(gltf.scene)
}, undefined, function (error) {
	console.error(error)
})

// adjust scene 2
camera_2.position.z = 100
scene_2.add(light_2)
renderer_2.setClearColor(0x16161a, 1)
renderer_2.setSize(1500, 1500)

// start the render loop
renderer_2.setAnimationLoop(() => {
    renderer_2.render(scene_2, camera_2)
})

// interactions
let previous_scroll_location = window.scrollY
document.addEventListener("scroll", (event) => {
    model_2.rotation.y += (previous_scroll_location - window.scrollY > 0 ? 1 : -1) * 0.03
    model.rotation.y += (previous_scroll_location - window.scrollY > 0 ? 1 : -1) * 0.03
    previous_scroll_location = window.scrollY
})






// setup 3D scene 3
const scene_3 = new THREE.Scene()
const camera_3 = new THREE.PerspectiveCamera(50)
const light_3 = new THREE.HemisphereLight(0xffffff, 0x000000, 3)
const renderer_3 = new THREE.WebGLRenderer({antialias: true})

// append the render window to the DOM
document.querySelectorAll(".horizontal-text-block")[0].appendChild(renderer_3.domElement)
renderer_3.domElement.classList.add("single-3d")

// initialize the 3D model to be displayed
let model_3
const loader_3 = new GLTFLoader()
loader_3.load("/models/Lantern.glb", function (gltf) {
    model_3 = gltf.scene
	scene_3.add(gltf.scene)
}, undefined, function (error) {
	console.error(error)
})

// adjust scene 2
camera_3.position.z = 100
scene_3.add(light_3)
renderer_3.setClearColor(0x16161a, 1)
renderer_3.setSize(1500, 1500)

// start the render loop
renderer_3.setAnimationLoop(() => {
    renderer_3.render(scene_3, camera_3)
})

// interactions
let previous_scroll_location_2 = window.scrollY
document.addEventListener("scroll", (event) => {
    model_3.rotation.y += (previous_scroll_location_2 - window.scrollY > 0 ? 1 : -1) * 0.03
    previous_scroll_location_2 = window.scrollY
})



// burger
document.querySelector(".burger").addEventListener("click", () => {
    document.querySelector(".navigation-bar__menu").classList.toggle("navigation-bar__menu_full")
    document.querySelector(".burger__line-1").classList.toggle("burger__line-1_full")
})


