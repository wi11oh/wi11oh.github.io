
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'


const scene = new THREE.Scene()
scene.background = new THREE.Color(0x191919)


const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.z = 0.001


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


const controls = new OrbitControls(camera, renderer.domElement)
controls.zoomSpeed = 0.5
controls.update()


const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)


const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
loader.setDRACOLoader(dracoLoader)


loader.load(
    "./jpt3.gltf",
    function (gltf) {
        // gltf.scene.position.y = -0.9
        gltf = gltf.scene
        gltf.scale.x = 50
        gltf.scale.y = 50
        gltf.scale.z = 50

        scene.add(gltf)
    },
    undefined,
    function (error) {
        console.error(error)
    }
)


window.addEventListener("click", (e) => {
    // const raycaster = new THREE.Raycaster()
    // const vector = new THREE.Vector2(
    //     (e.clientX / window.innerWidth) * 2 - 1,
    //     (e.clientY / window.innerHeight) * -2 + 1
    // )

    // raycaster.setFromCamera(vector, camera)

    // const intersects = raycaster.intersectObjects(scene.children)

    // if (intersects.length) {
    //     if (intersects[0].object.log) {
    //         window.clearTimeout(timer)
    //         timer = window.setTimeout(() => intersects[0].object.log(''), 100)
    //         intersects[0].object.log('click')
    //     }
    // }

    // camera.position.set(0,2000,0)
})


document.getElementById("up").onclick = function(){
    controls.target.set(10,1,-(200*50))
    camera.position.set(0,0,-(200*50))
}

document.getElementById("down").onclick = function(){
    controls.target.set(0,0,0)
    camera.position.set(0,0.0001,0)
}




function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    document.getElementById("r").innerHTML = `${camera.rotation.x.toFixed(2)}, ${camera.rotation.y.toFixed(2)}, ${camera.rotation.z.toFixed(2)}`
    camera.rotation.y -= 0.001
    controls.update()
}
animate()