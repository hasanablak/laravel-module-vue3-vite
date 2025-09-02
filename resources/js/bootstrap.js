import axios from 'axios';
import {createApp, defineAsyncComponent} from 'vue'
import SayHello from './components/SayHello.vue';
import { ZiggyVue } from 'ziggy-js';
import { Ziggy } from './ziggy.js';
import { createPinia } from 'pinia'
import initStore from './mixin/init-store.js';
import { Confirm, Toast, Swal } from './lib/sweetalert/index.js';
import { LaravelValidationMessageSolver } from './lib/laravel-validation-solver.js'
import BlockUI from './lib/block-ui.js';
// import loadLocaleMessages from './lib/loadLocaleMessages.js';

const Modal = window.Modal = defineAsyncComponent(() => import('./components/Modal.vue'))


window.SayHello = SayHello;


axios.interceptors.response
	.use(function (response) {
	return response;
}, function (error) {
	const error_ = window.app.config.globalProperties.$validationSolver(error);

	if (error.response.status == 422) {
		window.app.config.globalProperties.$swal()
			.fire({
				title: 'Validierungsfehler',
				text: 'Plaese pay attantion',
				html: error_.html,
				icon: "warning"
		})
	} else {
		window.app.config.globalProperties.$swal()
			.fire({
				title: 'Error',
				text: 'Please contact with manager',
				icon: "error"
		})
	}
	
	return Promise.reject(error);
});
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.app = createApp({
	mixins: [
		...vueMixinFunctions?.map(mix => mix()),
		typeof vueMixinFunction == 'undefined' ? '' : vueMixinFunction(),
	],
	components: {
		Modal
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
window.app.mixin(initStore);


window.app.directive('inline', el => {
	if (!el) {
		return
	}

	// copy attributes to first child
	const content = el.tagName === 'TEMPLATE' ? el.content : el
	if (content.children.length === 1) {
		;[...el.attributes].forEach((attr) => content.firstChild.setAttribute(attr.name, attr.value))
	}

	// replace element with content
	if (el.tagName === 'TEMPLATE') {
		el.replaceWith(el.content)
	} else {
		el.replaceWith(...el.children)
	}
});

window.app.config.globalProperties.$block = new BlockUI();

window.app.config.globalProperties.$toast = Toast;		// this.$toast().fire("test"); window.$toast().fire("test");
window.app.config.globalProperties.$swal = Swal;		// this.$swal().fire("test"); window.$swal().fire("test");
window.app.config.globalProperties.$confirm = Confirm; // this.$confirm(); window.$confirm();
window.app.config.globalProperties.$validationSolver = LaravelValidationMessageSolver; // this.$validationSolver(error); window.app.$validationSolver(error);
