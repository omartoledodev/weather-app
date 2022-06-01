<template>
  <div>
    <v-card
      class="mx-auto"
    >
      <v-toolbar
        color="transparent"
        dark
      >
        <v-btn icon to="/manage-locations">
          <v-icon>mdi-arrow-left-thick</v-icon>
        </v-btn>

        <v-toolbar-title>Add location</v-toolbar-title>

        <v-spacer />
      </v-toolbar>

      <v-card
        color="transparent"
        dark
      >
        <v-card-text>
          <v-autocomplete
            v-model="location"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            label="Search"
            placeholder="Start typing to Search"
            prepend-icon="mdi-magnify"
            no-filter
            @change="addLocation"
          />
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { autocompleteLocations } from '../api/autocomplete'

export default {
  name: 'AddLocations',
  layout: 'single',
  data: () => ({
    location: null,
    entries: [],
    isLoading: false,
    search: null
  }),
  computed: {
    items () {
      return this.entries.map((entry) => {
        return {
          text: entry.name + ',' + entry.region + ',' + entry.country,
          value: entry.name
        }
      })
    }
  },
  watch: {
    search (val) {
      this.isLoading = true
      if (val.length >= 3) {
        console.log(val.length)
        autocompleteLocations(val)
          .then((response) => {
            console.log(response)
            const { locations } = response.body
            this.count = locations.length
            this.entries = locations
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      }
    }
  },
  methods: {
    async addLocation () {
      console.log(this.location)
      await this.$store.dispatch('locations/getLocations', { location: this.location })
      await this.$store.dispatch('locations/getLocation', { location: this.location })
      await this.$store.dispatch('weather/getWeathers', { location: this.location })
      await this.$store.dispatch('history/getHistory', { location: this.location })
      await this.$store.dispatch('forecast/getForecast', { location: this.location })
      this.$router.push('/window')
    }
  }
}
</script>

<style>
</style>
