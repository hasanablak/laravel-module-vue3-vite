@extends('blog::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('blog.name') !!}</p>
	<blog-module-say-hello name="Hasan" />
@endsection



@push('footer')
<script>

	const vueMixinFunction = () => {
		return {
			components: {
				BlogModuleSayHello
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
