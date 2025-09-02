import Swal from 'sweetalert2';

const  customClass = ({
    title: 'my-custom-title',
    content: 'my-custom-content',
    confirmButton: 'btn btn-outline-primary mr-2',
    denyButton: 'btn btn-outline-primary',
    cancelButton: 'btn btn-outline-danger'
})

const MySwalTest = async (params) => {
	return new Promise((resolve) => {
		// Dialog oluştur
		const dialogId = 'confirm-dialog-' + Date.now();

		// İkon belirleme
		let iconSvg = `
			<circle cx="12" cy="12" r="10"></circle>
			<path d="M9,9h6v6H9z"></path>
		`;
		let iconColor = 'text-gray-500';
		let iconBg = 'from-gray-100 to-gray-200';

		const icon = params.hasOwnProperty("icon") ? params.icon : "info";
		const confirmButtonText = params.hasOwnProperty("confirmButtonText") ? params.confirmButtonText : "Ja, ich bestätige";
		const cancelButtonText = params.hasOwnProperty("cancelButtonText") ? params.cancelButtonText : "Abbrechen";
		const title = params.hasOwnProperty("title") ? params.title : "Bist du sicher?";
		const html = params.hasOwnProperty("html") ? params.html : "Bitte bestätige deine Aktion.";
		const showCancelButton = params.hasOwnProperty("showCancelButton") ? params.showCancelButton : false;
		const showConfirmButton = params.hasOwnProperty("showConfirmButton") ? params.showConfirmButton : true;

		
		switch (icon) {
			case 'warning':
				iconSvg = `
					<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
					<path d="M12 9v4"/>
					<path d="m12 17 .01 0"/>
				`;
				iconColor = 'text-orange-600';
				iconBg = 'from-orange-100 to-orange-200';
				break;
			case 'error':
				iconSvg = `
					<circle cx="12" cy="12" r="10"/>
					<path d="m15 9-6 6"/>
					<path d="m9 9 6 6"/>
				`;
				iconColor = 'text-red-600';
				iconBg = 'from-red-100 to-red-200';
				break;
			case 'success':
				iconSvg = `
					<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
					<polyline points="22,4 12,14.01 9,11.01"/>
				`;
				iconColor = 'text-green-600';
				iconBg = 'from-green-100 to-green-200';
				break;
			case 'question':
				iconSvg = `
					<circle cx="12" cy="12" r="10"/>
					<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
					<path d="M12 17h.01"/>
				`;
				iconColor = 'text-blue-600';
				iconBg = 'from-blue-100 to-blue-200';
				break;
		}

		// Dialog HTML'i oluştur
		const dialogHtml = `
			<div id="${dialogId}" class="fixed inset-0 z-999 flex items-center justify-center dialog-backdrop" style="background-color: rgba(0, 0, 0, 0.5);">
				<div class="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 max-w-md w-full mx-4 text-center relative overflow-hidden dialog-content">
					<!-- Subtle background pattern -->
					<div class="absolute inset-0 bg-[radial-gradient(#DFE1E6_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
					
					<div class="relative z-10">
						<!-- Icon -->
						<div class="flex justify-center mb-8">
							<div class="w-20 h-20 bg-gradient-to-br ${iconBg} rounded-full flex items-center justify-center relative">
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${iconColor}">
									${iconSvg}
								</svg>
							</div>
						</div>
						
						<!-- Title -->
						<h2 class="text-3xl font-bold text-dark mb-4">
							${title}
						</h2>
						
						<!-- Subtitle -->
						<div class="text-gray-500 text-lg mb-12">
							${html}
						</div>
						
						<!-- Buttons -->
						<div class="flex flex-col sm:flex-row gap-4">
							<!-- Cancel Button -->
							${showCancelButton ? `
								<button id="${dialogId}-cancel" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
									${cancelButtonText}
								</button>
							`: ''}
							<!-- Confirm Button -->
							${showConfirmButton ? `
								<button id="${dialogId}-confirm" class="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
									${confirmButtonText}
								</button>
							`: ''}
						</div>
						
						<!-- Contact -->
						<div class="mt-8 pt-6 border-t border-gray-100">
							<p class="text-gray-400 text-sm">
								Haben Sie Fragen? 
								<a href="mailto:contact@movandu.de" class="text-primary hover:text-primary-dark transition-colors">
									contact@movandu.de
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		`;

		// Dialog'u DOM'a ekle
		document.body.insertAdjacentHTML('beforeend', dialogHtml);

		const dialogElement = document.getElementById(dialogId);
		const confirmButton = document.getElementById(dialogId + '-confirm');
		const cancelButton = document.getElementById(dialogId + '-cancel');

		// Dialog'u kapat ve sonucu döndür
		function closeDialog(result) {
			const backdrop = dialogElement;
			const content = dialogElement.querySelector('.dialog-content');

			// Animasyon ekle
			backdrop.classList.add('closing');
			content.classList.add('closing');

			// Animasyon tamamlandıktan sonra elementi kaldır
			setTimeout(() => {
				if (backdrop && backdrop.parentNode) {
					backdrop.parentNode.removeChild(backdrop);
				}
				resolve(result);
			}, 300);
		}

		// Event listener'ları ekle
		confirmButton.addEventListener('click', () => closeDialog(true));
		cancelButton.addEventListener('click', () => closeDialog(false));

		// Backdrop'a tıklayınca iptal
		dialogElement.addEventListener('click', (e) => {
			if (e.target === dialogElement) {
				closeDialog(false);
			}
		});

		// ESC tuşu ile iptal
		const escapeHandler = (e) => {
			if (e.key === 'Escape') {
				document.removeEventListener('keydown', escapeHandler);
				closeDialog(false);
			}
		};
		document.addEventListener('keydown', escapeHandler);

		// Focus'u confirm butonuna ver
		setTimeout(() => {
			confirmButton.focus();
		}, 100);
	});
}

const Confirm = async function (params = {}) {
	return await MySwalTest({...params, showCancelButton: true, showConfirmButton: true });
};


  

const Confirm2 = async function (params = {}) {
	const result = await Swal
		.fire({
			title:  params.hasOwnProperty('title') ? params.title : 'Bist du sicher?',
			html: params.hasOwnProperty('html') ? params.html : 'Bestätigen Sie Ihre Aktion?',
			icon: params.hasOwnProperty("icon") ? params.icon : "info",
			showCancelButton: true,
			// confirmButtonColor: '#066ba0',
			// cancelButtonColor: '#6c77a1',
			buttonsStyling: false,
			confirmButtonText: params.hasOwnProperty('confirmButton') ? params.confirmButton : 'Ja, ich bestätige',
			cancelButtonText: 'Kein Stornieren',
			animation: false,
			footer: '<a href="https://movandu.gmbh/kontakt"> Haben Sie irgendwelche Probleme? contact@movandu.de </a>',
			customClass: customClass,
		})
	return result.isConfirmed
}


const Toast = function () {
	return Swal.mixin({
		toast: true,
		position: "bottom-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = window.Swal.stopTimer;
			toast.onmouseleave = window.Swal.resumeTimer;
		}
	});
}

const Swal_ = function (title, text, icon, confirmButtonText, cancelButtonText) {
	// if (typeof title === 'object') {
	// 	return {
	// 		fire: Confirm(title)
	// 	};
	// } else {
	// 	return {
	// 		fire: Confirm({
	// 			title: title || 'Ok',
	// 			text: text || 'Ok',
	// 			icon: icon || 'info',
	// 			showCancelButton: false,
	// 			showConfirmButton: false,
	// 		})
	// 	};
	// }

	// return {
	// 	fire: Confirm
	// };

	// return Confirm();
	return Swal.mixin({
		showConfirmButton: true,
		animation: false,
		customClass: customClass

	});
}


export {
	Confirm,
	Toast,
	Swal_ as Swal
}