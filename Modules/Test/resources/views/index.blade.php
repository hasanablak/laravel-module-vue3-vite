@extends('test::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('test.name') !!}</p>
	<test-module-say-hello name="Hasan" />
@endsection



@push('footer')
<script>

	const vueMixinFunction = () => {
		return {
			components: {
				TestModuleSayHello
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
