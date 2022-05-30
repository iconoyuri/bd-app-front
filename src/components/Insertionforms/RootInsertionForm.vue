<template>
    <ClassesForm v-if="formtype === 'classesform'" />
    <CoursesForm v-if="formtype === 'coursesform'" />
    <DaysForm v-if="formtype === 'daysform'" />
    <LevelsForm v-if="formtype === 'levelsform'" />
    <PathsForm v-if="formtype === 'pathsform'" />
    <RoomsForm v-if="formtype === 'roomsform'" />
    <SessionForm v-if="formtype === 'sessionform'" />
    <TeacherForm v-if="formtype === 'teacherform'" />
</template>

<script>
import ClassesForm from "./ClassesForm.vue";
import CoursesForm from "./CoursesForm.vue";
import DaysForm from "./DaysForm.vue";
import LevelsForm from "./LevelsForm.vue";
import PathsForm from "./PathsForm.vue";
import RoomsForm from "./RoomsForm.vue";
import SessionForm from "./SessionForm.vue";
import TeacherForm from "./TeacherForm.vue";

export default {
    name: "RootInsertionForm",
    props: ["formtype"],
    components: {
        ClassesForm,
        CoursesForm,
        DaysForm,
        LevelsForm,
        PathsForm,
        RoomsForm,
        SessionForm,
        TeacherForm,
    },
};
</script>

<style></style>
