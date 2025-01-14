import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"

document.querySelector(".navigation-bar-support").animate(
    [
        { backgroundColor: "var(--bg)" },
        { backgroundColor: "var(--bc)" }
    ],
    {
        fill: "both",
        timeline: new ScrollTimeline(),
        rangeStart: `${window.innerHeight}px`,
        rangeEnd: `${2000 + window.innerHeight}px`
    }
)
document.querySelector(".navigation-bar-support").animate(
    [
        { zIndex: 0, offset: 0.9 },
        { zIndex: 100, offset: 1.0 },
    ],
    {
        fill: "both",
        timeline: new ScrollTimeline(),
        rangeStart: `${window.innerHeight}px`,
        rangeEnd: `${2000 + window.innerHeight}px`
    }
)

document.querySelector(".background-1").animate(
    [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(4)" }
    ],
    {
        fill: "both",
        timeline: new ViewTimeline({
            subject: document.querySelector(".background-1")
        }),
        rangeStart: `${window.innerHeight}px`,
        rangeEnd: `${window.innerHeight + 2000}px`
    }
)

document.querySelector("h1").animate(
    {
        opacity: [1, 0]
    },
    {
        fill: "both",
        timeline: new ViewTimeline({
            subject: document.querySelector("h1")
        }),
        rangeStart: `${window.innerHeight}px`,
        rangeEnd: `${window.innerHeight * 1.5}px`
    }
)

document.querySelector("h4").animate(
    {
        opacity: [0, 1]
    },
    {
        fill: "both",
        timeline: new ViewTimeline({
            subject: document.querySelector("h4")
        }),
        rangeStart: "0px",
        rangeEnd: `50%`
    }
)

document.querySelector("h5").animate(
    {
        opacity: [0, 1]
    },
    {
        fill: "both",
        timeline: new ViewTimeline({
            subject: document.querySelector("h5")
        }),
        rangeStart: "0px",
        rangeEnd: `50%`
    }
)

document.querySelector("h6").animate(
    {
        opacity: [0, 1]
    },
    {
        fill: "both",
        timeline: new ViewTimeline({
            subject: document.querySelector("h6")
        }),
        rangeStart: "0px",
        rangeEnd: `50%`
    }
)

for (let elem of document.querySelectorAll(".figure__stickers__item")) {
    elem.animate(
        [
            { opacity: 0, transform: "rotateZ(180deg) scale(0.2)", offset: 1.0 }
        ],
        {
            fill: "both",
            timeline: new ViewTimeline({
                subject: elem
            }),
            rangeStart: "0px",
            rangeEnd: "150%"
        }
    )
}

document.querySelector(".space-for-horizontal-scrolling").animate(
    [
        { opacity: 0, offset: 1.0 }
    ],
    {
        fill: "both",
        timeline: new ViewTimeline({
            subject: document.querySelector(".space-for-horizontal-scrolling")
        }),
        rangeStart: `${(window.getComputedStyle(document.body).getPropertyValue("--count-of-slides") * 2 - 1) * window.innerHeight + 0.25 * window.innerHeight}px`,
        rangeEnd: `${(window.getComputedStyle(document.body).getPropertyValue("--count-of-slides") * 2) * window.innerHeight + 0.25 * window.innerHeight}px`
    }
)

document.querySelector(".pipeline").animate(
    [
        { transform: "translateY(calc(calc((var(--count-of-slides) * 2 - 1) * 100dvh) * 0 / 100)) translateX(calc((var(--count-of-slides) - 5) * -100dvw))", offset: 0.0 },
        { transform: "translateY(calc(calc((var(--count-of-slides) * 2 - 1) * 100dvh) * 16 / 100)) translateX(calc((var(--count-of-slides) - 5) * -100dvw))", offset: 0.16 },
        { transform: "translateY(calc(calc((var(--count-of-slides) * 2 - 1) * 100dvh) * 20 / 100)) translateX(calc((var(--count-of-slides) - 4) * -100dvw))", offset: 0.2 },
        { transform: "translateY(calc(calc((var(--count-of-slides) * 2 - 1) * 100dvh) * 36 / 100)) translateX(calc((var(--count-of-slides) - 4) * -100dvw))", offset: 0.36 },
        { transform: "translateY(calc(calc((var(--count-of-slides) * 2 - 1) * 100dvh) * 40 / 100)) translateX(calc((var(--count-of-slides) - 3) * -100dvw))", offset: 0.4 },
        { transform: "translateY(calc(calc((var(--count-of-slides) * 2 - 1) * 100dvh) * 56 / 100)) translateX(calc((var(--count-of-slides) - 3) * -100dvw))", offset: 0.56 },
        { transform: "translateY(calc(calc((var(--count-of-slides) * 2 - 1) * 100dvh) * 60 / 100)) translateX(calc((var(--count-of-slides) - 2) * -100dvw))", offset: 0.6 },
        { transform: "translateY(calc(calc((var(--count-of-slides) * 2 - 1) * 100dvh) * 76 / 100)) translateX(calc((var(--count-of-slides) - 2) * -100dvw))", offset: 0.76 },
        { transform: "translateY(calc(calc((var(--count-of-slides) * 2 - 1) * 100dvh) * 80 / 100)) translateX(calc((var(--count-of-slides) - 1) * -100dvw))", offset: 0.8 },
        { transform: "translateY(calc(calc((var(--count-of-slides) * 2 - 1) * 100dvh) * 96 / 100)) translateX(calc((var(--count-of-slides) - 1) * -100dvw))", offset: 0.96 },
        { transform: "translateY(calc(calc((var(--count-of-slides) * 2 - 1) * 100dvh) * 100 / 100)) translateX(calc((var(--count-of-slides) - 1) * -100dvw))", offset: 1.0 }
    ],
    {
        fill: "both",
        timeline: new ScrollTimeline(),
        rangeStart: `${window.innerHeight + 2000}px`,
        rangeEnd: `${window.innerHeight + 2000 + (window.getComputedStyle(document.body).getPropertyValue("--count-of-slides") * 2 - 1) * window.innerHeight}px`
    }
)

for (let [i, elem] of document.querySelectorAll(".pipeline__fullscreen-slide").entries()) {
    elem.animate(
        [
            { opacity: 0, transform: "scale(3)", offset: 0.9999 },
            { opacity: 0, offset: 1.0 }
        ],
        {
            fill: "both",
            timeline: new ViewTimeline({
                subject: elem
            }),
            rangeStart: `${(window.getComputedStyle(document.body).getPropertyValue("--count-of-slides") * 2 - 1) * window.innerHeight * [
                0, 16, 20, 36, 40, 56, 60, 76, 80, 96, 150
            ][i * 2 + 1] / 100 + window.innerHeight}px`,
            rangeEnd: `${(window.getComputedStyle(document.body).getPropertyValue("--count-of-slides") * 2 - 1) * window.innerHeight * [
                0, 16, 20, 36, 40, 56, 60, 76, 80, 96, 150
            ][i * 2 + 2] / 100 + window.innerHeight}px`
        }
    )
}

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
Up({ target: window })

// to bottom
document.querySelector("#tobottom").addEventListener("click", () => {
    window.scrollTo({ "behavior": "smooth", "top": document.querySelector("#contacts").offsetTop })
    if (document.querySelector(".burger__line-1").classList.contains("burger__line-1_full"))
        burger()
})
