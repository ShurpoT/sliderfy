import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    publicDir: false,

    server: {
        port: 5173,
        open: true,
    },

    build: {
        sourcemap: true,
        minify: false,
        lib: {
            entry: "src/Components/sliderfy/sliderfy.tsx",
            name: "sliderfy",
            fileName: "sliderfy",
        },

        rollupOptions: {
            external: (id) => {
                return ["react", "react-dom", "react/jsx-runtime"].includes(id);
            },

            output: [
                {
                    format: "es",
                    dir: "sliderfy",
                    entryFileNames: "sliderfy.js",
                    globals: {
                        react: "React",
                        "react-dom": "ReactDOM",
                    },
                },
                {
                    format: "cjs",
                    dir: "sliderfy",
                    entryFileNames: "sliderfy.cjs.js",
                    globals: {
                        react: "React",
                        "react-dom": "ReactDOM",
                    },
                },
            ],
        },
    },
    plugins: [
        react(),

        dts({
            include: ["src/Components/sliderfy/**/*"],
            exclude: ["src/Components/sliderfy/**/*.test.tsx"],

            outDir: "sliderfy",
            staticImport: true,
            cleanVueFileName: true,
        }),
    ],
});
