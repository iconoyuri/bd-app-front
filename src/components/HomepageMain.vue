<template>
    <HomepageMainTemplate
        v-if="teacherLogged"
        :title="teacherTexts.title"
        :paragraph="teacherTexts.paragraph"
    >
        <template v-slot:buttons>
            <button type="button" class="btn btn-dark">My timetable</button>
            <button type="button" class="btn btn-dark">
                Plan an activity
            </button></template
        >
    </HomepageMainTemplate>
    <HomepageMainTemplate
        v-else-if="adminLogged"
        :title="adminTexts.title"
        :paragraph="adminTexts.paragraph"
    >
        <template v-slot:buttons>
            <button type="button" class="btn btn-dark">Datas Insertion</button>
            <button type="button" class="btn btn-primary">
                Build timetable
            </button>
            <button type="button" class="btn btn-dark">
                Plan an activity
            </button></template
        >
    </HomepageMainTemplate>
    <!--CCM stands for ChooseClassModal-->
    <HomepageMainTemplate
        v-else
        :title="usersTexts.title"
        :paragraph="usersTexts.paragraph"
        @showCCM="showCCM"
    />
</template>

<script>
import HomepageMainTemplate from "./HomepageMainTemplate.vue";

export default {
    name: "HomepageMain",
    components: { HomepageMainTemplate },
    emits: ["showCCM"],
    data() {
        return {
            teacherLogged: false,
            adminLogged: false,
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
    methods: {
        showCCM() {
            this.$emit("showCCM");
        },
    },
};
</script>

<style></style>
