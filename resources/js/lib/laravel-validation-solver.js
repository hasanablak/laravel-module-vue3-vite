const LaravelValidationMessageSolver = function (err) {
	document.querySelectorAll(`[data-error-name]`).forEach(e => e.innerHTML = "")
	if (err?.response?.status  && err.response.status == 422) { // validator hatası
		let errorData = err.response.data.errors
		let errorText = "";
		let errorHtml = "";
		let flatErrorArray = [];
		Object.keys(errorData).forEach((key, index) => {
			errorData[key].forEach((value, index_) => {
				errorText += value + '<br>'
				flatErrorArray.push(value);
				errorHtml += `<li>${value}</li>`

				if (document.querySelector(`[data-error-name="${key}"]`)) {
					document.querySelector(`[data-error-name="${key}"]`).innerHTML = value + '<br>' + document.querySelector(`[data-error-name="${key}"]`).innerHTML


					if (document.querySelector(`[data-error-name="${key}"]`).classList.contains("red-dot")) {
						setTimeout(function () {
							document.querySelector(`[data-error-name="${key}"]`).classList.remove("red-dot");
						}, 1800)
					}
				}

			});


		});

		errorHtml = `<ul>${errorHtml}</ul>`;



		return {
			flatErrorArray: flatErrorArray,
			text: errorText,
			html: errorHtml
		};

	} else {

		// window.app.config.globalProperties.$alert.fire({
		// 	title: 'Error',
		// 	message: 'Please contact with manager',
		// 	bag: "",
		// 	status: "error",
		// 	autoHide: false
		// })

		let flatErrorArray = []
		let errorData = "";
		return {flatErrorArray: flatErrorArray, html: errorData};

	}

}

export {
	LaravelValidationMessageSolver
}