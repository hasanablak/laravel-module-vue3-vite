<template>
	<div>
		Merhaba {{ name }}, ben {{module_name}} modülü içerisinden geliyorum!<br>
		Ben başka bir modülde dahili olarak gelmem, <br>
		sadece bu modül içerisinde ulaşılabilirim!
	</div>
</template>

<script>
export default {
	props: ["name"],
	data() {
		return {
			module_name: 'Auth'
		};
	}
}
</script>
