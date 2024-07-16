<template>
	<div>
		Merhaba {{ name }}, ben Ana Sistem içerisinden geliyorum!
	</div>
</template>

<script>
export default {
	props: ["name"],
	data() {
		return {
			name2: 'Hasan'
		};
	}
}
</script>
