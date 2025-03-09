import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./tests_setup/setupTests.ts",

        coverage: {
            include: ["src/Components/sliderfy/*.tsx"],
            reporter: "text",
        },
    },
});
