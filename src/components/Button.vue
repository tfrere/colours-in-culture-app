<template>
  <button v-on:click="touch($event);" v-bind:class="classButton">
    <div v-bind:style="{ left: x + 'px', top: y + 'px', height: d + 'px', width: d + 'px' }" v-bind:class="classElem"></div>
    <slot></slot>
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

        // console.log(e);
        this.isActive = true;
        // console.log(this.isActive);
        this.x =  e.offsetX - this.d / 2;
        this.y =  e.offsetY - this.d / 2;
        setTimeout(() => {
          // console.log(this.$refs);
          this.isActive = false;
          // this.click();
        }, 250);
      })
    },
    mounted: function() {
      this.$nextTick(() => {
        // console.log(this.$refs);
      });

      if(this.$refs && this.$refs.firstChild)
        this.d = Math.max(this.$refs.firstChild.clientWidth, this.$refs.firstChild.clientHeight);
      else {
        // console.log(1);
        this.d = 10;
      }
    }

  };

</script>

<style compile="scss">
</style>
