import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
export default ({ mode }: any) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		plugins: [sveltekit()],
		server: {
			proxy: {
				'/api': {
					target: process.env.VITE_API_URL,
					changeOrigin: true
				},
				'/usercontent': {
					target: process.env.VITE_API_URL,
					changeOrigin: true
				}
			}
		},
	});
};
