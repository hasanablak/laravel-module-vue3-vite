import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import collectModuleAssetsPaths from './vite-module-loader.js';
import vue from "@vitejs/plugin-vue";

import path from "path";
async function getConfig() {
    const paths = [
        'resources/css/app.css',
        'resources/js/app.js',
    ];
    const allPaths = await collectModuleAssetsPaths(paths, 'Modules');
	console.log(allPaths);
   return  defineConfig(({ command, mode }) => {
		return {
			plugins: [
				laravel({
					input: allPaths,
					refresh: true,
				}),
				vue(),
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
			}
		}
    });
}

export default getConfig();