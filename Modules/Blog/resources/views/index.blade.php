@extends('blog::layouts.master')

@section('module-content')
    <h1>Hello World</h1>


    <p>Module: {!! config('blog.name') !!}</p>
	
	<div style="margin-top:50px;">
		<h1>Blade içerisinde vue.js scripti kullanmak</h1>
		Bu bir blade içerisine yazılan vue.js scriptidir. Aynı zamanda component'de çağırabilir.<br>
		Örneğin;<br>
		'<code>vueMixinFunction()</code>' içerisinde tanımlanmış '<code>test</code>' isimli değişkeninin değeri @{{test}}
	</div>

	<div  style="margin-top:50px;">
		<h1>Blade içerisinde birden fazla vue.js scripti kullanmak</h1>
		Aynı zamanda birden fazla vue.js scriptini blade içerisinde kullanabilirsin,<br>
		blade sayfalarını parçaladığını, laravel componentleri oluşturduğunu her parça içerisinde o parçaya ait bir vue.js scripti çalıştırdığını düşün!<br>
		'<code>vueMixinFunction<b style="color:red">s</b>[]</code>' bir array'dir buna vue.js scriptlerini push (vueMixinFunctions.push( () => {...})) ederek kullanabilirsin!<br>
		Örneğin;<br> 
		şuanda sayfa içerisinde bulunan '<code>vueMixinFunction<b style="color:red">s</b></code>' içerisindeki '<code>birdenFazlaVueJsScripti</code>' isimli değişkeninin değeri: @{{birdenFazlaVueJsScripti}}
	</div>

	<div style="margin-top:50px;">
		<h1>Bu modüle özel Vue.js componenti oluşturup kullanmak</h1>
		Aynı zamanda vue.js componentleri de çağırabilir ve kullanabilirsin<br>
		<say-hello-from-blog name="{{auth()->check() ? auth()->user()->name : env('APP_NAME')}}" />
	</div>

	<div style="margin-top:50px;">
		<h1>Async Vue.js componenti oluşturup kullanmak</h1>
		Aşağıdaki butona tıkladıktan sonra 1 saniye sonra async bir component yüklenecek!<br>
		Tıklamadan önce öğeyi denetleyi açıp => js kısmına bakmayı unutma!<br>
		<button @click="handleLoadComponentButton">Component'i yükle</button>
		<async-comp v-if="showAsyncComp" name="{{auth()->check() ? auth()->user()->name : env('APP_NAME')}}"/>
	</div>
@endsection


@push('footer')
<script>

	const vueMixinFunction = () => {
		return {
			components: {
				SayHelloFromBlog,
				AsyncComp
			},
			data: function(){
				return {
					test: "merhaba2",
					showAsyncComp: false
				}
			},
			methods: {
				handleLoadComponentButton: function(){
					let self = this;
				
					setTimeout(() => {
						self.showAsyncComp = true;
					}, 1000);
				}
			},
			watch: {
				"appStore": function(){
					this.appStore.setEnv({
						MODULE_NAME: 'Blog'
					})
				}
			}
		}
	}


	vueMixinFunctions.push(() => {
		return {
			data() {
				return {
					birdenFazlaVueJsScripti: 'Hello VUE!'
				}
			},
			components:{
			},
			methods: {
			},
			mounted(){
				console.log("birden fazla vue nesnesi!")
			},
			watch: {
			}
		}
	})
</script>
@endpush
