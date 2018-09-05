<template lang="pug">
.background-circle(:id="`background-circle-${index}`", :style="parallaxStyle")
</template>

<script>
import * as _ from 'lodash'

export default {
  props: {
    index: Number,
    inWindow: Boolean,
    mouseX: Number,
    mouseY: Number
  },
  data () {
    return {
      offsetX: 0,
      offsetY: 0,
      x: 0,
      y: 0,
      multiplier: 1
    }
  },
  mounted () {
    this.multiplier = -1 * _.random(50, 80)
    this.getOffset()
    window.addEventListener('resize', _.debounce(this.getOffset, 50))
  },
  computed: {
    parallaxStyle () {
      if (this.inWindow) {
        let position = this.getPosition
        let movementX = (this.mouseX - position.x - this.width / 2) / this.width * this.multiplier
        let movementY = (this.mouseY - position.y - this.height / 2) / this.height * this.multiplier

        return { transform: `translateX(${movementX}px) translateY(${movementY}px)` }
      }
    },
    width () {
      return this.$el.clientWidth
    },
    height () {
      return this.$el.clientHeight
    },
    getPosition () {
      let xPos = 0
      let yPos = 0
      let el = this.$el

      while (el) {
        if (el.tagName === 'BODY') {
          // deal with browser quirks with body/window/document and page scroll
          let xScroll = el.scrollLeft || document.documentElement.scrollLeft
          let yScroll = el.scrollTop || document.documentElement.scrollTop

          xPos += (el.offsetLeft - xScroll + el.clientLeft)
          yPos += (el.offsetTop - yScroll + el.clientTop)
        } else {
          // for all other non-BODY elements
          xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft)
          yPos += (el.offsetTop - el.scrollTop + el.clientTop)
        }

        el = el.offsetParent
      }

      return { x: xPos, y: yPos }
    }
  },
  methods: {
    getOffset () {
      this.offsetX = parseInt(this.$el.offsetLeft)
      this.offsetY = parseInt(this.$el.getBoundingClientRect().top)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getOffset)
  }
}
</script>

<style lang="sass" src="styles/2-items/backgroundcircle"></style>
