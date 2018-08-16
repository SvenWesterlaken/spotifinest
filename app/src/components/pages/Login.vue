<template lang="pug">
#login-container
  locale-changer(:fixed="true")
  h1 Spotifinest
  h3 {{ $t("login.subtitle") }}
  button#login-btn.z-depth-1.hoverable.btn.large(@click="login") {{ $t("login.login") }}
  .checkbox-container
    .checkbox
      input(type="checkbox", id="keep", v-model="keep")
      label(for="keep")
    span(@click="switchKeep") {{ $t("login.keep") }}
  bounce-loader(:loading="loading", color="#1db954")
  error-container(:fixed="false")
</template>

<script>
import LocaleChanger from '@/components/partials/LocaleChanger'
import api from '@/api'

export default {
  data () {
    return {
      clickedButton: false
    }
  },
  computed: {
    keep: {
      get () {
        return this.$store.state.keep
      },
      set (value) {
        this.$store.commit('keepLoggedIn', value)
      }
    },
    loading () {
      return this.clickedButton && this.$store.getters.serverAvailable
    }
  },
  methods: {
    login () {
      this.loading = true
      api.login().then(() => {
        this.loading = false
      })
    },
    switchKeep () {
      this.keep = !this.keep
    }
  },
  components: { LocaleChanger }
}
</script>

<style lang='sass' src="styles/3-components/login"></style>
