<template>
<nav>
  <router-link to="/home">Home </router-link>
  <router-link to="/users">| Usuários </router-link>
  <router-link to="/login">| Login </router-link>
  <router-link to="/register">| Registrar-se </router-link>
  <router-link to="/home" @click="logout">| Logout </router-link>
</nav>
  <router-view/>
</template>

<script>
export default {
  data () {
    return {
      req: {
        headers: {
          Authorization: ''
        }
      }
    }
  },
  methods: {
    logout() {
      localStorage.clear();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  color: white;
  background-color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: azure;
}

nav a:hover {
  color: azure;
  text-shadow: 0 0 20px white;
}

</style>
