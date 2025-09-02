import axios from 'axios';
import {createApp, defineAsyncComponent} from 'vue'
import SayHello from './components/SayHello.vue';
import { ZiggyVue } from 'ziggy-js';
import { Ziggy } from './ziggy.js';
import { createPinia } from 'pinia'
import initStore from './mixin/init-store.js';
window.SayHello = SayHello;


window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.app = createApp({
	mixins: [
		initStore,
		...vueMixinFunctions?.map(mix => mix()),
		typeof vueMixinFunction == 'undefined' ? '' : vueMixinFunction(),
	],
	components: {
	},
	data() {
		return {
		};
	},
	methods: {
	},
	mounted: function () {
	},
	watch: {
	}
});

window.app.use(createPinia())
window.app.use(ZiggyVue, Ziggy);
