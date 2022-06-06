<template>
    <main>
        <header>
            <h1>Classroom timetable</h1>
            <h4>{{ $route.params.code }}</h4>
        </header>
        <TableDisplayer :courses="courses"></TableDisplayer>
    </main>
</template>

<script>
import TableDisplayer from "../components/Table Module/TableDisplayer.vue";
export default {
    name: "RoomTableView",
    components: { TableDisplayer },
    data() {
        return {
            activities: [],
            courses: [
                {
                    course: {
                        code: "string",
                        semestre: 0,
                        titre: "string",
                        id_specialite: 0,
                        code_classe: "string",
                        code_filiere: "string",
                        nom_seance: "TDc",
                        matricule_enseignant: "19M2222",
                    },
                    programmation: {
                        code_cours: "string",
                        heure_debut: "01:00:00",
                        heure_fin: "03:00:00",
                        code_salle: "string0",
                        nom_jour: "Tuesday",
                    },
                },
                {
                    course: {
                        code: "string",
                        semestre: 0,
                        titre: "string",
                        id_specialite: 0,
                        code_classe: "string",
                        code_filiere: "string",
                        nom_seance: "TD",
                        matricule_enseignant: "19M2222",
                    },
                    programmation: {
                        code_cours: "string",
                        heure_debut: "01:00:00",
                        heure_fin: "03:00:00",
                        code_salle: "string0",
                        nom_jour: "Monday",
                    },
                },
                {
                    course: {
                        code: "string",
                        semestre: 0,
                        titre: "string",
                        id_specialite: 0,
                        code_classe: "string",
                        code_filiere: "string",
                        nom_seance: "TD",
                        matricule_enseignant: "19M2223",
                    },
                    programmation: {
                        code_cours: "string",
                        heure_debut: "01:00:00",
                        heure_fin: "03:00:00",
                        code_salle: "string",
                        nom_jour: "Monday",
                    },
                },
            ],
        };
    },
    mounted() {
        this.fetchActivities();
        this.fetchCourses();
    },
    methods: {
        fetchActivities() {
            let requestPath =
                this.$store.state.requestPaths.table.activity.room;
            this.axios
                .get(requestPath, {
                    params: {
                        code: this.$route.params.code,
                    },
                })
                .then((response) => {
                    this.activities = response.data;
                });
        },
        fetchCourses() {
            let requestPath = this.$store.state.requestPaths.table.course.room;
            this.axios
                .get(requestPath, {
                    params: {
                        code: this.$route.params.code,
                    },
                })
                .then((response) => {
                    this.courses = response.data;
                });
        },
    },
};
</script>

<style>
main {
    background-color: white;
}
header {
    text-align: center;
}
</style>
