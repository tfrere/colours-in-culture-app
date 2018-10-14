<template>
  <div class="line" :class="{active: hasMounted}">
      <div class="line-slice" v-for="(slice, index) in realSlices" :class="slice.name" :style="{ width: slice.width}" :key="index">
      </div>
    <!--
    v-tooltip.bottom="slice.count"

    <div class="dominants">
      <div v-if="realSlices.length > 1" v-for="(dominant, index) in data.dominant" :key="index" :class="dominant"></div>
    </div> -->
  </div>
</template>

<script>
  import ToolTip from 'vue-directive-tooltip'

  String.prototype.toLower = function() {
      return this.charAt(0).toLowerCase() + this.slice(1);
  }

  export default {
    name: 'LineChart',
    components: {
      ToolTip
    },
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

        this.data.data.sort(function(a, b) {
            return b.count - a.count
        });

        this.data.data.map(function(slice) {
          slice.name = slice.name.toLower();
          if(slice.count > 0) {
            self.cumulativePercent += slice.percent;
            if(slice.percent == 0.33) {
              slice.percent = 0.3333;
            }
            if(slice.percent == 0.14) {
              slice.percent = 0.1444;
            }
            slice.width = slice.percent * 100 + "%";
            self.realSlices.push(slice);
          }
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

  .line {
    position: absolute;
    right: 90px;
    margin-top:10px;
    border: 10px solid rgba(0,0,0,0.05);
    transition: all 200ms ease;
    padding: 0;
    // animation: scale .25s ease-in-out;
    display: flex;
    width: 280px;
    height: 50px;
  }

  .line-slice {
    width: 0px;
    transition: all 200ms ease;
    height: 30px;
  }

  .line .dominants {
    position: absolute;
    right: calc(100% + 10px);
    top: 0px;
  }
  .line .dominants div {
    margin-left: 10px;
    width: 60px;
    height: 60px;
    display: block;
    border: 1px solid rgba(0,0,0,0.05);
    &:not(:first-child) {
      border: 1px solid rgba(0,0,0,0.05);
    }
  }


  @media (max-width: 1000px) {
    .line {
      display: none;
    }
  }


</style>
