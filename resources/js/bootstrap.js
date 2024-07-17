import axios from 'axios';
import {createApp, defineAsyncComponent} from 'vue'
import SayHello from './components/SayHello.vue';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.SayHello = SayHello;



window.app = createApp({
	mixins: [
		...vueMixinFunctions?.map(mix => mix()),
		typeof vueMixinFunction == 'undefined' ? '' : vueMixinFunction(),
	],
	components: {
	},
	data() {
		return {
			appStore: {},
		};
	},
	methods: {
	},
	mounted: function () {

	},
	watch: {
	}
});

