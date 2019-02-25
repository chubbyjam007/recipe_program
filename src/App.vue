<template>
  <div id="app">
    <mycomponent/>
    <router-view/>
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import HelloWorld from './components/HelloWorld'
import mycomponent from './components/mycomponent'
export default {
  name: 'App',
}
</script>
<style>
#app {
}
</style>
