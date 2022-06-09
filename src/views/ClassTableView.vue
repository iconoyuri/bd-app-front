<template>
    <main>
        <header>
            <h1>Class timetable</h1>
            <form>
                <div>
                    <label for="line-form-1">Path</label>
                    <select
                        class="form-control"
                        v-model="selectedPath"
                        @change="fetchClasses"
                        id="line-form-1"
                    >
                        <option
                            v-for="path in paths"
                            :key="path.code"
                            :value="path.code"
                        >
                            {{ path.nom }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="line-form-2">Class</label>
                    <select
                        class="form-control"
                        id="line-form-2"
                        v-model="selectedClass"
                    >
                        <option
                            v-for="classe in classes"
                            :key="classe"
                            :value="classe"
                        >
                            {{ classe.code }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="line-form-3">Semester</label>
                    <select
                        class="form-control"
                        v-model="selectedSemester"
                        id="line-form-3"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <button @click.prevent="fetchDatas" class="btn btn-primary">
                    Search
                </button>
            </form>
        </header>
        <TableDisplayer
            v-if="viewTimeTable"
            :courses="courses"
            :activities="activities"
            :addingEnabled="this.$store.getters.userIsAdmin"
        ></TableDisplayer>
    </main>
</template>

<script>
import TableDisplayer from "../components/Table Module/TableDisplayer.vue";
export default {
    name: "ClassTableView",
    components: { TableDisplayer },
    data() {
        return {
            selectedPath: "",
            selectedClass: "",
            selectedSemester: 2,
            viewTimeTable: false,
            activities: [],
            courses: [],
            paths: [],
            
            courses: [
                {
                    code: "INF3176",
                    semestre: 0,
                    titre: "string",
                    id_specialite: 0,
                    code_classe: "INFL3",
                    code_filiere: "string",
                    nom_seance: "TD",
                    matricule_enseignant: "11",
                    code_cours: "string",
                    heure_debut: "07:00:00",
                    heure_fin: "10:00:00",
                    code_salle: "string0",
                    nom_jour: "Tuesday",
                    id_plage: 1,
                },
                {
                    code: "INF3196",
                    semestre: 0,
                    titre: "string",
                    id_specialite: 0,
                    code_classe: "INFL3",
                    code_filiere: "string",
                    nom_seance: "TD",
                    matricule_enseignant: "12",
                    code_cours: "string",
                    heure_debut: "16:00:00",
                    heure_fin: "18:00:00",
                    code_salle: "string0",
                    nom_jour: "Tuesday",
                    id_plage: 1,
                },
                {
                    code: "INF3186",
                    semestre: 0,
                    titre: "string",
                    id_specialite: 0,
                    code_classe: "INFL3",
                    code_filiere: "string",
                    nom_seance: "TD",
                    matricule_enseignant: "4",
                    code_cours: "string",
                    heure_debut: "10:00:00",
                    heure_fin: "13:00:00",
                    code_salle: "string",
                    nom_jour: "Monday",
                    id_plage: 1,
                },
                {
                    code: "INF3036",
                    semestre: 0,
                    titre: "string",
                    id_specialite: 0,
                    code_classe: "INFL3",
                    code_filiere: "string",
                    nom_seance: "TD",
                    matricule_enseignant: "1",
                    code_cours: "string",
                    heure_debut: "13:00:00",
                    heure_fin: "16:00:00",
                    code_salle: "string",
                    nom_jour: "Monday",
                    id_plage: 1,
                },
                {
                    code: "INF3046",
                    semestre: 0,
                    titre: "string",
                    id_specialite: 0,
                    code_classe: "INFL3",
                    code_filiere: "string",
                    nom_seance: "TD",
                    matricule_enseignant: "5",
                    code_cours: "string",
                    heure_debut: "08:00:00",
                    heure_fin: "11:05:00",
                    code_salle: "string",
                    nom_jour: "Thursday",
                    id_plage: 1,
                },
                // {
                //     code: "GEOS1512",
                //     semestre: 0,
                //     titre: "string",
                //     id_specialite: 0,
                //     code_classe: "INFL1",
                //     code_filiere: "string",
                //     nom_seance: "TD",
                //     matricule_enseignant: "10",
                //     code_cours: "string",
                //     heure_debut: "11:00:00",
                //     heure_fin: "13:05:00",
                //     code_salle: "string",
                //     nom_jour: "Friday",
                //     id_plage: 1,
                // },
                // {
                //     code: "INF3136",
                //     semestre: 0,
                //     titre: "string",
                //     id_specialite: 0,
                //     code_classe: "INF4628",
                //     code_filiere: "string",
                //     nom_seance: "TD",
                //     matricule_enseignant: "7",
                //     code_cours: "string",
                //     heure_debut: "13:00:00",
                //     heure_fin: "15:05:00",
                //     code_salle: "string",
                //     nom_jour: "Saturday",
                //     id_plage: 1,
                // },
            ],
            // classes: [],
        };
    },
    mounted() {
        this.fetchPaths();
    },
    methods: {
        fetchDatas() {
            // console.log("searching")
            this.fetchActivities();
            // this.fetchCourses();
            this.$store.commit("saveCurrentClass", this.selectedClass);
            // console.log(this.$store.state.currentClass);
            this.viewTimeTable = true;
        },
        fetchPaths() {
            this.axios
                .get(this.$store.state.requestPaths.path + "/all")
                .then((response) => {
                    this.paths = response.data;
                });
        },
        fetchClasses() {
            this.axios
                .get(this.$store.state.requestPaths.classe + "/all/filieres", {
                    params: {
                        code_filiere: this.selectedPath,
                    },
                })
                .then((response) => {
                    this.classes = response.data;
                });
        },
        fetchActivities() {
            let requestPath =
                this.$store.state.requestPaths.table.activity.room + "/all";
            this.axios
                .get(requestPath, {
                    params: {
                        code: this.selectedRoom,
                        semestre: this.selectedSemester,
                    },
                })
                .then((response) => {
                    this.activities = response.data;
                });
        },
        fetchCourses() {
            let requestPath =
                this.$store.state.requestPaths.table.course.room + "/all";
            this.axios
                .get(requestPath, {
                    params: {
                        code: this.selectedRoom,
                        semestre: this.selectedSemester,
                    },
                })
                .then((response) => {
                    this.courses = response.data;
                });
        },
    },
};
</script>

<style scoped>
main {
    background: rgb(255, 255, 255);
    padding-top: 2rem;
}
header {
    text-align: center;
    flex-direction: column;
    display: flex;
    align-items: center;
    width: 100%;
}
form {
    display: flex;
    padding: 1rem;
    max-width: 50rem;
    width: 100%;
    gap: 1rem;
}
form > div {
    display: flex;
    align-items: center;
    width: 100%;
}
label {
    flex-shrink: 0;
    width: 5rem;
}
select {
    max-width: 15rem;
}
@media screen and (max-width: 850px) {
    form {
        flex-wrap: wrap;
    }
    button {
        margin-left: 6rem;
    }
}
</style>
