<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>

	@stack('header')
</head>
<body>
		<div id="app">
			@yield('content')
		</div>

		@stack('footer')

		@vite(\Nwidart\Modules\Module::getAssets())


		{{-- <script>
			const intervalId = setInterval(() => {
				if (window.app != 'undefined') {
					if(window.app.hasOwnProperty("mount")){
						window.app.mount("#app");
						clearInterval(intervalId);
						console.log("app çalıştırıldı!")
					}
				} else {
					console.log("window.app yok tekrar kontrol ediliyor")
				}
			}, 10);
		</script> --}}
</body>
</html>