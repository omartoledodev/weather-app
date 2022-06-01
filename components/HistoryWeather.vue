<template>
  <v-sheet
    v-if="loadingComponets"
    class="mx-auto"
    color="transparent"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item
        v-for="(item, index) in history"
        :key="index"
      >
        <v-card
          color="transparent"
          class="ma-4"
          height="150"
          width="80"
          elevation="0"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-col cols="12" md="12" sm="12" class="text-center">
              <div class="text-h6 white--text">
                {{ item.time.split(' ')[1] }}
              </div>
            </v-col>
            <v-col cols="8" md="8" sm="8">
              <v-img
                :lazy-src="item.condition.icon"
                max-height="40"
                max-width="40"
                :src="item.condition.icon"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" class="text-center">
              <div class="text-h6 white--text">
                {{ degrees == 'C' ? Math.trunc(item.temp_c) + '°' : Math.trunc(item.temp_f) + '°' }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    model: null
  }),
  computed: {
    location () {
      return this.$store.getters['locations/getLocation']
    },
    history () {
      const history = this.$store.getters['history/getHistory'].filter(item => item.location.name === this.$store.getters['locations/getLocation'])[0]
      if (history.forecast.forecastday[1]) {
        const hours = history.forecast.forecastday[0].hour.concat(history.forecast.forecastday[1].hour)
        return hours.filter(item => item.time_epoch > history.location.localtime_epoch)
      } else {
        return history.forecast.forecastday[0].hour.filter(item => item.time_epoch > history.location.localtime_epoch)
      }
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
      console.log(this.location)
      await this.$store.dispatch('history/getHistory', { location: this.location })
      this.loading = false
    }
  }
}
</script>

<style>

</style>
