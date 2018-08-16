<template lang="pug">
#header
  header.z-depth-2(v-if="normalHeaderShow")
    .content-container.left
      router-link(:to="{ name: 'tracks', params: {time: 'short_term'} }") Top {{ $t("tracks") }}
      router-link(:to="{ name: 'artists', params: {time: 'short_term'} }") Top {{ $t("artists") }}
    .content-container.middle
      router-link(tag="h1", :to="{ name: 'home'}") Spotifinest
    .content-container.right
      locale-changer
      a(@click="logout") {{ $t("header.logout") }}
  header.z-depth-2.mobile(v-else)
    button.hamburger.hamburger--spin(type="button", @click="toggleNav", :class="{'is-active': isOpen}")
      .hamburger-box
        .hamburger-inner
    .title-container
      router-link(tag="h1", :to="{ name: 'home'}") Spotifinest
    locale-changer
  transition(name="nav")
    nav(v-show="isOpen && !normalHeaderShow").z-depth-2
      .inner-nav-container
        a.nav-item(@click="navigateMobile({ name: 'home' })") Home
        a.nav-item(@click="navigateMobile({ name: 'tracks', params: {time: 'short_term'} })") Top {{ $t("tracks") }}
        a.nav-item(@click="navigateMobile({ name: 'artists', params: {time: 'short_term'} })") Top {{ $t("artists") }}
        a.nav-item(@click="logout") {{ $t("header.logout") }}
</template>

<script>
import { mapActions } from 'vuex'
import LocaleChanger from './LocaleChanger'

export default {
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    ...mapActions(['reset']),
    logout () {
      this.reset({keep: this.$store.getters.keepLoggedIn})
      this.$router.push({ name: 'login' })
    },
    toggleNav () {
      this.isOpen = !this.isOpen
    },
    navigateMobile (to) {
      this.isOpen = false
      this.$router.push(to)
    }
  },
  computed: {
    normalHeaderShow () {
      return this.windowWidth >= 1004
    }
  },
  components: { LocaleChanger }
}

</script>

<style lang="sass" src="styles/3-components/header"></style>
