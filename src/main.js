import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Multiselect from "vue-multiselect";
import vueHeadful from "vue-headful";
import VueMasonry from "vue-masonry-css";
import ToolTip from "vue-directive-tooltip";
import "vue-directive-tooltip/css/index.css";
import VueResize from "vue-resize";
import VueCookie from "vue-cookie";
// register globally
Vue.component("vue-headful", vueHeadful);
Vue.component("multiselect", Multiselect);
Vue.use(ToolTip);
Vue.use(VueMasonry);
Vue.use(VueResize);
Vue.use(VueCookie);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered"))
}).$mount("#app");

Vue.directive("title", {
  inserted: (el, binding) => (document.title = binding.value),
  update: (el, binding) => (document.title = binding.value)
});
