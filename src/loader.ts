import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

import store from './store';

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
const loadGltf = (url: string): Promise<GLTF> => {
  return new Promise<GLTF>(resolve => {
    gltfLoader.load(url, async gltf => {
      resolve(gltf);
    });
  });
};

export const load = async (): Promise<GLTF[]> => {
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
