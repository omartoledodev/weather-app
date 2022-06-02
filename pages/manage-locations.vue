<template>
  <div>
    <v-card
      class="mx-auto"
    >
      <v-toolbar
        color="transparent"
        dark
      >
        <v-btn icon to="/">
          <v-icon>mdi-arrow-left-thick</v-icon>
        </v-btn>

        <v-toolbar-title>Manage locations</v-toolbar-title>

        <v-spacer />

        <v-btn icon @click="addLocation">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>

      <!--<v-list>
        <template v-for="(item, index) in locations">
          <v-list-item
            :key="index"
            @click.native.ctrl="getLocation"
          >
            <v-list-item-content class="list-content-left">
              <v-list-item-title>{{ item.location.name + ', ' + item.location.region }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.location.country }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content class="list-content-right">
              <v-list-item-title>{{ degrees == 'C' ? Math.trunc(item.current.temp_c) + '°' : Math.trunc(item.current.temp_f) + '°' }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.current.condition.text }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="deleteLocation(item)">
                <v-icon color="grey lighten-1">
                  mdi-delete-outline
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < locations.length - 1"
            :key="`divider-${index + 1}`"
          />
        </template>
      </v-list>-->
      <v-data-table
        :headers="headers"
        :items="locations"
        :items-per-page="10"
        class="elevation-1"
        :hide-default-header="valor"
        :hide-default-footer="valor"
        :single-select="valor"
        mobile-breakpoint="0"
      >
        <template #[`item.location`]="{ item }">
          <p class="text-body-1 text-left mt-3">
            {{ item.location.name + ', ' + item.location.region }}
          </p>
          <p class="text-body-2 text-left muted">
            {{ item.location.country }}
          </p>
        </template>
        <template #[`item.current`]="{ item }">
          <p class="text-body-1 text-right mt-3">
            {{ degrees == 'C' ? Math.trunc(item.current.temp_c) + '°' : Math.trunc(item.current.temp_f) + '°' }}
          </p>
          <p class="text-body-2 text-right muted">
            {{ item.current.condition.text }}
          </p>
        </template>
        <template #[`item.delete`]="{ item }">
          <v-btn icon @click="deleteLocation(item)">
            <v-icon color="grey lighten-1">
              mdi-delete-outline
            </v-icon>
          </v-btn>
        </template>
        <template #[`item.show`]="{ item }">
          <v-btn icon @click="selectRow(item)">
            <v-icon x-large color="grey lighten-1">
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
    >
      {{ textSnackBar }}
      <template #action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'ManagedLocations',
  layout: 'single',
  data () {
    return {
      multiLine: true,
      snackbar: false,
      textSnackBar: '',
      valor: true,
      headers: [
        { text: 'Location', value: 'location' },
        { text: 'Currentn', value: 'current' },
        { text: 'Delete', value: 'delete' },
        { text: 'Show', value: 'show' }
      ]
    }
  },
  computed: {
    locations () {
      return this.$store.getters['weather/getWeathers']
    },
    degrees () {
      return this.$store.getters['weather/getDegrees']
    }
  },
  methods: {
    async deleteLocation (item) {
      await this.$store.dispatch('weather/deleteWeather', { location: item.location.name })
      await this.$store.dispatch('history/deleteHistory', { location: item.location.name })
      await this.$store.dispatch('forecast/deleteForecast', { location: item.location.name })
      await this.$store.dispatch('locations/deleteLocation', { location: item.location.name })

      if (this.$store.getters['locations/getLocations'][0] !== undefined) {
        this.$store.dispatch('locations/getLocation', { location: this.$store.getters['locations/getLocations'][0] })
      } else {
        this.$router.push('/add-location')
      }
      this.textSnackBar = 'Removed successfully'
      this.snackbar = true
    },
    addLocation () {
      if (this.locations.lenght === 10) {
        this.textSnackBar = 'Remove some locations to continue'
        this.snackbar = true
      } else {
        this.$router.push('/add-location')
      }
    },
    async selectRow (value) {
      await this.$store.dispatch('locations/getLocation', { location: value.location.name })
      this.$router.push('/')
    }
  }
}
</script>

<style>
.muted {
  color: rgba(255, 255, 255, 0.7);
}
.list-content-right {
    justify-content: end;
    text-align: right !important;
    display: grid;
}

.list-content-left {
  justify-content: start;
  text-align: left;
  display: grid;
}
</style>
