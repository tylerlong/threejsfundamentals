import {
  AnimationMixer,
  Color,
  DirectionalLight,
  Object3D,
  PerspectiveCamera,
  Renderer,
  Scene,
  WebGLRenderer,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {SkeletonUtils} from 'three/examples/jsm/utils/SkeletonUtils';

import {Model} from './types';
import {load} from './loader';

const main = async () => {
  const models = await load();

  const canvas = document.querySelector('#c') as HTMLCanvasElement;
  const renderer = new WebGLRenderer({canvas});

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 20, 40);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new Scene();
  scene.background = new Color('white');

  function addLight(x: number, y: number, z: number) {
    const color = 0xffffff;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(x, y, z);
    scene.add(light);
    scene.add(light.target);
  }
  addLight(5, 5, 2);
  addLight(-5, 5, 5);

  // prepare animations
  Object.values(models).forEach(model => {
    model.animations = {};
    model.gltf!.animations.forEach(clip => {
      model.animations![clip.name] = clip;
    });
  });

  // play animations
  const mixers: AnimationMixer[] = [];
  Object.values(models).forEach((model: Model, ndx) => {
    const clonedScene = SkeletonUtils.clone(model.gltf!.scene) as Object3D;
    const root = new Object3D();
    root.add(clonedScene);
    scene.add(root);
    root.position.x = (ndx - 3) * 3;

    const mixer = new AnimationMixer(clonedScene);
    const firstClip = Object.values(model.animations!)[0];
    const action = mixer.clipAction(firstClip);
    action.play();
    mixers.push(mixer);
  });

  function resizeRendererToDisplaySize(renderer: Renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  let then = 0;
  function render(now: number) {
    now *= 0.001; // convert to seconds
    const deltaTime = now - then;
    then = now;
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    for (const mixer of mixers) {
      mixer.update(deltaTime);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
};

export default main;
