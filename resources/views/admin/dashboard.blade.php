@extends('admin.app')

@section('content')
<div>
	@{{test}}
</div>
<div>
	<say-hello name="Mehmet"/>
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
		@foreach($modules as $moduleName => $module)
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
					test: "merhaba2"
				}
			}
		}
	}
</script>
@endpush