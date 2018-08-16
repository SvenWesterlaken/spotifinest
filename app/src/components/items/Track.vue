<template lang="pug">
.track-item
  .image-container
    .cover.z-depth-1-half(:style="{ backgroundImage: `url(${track.album.images[1].url})` }")
    .heading.z-depth-half.left
      span {{ index + 1 }}.
  .info-container.z-depth-1
    .top-container
      span.title(v-line-clamp="clampLines") {{ artists }} - {{ trackName }}
      animated-number(:value="duration", :duration="800", :delay="1100", :formatValue="durationFormatter").duration
    .bottom-container
      spotify-button(:uri="track.uri") {{ buttonText }}
      popularity-bar(:popularity="track.popularity", :mobileVersion="isMobile")
</template>

<script>
import SpotifyButton from '@/components/partials/SpotifyButton'
import PopularityBar from '@/components/partials/PopularityBar'
import AnimatedNumber from 'animated-number-vue'
import moment from 'moment'
import * as _ from 'lodash'

export default {
  props: ['track', 'index'],
  components: { SpotifyButton, PopularityBar, AnimatedNumber },
  methods: {
    convertArtistArray: (array) => _.join(_.map(array, 'name'), ' & '),
    durationFormatter: (value) => {
      const duration = moment.duration(value * 1000, 'milliseconds')
      return `${duration.seconds()}`.length === 1 ? `${duration.minutes()}:0${duration.seconds()}` : `${duration.minutes()}:${duration.seconds()}`
    }
  },
  computed: {
    isMobile () {
      return this.windowWidth < 960
    },
    clampLines () {
      return this.isMobile ? 3 : 2
    },
    buttonText () {
      if (this.windowWidth < 360) {
        return 'open'
      } else if (this.windowWidth < 390) {
        return 'open spotify'
      } else {
        return this.$t('openSpotify')
      }
    },
    duration () {
      return _.round(this.track.duration_ms / 1000)
    },
    trackName () {
      const trackname = _.replace(this.track.name, 'feat.', 'ft.')
      const dashIndex = trackname.lastIndexOf(' - ')

      return dashIndex !== -1 ? `${trackname.slice(0, dashIndex)} (${trackname.slice(dashIndex + 3)})` : trackname
    },
    artists () {
      return this.convertArtistArray(this.artistsSplitted[0])
    },
    artistsInTrackName () {
      return this.convertArtistArray(this.artistsSplitted[1])
    },
    artistsSplitted () {
      const itemIndex = this.trackName.search(/\((ft\..*|.+ radio edit|.+remix|.+mix|.+edit|.+bootleg)\)/i)

      let artists = []

      if (itemIndex !== -1) {
        const items = _.split(this.trackName.slice(itemIndex + 1, -1), ') (')

        _.forEach(items, (item) => {
          const uselessTypesRegex = /(radio|extended) edit/i

          if (uselessTypesRegex.test(item)) return

          const featIndex = item.search(/ft\.\s.*/i)
          const typeIndex = featIndex !== -1 ? featIndex : item.search(/( radio edit| remix| mix| edit| bootleg| vip mix)/i)

          const artistsInItem = _.split((featIndex !== -1 ? item.substring(featIndex + 4) : item.substring(0, typeIndex)).toLowerCase(), /\s[x&,-]\s/i)
          artists = _.concat(artists, artistsInItem)
        })
      }

      return _.partition(this.track.artists, (artist) => !_.includes(artists, artist.name.toLowerCase()))
    }
  }
}
</script>

<style lang="sass" src="styles/3-components/item"></style>
