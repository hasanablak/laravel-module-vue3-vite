@extends('layout.app')

@section('content')
<div>
	@{{test}} deneme
</div>
<div>
	<say-hello name="Mehmet"/>
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
					test: "merhaba2"
				}
			}
		}
	}
</script>
@endpush