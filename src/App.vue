<template>
  <div id="app" :class="[{ active: isActive }, mode, { animate: hasChanged }]" >
    <vue-headful
        title="Colours in culture - by culture"
        description="Get color meanings from all around the world"
    />
    <Github v-if="isActive"/>
    <nav class="nav" :class="[{ active: isNavActive }, mode, { animate: hasChanged }]" >
      <resize-observer @notify="handleResize" />
      <div class="nav-line" :style="{width: getLineWidth(), left: getOffset()}"></div>
      <div class="nav-box">
        <router-link tag="a" :to="color" class="nav-link" ref="colorButton">
          by color
        </router-link>
        <router-link tag="a" :to="culture" class="nav-link" ref="cultureButton">
          by culture
        </router-link>
        <router-link tag="a" :to="concept" class="nav-link" ref="conceptButton">
          by concept
        </router-link>
      </div>
    </nav>
    <router-view v-if="isActive" :class="[{ active: isActive }, mode, { animate: hasChanged }]" :key="$route.fullPath"/>
    <footer class="footer" :class="[{ active: isNavActive }, mode, { animate: hasChanged }]">
      <a target="_blank" rel="nopener" href="https://github.com/tfrere/colours-in-culture#sources">Sources</a>
      <a target="_blank" rel="nopener" href="https://github.com/tfrere/colours-in-culture#contribute">Want to contribute ?</a>
    </footer>
  </div>
</template>

<script>
import Github from '@/components/Github.vue';

export default {
  name: 'App',
  data() {
    return {
      isActive: false,
      isNavActive: this.setNavActive(this.$route),
      hasChanged: false,
      mode: this.setMode(this.$route),
      lineWidth: 82,
      offset: 20,
      color: this.$cookie.get('color') ? "/color/" + this.$cookie.get('color') : "/color/blue",
      culture: this.$cookie.get('culture') ? "/culture/" + this.$cookie.get('culture') : "/culture/westernAmerican",
      concept: this.$cookie.get('concept') ? "/concept/" + this.$cookie.get('concept') : "/concept/mourning",
    }
  },
  components: {
    Github
  },
  methods: {
    handleResize() {
      this.updateLineWidth(this.lineWidth, this.offset);
    },
    getLineWidth() {
      return this.lineWidth + "px";
    },
    getOffset() {
      return this.offset + "px";
    },
    updateLineWidth(width, offset) {
      setTimeout(()=>{
        this.lineWidth = width;
        this.offset = offset;
      }, 10);
    },
    activation() {
      if(this.$route.path == "/") {
        this.isNavActive = false;
        this.mode = "home";
      }
      if(this.$route.params.color) {
        this.mode = "color " + this.$route.params.color;
        this.updateLineWidth(this.$refs.colorButton.$el.clientWidth, this.$refs.colorButton.$el.offsetLeft);
        this.isNavActive = true;
      }
      else if(this.$route.params.culture) {
        this.mode = "culture";
        this.updateLineWidth(this.$refs.cultureButton.$el.clientWidth, this.$refs.cultureButton.$el.offsetLeft);
        this.isNavActive = true;
      }
      else if(this.$route.params.concept) {
        this.mode = "concept";
        this.updateLineWidth(this.$refs.conceptButton.$el.clientWidth, this.$refs.conceptButton.$el.offsetLeft);
        this.isNavActive = true;
      }
      setTimeout(()=>{
        this.isActive = true;
      }, 300);
    },
    setMode(route) {
      if(route.path == "/") {
        this.isNavActive = false;
        return "home";
      }
      else if(route.params.color) {
        this.isNavActive = true;
        return "color " + route.params.color;
      }
      else if(route.params.culture) {
        this.isNavActive = true;
        return "culture";
      }
      else if(route.params.concept) {
        this.isNavActive = true;
        return "concept";
      }
    },
    setNavActive(route) {
      if(route.path == "/") {
        return false;
      }
      else if(route.params.color) {
        return true;
      }
      else if(route.params.culture) {
        return true;
      }
      else if(route.params.concept) {
        return true;
      }
    },
    getDefaultRouteColor() {
      if(this.$cookie.get('color'))
        return "/color/" + this.$cookie.get('color');
    }
  },
  watch: {
    $route (to) {
      this.hasChanged = true;

      this.color = this.$cookie.get('color') ? "/color/" + this.$cookie.get('color') : "/color/blue";
      this.culture = this.$cookie.get('culture') ? "/culture/" + this.$cookie.get('culture') : "/culture/westernAmerican";
      this.concept = this.$cookie.get('concept') ? "/concept/" + this.$cookie.get('concept') : "/concept/mourning";

      setTimeout(()=> {

        if(to.path == "/") {
          this.isNavActive = false;
          this.mode = "home";
        }
        if(to.params.color) {
          this.mode = "color " + to.params.color;
          this.updateLineWidth(this.$refs.colorButton.$el.clientWidth, this.$refs.colorButton.$el.offsetLeft);
          this.isNavActive = true;
        }
        else if(to.params.culture) {
          this.mode = "culture";
          this.updateLineWidth(this.$refs.cultureButton.$el.clientWidth, this.$refs.cultureButton.$el.offsetLeft);
          this.isNavActive = true;
        }
        else if(to.params.concept) {
          this.mode = "concept";
          this.updateLineWidth(this.$refs.conceptButton.$el.clientWidth, this.$refs.conceptButton.$el.offsetLeft);
          this.isNavActive = true;
        }

        setTimeout(()=> {
          this.hasChanged = false;
        }, 250);
      }, 0);
    }
  },
  mounted() {
    this.activation();
  }
}

</script>

<style lang="scss">

@import '@/scss/base.scss';

</style>
