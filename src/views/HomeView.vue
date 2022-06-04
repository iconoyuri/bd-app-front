<template>
    <HomepageMain
        v-if="teacherLogged"
        :title="teacherTexts.title"
        :paragraph="teacherTexts.paragraph"
    >
        <template v-slot:buttons>
            <router-link
                :to="{
                    name: 'teacherworkshop',
                    params: {
                        matricule: this.$store.getters.getTeacherMatricule,
                    },
                }"
            >
                <button type="button" class="btn btn-dark">My timetable</button>
            </router-link>
            <button type="button" class="btn btn-dark">Plan an activity</button>
        </template>
    </HomepageMain>
    <HomepageMain
        v-else-if="adminLogged"
        :title="adminTexts.title"
        :paragraph="adminTexts.paragraph"
    >
        <template v-slot:buttons>
            <router-link :to="{ name: 'datainsertion' }">
                <button type="button" class="btn btn-dark">
                    Datas Insertion
                </button>
            </router-link>
            <router-link :to="{ name: 'adminworkshop' }">
                <button type="button" class="btn btn-primary">
                    Build timetable
                </button>
            </router-link>
            <button type="button" class="btn btn-dark">Plan an activity</button>
        </template>
    </HomepageMain>
    <HomepageMain
        v-else
        :title="usersTexts.title"
        :paragraph="usersTexts.paragraph"
    />
    <router-view></router-view>
</template>

<script>
import HomepageMain from "../components/HomepageMain.vue";

export default {
    name: "HomeView",
    components: { HomepageMain },
    data() {
        return {
            teacher: {
                matricule: "19M2222",
                nom: "Uriel Melie",
                code_filiere: "INF",
            },
            usersTexts: {
                title: "The automation of the timetable consultation",
                paragraph:
                    "Use our app and consult the timetable of any class of your choice. One unique condition, it may be one of the Yaounde I university ;)",
            },
            teacherTexts: {
                title: "The activity programming faster than never ever",
                paragraph:
                    "Use our app and consult your personal timetable or your collegues ones. Plan your own activities and insert it in the general planning.",
            },
            adminTexts: {
                title: "Welcome back, Administrator",
                paragraph:
                    "Master the platform, generate all planings, modify the ones you want",
            },
        };
    },
    computed: {
        teacherLogged() {
            return this.$store.getters.userIsTeacher;
        },
        adminLogged() {
            return this.$store.getters.userIsAdmin;
        },
    },
};
</script>

<style></style>
