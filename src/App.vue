<template>
    <Navbar/>
    <router-view></router-view>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
    name: "App",
    components: { Navbar },
    
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
