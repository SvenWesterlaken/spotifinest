<template lang="pug">
.artist-item
  .image-container
    .cover(:style="{ backgroundImage: `url(${artist.images[1].url})` }", :class="{'z-depth-1-half': !isMobile}")
    .heading.z-depth-half.left
      span {{ index + 1 }}.
  .info-container.z-depth-1
    .top-container
      span.title {{ artist.name }}
      span.followers
        animated-number(:value="artist.followers.total", :duration="800", :delay="1100", :formatValue="followersFormatter").amount
        span  {{ $t("items.followers") }}
    .bottom-container
      spotify-button(:uri="artist.uri") {{ $t("openSpotify") }}
      popularity-bar(:popularity="artist.popularity", :mobileVersion="isMobile")
</template>

<script>
import SpotifyButton from '@/components/partials/SpotifyButton'
import PopularityBar from '@/components/partials/PopularityBar'
import AnimatedNumber from 'animated-number-vue'

export default {
  props: ['artist', 'index'],
  components: { SpotifyButton, PopularityBar, AnimatedNumber },
  methods: {
    followersFormatter: (value) => parseInt(value).toLocaleString('de-DE')
  },
  computed: {
    isMobile () {
      return this.windowWidth < 960
    }
  }
}

</script>

<style lang="sass" src="styles/3-components/item"></style>
