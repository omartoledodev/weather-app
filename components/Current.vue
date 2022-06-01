<template>
  <div
    v-if="loadingComponets"
    color="transparent"
    height="auto"
  >
    <v-row
      class=""
      align="center"
      justify="center"
    >
      <v-col cols="12" md="12" xl="12" class="mt-3 mb-3">
        <div class="mt-3">
          <v-row>
            <v-col cols="6" md="6" sm="6">
              <div class="text-h1 white--text text-right">
                {{ degrees == 'C' ? Math.trunc(currentWeather.current.temp_c) : Math.trunc(currentWeather.current.temp_f) }}
              </div>
            </v-col>
            <v-col cols="6" md="6" sm="6" class="text-left">
              <v-btn-toggle
                class="mt-4"
                mandatory
              >
                <v-btn text small @click="changeDegrees('C')">
                  C°
                </v-btn>
                <v-btn text small @click="changeDegrees('F')">
                  F°
                </v-btn>
              </v-btn-toggle>
              <!--<v-btn text small @click="degrees = 'C'" class="p-0">C°</v-btn><span class="subtitle-2"><strong>|</strong></span><v-btn text small @click="degrees = 'F'">F°</v-btn>-->
            </v-col>
          </v-row>
        </div>
        <div class="text-h5 white--text text-center">
          {{ currentWeather.current.condition.text }}
        </div>
        <div class="text-h6 white--text mt-4 text-center">
          {{ currentWeather.location.name }} <v-icon class="mb-1">
            mdi-map-marker-outline
          </v-icon>
        </div>
        <div class="mt-6">
          <v-row>
            <v-col cols="5" md="5" sm="5" class="text-left ml-4">
              <div class="caption white--text">
                <v-icon x-small>
                  mdi-water-percent
                </v-icon> Humidity: {{ currentWeather.current.humidity + '%' }}
              </div>
              <div class="caption white--text">
                <v-icon x-small>
                  mdi-wind-power-outline
                </v-icon> Wind: {{ currentWeather.current.wind_kph + ' km/h' }}
              </div>
            </v-col>
            <v-col cols="6" md="6" sm="6" class="text-right mt-5">
              <div class="caption white--text">
                Last updated: {{ currentWeather.current.last_updated.split(' ')[1] }} hrs.
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'CurrentWeather',
  data () {
    return {
    }
  },
  computed: {
    location () {
      return this.$store.getters['locations/getLocation']
    },
    currentWeather () {
      const weather = this.$store.getters['weather/getWeathers']
      return weather.filter(item => item.location.name === this.$store.getters['locations/getLocation'])[0]
    },
    degrees () {
      return this.$store.getters['weather/getDegrees']
    },
    loadingComponets () {
      return this.$store.getters['weather/getLoading']
    }
  },
  mounted () {
  },
  created () {
  },
  methods: {
    changeDegrees (format) {
      this.$store.dispatch('weather/getDegrees', { format })
    }
  }
}
</script>

<style>
.theme--dark.v-btn-toggle:not(.v-btn-toggle--group) {
    background: transparent;
    color: #FFFFFF;
}
</style>
