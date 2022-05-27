<template>
    <nav class="navbar navbar-light">
        <span
            ><i class="fa-solid fa-calendar-days"></i>
            <span class="app-name">MyTimetable</span></span
        >
        <button
            class="btn btn-outline-dark my-2 my-sm-0"
            type="submit"
            @click="showLoginForm"
        >
            Log In
        </button>
    </nav>
    <LoginForm v-if="showForm" @closeForm="closeLoginForm"/>
</template>

<script>
import LoginForm from "./LoginForm.vue";

export default {
    name: "Navbar",
    components: {
        LoginForm,
    },
    data() {
        return {
            showForm: false,
        };
    },
    methods: {
        showLoginForm() {
            this.showForm = true;
        },
        closeLoginForm() {
            this.showForm = false;
        },
    },
};
</script>

<style scoped>
.app-name {
    font-family: Calibri;
    margin-left: 0.5rem;
}
nav {
    font-size: 2rem;
    font-weight: bold;
    font-family: Calibri;
}
</style>
