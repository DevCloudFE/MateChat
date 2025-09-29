import path from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginVue } from '@rsbuild/plugin-vue';
import MpPlugin from 'mp-webpack-plugin';
import autoImport from 'unplugin-auto-import/rspack';
import type { Compiler } from 'webpack';
import miniprogramConfig from './miniprogram.config';

class WebpackCompatibilityPlugin {
	apply(compiler: Compiler) {
		compiler.hooks.compilation.tap(
			'WebpackCompatibilityPlugin',
			// biome-ignore lint/suspicious/noExplicitAny: webpack compatibility
			(compilation: any) => {
				if (!compilation.hooks.optimizeChunkAssets) {
					const AsyncSeriesHook =
						require('@rspack/lite-tapable').AsyncSeriesHook;
					compilation.hooks.optimizeChunkAssets = new AsyncSeriesHook([
						'chunks',
						'callback',
					]);
					compilation.hooks.optimizeChunkAssets.tapAsync =
						compilation.hooks.optimizeChunkAssets.tapPromise;
				}

				if (!compilation.hooks.afterOptimizeChunkAssets) {
					const SyncHook = require('@rspack/lite-tapable').SyncHook;
					compilation.hooks.afterOptimizeChunkAssets = new SyncHook(['chunks']);
				}
			},
		);
	}
}

export default defineConfig({
	plugins: [pluginVue(), pluginSass(), pluginNodePolyfill()],
	resolve: {
		alias: {
			'@view': path.resolve(__dirname, '../src/view'),
			'@': path.resolve(__dirname, '../src'),
		},
	},
	output: {
		distPath: {
			root: path.resolve(__dirname, '../dist/mp/common'),
		},
		filename: { js: '[name].js' },
		target: 'web',
		minify: {
			cssOptions: {
				minimizerOptions: {
					exclude: {
						selectors: true,
					},
				},
			},
		},
	},
	tools: {
		rspack(config) {
			config.output = {
				...config.output,
				library: 'createApp',
				libraryExport: 'default',
				libraryTarget: 'window',
			};
			config.module = {
				...config.module,
				rules: [
					...(config.module?.rules || []),
					{
						test: /\.md$/,
						type: 'asset/source',
					},
				],
			};
			config.optimization = {
				runtimeChunk: false,
				splitChunks: {
					chunks: 'all',
					minSize: 1000,
					maxSize: 0,
					minChunks: 1,
					maxAsyncRequests: 100,
					maxInitialRequests: 100,
					automaticNameDelimiter: '~',
					cacheGroups: {
						vendors: {
							test: /[\\/]node_modules[\\/]/,
							priority: -10,
						},
						default: {
							minChunks: 2,
							priority: -20,
							reuseExistingChunk: true,
						},
					},
				},
			};
			config.plugins.push(new WebpackCompatibilityPlugin());
			config.plugins.push(new MpPlugin(miniprogramConfig));
			config.plugins.push(
				autoImport({
					include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
					imports: ['vue'],
					dirs: ['./src'],
				}),
			);
		},
	},
});
