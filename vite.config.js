import vue from "@vitejs/plugin-vue2";
import legacy from "@vitejs/plugin-legacy";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        vue(),
        legacy({
            targets: ["defaults", "IE 11"],
        }),
    ],
});
