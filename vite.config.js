import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import glob from "glob";
import copy from "rollup-plugin-copy";
import path from "path";
import autoprefixer from "autoprefixer";
import postcssRTLCSS from "postcss-rtlcss";
import {exec} from 'child_process'

const TASKMANAGER_VERSION = "4.1.3";
const ASSET_PATHS = [
    "Modules/*/resources/assets/css/app.css",
    "Modules/*/resources/assets/js/app.js",
];

export default defineConfig(({ command, mode }) => {
	return {
		base: "",
		plugins: [
			laravel({
				input: [
					'resources/css/app.css',
					'resources/js/app.js',
                    ...glob.sync(`{${ASSET_PATHS.join(",")}}`),
				],
				refresh: true,
			}),
			vue(), // Vue pluginini buraya ekleyin
			{
				name: 'my-custom-plugin',
				handleHotUpdate({ file, server }) {
					if (file.includes('/routes/')) {
						const command = () => exec(
							`php artisan ziggy:generate`,
							(error, stdout, stderr) => console.log(stdout)
						);

						command();
					}
					// Dosya değişikliği sonrası çalışacak kod
					if (file.endsWith('.js') || file.endsWith('.vue')) {
						myFunctionAfterHMR();
					}
				},
			},
		],
		resolve: {
            alias: {
                vue: path.resolve(
                    __dirname,
					"./node_modules/vue/dist/vue.esm-bundler.js"
                ),
                "@admin": path.resolve(
                    __dirname,
                    "./modules/Admin/Resources/assets"
				),
                "@modules": path.resolve(__dirname, "./Modules"),
            },
		},
        build: {
            sourcemap: mode === "development",
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            return id
                                .toString()
                                .split("node_modules/")[1]
                                .split("/")[0]
                                .toString();
                        }
                    },
                    entryFileNames: `assets/[name]-[hash]-v${TASKMANAGER_VERSION}.js`,
                    chunkFileNames: `assets/[name]-[hash]-v${TASKMANAGER_VERSION}.js`,
                    assetFileNames: function () {
                        return `assets/[name]-[hash]-v${TASKMANAGER_VERSION}.[ext]`;
                    },
                },
            },
        },
	};
   
});

function myFunctionAfterHMR() {
  console.log('Vite HMR sonrası bu fonksiyon çalıştırıldı!');
  // Burada çalıştırmak istediğiniz diğer işlemler
}
