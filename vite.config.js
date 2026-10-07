//importando el condigurador de vite
import {defineConfig} from "vite"
//importando el administrador de rutas de node
import {resolve} from "node:path"

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export default defineConfig({
    //directorio raiz de los archivos fuente del front-end
    root: "src",
    //configurando un servidor de desarrollo
    server: {
        //pueto de listening
        port: 5173,
        //Rigidez del puerto
        strict: true
    },
    //configurando el build
    build: {
        //Directorio de salida del js para produccion
        outDir: "../dist",
        //asegurando limpieza del folder de produccion
        emptyOutDir: true,
        //generar manifiesto para el servidor
        manifest: true,
        //opciones de empaquetado
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/main.js"),
            }
        }
    },
    //configuracion para el desarrollo 
    publicDir: false
})