<template lang="pug">
.timeswitch
  span.info {{ $t("time.time_period") }}:

  .switch-container
    .left-chevron(@click="down", :class="{disabled: first, unavailable: !available}")
      svg(viewBox="0 0 24 24")
        path(d="M14.71,6.71L14.71,6.71c-0.39-0.39-1.02-0.39-1.41,0l-4.59,4.59c-0.39,0.39-0.39,1.02,0,1.41l4.59,4.59 c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41L10.83,12l3.88-3.88C15.1,7.73,15.09,7.09,14.71,6.71z")

    .time-container
      transition(:name="transitionName")
        span.time(:key="getStateName(this.state)") {{ timeMessage }}

    .right-chevron(@click="up", :class="{disabled: last, unavailable: !available}")
      svg(viewBox="0 0 24 24")
        path(d="M9.29,6.71L9.29,6.71c-0.39,0.39-0.39,1.02,0,1.41L13.17,12l-3.88,3.88c-0.39,0.39-0.39,1.02,0,1.41l0,0 c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59c0.39-0.39,0.39-1.02,0-1.41l-4.59-4.59C10.32,6.32,9.68,6.32,9.29,6.71z")
</template>

<script>
export default {
  data () {
    return {
      state: 0,
      transitionName: 'right',
      available: true
    }
  },
  computed: {
    last () {
      return this.state >= 2
    },
    first () {
      return this.state <= 0
    },
    timeMessage () {
      switch (this.state) {
        case 1: return this.$t('time.medium_term')
        case 2: return this.$t('time.long_term')
        default: return this.$t('time.short_term')
      }
    }
  },
  model: {
    prop: 'term',
    event: 'change'
  },
  props: {
    term: String
  },
  methods: {
    up () {
      if (!this.last && this.available) {
        this.transitionName = 'right'
        this.$emit('change', this.getStateName(++this.state))
        this.disable()
      }
    },
    down () {
      if (!this.first && this.available) {
        this.transitionName = 'left'
        this.$emit('change', this.getStateName(--this.state))
        this.disable()
      }
    },
    getStateName (state) {
      switch (state) {
        case 1: return 'medium_term'
        case 2: return 'long_term'
        default: return 'short_term'
      }
    },
    getStateNumber (name) {
      switch (name) {
        case 'medium_term': return 1
        case 'long_term': return 2
        default: return 0
      }
    },
    disable () {
      this.available = false
      setTimeout(() => {
        this.available = true
      }, 150)
    }
  },
  created () {
    this.state = this.getStateNumber(this.term)
  }
}
</script>

<style lang="sass" src="styles/2-items/timeswitch"></style>
