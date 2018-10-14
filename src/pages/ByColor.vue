<template>
  <div class="page" :class="{active: isActive, animate: hasChanged}">
    <vue-headful
        title="Colours in culture - by color"
        description="Get culture meanings for a given color"
    />
    <header class="header active">
      <ColorDrop v-if="isActive" :click="randomColor"></ColorDrop>
      <h3 v-if="isActive" class="sentence">
        meaning of
        <Dropdown
          :hasColor="true"
          :options="colors"
          :selected="color"
          v-on:updateOption="onSelectChange"
          :placeholder="'Select an Item'">
        </Dropdown>
        in cultures
      </h3>
    </header>
    <div v-if="isActive" class="color-hex">{{color.hex}}</div>

    <masonry
      class="masonry-cards"
      :class="{active: areCardsActive}"
      :cols="{default: 3, 1200: 3, 1000: 2, 750: 1}"
      :gutter="{default: '30px', 700: '15px'}"
      >

      <div class="masonry-card" v-if="culture.tags" :class="culture.value" v-for="(culture, index) in cultures" :key="index">
        <div class="-corner -top-right"></div>

      <div class="card-box">
        <div class="card-label">
          <span class="name"  v-on:click="() => { goToCulture(culture.value) }">{{ culture.name }}</span>
        </div>

        <div class="culture">
          <span v-for="(tag, index) in culture.tags" :v-if="culture.tags.length" v-bind:key="tag" >
            <button class="tag" :name="tag" v-on:click="() => { goToConcept(tag) }" >
              <span>{{tag}}</span>
            </button>
          </span>
        </div>

      </div>

    </div>
  </masonry>

  </div>
</template>

<script>
  /* eslint-disable */

  import Button from '@/components/Button.vue';
  import Tag from '@/components/Tag.vue';
  import ColorDrop from '@/components/ColorDrop.vue';
  import Dropdown from '@/components/Dropdown.vue';

  import whichCulture from '@/lib/colours-in-culture.js'

  import cultures from '@/datas/cultures.js'
  import colors from '@/datas/colors.js'

  let hexFromValue = function(routeParam, color) {
    for(var i = 0; i < color.length; i++) {
      if(color[i].value == routeParam)
        return color[i].hex;
    }
  }

  export default {
    name:"by-color",
    data() {
      return {
        isActive: false,
        areCardsActive: false,
        colors: colors,
        hasChanged: false,
        color: {name: this.nameFromValue(this.$route.params.color, colors), value: this.$route.params.color, hex: hexFromValue(this.$route.params.color, colors) },
        cultures: cultures,
        title: "Color"
      }
    },
    components: {
      Dropdown,
      Button,
      Tag,
      ColorDrop
    },
    methods: {
      nameFromValue(routeParam, color) {
        for(var i = 0; i < color.length; i++) {
          if(color[i].value == routeParam)
            return color[i].name;
        }
      },
      computeData() {
        for(var i = 0; i < this.cultures.length; i++) {
          var colorMatch = new whichCulture(this.color.hex, this.cultures[i].value);
          delete this.cultures[i].tags;
          if(colorMatch.init().cultures[0] != "")
            this.cultures[i].tags = colorMatch.init().cultures;
        }
        this.$cookie.set('color', this.color.value, 1);
      },
      onSelectChange(color) {
        this.color = color;
        this.$router.push({ name: 'color', params: { color: color.value }});
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
      goToCulture(culture) {
        setTimeout(() => {
          this.$router.push({ name: 'culture', params: { culture: culture }});
        }, 250);
      },
      randomColor() {
        let newColor = colors[Math.floor(Math.random() * colors.length)];
        while(newColor.value == this.color.value || newColor.value == "indigo" || newColor.value == "grey" || newColor.value == "brown") {
          newColor = colors[Math.floor(Math.random() * colors.length)];
        }
        this.$router.push({ name: 'color', params: { color: newColor.value }});
        this.color = {name: newColor.name, value: newColor.value, hex: newColor.hex };
      }
    },
    watch: {
      'cultures': {
        handler() {
          this.areCardsActive = true;
          setTimeout(() => {
            this.areCardsActive = false;
          }, 10);
        }
      }
    },
    mounted() {

      this.activation();
      if(!this.$route.params.color) {
        this.$router.replace({ name: 'color', params: { color: "blue" }});
        this.color = {name: "Blue", value: "blue", hex: "#4980c0" };
      }
      this.computeData();
      this.isActive = true;
    }
  }

</script>


<style scoped>

</style>
