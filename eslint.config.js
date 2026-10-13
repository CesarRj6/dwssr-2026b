import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  //1)ignora los build del front 
  {
    ignores: ["dist/**", //ignora carpeta de dist
        "node_modules/**"],
  },
//2) Configuracion del Back-end

  { files: ["server/**/*.{js,mjs}"], plugins: { js }, extends: ["js/recommended"], 
  languageOptions: { 
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
        ...globals.node} 
   } 
  },
//2.1) Configuracion de Vite

  { files: ["vite.config.js"],
     plugins: { js },
      extends: ["js/recommended"], 
  languageOptions: { 
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
        ...globals.node} 
   } 
  },

//3) Configuracion del front-end
  { files: ["src/**/*.{js,mjs}"], plugins: { js }, extends: ["js/recommended"], 
  languageOptions: { 
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
        ...globals.browser} 
   } 
  },
//4)  opcional si hay js en public
  { files: ["public/**/*.{js,mjs}"], plugins: { js }, extends: ["js/recommended"], 
  languageOptions: { 
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
        ...globals.browser} 
   } 
  },
]);