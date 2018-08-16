<template lang="pug">
.locale-changer(:class="{ fixed }", @click="switchLocale")
  transition(name="fade", mode="out-in", duration="2000")
    span(v-if="isEnglish") nl
    span(v-else) en
</template>

<script>
export default {
  props: {
    fixed: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    isEnglish () {
      return this.$i18n.locale === 'en'
    }
  },
  methods: {
    switchLocale () {
      this.$i18n.locale = this.isEnglish ? 'nl' : 'en'
      this.$store.commit('locale', this.$i18n.locale)
    }
  }
}
</script>

<style lang="sass" src="styles/2-items/locale"></style>
