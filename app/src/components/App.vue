<template lang="pug">
  #app
    transition(name="fade", mode="out-in")
      app-header(v-if="headerShow")
    .page-container(:class="{padded: headerShow}")
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

<style lang="sass" src="styles/main"></style>
