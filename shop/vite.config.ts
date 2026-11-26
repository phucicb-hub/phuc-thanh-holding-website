import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({root:import.meta.dirname,plugins:[react()],build:{outDir:'../deployment/shop-studio/html',emptyOutDir:true},server:{host:'127.0.0.1',port:3010,strictPort:true,watch:{usePolling:true,ignored:['**/qa/**','**/test-fixtures/**','**/.preview-db/**','**/server/**','**/extension/**']},proxy:{'/api':'http://127.0.0.1:8090'}}});
