<template>
  <div v-if="loadingComponets">
    <v-card color="transparent">
      <v-list color="transparent">
        <template v-for="(item, index) in forecast">
          <v-list-item :key="`list-item-${index + 1}`">
            <v-list-item-content>
              {{ $moment(item.date).format('ddd, MMMM Do') }}
            </v-list-item-content>

            <v-list-item-content>
              <v-img
                :lazy-src=" item.day.condition.icon"
                max-height="40"
                max-width="40"
                :src=" item.day.condition.icon"
              />
            </v-list-item-content>

            <v-list-item-content class="text-right">
              {{ degrees == 'C' ? Math.round(item.day.maxtemp_c) + '° / ' + Math.round(item.day.mintemp_c) + '°' : Math.round(item.day.maxtemp_f) + '° / ' + Math.round(item.day.mintemp_f) + '°' }}
            </v-list-item-content>
          </v-list-item>
          <v-divider
            v-if="index < forecast.length - 1"
            :key="`divider-${index + 1}`"
          />
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ForecastWeather',
  data () {
    return {
      loading: true
    }
  },
  computed: {
    location () {
      return this.$store.getters['locations/getLocation']
    },
    forecast () {
      const forecast = this.$store.getters['forecast/getForecast'].filter(item => item.location.name === this.$store.getters['locations/getLocation'])[0]
      console.log(forecast)
      const days = forecast.forecast.forecastday
      return days
    },
    degrees () {
      return this.$store.getters['weather/getDegrees']
    },
    loadingComponets () {
      return this.$store.getters['weather/getLoading']
    }
  },
  mounted () {
    // this.getData()
  },
  methods: {
    async getData () {
      await this.$store.dispatch('forecast/getForecast')
      this.loading = false
    }
  }

}
</script>

<style>
.v-list-item__content{
justify-content: center;
text-align: left;
display: grid;
}
</style>
