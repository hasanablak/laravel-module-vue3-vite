import { useAppStore } from '../stores/app.js';

export default {
	data() {
		return {
			appStore: {},
		};
	},
	mounted() {
		this.appStore = useAppStore();
	},
}