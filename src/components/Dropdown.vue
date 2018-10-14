<template>
  <div class="dropdown" :class="{active: showMenu}" v-click-outside="closeMenu">
    <li @click="toggleMenu()" class="dropdown__toggle" :class="selectedOption.value" v-if="selectedOption.name !== undefined">
      {{ selectedOption.name }}
      <span class="dropdown__toggle__caret"></span>
    </li>

    <li @click="toggleMenu()" class="dropdown__toggle" :class="selectedOption.value" v-if="selectedOption.name === undefined">
      {{placeholderText}}
      <span class="dropdown__toggle__caret"></span>
    </li>

    <ul class="dropdown__menu" v-if="showMenu">
      <li v-for="option in options" :class="{active: selectedOption.name == option.name}" v-bind:key="option.name">
        <a :class="option.value" href="javascript:void(0)" @click="updateOption(option)">
          <span v-if="hasColor" class="dropdown__color" :class="option.value"></span>
          {{ option.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: {
        name: '',
      },
      showMenu: false,
      placeholderText: 'Please select an item',
    }
  },
  props: {
    options: {
      type: [Array, Object]
    },
    hasColor: {default: false, type: Boolean},
    selected: {},
    placeholder: [String],
    removeClone: {default: false, type: Boolean},
  },
  mounted() {
    this.selectedOption = this.selected;
    if (this.placeholder)
    {
      this.placeholderText = this.placeholder;
    }
  },
  methods: {
    updateOption(option) {
      this.selectedOption = option;
      this.showMenu = false;
      this.$emit('updateOption', this.selectedOption);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      this.showMenu = false;
    }
  },
  directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
          if (compName) { warn += `Found in component '${compName}'` }

          // console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },

      unbind: function(el) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
  }
}
</script>

<style lang="scss">

</style>
