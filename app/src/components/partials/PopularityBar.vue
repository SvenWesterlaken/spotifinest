<template lang="pug">
transition-group(name="popularitylist", tag="div", appear, v-if="mobileVersion").popularity-bar.mobile
  .popularity-pill.filled(v-for="i in filledDotAmount", :key="i", :class="`pill-${i}`")
  .popularity-pill(v-for="i in unfilledDotAmount", :key="i + filledDotAmount", :class="`pill-${i + filledDotAmount}`")

.popularity-bar(v-else)
  transition(name="popularityspan", appear)
    span.info {{ $t("items.popularity") }}:
  transition-group.popularity-dot-container(name="popularitylist", tag="div", appear)
    .popularity-dot.filled(v-for="i in filledDotAmount", :key="i", :class="`dot-${i}`")
    .popularity-dot(v-for="i in unfilledDotAmount", :key="i + filledDotAmount", :class="`dot-${i + filledDotAmount}`")
</template>

<script>
import * as _ from 'lodash'

export default {
  props: {
    popularity: Number,
    mobileVersion: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    filledDotAmount () {
      return _.round(this.popularity / 10)
    },
    unfilledDotAmount () {
      return 10 - this.filledDotAmount
    },
    mobilePopular () {
      return `${this.popularity}%`
    }
  }
}
</script>

<style lang="sass" src="styles/2-items/popularitybar"></style>
