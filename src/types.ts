import {AnimationClip} from 'three';
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';

export type Model = {
  url: string;
  gltf?: GLTF;
  animations?: Animations;
};

export type Animations = {[key: string]: AnimationClip};

export type Models = {[key: string]: Model};
