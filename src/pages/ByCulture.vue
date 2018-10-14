<template>
  <div class="page" :class="{animate: hasChanged}">
    <vue-headful
        title="Colours in culture - by culture"
        description="Get color meanings from a choosen culture"
    />
    <header class="header active">
      <RotatingGlobe  v-if="isActive" :click="randomCulture" >
      </RotatingGlobe>
      <h3 v-if="isActive" class="sentence">
        colours in
        <Dropdown
          :options="cultures"
          :selected="culture"
          v-on:updateOption="onSelectChange"
          :placeholder="'Select an Item'">
        </Dropdown>
        culture
      </h3>
    </header>
    <world-map v-if="isActive && culture && culture.epicenter" :x="culture.epicenter.x" :y="culture.epicenter.y" />
    <masonry
      class="masonry-cards"
      :class="{active: areCardsActive}"
      :cols="{default: 3, 1200: 3, 1000: 2, 750: 1}"
      :gutter="{default: '30px', 700: '15px'}"
      >
      <div class="masonry-card" v-if="color.tags" :class="color.value" v-for="(color, index) in colors" :key="index">
        <div class="-corner -top-right"></div>

        <div class="card-box">
          <div class="card-label">
            <span class="name" v-on:click="() => { goToColor(color.value) }">{{ color.name }}</span>
          </div>

          <div class="culture">
            <span v-for="tag in color.tags" v-if="color.tags" :key="tag" >
              <button class="tag" v-on:click="() => { goToConcept(tag) }" >
                <span>{{ tag }}</span>
              </button>
            </span>
          </div>
        </div>

      </div>
    </masonry>

  </div>
</template>

<script>

  import Dropdown from '@/components/Dropdown.vue';
  import Button from '@/components/Button.vue';
  import WorldMap from '@/components/WorldMap.vue';
  import RotatingGlobe from '@/components/RotatingGlobe.vue';

  import whichCulture from '@/lib/colours-in-culture.js'

  import cultures from '@/datas/cultures.js'
  import colors from '@/datas/colors.js'

  let getRandomCulture = function() {
    return cultures[Math.floor(Math.random()*cultures.length)];
  }

  let getCultureFromValue = function(name) {
    for(var i = 0; i < cultures.length; i++) {
      if(cultures[i].value == name)
        return cultures[i];
    }
  }

  // var language;
  // if (window.navigator.languages) {
  //   language = window.navigator.languages[0];
  // } else {
  //   language = window.navigator.userLanguage || window.navigator.language;
  // }

  // console.log(language);

  export default {
    name:"by-culture",
    data() {
      return {
        isActive: false,
        areCardsActive: false,
        colors: colors,
        culture: getCultureFromValue(this.$route.params.culture),
        cultures: cultures,
        hasChanged: false,
        title: "Culture"
      }
    },
    components: {
      Dropdown,
      Button,
      WorldMap,
      RotatingGlobe
    },
    methods: {
      computeData() {
        this.hasChanged = true;
        for(var i = 0; i < colors.length; i++) {
          var colorMatch = new whichCulture(colors[i].hex, this.culture.value);
          delete this.colors[i].tags;
          if(colorMatch.init().cultures[0] != "")
          this.colors[i].tags = colorMatch.init().cultures;
        }
        setTimeout(function() {
          this.hasChanged = false;
        },250);
        this.$cookie.set('culture', this.culture.value, 1);
      },
      onSelectChange(culture) {
        this.culture = culture;
        this.$router.push({ name: 'culture', params: { culture: culture.value }});
      },
      activation() {
        setTimeout(() => {
          this.areCardsActive = true;
        }, 250);
      },
      goToConcept(tag) {
        setTimeout(() => {
          this.$router.push({ name: 'concept', params: { concept: tag }});
        }, 250);
      },
      goToColor(color) {
        setTimeout(() => {
          this.$router.push({ name: 'color', params: { color: color }});
        }, 250);
      },
      randomCulture() {
        let newCulture = getRandomCulture();
        while(newCulture.value == this.culture.value || newCulture.value == "southAfrica" || newCulture.value == "chinese" || newCulture.value == "southAmerican" || newCulture.value == "northAfrica" || newCulture.value == "russia" || newCulture.value == "westernEuropean") {
          newCulture = getRandomCulture();
        }
        this.culture = newCulture;
        this.$router.push({ name: 'culture', params: { culture: newCulture.value }});
      }
    },
    mounted() {
      this.isActive = true;
      this.activation();
      if(!this.$route.params.culture) {
        this.culture = getCultureFromValue("westernAmerican");
        this.$router.push({ name: 'culture', params: { culture: "westernAmerican" }});
      }
      this.computeData();

    }
  }

</script>


<style scoped>

</style>
