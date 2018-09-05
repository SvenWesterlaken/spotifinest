<template lang="pug">
#login-page(@mousemove="getPosition", @mouseout="parallaxStop", @mouseover="parallaxStart")
  locale-changer(:fixed="true")
  #login-container
    h1 Spotifinest
    h3 {{ $t("login.subtitle") }}
    button#login-btn.z-depth-1.hoverable.btn.large(@click="login") {{ $t("login.login") }}
    .checkbox-container(:class="{ checked: keep }")
      .checkbox
        input(type="checkbox", id="keep", v-model="keep")
        label(for="keep")
      span(@click="switchKeep") {{ $t("login.keep") }}
    bounce-loader(:loading="loading", color="#fff")
    error-container(:fixed="false")
  background-circle(v-for="n in 4", :index="n", :key="`bg-circle-${n}`", :inWindow="inWindow", :mouseX="mouseX", :mouseY="mouseY")
</template>

<script>
import LocaleChanger from '@/components/partials/LocaleChanger'
import BounceLoader from '~/vue-spinner/src/BounceLoader'
import BackgroundCircle from '@/components/items/BackgroundCircle.vue'
import * as _ from 'lodash'
import api from '@/api'

export default {
  data () {
    return {
      clickedButton: false,
      inWindow: false,
      mouseX: 0,
      mouseY: 0
    }
  },
  components: { LocaleChanger, BounceLoader, BackgroundCircle },
  computed: {
    loading () {
      return this.clickedButton && this.$store.getters.serverAvailable
    },
    keep: {
      get () {
        return this.$store.state.keep
      },
      set (value) {
        this.$store.commit('keepLoggedIn', value)
      }
    }
  },
  methods: {
    login () {
      this.clickedButton = true
      api.login().then(() => {
        this.clickedButton = false
      })
    },
    switchKeep () {
      this.keep = !this.keep
    },
    getPosition: _.throttle(function (e) {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    }, 10),
    parallaxStart () {
      this.inWindow = true
    },
    parallaxStop () {
      this.inWindow = false
    }

  }
}
</script>

<style lang='sass' src="styles/3-components/login"></style>
