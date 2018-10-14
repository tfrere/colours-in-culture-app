<template>
  <div class="pie">
    <svg viewBox="-1 -1 2 2" style="transform: rotate(-90deg)">
      <path v-for="(slice, index) in realSlices" v-bind:d="slice.d" v-bind:fill="slice.color" :key="index" />
    </svg>
    <div class="dominants">
      <div v-if="realSlices.length > 1" v-for="(dominant, index) in data.dominant" :key="index" :class="dominant"></div>
    </div>

  </div>
</template>

<script>

  var getCoordinatesForPercent = function(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  export default {
    name: 'PieChart',
    props: {
      data: {
        type: Object
      },
    },
    data() {
      return {
        realSlices: [],
        cumulativePercent: 0,
        hasMounted: false
      }
    },
    methods: {
      instanciate: function() {
        // console.log(this.data);
        var self = this;
        this.data.data.map(function(slice) {
          const [startX, startY] = getCoordinatesForPercent(self.cumulativePercent);
          self.cumulativePercent += slice.percent;
          const [endX, endY] = getCoordinatesForPercent(self.cumulativePercent);
          const largeArcFlag = slice.percent > .5 ? 1 : 0;

          const pathData = [
            `M ${startX} ${startY}`, // Move
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
            `L 0 0`, // Line
          ].join(' ');
          slice.d = pathData;
          self.realSlices.push({percent:slice.percent, d:slice.d, color:slice.hex });
        });

      }
    },
    computed: {
    },
    mounted() {
      var self = this;
      setTimeout(() => {
        self.hasMounted = true ;
        self.instanciate();
      }, 0);
    },
  }
</script>


<style lang="scss">

@keyframes scale {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

  .pie {
    position: relative;
  }

  .pie svg {
    width: 80px;
    height: 80px;
    transform: rotate(-90deg);
    border: 10px solid rgba(0,0,0,0.05);
    border-radius: 100%;
    margin: 0rem 0 -4rem 0;
    padding: 0;
    animation: scale .25s ease-in-out;
  }

  .pie .dominants {
    position: absolute;
    right: calc(100% + 10px);
    top: 0px;
    display: flex;
  }
  .pie .dominants div {
    margin-left: 10px;
    width: 60px;
    height: 60px;
    display: block;
    border: 1px solid rgba(0,0,0,0.05);
  }


  @media (max-width: 1000px) {
    .pie {
      display: none;
    }
  }


</style>
