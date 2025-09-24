@extends('layouts.app', [
	"title" => "Dashboard Page"
])

@section('content')
<div class="border p-2 bg-green-500">
	<h1>Green: admin.dashboard.blade.php</h1>
	<div>
		@{{test}}
	</div>

	<div>
		Ziggy Route Test:
		@{{route('home')}}
	</div>
	<div>
		<say-hello name="Hasan"/>
	</div>

	<table>
		<thead>
			<tr>
				<th>Module</th>
				<th>Route Name</th>
				<th>Git</th>
			</tr>
		</thead>
		<tbody>
			@foreach(\Module::all() as $moduleName => $module)
			<tr>
				<td>
					{{$moduleName}}
				</td>
				<td>
					{{\Route::has($module->getLowerName().'.index') ? route($module->getLowerName().'.index') : ''}}
				</td>
				<td>
					@if(\Route::has($module->getLowerName().'.index'))
					<a href="{{route($module->getLowerName().'.index')}}">GİT</a>
					@endif
				</td>
			</tr>
			@endforeach
		</tbody>
	</table>

</div>

@endsection


@push('header')
@endpush


@push('footer')
<script>

	const vueMixinFunction = () => {
		return {
			components: {
				SayHello
			},
			data: function(){
				return {
					test: "admin.dashboard.blade.php içerisinde çalışan Vuejs Scripti"
				}
			}
		}
	}
</script>
@endpush