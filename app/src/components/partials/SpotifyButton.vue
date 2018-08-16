<template lang="pug">
  button.btn.outlined(@click="openSpotify")
    slot
</template>

<script>
export default {
  props: {
    uri: String
  },
  methods: {
    openSpotify () {
      if (this.uri) window.open(this.uri)
    }
  }
}
</script>
