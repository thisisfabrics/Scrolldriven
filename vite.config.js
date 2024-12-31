import { defineConfig } from "vite"

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: "./index.html",
                attention: "./attention.html",
                applier: "./applier.html"
            }
        }
    }
})
