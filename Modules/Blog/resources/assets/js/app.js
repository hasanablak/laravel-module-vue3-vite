import {createApp, defineAsyncComponent} from 'vue'
import SayHello from './components/SayHello.vue';


const AsyncComp = defineAsyncComponent(() =>
  import(
    './components/AsyncComp.vue'
  )
);

window.SayHelloFromBlog = SayHello;
window.AsyncComp = AsyncComp;