<template>
  <div>
    <v-app dark :style="{'background-image':'url(/img/raining.jpg'}">
      <NavBar />
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'

export default {
  name: 'IndexLayout',
  components: {
    NavBar
  },
  data () {
    return {

    }
  }
}
</script>

<style>
.bg {
    background: url('/img/raining.jpg') no-repeat center center;
    background-size: cover;

  }
</style>
