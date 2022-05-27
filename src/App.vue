<template>
    <Navbar @showLoginForm="showLoginForm" />
    <HomepageMain />
    <teleport to="#modals">
        <LoginForm v-if="visibleLoginForm" @closeForm="closeLoginForm" />
    </teleport>
    <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
    <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import HomepageMain from "./components/HomepageMain.vue";
import LoginForm from "./components/LoginForm.vue";

export default {
    name: "App",
    components: { Navbar, HomepageMain, LoginForm },
    data() {
        return {
            visibleLoginForm: false,
        };
    },
    methods: {
        showLoginForm() {
            this.visibleLoginForm = true;
        },
        closeLoginForm() {
            this.visibleLoginForm = false;
        },
    },
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
