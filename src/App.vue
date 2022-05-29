<template>
    <Navbar @showLoginForm="showLoginForm" />
    <!--CCM stands for ChooseClassModal-->
    <HomepageMain @showCCM="showChooseClassModal" />
    <teleport to="#modals">
        <LoginForm v-if="visibleLoginForm" @closeModal="closeLoginForm" />
        <ChooseClass
            v-if="visibleChooseClassModal"
            @closeModal="closeChooseClassModal"
        />
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
import ChooseClass from "./components/ChooseClass.vue"

export default {
    name: "App",
    components: { Navbar, HomepageMain, LoginForm , ChooseClass},
    data() {
        return {
            visibleLoginForm: false,
            visibleChooseClassModal: false,
        };
    },
    methods: {
        showLoginForm() {
            this.visibleLoginForm = true;
        },
        closeLoginForm() {
            this.visibleLoginForm = false;
        },
        showChooseClassModal() {
            this.visibleChooseClassModal = true;
            console.log(this.visibleChooseClassModal )
        },
        closeChooseClassModal() {
            this.visibleChooseClassModal = false;
            console.log(this.visibleChooseClassModal )
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
