<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>App Layout</title>

	@stack('header')
</head>
<body>
	<section id="app" style="border:2px dashed black;padding:10px; background:orange">
		<h1>ORANGE: BASE WRAPPER</h1>
		<div class="navbar" style="margin-bottom:30px">
			<ul style="list-style: none; padding: 0; margin: 0; display: flex;">
				<li style="margin-right: 20px;padding:10px;margin:2px;border:1px solid black">
					<a href="{{route('admin.dashboard')}}">
						Home
					</a>
				</li>
				@foreach(\Module::all() as $moduleName => $module)
					@if(\Route::has($module->getLowerName().'.index'))
						<li style="margin-right: 20px;padding:10px;margin:2px;border:1px solid black">
							<a href="{{route($module->getLowerName().'.index')}}">{{$moduleName}}</a>
						</li>
					@endif
				@endforeach
			</ul>
		</div>


		<div class="main" style="border:2px dashed white;padding:10px;background:#2778c4">
			<h1>BLUE: MAIN WRAPPER</h1>
			@yield('content')
		</div>

		<div class="footer" style="margin-top:20px;	border: 2px solid black">
			FOOTER (app.blade içerisinde)<br>
			Pinia'yı kullanabilirsin! appStore.env.MODULE_NAME: <b>@{{appStore.env?.MODULE_NAME}}</b>
		</div>
	</section>
		
		


		<script>
			const vueMixinFunctions = [
				() => ({
					 watch: {
						"appStore": function(){
							this.appStore.setAuth(@json(auth()->user()));
							this.appStore.setEnv({
								APP_NAME: '{{config('app.name')}}',
								APP_ENV: '{{env('APP_ENV')}}',
								MODULE_NAME: 'MAIN'
							})
						}
					}
				})
			];
		</script>
		@stack('footer')
		@vite(['resources/css/app.css', 'resources/js/app.js'])

</body>
</html>