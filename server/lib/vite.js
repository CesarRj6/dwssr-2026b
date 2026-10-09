// biblioteca file stream
import fs from 'node:fs'
// biblioteca de rutas
import path, { dirname } from 'node:path'
import { isAbsolute } from 'node:path/posix'
// import crear dirname
import { fileURLToPath } from 'node:url'
 
// creando las variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
 
/**
 * helper para handlebars que genera las etiquetas de vite
 * EN DESARROLLO: conecta al servidor de desarrollo de vite
 * EN PRODUCCION: usa los compilados de vite
*/
export function viteAssets(){
    // obteniendo el entorno de ejecucion
    const isDev = process.env.NODE_ENV !== 'production'
    // rescatando la URL del servidor de desarrollo de vite
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173'
 
    // si estamos en desarrollo
    if(isDev){
        // en desarrollo cargamos los archivos del front-end directamente desde
        // el servidor de desarrollo de vite
        return `<script type="module" src="${viteDevServer}/@vite/client"></script>
                <script type="module" src="${viteDevServer}/main.js"></script>
        `
    }
    // EN PRODUCCION: leemos el manifest y generamos las etiquetas para los archivos finales
    // leemos el manifest generado por vite
    const manifestPath = path.join(__dirname, '..','..', 'dist','.vite','manifest.json')
    // si no existe el manifest, lanzamos un aviso
    if(!fs.existsSync(manifestPath)){
        console.warn("Vite manifest not found. Run 'npm run build' to generate it.")
        return ''
    }
    // leemos el manifest y parseamos a json el archivo de manifiesto que genera vite en la compilacion
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    // obteniendo la ruta del punto de entrada del front-end
    const mainEntry = manifest['main.js']
    // guarda del main.js
    if(!mainEntry){
        console.warn("Archivo main.js no esta disponible en el manifest de vite.")
        return ''
    }
    let tags = ''
    // css files
    if(mainEntry.css){
        mainEntry.css.forEach(cssFile => {
            tags += `<link rel="stylesheet" href="/${cssFile}">`
        });
    }
    // JS Files
    tags += `<script type="module" src="/${mainEntry.file}" defer></script>`;
   
    return tags;
}
 
/**
 * funcion registradora del helper de handlebars
*/
export function registerViteHelpers(hbs){
    hbs.registerHelper('viteAssets', () => {
        // sanitizando la salida del helper
        return new hbs.SafeString(viteAssets())
    })
}
 
// Exportación alterna por compatibilidad
export const registerViteHelper = registerViteHelpers;