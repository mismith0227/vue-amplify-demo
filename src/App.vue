<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/organisms/Header'

export default {
  components: {
    Header,
  },
}

// tslint:disable-next-line
console.log(process.env.VUE_APP_NODE_ENV)
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
