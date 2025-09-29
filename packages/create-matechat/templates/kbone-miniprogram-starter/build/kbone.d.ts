declare module 'mp-webpack-plugin' {
	import type { Resolver } from 'webpack';

	class MpPlugin {
		constructor(options: typeof import('./miniprogram.config').default);
		apply: (this: Resolver, resolver: Resolver) => void;
	}

	export default MpPlugin;
}
