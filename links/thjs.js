import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'


const scene = new THREE.Scene()


const width = document.querySelector(".avatar .mainarea").clientWidth
const height = document.querySelector(".avatar .mainarea").offsetHeight


const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
camera.position.z = 0.01

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.querySelector(".avatar .mainarea").appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.zoomSpeed = 0.001
controls.update()


const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)


const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
loader.setDRACOLoader(dracoLoader)
loader.load(
    "./assets/avatar.gltf",
    function (gltf) {
        scene.add(gltf.scene)
    },
    undefined,
    function (error) {
        console.error(error)
    }
)

camera.rotation.x = -0.5
function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()