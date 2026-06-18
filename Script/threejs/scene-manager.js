// ======== THREE.JS ENV ========

const container = document.querySelector('.atomos');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.style.display = 'block';
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
container.appendChild(renderer.domElement); 

// ======== ORBIT CONTROLS ========

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;  
controls.maxDistance = 12; 
controls.enablePan = false;

// ======== LIGHT ========

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// ======== DINAMIC 3D MODELS LOADER  ========

const loader = new THREE.GLTFLoader();

let mixer;
let clock = new THREE.Clock();
let oModeloAtual = null;
let isRendering = false; 
let controleCarregamento = 0;

function carregarAtomo(nomeAtomo) {
    controleCarregamento++;
    const idAtual = controleCarregamento;

    for (let i = scene.children.length - 1; i >= 0; i--) {
        const obj = scene.children[i];
        if (obj.type !== 'AmbientLight' && obj.type !== 'DirectionalLight') {
            scene.remove(obj);
        }
    }
    oModeloAtual = null;

    const nomeLimpo = nomeAtomo.replace('atomo-', '').toLowerCase().trim();
    const modelPath = `Imagens/atomos/${nomeLimpo}.glb`;

    loader.load(modelPath, (gltf) => {
        if (idAtual !== controleCarregamento) return;

        oModeloAtual = gltf.scene;
        scene.add(oModeloAtual);
        
        mixer = new THREE.AnimationMixer(oModeloAtual);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });
        
        clock.getDelta(); 
        if (mixer) mixer.setTime(0);
        
    }, undefined, (error) => {
        console.error(error); 
    });
}

camera.position.set(3, 2.5, 4); 
controls.update();

// ======== ANIMATION LOOP ========

function animate() {
    if (!isRendering) return;
    
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    
    controls.update();
    renderer.render(scene, camera);
}

// ======== MODAL EVENTS ========

const modalElemento = document.getElementById('modalElemento');

if (modalElemento) {
    
    modalElemento.addEventListener('show.bs.modal', (event) => {
        const botao = event.relatedTarget;
        
        if (botao && botao.id) {
            carregarAtomo(botao.id);
        } else if (container && container.id) {
            carregarAtomo(container.id);
        }
    });

    modalElemento.addEventListener('shown.bs.modal', () => {
        isRendering = true;

        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        
        camera.position.set(3, 2.5, 4);
        controls.target.set(0, 0, 0);
        controls.update();

        animate();
    });

    modalElemento.addEventListener('hidden.bs.modal', () => {
        isRendering = false;
        controleCarregamento++;
        
        for (let i = scene.children.length - 1; i >= 0; i--) {
            const obj = scene.children[i];
            if (obj.type !== 'AmbientLight' && obj.type !== 'DirectionalLight') {
                scene.remove(obj);
            }
        }
        oModeloAtual = null;
    });
}

// ======== RESIZE EVENT ========

window.addEventListener('resize', () => {
    if (isRendering) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }
});