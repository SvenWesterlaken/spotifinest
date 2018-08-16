<template lang="pug">
#artists
  .head
    h2 Top {{ $t("artists") }}
    time-switch(v-model="time")
  error-container(:show="itemsUnavailable")
  bounce-loader(:loading="loading", color="#1db954")
  transition-group(name="artistlist", :duration="{ leave: 200 }", appear, tag="div").artists-container
    app-artist(v-for="(artist, index) in artists", :key="`${time}_${artist.id}`", :artist="artist", :index="index")
  back-to-top-button
</template>

<script>
import BounceLoader from '~/vue-spinner/src/BounceLoader'
import TimeSwitch from '@/components/partials/TimeSwitch'
import BackToTopButton from '@/components/partials/BackToTopButton'
import Artist from '@/components/items/Artist'
import {mapGetters, mapActions} from 'vuex'
import * as _ from 'lodash'

export default {
  data () {
    return {
      time: 'short_term'
    }
  },
  components: { TimeSwitch, appArtist: Artist, BounceLoader, BackToTopButton },
  computed: {
    ...mapGetters(['artistsShort', 'artistsMedium', 'artistsLong', 'serverAvailable']),
    artists () {
      switch (this.time) {
        case 'short_term': return this.artistsShort
        case 'medium_term': return this.artistsMedium
        case 'long_term': return this.artistsLong
      }
    },
    loading () {
      return this.itemsUnavailable && this.serverAvailable
    },
    itemsUnavailable () {
      return _.isEmpty(this.artists) || _.isNil(this.artists)
    }
  },
  methods: {
    ...mapActions(['fetchArtists']),
    populateArtists (time) {
      this.time = time || 'short_term'
      let artists

      switch (this.time) {
        case 'long_term':
          artists = this.artistsLong
          break
        case 'medium_term':
          artists = this.artistsMedium
          break
        default:
          artists = this.artistsShort
      }

      if (_.isNil(artists)) {
        return this.fetchArtists(this.time)
      }

      return new Promise((resolve, reject) => resolve())
    }
  },
  created () {
    this.populateArtists(this.$route.params.time)
  },
  watch: {
    time () {
      this.$router.push({name: 'artists', params: { time: this.time }})
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.populateArtists(to.params.time).then(() => next())
  }
}
</script>

<style lang="sass" src="styles/3-components/list"></style>
