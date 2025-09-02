import Warning from "./warning.vue"
import Error from "./error.vue"
import Info from "./info.vue"
import { createApp, h } from 'vue';

export default {
	install(app, options) {
		const target = options.target || 'body';

		app.config.globalProperties.$alert = {
			fire(data
				/*, specificTarget*/
			) {

			let div = document.createElement('div');
		
				document.querySelector(target).insertAdjacentElement('afterend', div);
				
				let instance;

				//instance ? instance.unmount() : "";


				// if (specificTarget) {
		
				// 	document.querySelector(specificTarget).insertAdjacentElement('afterend', div);
				// }

				if (data.status == 'warning') {
					instance = createApp(Warning, {
							title: data.title,
							message: data.message,
							bag: data?.bag,
							autoHide: data?.autoHide ?? true
					});
				} else if(data.status == 'error' || data.status == 'danger'){
					instance = createApp(Error, {
							title: data.title,
							message: data.message,
							bag: data?.bag,
							autoHide: data?.autoHide ?? true
					});
				} else if (data.status == 'success' || data.status == 'info') {
					instance = createApp(Info, {
							title: data.title,
							message: data.message,
							bag: data?.bag,
							autoHide: data?.autoHide ?? true
					});
				}

			
				
				instance.mount(div);
				
				return instance;
		},
	};
},
};