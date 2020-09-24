import * as THREE from 'three';
import {GUI} from 'dat.gui';

const gui = new GUI();

class AxisGridHelper {
  gridHelper: THREE.GridHelper;
  axesHelper: THREE.AxesHelper;
  _visible = false;
  constructor(node: THREE.Object3D, units = 10) {
    const axesHelper = new THREE.AxesHelper();
    (axesHelper.material as THREE.Material).depthTest = false;
    axesHelper.renderOrder = 2; // after the grid
    node.add(axesHelper);

    const gridHelper = new THREE.GridHelper(units, units);
    (gridHelper.material as THREE.Material).depthTest = false;
    gridHelper.renderOrder = 1;
    node.add(gridHelper);

    this.gridHelper = gridHelper;
    this.axesHelper = axesHelper;
    this.visible = false;
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    this._visible = v;
    this.gridHelper.visible = v;
    this.axesHelper.visible = v;
  }
}

const main = () => {
  const canvas = document.querySelector('#c') as HTMLCanvasElement;
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 40;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 50, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
  }

  // an array of objects who's rotation to update
  const objects: THREE.Object3D[] = [];

  const radius = 1;
  const widthSegments = 6;
  const heightSegments = 6;
  const sphereGeometry = new THREE.SphereBufferGeometry(
    radius,
    widthSegments,
    heightSegments
  );

  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 10;
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);

  const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xffff00});
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(5, 5, 5);
  solarSystem.add(sunMesh);
  objects.push(sunMesh);

  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
  });
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);

  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 2;
  earthOrbit.add(moonOrbit);

  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  });
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.set(0.5, 0.5, 0.5);
  moonOrbit.add(moonMesh);
  objects.push(moonMesh);

  function makeAxisGrid(node: THREE.Object3D, label: string, units?: number) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
  }

  makeAxisGrid(solarSystem, 'solarSystem', 25);
  makeAxisGrid(sunMesh, 'sunMesh');
  makeAxisGrid(earthOrbit, 'earthOrbit');
  makeAxisGrid(earthMesh, 'earthMesh');
  makeAxisGrid(moonMesh, 'moonMesh');

  function resizeRendererToDisplaySize(renderer: THREE.Renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time: number) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach(obj => {
      obj.rotation.y = time;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
};

export default main;
