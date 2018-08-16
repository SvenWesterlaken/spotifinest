<template lang="pug">
transition(name="back-to-top")
  .back-to-top-button(v-show="visible", @click="backToTop").z-depth-2
    .chevron-up
      svg(viewBox="0 0 24 24")
        path(d="M8.12,14.71L12,10.83l3.88,3.88c0.39,0.39,1.02,0.39,1.41,0l0,0c0.39-0.39,0.39-1.02,0-1.41l-4.59-4.59  c-0.39-0.39-1.02-0.39-1.41,0l-4.59,4.59c-0.39,0.39-0.39,1.02,0,1.41l0,0C7.09,15.09,7.73,15.1,8.12,14.71z")
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  mounted () {
    this.catchScroll()
    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }
    window.addEventListener('scroll', this.catchScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.catchScroll)
  },
  methods: {
    catchScroll () {
      this.visible = (window.pageYOffset > 700)
    },
    backToTop () {
      window.smoothscroll()
    }
  }
}
</script>

<style lang="sass" src="styles/2-items/topbutton"></style>
