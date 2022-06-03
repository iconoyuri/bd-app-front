<template>
    <nav class="navbar navbar-light">
        <router-link :to="{ name: 'home' }">
            <span>
                <i class="fa-solid fa-calendar-days"></i>
                <span class="app-name">MyTimetable</span>
            </span>
        </router-link>
        <div class="options">
            <router-link v-if="notUserLogged" :to="{ name: 'login' }">
                <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">
                    Log In
                </button>
            </router-link>
            <div v-else class="user-options">
                <router-link
                    v-if="teacherLogged"
                    :to="{ name: 'teacherworkshop' }"
                >
                    <i class="fa-solid fa-chalkboard-user"></i>
                </router-link>
                <router-link v-if="adminLogged" :to="{ name: 'adminworkshop' }">
                    <i class="fa-solid fa-user-tie"></i>
                </router-link>
                <button
                    class="btn btn-outline-danger logout"
                    @click="logout"
                    title="logout"
                >
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {};
    },
    methods: {
        logout() {
            console.log("Sending backend logout request");
            this.axios
                .delete("/logout", {
                    params: { token: this.$store.getters.getAccessToken },
                })
                .then(() => {});
            this.$store.commit("logout");
            this.$router.push("/")
        },
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
.user-options {
    display: flex;
    gap: 1rem;
    align-items: center;
}
.user-options .logout {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    font-size: 0.8rem;
    flex-shrink: 0;
}
</style>
