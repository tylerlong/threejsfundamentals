import {AnimationClip} from 'three';
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';

export type Model = {
  url: string;
  gltf?: GLTF;
  animations?: Animations;
};

export type Animations = {[s: string]: AnimationClip};
