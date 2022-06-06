<template>
    <article>
        <p>{{ field.course.nom_seance }}</p>
        <p>{{ field.course.code }}</p>
        <p>{{ field.programmation.code_salle }}</p>
        <p>{{ teacherName }}</p>
    </article>
</template>

<script>
export default {
    props: {
        field: {
            default: [],
        },
    },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
            teacherName: "",
            sessionTypes: [],
        };
    },
    mounted() {
        this.getSessionTypes();
        this.getInformations();
    },
    methods: {
        getSessionTypes() {
            this.axios
                .get(this.requestPath.session + "/all")
                .then((response) => {
                    this.sessionTypes = response.data;
                });
        },
        getInformations() {
            this.getTeacher(this.field.course.matricule_enseignant);
        },
        getTeacher(matricule) {
            this.axios
                .get(this.requestPath.teacher, {
                    params: {
                        matricule: matricule,
                    },
                })
                .then((response) => {
                    this.teacherName = response.data.nom;
                });
        },
    },
    computed: {},
};
</script>

<style></style>
