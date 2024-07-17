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


		<script>
			const vueMixinFunctions = [];
		</script>
		@stack('footer')
		@vite(['resources/css/app.css', 'resources/js/app.js'])

</body>
</html>