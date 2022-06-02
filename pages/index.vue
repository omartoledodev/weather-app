<template>
  <div>
    <v-sheet
      v-show="!loadingComponets"
      color="grey darken-2"
      class="pa-3"
    >
      <v-skeleton-loader
        class="mx-auto"
        type="card"
      />
    </v-sheet>
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
                class="btn-menu"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item to="/manage-locations">
                <v-list-item-title  class="item-manage-locations">Manage Locations</v-list-item-title>
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
  </div>
</template>

<script>
import { getIp } from '../api/ip'
import { getLocationByIp } from '../api/IPLookup'

import SelectLocation from '../components/SelectLocation'
import Current from '../components/Current'
import History from '../components/HistoryWeather'
import Forecast from '../components/Forecast'

import { backgroundDay, backgroundNight } from '../const'

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
    isDay () {
      return this.$store.getters['weather/getIsDay']
    },
    backgroundUrl () {
      if (this.isDay === 1) {
        return backgroundDay.find(item => item.code === this.$store.getters['weather/getCodeBackgroud']).img
      } else {
        return backgroundNight.find(item => item.code === this.$store.getters['weather/getCodeBackgroud']).img
      }
    },
    loadingComponets () {
      return this.$store.getters['weather/getLoading']
    },
    weathers () {
      return this.$store.getters['weather/getWeathers']
    }
  },
  mounted () {
    if (this.location != null) {
      this.$store.dispatch('weather/getLoading', { value: true })
      this.$store.dispatch('weather/getCode', { location: this.location })
      this.$store.dispatch('weather/getIsDay', { location: this.location })
      this.codeBackground = backgroundDay.find(item => item.code === this.$store.getters['weather/getCodeBackgroud']).img
    } else {
      // Buscar ip and location with API ip
      this.getIp()
    }
    this.loading = false
  },
  methods: {
    async getIp () {
      const response = await getIp()
      if (response.status === 200) {
        // find location by ip
        const location = await getLocationByIp(response.body.ip)
        if (location.status === 200) {
          await this.$store.dispatch('locations/getLocations', { location: location.body.response.city })
          await this.$store.dispatch('locations/getLocation', { location: location.body.response.city })
          await this.$store.dispatch('weather/getWeathers', { location: location.body.response.city })
          await this.$store.dispatch('weather/getCode', { location: location.body.response.city })
          await this.$store.dispatch('weather/getIsDay', { location: location.body.response.city })
          await this.$store.dispatch('history/getHistory', { location: location.body.response.city })
          await this.$store.dispatch('forecast/getForecast', { location: location.body.response.city })
          this.$store.dispatch('weather/getLoading', { value: true })
          this.codeBackground = backgroundDay.find(item => item.code === this.$store.getters['weather/getCodeBackgroud']).img
        }
      } else {
        // redirect to add locations view
        this.$router.push('/add-location')
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
