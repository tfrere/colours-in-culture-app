<template>
  <button v-on:click="touch($event);" v-bind:class="classButton">
    <div v-bind:style="{ left: x + 'px', top: y + 'px', height: d + 'px', width: d + 'px' }" v-bind:class="classElem"></div>
    <span ref="name">{{name}}</span>
  </button>
</template>


<script>
  /* eslint-disable */

  import VueResource from 'vue-resource';
  import Vue from 'vue';
  import _ from 'underscore';

  export default {
    name: 'dashboard',
    props: {
      click: {
        type: Function,
        default: () => { }
      },
      name: {
        type: String
      }
    },
    data: () => {
      return { isActive: false,
               x: 25,
               y: 11,
               d: 100
             }
    },
    computed: {
      classButton: function () {
        return {
          "button -icon-only -no-gradient touch": true,
          "animate": this.isActive
        }
      },
      classElem: function () {
        return {
          "touch-elem": true,
          "animate": this.isActive,
        }
      },
    },
    methods: {
      touch: _.debounce(function(e) {
        // console.log("touchtag");
        this.isActive = true;
        // console.log(this.isActive);
        this.x =  e.offsetX - this.d / 2;
        this.y =  e.offsetY - this.d / 2;
        setTimeout(() => {
          this.isActive = false;
          // this.click();
        }, 250);
      })
    },
    mounted: function() {
      // console.log("mounttag");
      if(this.$refs && this.$refs.name)
        this.d = Math.max(this.$refs.name.clientWidth, this.$refs.name.clientHeight);
      else {
        this.d = 100;
      }
    }

  };

</script>

<style compile="scss">
</style>
