<template lang="pug">
#home
  error-container(:show="!itemsAvailable")
  bounce-loader(:loading="loading", color="#1db954")
  transition(name="topartist", :duration="1300", appear)
    #topartist-container(v-if="itemsAvailable")
      .image-container
        .cover.z-depth-1-half(:style="{ backgroundImage: `url(${topArtistShort.images[1].url})` }")
        .heading.z-depth-half.left
          span {{ $t("home.mostPopularArtist") }}

      .info-container.right(:class="{'z-depth-1': !isMobile}")
        span {{ topArtistShort.name }}
        .button-container
          spotify-button(:uri="topArtistShort.uri") {{ $t("openSpotify") }}
          router-link(:to="{ name: 'artists', params: {time: 'short_term'} }" tag="button").btn {{ $t("home.otherPopularArtists") }}

  transition(name="toptrack", :duration="1300", appear)
    #toptrack-container(v-if="itemsAvailable")
      .image-container
        .cover.z-depth-1-half(:style="{ backgroundImage: `url(${topTrackShort.album.images[1].url})` }")
        .heading.z-depth-half.right
          span {{ $t("home.mostPopularTrack") }}

      .info-container.left(:class="{'z-depth-1': !isMobile}")
        span {{ topTrackShort.name}}
        .button-container
          spotify-button(:uri="topTrackShort.uri") {{ $t("openSpotify") }}
          router-link(:to="{ name: 'tracks', params: {time: 'short_term'} }" tag="button").btn {{ $t("home.otherPopularTracks") }}
</template>

<script>
import SpotifyButton from '@/components/partials/SpotifyButton'
import BounceLoader from '~/vue-spinner/src/BounceLoader'
import { mapActions, mapGetters } from 'vuex'
import * as _ from 'lodash'

export default {
  components: { SpotifyButton, BounceLoader },
  computed: {
    ...mapGetters(['topTrackShort', 'topArtistShort', 'serverAvailable']),
    loading () {
      return !this.itemsAvailable && this.serverAvailable
    },
    itemsAvailable () {
      return !_.isNil(this.topArtistShort) && !_.isNil(this.topTrackShort)
    },
    isMobile () {
      return this.windowWidth < 960
    }
  },
  methods: mapActions(['fetchTracks', 'fetchArtists']),
  created () {
    if (_.isNil(this.topArtistShort)) {
      this.fetchArtists(process.env.TIME_SHORT)
    }

    if (_.isNil(this.topTrackShort)) {
      this.fetchTracks(process.env.TIME_SHORT)
    }
  }
}

</script>

<style lang="sass" src="styles/3-components/home"></style>
