import { createContext } from 'react';
import PocketBase from 'pocketbase';

const url = 'https://billy-blog.pockethost.io/';
const pb = new PocketBase(url);

const PocketBaseProvider = createContext<any>(null);

export default PocketBaseProvider;
