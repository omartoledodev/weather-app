<template>
  <div v-if="loadingComponets">
    <v-card
      class="mx-auto"
      :style="{ backgroundImage: 'url(' + backgroundUrl + ')' }"
    >
      <v-toolbar
        color="transparent"
        dark
      >
        <v-spacer />
        <v-menu
          left
          bottom
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item to="/manage-locations">
              <v-list-item-title>Manage Locations</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-card
        flat
        tile
        height="100%"
        width="100%"
        color="transparent"
      >
         <SelectLocation />
        <Current />
        <v-divider />
        <History />
        <v-divider />
        <Forecast />
        <v-divider />
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { getIp } from '../api/ip'
import { getLocationByIp } from '../api/IPLookup'

import SelectLocation from '../components/SelectLocation'
import Current from '../components/Current'
import History from '../components/HistoryWeather'
import Forecast from '../components/Forecast'

import { background } from '../const'

export default {
  name: 'TemplateWindow',
  components: {
    SelectLocation,
    Current,
    History,
    Forecast
  },
  layout: 'single',
  data: () => ({
    toggle_exclusive: undefined,
    loading: true,
    length: 3,
    onboarding: 0,
    codeBackground: null
  }),
  computed: {
    location () {
      return this.$store.getters['locations/getLocation']
    },
    code () {
      return this.$store.getters['weather/getCodeBackgroud']
    },
    backgroundUrl () {
      return background.find(item => item.code === this.$store.getters['weather/getCodeBackgroud']).img
    },
    loadingComponets () {
      return this.$store.getters['weather/getLoading']
    }
  },
  mounted () {
    console.log(process.env.TEST_VARIABLE)
    if (this.location != null) {
      console.log('mounted')
      this.$store.dispatch('weather/getLoading', { value: true })
      this.$store.dispatch('weather/getCode', { location: this.location })
      this.codeBackground = background.find(item => item.code === this.$store.getters['weather/getCodeBackgroud']).img
    } else {
      // Buscar ip and location with API ip
      this.getIp()
    }
    this.loading = false
  },
  methods: {
    async getIp () {
      const response = await getIp()
      console.log(response)
      if (response.status === 200) {
        // find location by ip
        const location = await getLocationByIp(response.body.ip)
        console.log(location)
        if (location.status === 200) {
          console.log(location.body.response.city)
          await this.$store.dispatch('locations/getLocations', { location: location.body.response.city })
          await this.$store.dispatch('locations/getLocation', { location: location.body.response.city })
          await this.$store.dispatch('weather/getWeathers', { location: location.body.response.city })
          await this.$store.dispatch('weather/getCode', { location: location.body.response.city })
          await this.$store.dispatch('history/getHistory', { location: location.body.response.city })
          await this.$store.dispatch('forecast/getForecast', { location: location.body.response.city })
          this.$store.dispatch('weather/getLoading', { value: true })
          this.codeBackground = background.find(item => item.code === this.$store.getters['weather/getCodeBackgroud']).img
        }
      } else {
        // redirect to add locations view
      }
    }
  }
}
</script>

<style>
.v-sheet.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: 0px 2px 4px -1px transparent, 0px 4px 5px 0px transparent, 0px 1px 10px 0px transparent;
}
</style>
