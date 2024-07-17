
import { defineStore } from "pinia";

export const useAppStore = defineStore({
	id: 'app',
	state: () => ({
		auth: {},
		env: {}
	}),
	actions: {
		setAuth(auth) {
			this.auth = auth;
		},
		setEnv(env) {
			this.env = env;
		},
	},
	getters: {
		tekCift: (state) => {
			//return state.count % 2 == 0 ? 'Çift' : 'Tek'
		}
	}
});