import { atom } from "jotai";
import PocketBase from "pocketbase";

const url = 'https://billy-blog.pockethost.io/';
const pb = new PocketBase(url);

const PocketBaseAtom = atom(pb);

export default PocketBaseAtom;
