import {LoadingManager} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

import {Model, Models} from './types';
import store from './store';

export const load = () => {
  return new Promise<Models>(resolve => {
    const manager = new LoadingManager();
    manager.onLoad = () => {
      store.loadPercent = 100;
      resolve(models);
    };
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      store.loadPercent = (itemsLoaded / itemsTotal) * 100;
    };

    const models: {[key: string]: Model} = {
      pig: {
        url:
          'https://threejsfundamentals.org/threejs/resources/models/animals/Pig.gltf',
      },
      cow: {
        url:
          'https://threejsfundamentals.org/threejs/resources/models/animals/Cow.gltf',
      },
      llama: {
        url:
          'https://threejsfundamentals.org/threejs/resources/models/animals/Llama.gltf',
      },
      pug: {
        url:
          'https://threejsfundamentals.org/threejs/resources/models/animals/Pug.gltf',
      },
      sheep: {
        url:
          'https://threejsfundamentals.org/threejs/resources/models/animals/Sheep.gltf',
      },
      zebra: {
        url:
          'https://threejsfundamentals.org/threejs/resources/models/animals/Zebra.gltf',
      },
      horse: {
        url:
          'https://threejsfundamentals.org/threejs/resources/models/animals/Horse.gltf',
      },
      knight: {
        url:
          'https://threejsfundamentals.org/threejs/resources/models/knight/KnightCharacter.gltf',
      },
    };
    const gltfLoader = new GLTFLoader(manager);
    for (const model of Object.values(models)) {
      gltfLoader.load(model.url, gltf => {
        model.gltf = gltf;
      });
    }
  });
};
