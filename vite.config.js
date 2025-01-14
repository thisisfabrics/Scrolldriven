import { defineConfig } from "vite"

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: "./index.html",
                applier: "./applier.html",
                gallery: "./gallery.html"
            }
        }
    }
})
