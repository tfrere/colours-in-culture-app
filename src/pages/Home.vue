<template>
  <div class="app-wrapper">
    <div class="home page" :class="{active: isActive, animate: hasChanged}">
      <vue-headful
          title="Colours in culture"
          description="Get color meanings from all around the world"
      />
      <HomeWorldMap class="home-world-map"></HomeWorldMap>
      <div class="page-centered">
        <h3 class="sentence">
          <h5 class="home-small-title home-small-title-with-border">colours<span class="home-title-span">in</span>culture<span class="home-title-span">.io</span></h5>
          <h1 class="home-title">Get <b>color meanings</b><br/> from <b>all around</b> the<b> world</b> !</h1>
          <div class="home-call-to-action-block">
            <h5 class="home-small-title">Search by</h5><br/>
            <Dropdown
              :hasColor="true"
              :options="colors"
              :selected="color"
              v-on:updateOption="goToColor"
              :placeholder="'color'">
            </Dropdown>
            <span class="separator">|</span>
            <Dropdown
              :hasColor="false"
              :options="cultures"
              :selected="culture"
              v-on:updateOption="goToCulture"
              :placeholder="'color'">
            </Dropdown>
            <span class="separator">|</span>
            <Multiselect
              v-model="tag"
              deselect-label="Can't remove this value"
              label="name"
              placeholder="Concept"
              :show-labels="false"
              :options="tags"
              :multiple="false"
              :searchable="true"
              :allow-empty="false"
              :show-pointer="false"
              @select="goToConcept" >
                <template slot="singleLabel" slot-scope="{ option }">
                  <span>{{ option.label }}</span>
                </template>
                <span slot="noResult">
                  Oops! No elements found.
                </span>
            </Multiselect>
          </div>
        </h3>
      </div>

    </div>
  </div>
</template>

<script>
  /* eslint-disable */

  import Button from '@/components/Button.vue';
  import Dropdown from '@/components/Dropdown.vue';
  import HomeWorldMap from '@/components/HomeWorldMap.vue';
  import Multiselect from 'vue-multiselect'

  import whichCulture from '@/lib/colours-in-culture.js'

  import cultures from '@/datas/cultures.js'
  import colors from '@/datas/colors.js'
  import tags from '@/datas/tags.js'
  import associatedTags from '@/datas/associated-tags.js'

  export default {
    name:"home",
    data() {
      return {
        isActive: false,
        hasChanged: false,
        color: {name:"Color", value:"color"},
        colors: colors,
        culture: {name:"Culture", value:"culture"},
        cultures: cultures,
        tag: {name:"concept", value:"concept", label: "Concept"},
        tags: tags,
        title: "Home"
      }
    },
    components: {
      Dropdown,
      Button,
      Multiselect,
      HomeWorldMap
    },
    methods: {
      activation() {
        setTimeout(() => {
          this.isActive = true;
        }, 50);
      },
      goToColor(color) {
        this.hasChanged = true;
        setTimeout(() => {
          this.$router.push({ name: 'color', params: { color: color.value }});
        }, 250);
      },
      goToConcept(tag) {
        this.hasChanged = true;
        setTimeout(() => {
          this.$router.push({ name: 'concept', params: { concept: tag.value }});
        }, 250);
      },
      goToCulture(culture) {
        this.hasChanged = true;
        setTimeout(() => {
          this.$router.push({ name: 'culture', params: { culture: culture.value }});
        }, 250);
      }
    },
    beforeDestroy() {
      this.hasChanged = true;
      this.isActive = false;
    },
    mounted() {
      this.activation();
    }
  }

</script>


<style>

</style>
