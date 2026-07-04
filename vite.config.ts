import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the built site works from a GitHub Pages subpath
  base: './',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
