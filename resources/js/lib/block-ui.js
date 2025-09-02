export default class BlockUI {
	element = '';
	targetElement = '';
	defaultLoadingMessage = '';
	targetElementStyle = {}
	
	constructor(el = "") {
		this.getElement(el);

		this.defaultLoadingMessage = this.createLoadingIcon();

		HTMLElement.prototype.on = function (thing) {
			const blockUI = new BlockUI();
			blockUI.on(this)
		}

		HTMLElement.prototype.off = function(thing){
			
			const blockUI = new BlockUI();
			blockUI.off(this)
		}
	}

	getElement(el) {

		if (typeof el == 'string' && el.trim() != '') {
			this.targetElement = document.querySelector(el);
		}

		
		if (typeof el == 'object') {
			this.targetElement = el;
		}

	}

	createBackgroundElement() {
		let backgroundElement = document.createElement("div");

		backgroundElement.setAttribute('data-name', 'block-ui-background-element');
		backgroundElement.style.position = 'absolute';
		backgroundElement.style.background = 'rgb(221, 221, 221)';
		backgroundElement.style.display = 'flex';
		backgroundElement.style.alignItems = 'center';
		backgroundElement.style.justifyContent = 'center';
		backgroundElement.style.width = '100%';
		backgroundElement.style.height = '100%';
		backgroundElement.style.zIndex = '45';
		backgroundElement.style.opacity = '0.6';
		backgroundElement.style.order = 'none';
		backgroundElement.style.margin = '0px';
		backgroundElement.style.padding = '0px';
		backgroundElement.style.width = '100%';
		backgroundElement.style.height = '100%';
		backgroundElement.style.top = '0px';
		backgroundElement.style.left = '0px';
		backgroundElement.style.backgroundColor = 'rgb(255, 255, 255)';
		backgroundElement.style.opacity = '0.6';
		backgroundElement.style.cursor = 'wait';
		backgroundElement.style.position = 'absolute';

		return backgroundElement;
	}

	createMessageElement(message) {
		let messageElement = document.createElement("div");

		messageElement.setAttribute('data-name', 'block-ui-message-element');

		messageElement.style.position = 'absolute';
		messageElement.style.background = 'rgb(221, 221, 221)';
		messageElement.style.display = 'flex';
		messageElement.style.alignItems = 'center';
		messageElement.style.justifyContent = 'center';
		messageElement.style.width = '100%';
		messageElement.style.height = '100%';
		messageElement.style.zIndex = '999';
		messageElement.style.opacity = '0.6';
		messageElement.style.order = 'none';
		messageElement.style.margin = '0px';
		messageElement.style.padding = '0px';
		messageElement.style.width = '100%';
		messageElement.style.height = '100%';
		messageElement.style.top = '0px';
		messageElement.style.left = '0px';
		messageElement.style.backgroundColor = 'rgb(255, 255, 255)';
		messageElement.style.opacity = '0.6';
		messageElement.style.cursor = 'wait';
		messageElement.style.position = 'absolute';
		messageElement.appendChild(this.createLoadingIcon());

		return messageElement;
	}


	createLoadingIcon() {
		let loadingIcon = document.createElement('div');

		loadingIcon.style.animation = 'spin 1s infinite linear;'

		loadingIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g><circle cx="12" cy="3" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate0" attributeName="r" begin="0;svgSpinners12DotsScaleRotate2.end-0.5s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="16.5" cy="4.21" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate1" attributeName="r" begin="svgSpinners12DotsScaleRotate0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="7.5" cy="4.21" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate2" attributeName="r" begin="svgSpinners12DotsScaleRotate4.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="19.79" cy="7.5" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate3" attributeName="r" begin="svgSpinners12DotsScaleRotate1.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="4.21" cy="7.5" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate4" attributeName="r" begin="svgSpinners12DotsScaleRotate6.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="21" cy="12" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate5" attributeName="r" begin="svgSpinners12DotsScaleRotate3.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="3" cy="12" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate6" attributeName="r" begin="svgSpinners12DotsScaleRotate8.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="19.79" cy="16.5" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate7" attributeName="r" begin="svgSpinners12DotsScaleRotate5.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="4.21" cy="16.5" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate8" attributeName="r" begin="svgSpinners12DotsScaleRotatea.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="16.5" cy="19.79" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotate9" attributeName="r" begin="svgSpinners12DotsScaleRotate7.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="7.5" cy="19.79" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotatea" attributeName="r" begin="svgSpinners12DotsScaleRotateb.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><circle cx="12" cy="21" r="1" fill="currentColor"><animate id="svgSpinners12DotsScaleRotateb" attributeName="r" begin="svgSpinners12DotsScaleRotate9.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/></circle><animateTransform attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="360 12 12;0 12 12"/></g></svg>'
		return loadingIcon;
	}

	off(el, message = '') {
		message = message ? message : 'Loading';

		this.getElement(el);
		this.targetElementStyle = this.targetElement?.style ? this.targetElement.style : '';
		this.targetElement.style.position = 'relative';
		this.targetElement.prepend(this.createMessageElement());
		this.targetElement.prepend(this.createBackgroundElement());
	}

	on(el) {

		this.getElement(el)

		this.targetElement.style = this.targetElementStyle;
		this.targetElement.querySelector("[data-name='block-ui-message-element']")?.remove()
		this.targetElement.querySelector("[data-name='block-ui-background-element']")?.remove()


	}
}