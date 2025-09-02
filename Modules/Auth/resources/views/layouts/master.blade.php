@extends('layouts.app')

@push('header')

@endpush

@section('content')
	<div style="border:2px dashed white;padding:10px;background:rgba(215, 58, 58, 0.777)">
		<h1>RED: MODULE WRAPPER</h1>

		@yield('module-content')

	</div>
@endsection


@push('footer')

	@vite([
		'Modules/Auth/resources/assets/css/app.css',
		'Modules/Auth/resources/assets/js/app.js',
	])
@endpush