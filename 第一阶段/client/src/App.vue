<template>
  <div id="app">
    <div class="nav">
      <router-link to='/'>HelloWold</router-link>
      <router-link to='/get_form'>get form</router-link>
      <router-link to="/post_form">post form</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
