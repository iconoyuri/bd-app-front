<template>
    <Navbar />
    <HomepageMain />
    <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
    <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import HomepageMain from "./components/HomepageMain.vue";
export default {
    name: "App",
    components: { Navbar, HomepageMain },
};
</script>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
