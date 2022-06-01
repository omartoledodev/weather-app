<template>
  <v-row
    v-if="loadingComponets"
    class=""
    align="center"
    justify="center"
  >
    <v-col cols="6" md="6" sm="6">
      <v-select
        v-model="location"
        :items="getLocations"
        prepend-inner-icon="mdi-map-marker-outline"
        color="grey lighten-2"
        @change="changeLocation()"
      />
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'SelectLocation',
  data () {
    return {
      location: null
    }
  },
  computed: {
    currentLocation () {
      return this.$store.getters['locations/getLocation']
    },
    getLocations () {
      return this.$store.getters['locations/getLocations']
    },
    loadingComponets () {
      return this.$store.getters['weather/getLoading']
    }
  },
  methods: {
    async changeLocation () {
      await this.$store.dispatch('locations/getLocation', { location: this.location })
      await this.$store.dispatch('weather/getCode', { location: this.location })
    }
  }
}
</script>

<style>

</style>
