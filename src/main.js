import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Multiselect from 'vue-multiselect'
import vueHeadful from 'vue-headful';
import VueMasonry from 'vue-masonry-css'
import ToolTip from 'vue-directive-tooltip'
import 'vue-directive-tooltip/css/index.css';
import VueResize from 'vue-resize'
import VueCookie from 'vue-cookie'
// register globally
Vue.component('vue-headful', vueHeadful);
Vue.component('multiselect', Multiselect);
Vue.use(ToolTip);
Vue.use(VueMasonry);
Vue.use(VueResize)
Vue.use(VueCookie);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// // Step 2: Create a renderer
// const renderer = require('vue-server-renderer').createRenderer()
//
// // Step 3: Render the Vue instance to HTML
// renderer.renderToString(Vue, (err, html) => {
//   if (err) throw err
//   console.log(html)
//   // => <div data-server-rendered="true">Hello World</div>
// })
//
// // in 2.5.0+, returns a Promise if no callback is passed:
// renderer.renderToString(app).then(html => {
//   console.log(html)
// }).catch(err => {
//   console.error(err)
// });



Vue.directive('title', {
  inserted: (el, binding) => document.title = binding.value,
  update: (el, binding) => document.title = binding.value
});
