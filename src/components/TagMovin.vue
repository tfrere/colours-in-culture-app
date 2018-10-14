<template>
    <svg :class="{active: isActive}" v-on:click="handleClick" version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path ref="wire" id='wire' d='M0,0 20,0 20,20' stroke="rgba(0,0,0,0.1)" stroke-width=".5" fill="transparent"/>
<!--
      <path class="wire" d="m20 4.7921h-20.028"/>
      <path ref="wireBefore" class="wire" d="m10 4.7921h-10.028"/> -->
      <g ref="tag" id="tag">
        <path ref="tag-background" id="tag-background" d="m10.024 2.3782-2.8166 2.8166v8.5014l5.7209 0.06852-0.08775-8.6745zm0 1.7936a0.60624 0.62592 0 0 1 0.60587 0.62631 0.60624 0.62592 0 0 1 -0.60587 0.62631 0.60624 0.62592 0 0 1 -0.60587 -0.62631 0.60624 0.62592 0 0 1 0.60587 -0.62631z" fill="#fff" fill-rule="evenodd"/>
        <rect ref="tag-dominant" id="tag-dominant" x="7.2508" y="11.73" width="5.513" height="1.9775" />
        <path d="m12.929 13.765c-0.17452 0.17452-0.40649 0.2707-0.65239 0.27114h-4.427c-0.24633 0-0.47743-0.09618-0.65239-0.27114-0.17496-0.17496-0.2707-0.40649-0.27114-0.65238l1e-7 -7.4735c-1e-7 -0.4239 0.22544-0.96879 0.5253-1.2687l1.9585-1.9585c0.35992-0.35992 0.94572-0.35992 1.3056 0l1.9585 1.9585c0.29943 0.29943 0.5253 0.84475 0.52574 1.2682l-1e-6 7.4735c0 0.24633-0.09618 0.47743-0.27114 0.65239zm-5.042-8.9589c-0.18061 0.18061-0.34512 0.57753-0.34469 0.833v7.4735c-2e-7 0.08182 0.032206 0.15842 0.09096 0.21717 0.058754 0.05875 0.13579 0.09053 0.21674 0.09053h4.427c0.08182-2e-6 0.15842-0.03221 0.21717-0.09096 0.05875-0.05876 0.09053-0.13579 0.09096-0.21717l-1e-6 -7.4735c0-0.25504-0.16451-0.65282-0.34512-0.83344l-1.9585-1.9585c-0.12012-0.12012-0.3151-0.12012-0.43521 0l-1.9585 1.9585z"/>
        <path d="m10.716 5.4591c-0.35992 0.35992-0.94572 0.35992-1.3056 0-0.35992-0.35992-0.35992-0.94572 0-1.3056 0.35992-0.35992 0.94572-0.35992 1.3056 0 0.35992 0.35992 0.35992 0.94572 0 1.3056zm-0.87043-0.87043c-0.12012 0.12012-0.12012 0.3151 0 0.43521 0.12012 0.12012 0.3151 0.12012 0.43522 0 0.12012-0.12012 0.12012-0.3151 0-0.43521-0.12012-0.12012-0.3151-0.12012-0.43522 0z"/>
      </g>
      <!-- <path ref="wireAfter" class="wire" d="m20.021 4.7921h-10.028"/> -->
  </svg>
</template>

<script>

import { TimelineMax, Power2, Elastic } from 'gsap';


export default {
  name: "gsap",
  data() {
    return {
      isActive: false,
      mainTl: new TimelineMax({repreat: -1})
    }
  },
  props: {
    click: {
      type: Function,
      default: () => { }
    }
  },
  mounted() {

    let tag = this.$refs.tag;
    let wire = this.$refs.wire;

    const tl = new TimelineMax({repeat:-1});
    this.mainTl.add(tl);
    this.mainTl.timeScale(3);
    this.mainTl.play();

      tl
      .fromTo(wire,1,{attr:{d:'M0,4 10,5 20,4'}}, {attr:{d:'M0,4 40,5 20,4'}})
      .fromTo(tag, 1, {
       x: 0,
       ease:Power2.easeOut
      },
      {
       x: 30,
       ease:Power2.easeOut
     }, "-=1")
      .fromTo(tag, 1, {
       rotation: 0,
       transformOrigin:'50% 15%',
       ease:Elastic.easeOut.config(1, 0.3)
      },
      {
       rotation: 25,
       transformOrigin:'50% 15%',
       ease:Elastic.easeOut.config(1, 0.3)
     }, "-=1")
     .set(tag, {}, "getOut")
     .fromTo(wire,1,{attr:{d:'M0,4 -10,5 20,4'}}, {attr:{d:'M0,4 10,5 20,4'}})
      .fromTo(tag, 1, {
       x: -30,
       ease:Power2.easeOut
      },
      {
       x: 0,
       ease:Power2.easeOut
      }, "-=1")
      .fromTo(tag, 2, {
       rotation: 45,
       transformOrigin:'50% 15%',
       ease:Elastic.easeOut.config(1, 0.3),
      },
      {
       rotation: 0,
       transformOrigin:'50% 15%',
       ease:Elastic.easeOut.config(1, 0.3),
       onComplete:this.handlePause
      }, "-=1");

  },
  beforeDestroy() {
    setTimeout(() => {
      this.isActive = false;
    }, 250);
  },
  methods: {
    handlePause: function() {
      this.mainTl.pause(0);
    },
    activate: function() {
      setTimeout(() => {
        this.isActive = true;
      }, 250);
    },
    handleClick: function() {
      this.mainTl.seek("getOut");
      this.mainTl.play();

      setTimeout(() => {
        this.click();
      }, 300);
    }
  }
}

</script>

<style lang="scss" scoped>


</style>
