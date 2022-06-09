<template>
    <nav>
        <router-link class="logo" :to="{ name: 'home' }">
            <span>
                <i class="fa-solid fa-calendar-days"></i>
                <span class="app-name">MyTimetable</span>
            </span>
        </router-link>
        <div class="options">
            <!-- <router-link  :to="{ name: 'login' }"> -->
            <button
                v-if="notUserLogged"
                class="btn btn-outline-light my-2 my-sm-0"
                type="submit"
                @click="showLoginForm"
            >
                Log In
            </button>
            <!-- </router-link> -->
            <div v-else class="user-options">
                <router-link
                    class="user-icon"
                    v-if="teacherLogged"
                    :to="{
                        name: 'teacherworkshop',
                        params: {
                            matricule: this.$store.getters.getTeacherMatricule,
                        },
                    }"
                >
                    <button class="btn btn-outline-dark">
                        <i class="fa-solid fa-chalkboard-user"></i>
                    </button>
                </router-link>
                <router-link
                    class="user-icon"
                    v-if="adminLogged"
                    :to="{ name: 'adminworkshop' }"
                >
                    <button class="btn btn-outline-dark">
                        <i class="fa-solid fa-user-tie"></i>
                    </button>
                </router-link>
                <button
                    class="btn btn-danger logout"
                    @click="logout"
                    title="logout"
                >
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </div>
        </div>
    </nav>
    <LoginForm v-if="loginFormVisible" @closeModal="hideLoginForm" />
</template>

<script>
import LoginForm from "./Modals/LoginForm.vue";

export default {
    components: { LoginForm },
    data() {
        return {
            loginFormVisible: false,
        };
    },
    methods: {
        showLoginForm() {
            this.loginFormVisible = true;
        },
        hideLoginForm() {
            this.loginFormVisible = false;
        },
        logout() {
            // console.log("Sending backend logout request");
            // this.axios
            //     .delete("/logout", {
            //         params: { token: this.$store.getters.getAccessToken },
            //     })
            //     .then(() => {});
            this.$store.commit("logout");
            this.$router.push("/");
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin: 0;

    font-size: 2rem;
    font-weight: bold;
    font-family: Calibri;
    box-shadow: 2px 0 8px var(--bg-dark-color);
    background-color: var(--bg-dark-color);
}
.logo span,
.logo i {
    color: #ccc;
}
.user-options,
.user-options a {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
}
.user-icon .btn-outline-dark {
    background-color: #444;
}
.user-options a i {
    color: var(--bg-grey-color);
}
.user-options .logout {
    /* background-color: #444; */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    font-size: 0.8rem;
    flex-shrink: 0;
}
</style>
