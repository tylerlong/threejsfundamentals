import {AnimationMixer} from 'three';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

import store from './store';

export type MyGLTF = GLTF & {
  animationMixer: AnimationMixer;
};

const urls = [
  'https://threejsfundamentals.org/threejs/resources/models/animals/Pig.gltf',
  'https://threejsfundamentals.org/threejs/resources/models/animals/Cow.gltf',
  'https://threejsfundamentals.org/threejs/resources/models/animals/Llama.gltf',
  'https://threejsfundamentals.org/threejs/resources/models/animals/Pug.gltf',
  'https://threejsfundamentals.org/threejs/resources/models/animals/Sheep.gltf',
  'https://threejsfundamentals.org/threejs/resources/models/animals/Zebra.gltf',
  'https://threejsfundamentals.org/threejs/resources/models/animals/Horse.gltf',
  'https://threejsfundamentals.org/threejs/resources/models/knight/KnightCharacter.gltf',
];

const gltfLoader = new GLTFLoader();
const loadGltf = (url: string): Promise<MyGLTF> => {
  return new Promise<MyGLTF>(resolve => {
    gltfLoader.load(url, gltf => {
      const myGltf = {...gltf, animationMixer: new AnimationMixer(gltf.scene)};
      resolve(myGltf);
    });
  });
};

export const load = async (): Promise<MyGLTF[]> => {
  let finished = 0;
  return Promise.all(
    urls.map(url =>
      loadGltf(url).then(gltf => {
        store.loadPercent = (++finished / urls.length) * 100;
        return gltf;
      })
    )
  );
};
