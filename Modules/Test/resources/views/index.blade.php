@extends('test::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('test.name') !!}</p>
	<say-hello-from-test-module name="Hasan" />
@endsection



@push('footer')
<script>

	const vueMixinFunction = () => {
		return {
			components: {
				SayHelloFromTestModule
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
