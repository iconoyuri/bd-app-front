<template>
    <nav class="navbar navbar-light">
        <router-link :to="{ name: 'home' }">
            <span>
                <i class="fa-solid fa-calendar-days"></i>
                <span class="app-name">MyTimetable</span>
            </span>
        </router-link>
        <router-link v-if="notUserLogged" :to="{ name: 'login' }">
            <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">
                Log In
            </button>
        </router-link>
        <router-link v-if="teacherLogged" :to="{ name: 'teacherworkshop' }">
            <i class="fa-solid fa-chalkboard-user"></i>
        </router-link>
        <router-link v-if="adminLogged" :to="{ name: 'adminworkshop' }">
            <i class="fa-solid fa-user-tie"></i>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {};
    },
    computed: {
        notUserLogged() {
            return !this.$store.getters.isUserLogged;
        },
        teacherLogged() {
            return this.$store.getters.userIsTeacher;
        },
        adminLogged() {
            return this.$store.getters.userIsAdmin;
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
