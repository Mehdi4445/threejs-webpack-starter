import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/texture/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture
material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Light1

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light2

const pointLight2 = new THREE.PointLight(0xffffff, 0.1)
pointLight2.position.set(-4,-2.32,3)
pointLight2.intensity = 3.57
scene.add(pointLight2)

const Light2 = gui.addFolder('Light 2')

Light2.add(pointLight2.position, 'y').max(3).min(-5).step(0.01)
Light2.add(pointLight2.position, 'x').max(6).min(-6).step(0.01)
Light2.add(pointLight2.position, 'z').max(3).min(-5).step(0.01)
Light2.add(pointLight2, 'intensity').max(10).min(0).step(0.01)

const pointLH = new THREE.PointLightHelper(pointLight2, 1)
scene.add(pointLH)

// Light3 

const pointLight3 = new THREE.PointLight(0xffffff, 2)
pointLight3.position.set(2.52,3,0.06)
pointLight3.intensity = 6.66
scene.add(pointLight3)

const Light3 = gui.addFolder('Light 3')

Light3.add(pointLight3.position, 'y').max(3).min(-5).step(0.01)
Light3.add(pointLight3.position, 'x').max(6).min(-6).step(0.01)
Light3.add(pointLight3.position, 'z').max(3).min(-5).step(0.01)
Light3.add(pointLight3, 'intensity').max(10).min(0).step(0.01)

const light3C = {
    color: 0xff0000
}

Light3.addColor(light3C, 'color').onChange(() => {
    pointLight3.color.set(light3C.color)
})

/*const pointLH2 = new THREE.PointLightHelper(pointLight3, 1)
scene.add(pointLH2)*/


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

    document.addEventListener('mousemove', onDocumentMouseMove)

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerHeight / 2;
    const windowHalfY = window.innerWidth / 2;

    function onDocumentMouseMove(event)  {
        mouseX = (event.clientX - windowHalfX)
        mouseY = (event.clientY - windowHalfY)
    }

    const updateSphere = (event) => {
        sphere.position.y = window.scrollY * .001
    }

    window.addEventListener('scroll', updateSphere)


    

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX -  sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY -  sphere.rotation.x)
    sphere.position.z += -.03 * (targetY -  sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()