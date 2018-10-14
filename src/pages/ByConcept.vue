<template>
  <div class="page"  :class="{active: isActive, animate: hasChanged}">
    <vue-headful
        title="Colours in culture - by concept"
        description="Get color / culture association for a given concept"
    />
    <header v-if="isActive" class="header active">
      <div class="tag-movin-holder" :class="dominant">
        <TagMovin v-if="isActive" :click="() => { randomConcept() }"></TagMovin>
      </div>
      <h1 v-if="isActive" class="sentence" :class="{withDefinition: tag && tag.definition}">
        <span class="pre">associated with </span>
        <Multiselect
          :value="tag"
          deselect-label="Can't remove this value"
          track-by="name"
          label="name"
          :placeholder="tag.label"
          :show-labels="false"
          :custom-label="nameWithDataLength"
          :options="tags"
          :multiple="false"
          :searchable="true"
          :allow-empty="false"
          :show-pointer="false"
          @select="onSelectChange" >
            <template slot="singleLabel" slot-scope="{ option }">
              <span>{{ option.label }}</span>
              <span class="multiselect__length">{{ option.dataLength }}</span>
            </template>
            <span slot="noResult">
              Oops! No elements found.
            </span>
        </Multiselect>
        <p class="definition" v-if="tag && tag.definition" v-html="tag.definition"></p>
      </h1>
      <LineChart v-if="isActive && tag && tag.pie" :data="tag.pie"/>

    </header>


    <masonry
      class="masonry-cards"
      :cols="{default: 4, 1200: 3, 1000: 2, 750: 1}"
      :gutter="{default: '30px', 700: '15px'}"
      >
      <div class="masonry-card" :class="tag.color" v-for="(tag, index) in response" :key="index">
        <div class="-corner -top-right"></div>
        <div class="big-label">
          <span class="name" v-on:click="() => { goToCulture(tag.value) }">{{ tag.label }}</span>
        </div>
      </div>
    </masonry>

  </div>
</template>

<script>

  import Multiselect from 'vue-multiselect'

  import Dropdown from '@/components/Dropdown.vue'
  import PieChart from '@/components/PieChart.vue'
  import LineChart from '@/components/LineChart.vue'
  import Button from '@/components/Button.vue'
  import TagMovin from '@/components/TagMovin.vue'

  import cultures from '@/datas/cultures.js'
  import colors from '@/datas/colors.js'
  import tags from '@/datas/tags.js'

  import associatedTags from '@/datas/associated-tags.js'


  let findTagByName = function(value) {
    for(var i = 0; i < associatedTags.length; i++) {
      if(associatedTags[i].value == value)
        return associatedTags[i];
    }
  }

  let getRandomConcept = function() {
    return tags[Math.floor(Math.random() * 20)];
  }

  String.prototype.lowercase = function() {
      return this.charAt(0).toLowerCase() + this.slice(1);
  }

  export default {
    name:"by-concept",
    data() {
      return {
        isActive: false,
        areCardsActive: false,
        colors: colors,
        cultures: cultures,
        tags: associatedTags,
        tag: findTagByName(this.$route.params.concept),
        dominant: findTagByName(this.$route.params.concept).pie.dominant[0] ? findTagByName(this.$route.params.concept).pie.dominant : "white",
        response: {},
        hasChanged: false,
        title: "Concept"
      }
    },
    components: {
      Dropdown,
      Multiselect,
      Button,
      PieChart,
      LineChart,
      TagMovin,
    },
    methods: {
      nameWithDataLength ({ name, dataLength }) { // , datalength
        return `${name} (${dataLength})` //
      },
      computeData() {
        this.hasChanged = true;
        setTimeout(() => {
          this.hasChanged = false;
          for(var i = 0; i < associatedTags.length; i++) {
            if(associatedTags[i].value == this.tag.value) {
              this.response = associatedTags[i].data;
            }
          }
          this.$cookie.set('concept', this.tag.value, 1);
        }, 250);
      },
      onSelectChange(tag) {
        this.tag = tag;
        setTimeout(() => {
          this.$router.push({ name: 'concept', params: { concept: tag.value }});
        }, 250);
      },
      activation() {
        setTimeout(() => {
          this.areCardsActive = true;
        }, 250);
      },
      randomConcept() {
        let newTag = getRandomConcept();
        while(newTag.value == this.tag.value) {
          newTag = getRandomConcept();
        }
        this.tag = {value: newTag.value, dataLength: newTag.dataLength, name: newTag.name };
        this.$router.push({ name: 'concept', params: { concept: newTag.value }});
      },
      goToConcept() {
        this.randomConcept();
      },
      goToCulture(culture) {
        setTimeout(() => {
          this.$router.push({ name: 'culture', params: { culture: culture }});
        }, 250);
      },
      goToColor(color) {
        setTimeout(() => {
          this.$router.push({ name: 'color', params: { color: color }});
        }, 250);
      }
    },
    mounted() {
      this.isActive = true;
      this.activation();
      if(!this.$route.params.concept) {
        this.tag = findTagByName("mourning");
        this.$router.push({ name: 'concept', params: { concept: "mourning" }});
      }
      this.computeData();
    }
  }

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

<style lang="scss">
  .tag-movin-holder {
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.01);
  }

  @media (max-width: 1000px) {
    .tag-movin-holder {
      display: none;
    }
  }

</style>
