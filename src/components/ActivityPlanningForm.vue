<template>
    <main>
        <!-- <header>
            <h1>Welcome to your workshop</h1>
            <h3>What will you do today ?</h3>
        </header>
        <main class="splited">
            <section>
                Consult my timetable
                <router-link
                    :to="{
                        name: 'teacherworkshop',
                        params: {
                            matricule: this.$store.getters.getTeacherMatricule,
                        },
                    }"
                >
                    <button type="button" class="btn btn-dark">
                        My timetable
                    </button>
                </router-link>
            </section>
            <section>Plan an activity</section>
        </main> -->
    </main>
</template>

<script>
export default {};
</script>

<style scoped>
main {
    background: rgb(255, 255, 255);
    padding-top: 2rem;
}
header {
    text-align: center;
}
.splited {
    display: flex;
    align-content: stretch;
}
section {
    width: 100%;
}
</style>
