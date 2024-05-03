import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite'
import path from 'path'
import svgLoader from 'vite-svg-loader';

const dirname = path.resolve()

export default defineConfig({
    root: 'sources',
    publicDir: '../public',
    build: 
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        target: 'esnext'
    
    },
    plugins: [glsl(), svgLoader()]
})