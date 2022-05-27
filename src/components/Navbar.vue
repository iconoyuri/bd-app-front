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
</template>

<script>
export default {
    name: "Navbar",
    emits: ["showLoginForm"],
    methods: {
        showLoginForm() {
            this.$emit("showLoginForm");
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
