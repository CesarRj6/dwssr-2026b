//Biblioteca File Stream
import fs from 'node:fs'
//Biblioteca de rutas
import path from 'node:path'
import { abort } from 'node:process';
import { fileURLToPath } from 'node:url';
//Creando las variables de ruta
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
/**
 * Helper para handlebars que genera las etiquetas de Vite
 * EN DESARROLLO: Conecta al servidor de desarrollo Vite
 * EN PRODUCCION: Usa los compilados de Vite 
 */
export function viteAssets() {{
    //Obtener modo de ejecucucion
    const isdeDev = process.env.NODE_ENV !== 'production'
    //Rescatando la URL del servidor de desarrollo 
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173'

    //Si estamos en modo de desarollo
    if(isdeDev){
        //En desarrollo cargamos los archivos del frontend directamente del servidor de desarrollo de Vite
        return `
        <script type="module" src=${viteDevServer}/@vite/client></script>
        <script type="module" src=${viteDevServer}/main.js></script>
        `
    }
    //En produccion leemos el manifest
    //y generamos las etiquetas finales de produccion 
    const manifestPath = path.join(__dirname, '..','..','dist','.vite','manifest.json')
    
    //Si no existe el manifest
    if(!fs.existsSync(manifestPath)){
        Console.warn("Vite manifest not found. Run 'npm run build'")
        return ''
    }

    
