// Importando el configurador de Vite
import { defineConfig } from "vite"

// Importando el administrador de rutas de Node
import { resolve, dirname } from "node:path"
import { fileURLToPath } from 'node:url'

// Creando las variables de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  // Directorio raíz de los archivos fuente del front-end
  root: "src",

  // Configurando un servidor de desarrollo
  server: {
    port: 5173,
    strict: true
  },

  // Configurando el build
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/main.js"),
      }
    }
  },

  // Configuración para el desarrollo
  publicDir: false
})