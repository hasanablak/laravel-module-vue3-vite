<template>
	<div>
		Merhaba {{ name }}, ben Test modülü içerisinden geliyorum!
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
