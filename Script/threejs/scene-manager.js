// ======== THREE.JS ENV ========

const container = document.querySelector('.atomos');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement); 

// ======== ORBIT CONTROLS ========

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;  
controls.maxDistance = 12; 

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

function carregarAtomo(nomeAtomo) {
    if (oModeloAtual) {
        scene.remove(oModeloAtual);
        oModeloAtual = null;
    }

    const nomeLimpo = nomeAtomo.replace('atomo-', '').toLowerCase().trim();
    const modelPath = `Imagens/atomos/${nomeLimpo}.glb`;

    loader.load(modelPath, (gltf) => {
        oModeloAtual = gltf.scene;
        scene.add(oModeloAtual);
        
        mixer = new THREE.AnimationMixer(oModeloAtual);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });
        
        clock.getDelta(); 
        if (mixer) mixer.setTime(0);
        
    }, undefined, (error) => {
        console.error("Erro ao carregar o modelo:", error); 
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
        
        if (botao) {
            const nomeDoAtomo = botao.id;
            
            if (nomeDoAtomo) {
                carregarAtomo(nomeDoAtomo);
            }
        } else {
            if (container && container.id) {
                carregarAtomo(container.id);
            }
        }
    });

    modalElemento.addEventListener('shown.bs.modal', () => {
        isRendering = true;

        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        
        animate();
    });

    modalElemento.addEventListener('hidden.bs.modal', () => {
        isRendering = false;
        
        if (oModeloAtual) {
            scene.remove(oModeloAtual);
            oModeloAtual = null;
        }
    });
}

// ======== RESIZE EVENT ========

window.addEventListener('resize', () => {
    if (isRendering) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
});