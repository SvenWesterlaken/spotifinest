a<template lang="pug">
#tracks
  .head
    h2 Top {{ $t("tracks") }}
    time-switch(v-model="time")
  error-container(:show="itemsUnavailable")
  bounce-loader(:loading="loading", color="#1db954")
  transition-group(name="tracklist", :duration="{ leave: 200 }", appear, tag="div").tracks-container
    app-track(v-for="(track, index) in tracks", :key="`${time}_${track.id}`", :track="track", :index="index")
  back-to-top-button
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import * as _ from 'lodash'
import TimeSwitch from '@/components/partials/TimeSwitch'
import BackToTopButton from '@/components/partials/BackToTopButton'
import Track from '@/components/items/Track'
import BounceLoader from '~/vue-spinner/src/BounceLoader'

export default {
  data () {
    return {
      time: 'short_term'
    }
  },
  components: { TimeSwitch, appTrack: Track, BackToTopButton, BounceLoader },
  computed: {
    ...mapGetters(['tracksShort', 'tracksMedium', 'tracksLong', 'serverAvailable']),
    tracks () {
      switch (this.time) {
        case 'short_term': return this.tracksShort
        case 'medium_term': return this.tracksMedium
        case 'long_term': return this.tracksLong
      }
    },
    loading () {
      return this.itemsUnavailable && this.serverAvailable
    },
    itemsUnavailable () {
      return _.isEmpty(this.tracks) || _.isNil(this.tracks)
    }
  },
  methods: {
    ...mapActions(['fetchTracks']),
    populateTracks (time) {
      this.time = time || 'short_term'
      let tracks

      switch (this.time) {
        case 'long_term':
          tracks = this.tracksLong
          break
        case 'medium_term':
          tracks = this.tracksMedium
          break
        default:
          tracks = this.tracksShort
      }

      if (_.isNil(tracks)) {
        return this.fetchTracks(this.time)
      }

      return new Promise((resolve, reject) => resolve())
    }
  },
  created () {
    this.populateTracks(this.$route.params.time)
  },
  watch: {
    time () {
      this.$router.push({name: 'tracks', params: { time: this.time }})
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.populateTracks(to.params.time).then(() => next())
  }
}
</script>

<style lang="sass" src="styles/3-components/list"></style>
