<template>
  <svg id="color-drop" xmlns="http://www.w3.org/2000/svg" width="250" height="200" viewBox="0 0 800 600">
    <defs>
      <clipPath id="dripMask">
        <circle cx="400" cy="300" r="60" fill="#0000ff"/>
      </clipPath>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="cm" />
        <feBlend/>
      </filter>
    </defs>

    <g id="clickable" clip-path="url(#dripMask)">
      <g filter="url(#goo)">
        <ellipse class="ring" cx="400" cy="300" rx="60" ry="60" fill="none" stroke="purple" stroke-width="10"/>
        <ellipse ref="drip" id="drip" cx="400" cy="190" rx="20" ry="50" fill="purple" stroke="purple" />
      </g>
      <ellipse class="ring" cx="400" cy="300" rx="60" ry="60" fill="none" stroke-width="7"/>
    </g>

    <g ref="dotContainer" id="dotContainer">
      <circle ref="dots" v-for="i in numberOfDots" class="dot" cx="0" cy="0" r="0" fill="#ff00ff" :key="i"/>
    </g>


    <ellipse v-on:click="playParticles" class="click-holder" cx="400" cy="300" rx="75" ry="75" fill="transparent" />

  </svg>

</template>

<script>
/* eslint-disable */

import { TweenMax, TimelineMax, Power2, Expo, Elastic } from 'gsap';
import Physics2DPlugin from '@/lib/Physics2DPlugin.js';
import _ from 'underscore';


const randomBetween = function(min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min);
}

export default {
  name: "gsap",
  data() {
    return {
      isActive: false,
      numberOfDots: 23,
      mainTl: new TimelineMax()
    }
  },
  props: {
    click: {
      type: Function,
      default: () => { }
    }
  },
  mounted() {

     let drip = this.$refs.drip;

     this.mainTl.timeScale(2);
     this.mainTl.to(drip, 1, {
      y:80,
      transformOrigin:'50% 50%',
      ease:Power2.easeIn
     })
     .to(drip, 1, {
      y:110,
      ease:Elastic.easeOut.config(0.6,0.24)
     })
     .to(drip, 1.5, {
      attr:{
       rx:32,
       ry:32
      },
      ease:Elastic.easeOut.config(0.8,0.23)
    },'-=1');

     // this.mainTl.stop();
     // this.mainTl
     // .to(drip, 1, {
     //  scale:1.17,
     //  ease:Expo.easeIn
     // })
     // .addCallback(this.playParticles);

     let d = this.$refs.dots;

     for(let p of d) {
       TweenMax.set(p, {
         attr:{
           r:4
         },
         x: 400,
         y: 300,
         scale:randomBetween(1, 23) / 10,
         transformOrigin: '50% 50%',
         alpha: 0
       });
     }

  },
  beforeDestroy() {
    setTimeout(() => {
      this.isActive = false;
    }, 250);
  },
  methods: {
    activate: function() {
      setTimeout(() => {
        this.isActive = true;
      }, 250);
    },
    handleClick: _.debounce(function() {
      setTimeout(() => {
        this.mainTl.stop();
        this.click();
      }, 400);
    }),
    playParticles: _.debounce(function() {
      this.handleClick();
       let d = this.$refs.dots;

       for(let p of d) {

        let tl = new TimelineMax();
         tl
         .to(this.$refs.drip, 1, {
          scale:1.17,
          opacity: 0,
          ease:Expo.easeIn
        }, "-=1")
         .to(p, randomBetween(1, 23) / 40, {
          physics2D: {
           velocity: randomBetween(240 + 150, 370 + 150),
           angle: randomBetween(-180, 180),
           gravity: randomBetween(550 + 200, 600 + 200)
          },
          scale: 0,
          // onComplete: this.completeParticle,
          alpha: 1
         });

       }
    })
  }
}

</script>

<style scoped>


</style>
