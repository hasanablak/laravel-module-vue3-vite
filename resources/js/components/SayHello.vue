<template>
	<div>
		Merhaba {{ name }}, ben Ana Sistem içerisinden geliyorum!<br>
		Bana bütün modüller içerisinden erişebilirsin!
	</div>

	<div>
		Pinia'yı da kullanabilirim elbette! appStore.env.APP_NAME: {{ appStore.env?.APP_NAME }}
	</div>
</template>

<script>
import initStore from '../mixin/init-store'
export default {
	mixins: [initStore],
	props: ["name"],
	data() {
		return {
		};
	}
}
</script>
