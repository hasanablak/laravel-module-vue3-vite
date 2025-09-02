export default {
	props: {
		title: {
			type: String,
			required: true
		},
		message: {
			type: String,
			required: true
		},
		bag: {
			type: Array || String,
			required: false
		},
		autoHide: {
			type: Boolean,
			default: true
		}
	},
	data: function () {
		return {
			show: true
		}
	},
	mounted: function () {
		const self = this;
		if (this.autoHide) {
			setTimeout(() => {
				self.show = false
			}, 1000);
		}
	}
}