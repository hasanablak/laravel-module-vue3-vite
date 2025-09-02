import {createApp, defineAsyncComponent} from 'vue'
import SayHello from './components/SayHello.vue';


const AsyncComp = defineAsyncComponent(() =>
  import(
    './components/AsyncComp.vue'
  )
);

window.SayHelloFromAuth = SayHello;
window.AsyncComp = AsyncComp;