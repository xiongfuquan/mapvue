import esriLoader from 'esri-loader';
import { arcgisJsApi } from '../config';

function configEsriLoader() {
  esriLoader.utils.Promise = Promise;
}

export default function preload() {
  return esriLoader.loadScript({
    url: arcgisJsApi,
  });
}

export function load(modules) {
  configEsriLoader();
  return esriLoader.loadModules(modules, {
    url: arcgisJsApi,
  });
}
