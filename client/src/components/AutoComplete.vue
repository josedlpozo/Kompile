<template>
    <div style="position:relative" v-bind:class="{'open':openSuggestion}" class="input-field">
        <input type="text" :value="value" @input="updateValue($event.target.value)"
          @keydown.enter = 'enter'
          @keydown.down = 'down'
          @keydown.up = 'up'
        >
        <ul style="width:100%">
            <li v-for="(suggestion, index) in matches"
                v-bind:class="{'active': isActive(index)}"
                v-bind:key="index"
                v-on:mouseover="mouseOver(index)"
                @click="suggestionClick(index)">
              <p>{{ suggestion.name }} <small>{{ suggestion.type }}</small></p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    suggestions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      open: false,
      current: 0
    }
  },
  computed: {
    matches () {
      return this.suggestions.filter((obj) => {
        return obj.name.indexOf(this.value) >= 0
      })
    },
    openSuggestion () {
      return this.selection !== '' &&
             this.matches.length !== 0 &&
             this.open === true
    }
  },
  methods: {
    updateValue (value) {
      if (this.open === false) {
        this.open = true
        this.current = 0
      }
      this.$emit('input', value)
    },
    mouseOver (index) {
      this.current = index
    },
    enter () {
      this.$emit('enter', this.matches[this.current])
      this.open = false
    },
    up () {
      if (this.current > 0) {
        this.current--
      }
    },
    down () {
      if (this.current < this.matches.length - 1) {
        this.current++
      }
    },
    isActive (index) {
      return index === this.current
    },
    suggestionClick (index) {
      this.$emit('enter', this.matches[index])
      this.open = false
    }
  }
}
</script>

<style scoped>
.input-field input[type=text]:focus + label {
     color: #000;
}
.input-field input[type=text]:focus {
  border-bottom: 1px solid #EF9A9A;
  box-shadow: 0 1px 0 0 #E57373;
}
.active {
  background-color: #EF9A9A;
  color: #FFFFFF;
}
li {
  cursor: pointer;
}
</style>
