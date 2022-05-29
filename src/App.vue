<template>
    <Navbar @showLoginForm="showLoginForm" />
    <teleport to="#modals">
        <LoginForm v-if="visibleLoginForm" @closeModal="closeLoginForm" />
    </teleport>
    <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import LoginForm from "./components/LoginForm.vue";

export default {
    name: "App",
    components: { Navbar, LoginForm },
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
