import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
//import * as dat from 'dat.gui'
import { TorusBufferGeometry } from 'https://unpkg.com/three@0.127.0/build/three.module.js'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('8.png')

// Scene
const scene = new THREE.Scene()

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader()
fontLoader.load(
    'helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
            'Alex Mosiakin\nDeveloper', {
                font: font,
                size: .5,
                height: .2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: .03,
                bevelSize: .02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        textGeometry.center()

        const textMaterial = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture,
        })
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
    }

)
const donuts = [];
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
const donutMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
})
for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial)
    donut.position.x = (Math.random() - 0.5) * 30
    donut.position.y = (Math.random() - 0.5) * 30
    donut.position.z = (Math.random() - 0.5) * 30

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    donut.scale.set(scale, scale, scale)

    scene.add(donut)
    donuts.push(donut);
}
const boxes = [];
const BoxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
const BoxMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture
})
for (let i = 0; i < 100; i++) {
    const box = new THREE.Mesh(BoxGeometry, BoxMaterial)
    box.position.x = (Math.random() - 0.5) * 30
    box.position.y = (Math.random() - 0.5) * 30
    box.position.z = (Math.random() - 0.5) * 30

    box.rotation.x = Math.random() * Math.PI
    box.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    box.scale.set(scale, scale, scale)

    scene.add(box)
    boxes.push(box);
}


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const pos = Math.random() * 0.001

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    //camera.position.x = Math.cos(elapsedTime)
    //camera.position.y = Math.sin(elapsedTime)

    donuts.forEach((donut) => {
        donut.rotation.x = donut.rotation.x + 0.02;
        donut.rotation.z = donut.rotation.z - 0.02;
        donut.rotation.y = donut.rotation.z + 0.02;
    });

    boxes.forEach((box) => {
        box.rotation.x = box.rotation.x + 0.02;
        box.rotation.z = box.rotation.z - 0.02;
        box.rotation.y = box.rotation.z + 0.02;
    });

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


