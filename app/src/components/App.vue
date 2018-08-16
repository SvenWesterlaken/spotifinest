<template lang="pug">
  #app
    transition(name="fade", mode="out-in")
      app-header(v-if="headerShow")
    .page-container
      transition(name="fade", mode="out-in")
        router-view
</template>

<script>
import Header from '@/components/partials/Header.vue'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      year: moment().year()
    }
  },
  computed: {
    ...mapGetters(['locale']),
    headerShow () {
      return this.$store.getters.isLoggedIn && this.$route.name !== 'callback'
    }
  },
  name: 'App',
  components: { appHeader: Header },
  created () {
    this.$i18n.locale = this.locale
  }
}
</script>

<style lang="sass">
@import styles/main

#app
  min-height: 100vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

.page-container
  flex-grow: 1
  display: flex
  width: 100%

.fade-enter, .fade-leave-to
  opacity: 0

.fade-enter-active, .fade-leave-active
  transition: all 400ms ease-in-out

@media #{$nav}
  .page-container
    padding-top: 56px

</style>
