<template>
    <nav class="navbar navbar-light">
        <router-link :to="{ name: 'home' }">
            <span>
                <i class="fa-solid fa-calendar-days"></i>
                <span class="app-name">MyTimetable</span>
            </span>
        </router-link>
        <router-link :to="{ name: 'login' }">
            <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">
                Log In
            </button>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
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
