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
<div id="app">

	<section style="border:2px dashed black;padding:10px; background:orange">
		<h1>ORANGE: BASE WRAPPER</h1>
		<div class="navbar" style="margin-bottom:30px">
			<ul style="list-style: none; padding: 0; margin: 0; display: flex;">

				<li class="mr-2 p-2 m-1 border border-black hover:bg-orange-300 rounded-md {{route('admin.dashboard') == request()->url() ? 'bg-white' : ''}}">
					<a href="{{route('admin.dashboard')}}">
						Home
					</a>
				</li>
				@foreach(\Module::all() as $moduleName => $module)
					@if(\Route::has($module->getLowerName().'.index'))
						<li class="mr-2 p-2 m-1 border border-black hover:bg-orange-300 rounded-md {{route($module->getLowerName().'.index') == request()->url() ? 'bg-white' : ''}}">
							<a href="{{route($module->getLowerName().'.index')}}">{{$moduleName}} Module</a>
						</li>
					@endif
				@endforeach
			</ul>
		</div>


		<div class="main" style="border:2px dashed white;padding:10px;background:#2778c4;color:white">
			<h1>BLUE: MAIN WRAPPER</h1>
			@yield('content')
		</div>

		<div class="bg-white mt-10 border rounded-md p-2">
			FOOTER (app.blade içerisinde)<br>
			Pinia'yı heryerde kullanabilirsin! appStore.env.MODULE_NAME: <b>@{{appStore.env?.MODULE_NAME}}</b>

			<div class="bg-gray-50 rounded-lg p-2">
				<h3 class="text-lg font-bold text-gray-800 mb-4">Kullanılabilir Eklentiler</h3>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
					<button 
						@click="() => {
							this.$swal().fire('test')
						}"
						class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
						Swal.fire
					</button>
					<button 
						@click="() => {
							this.$confirm()
						}"
						class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
						Swal.Confirm
					</button>
					<button 
						@click="() => {
							this.$toast().fire({
								icon: 'info',
								title: 'Info',
								text: 'This is an info toast message.'
							})
						}"
						class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
						Toast
					</button>
					<button @click="showModal = true" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
						Modal
					</button>
				</div>

			</div>
		</div>
	</section>
		
		

<Modal v-if="showModal" @close="showModal = false">
	
</Modal>
	</div>

<script>
	const vueMixinFunctions = [
		() => ({
			data() {
				return {
					showModal: false
				}
			},
			components: {
				Modal
			},
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