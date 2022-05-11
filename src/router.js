import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import ByConcept from "@/pages/ByConcept.vue";
import ByColor from "@/pages/ByColor.vue";
import ByCulture from "@/pages/ByCulture.vue";
import Home from "@/pages/Home.vue";

const router = new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      // redirect: '/culture/westernAmerican'
    },
    {
      path: "/culture/:culture?",
      name: "culture",
      title: "Culture",
      component: ByCulture,
    },
    {
      path: "/color/:color?",
      name: "color",
      title: "Color",
      component: ByColor,
    },
    {
      path: "/concept/:concept?",
      name: "concept",
      title: "Concept",
      component: ByConcept,
    },
  ],
});

router.beforeEach(function(to, from, next) {
  next();
});

export default router;
