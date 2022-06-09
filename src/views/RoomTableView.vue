<template>
    <main>
        <header>
            <h1>Classroom timetable</h1>
            <form>
                <div>
                    <label for="line-form-1">Select a Room</label>
                    <select
                        class="form-control"
                        v-model="selectRoom"
                        id="line-form-1"
                    >
                        <option
                            v-for="room in rooms"
                            :key="room"
                            :value="room.code"
                        >
                            {{ room.code }} ({{ room.effectif }} places)
                        </option>
                    </select>
                </div>
                <div>
                    <label for="line-form-2">Semester</label>
                    <select
                        class="form-control"
                        v-model="selectSemester"
                        id="line-form-2"
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
            :addingEnabled="false"
        ></TableDisplayer>
    </main>
</template>

<script>
import TableDisplayer from "../components/Table Module/TableDisplayer.vue";
export default {
    name: "RoomTableView",
    components: { TableDisplayer },
    data() {
        return {
            selectRoom: "",
            selectSemester: 2,
            activities: [
                {
                    code: "INF3046",
                    semestre: 0,
                    titre: "string",
                    id_specialite: 0,
                    id_plage: 2,
                    code_classe: "INFL3",
                    code_filiere: "string",
                    nom_seance: "TD",
                    matricule_enseignant: "19M2222",
                    code_cours: "string",
                    heure_debut: "12:00:00",
                    heure_fin: "15:00:00",
                    code_salle: "string0",
                    nom_jour: "Tuesday",
                },
            ],
            // courses: [],
            courses: [
                {
                    code: "INF3046",
                    semestre: 0,
                    titre: "string",
                    id_specialite: 0,
                    code_classe: "INFL3",
                    code_filiere: "string",
                    nom_seance: "TD",
                    matricule_enseignant: "19M2222",
                    code_cours: "string",
                    heure_debut: "07:00:00",
                    heure_fin: "09:00:00",
                    code_salle: "string0",
                    nom_jour: "Tuesday",
                    id_plage: 1,
                },
                {
                    code: "string",
                    semestre: 0,
                    titre: "string",
                    id_specialite: 0,
                    code_classe: "string",
                    code_filiere: "string",
                    nom_seance: "TD",
                    matricule_enseignant: "19M2520",
                    code_cours: "string",
                    heure_debut: "10:00:00",
                    heure_fin: "13:05:00",
                    code_salle: "string",
                    nom_jour: "Monday",
                    id_plage: 1,
                },
                {
                    code: "string",
                    semestre: 0,
                    titre: "string",
                    id_specialite: 0,
                    code_classe: "string",
                    code_filiere: "string",
                    nom_seance: "TD",
                    matricule_enseignant: "12345",
                    code_cours: "string",
                    heure_debut: "07:00:00",
                    heure_fin: "09:05:00",
                    code_salle: "string",
                    nom_jour: "Monday",
                    id_plage: 1,
                },
                {
                    code: "string",
                    semestre: 0,
                    titre: "string",
                    id_specialite: 0,
                    code_classe: "string",
                    code_filiere: "string",
                    nom_seance: "TD",
                    matricule_enseignant: "12345",
                    code_cours: "string",
                    heure_debut: "08:00:00",
                    heure_fin: "11:05:00",
                    code_salle: "string",
                    nom_jour: "Thursday",
                    id_plage: 1,
                },
                {
                    code: "string",
                    semestre: 0,
                    titre: "string",
                    id_specialite: 0,
                    code_classe: "string",
                    code_filiere: "string",
                    nom_seance: "TD",
                    matricule_enseignant: "12345",
                    code_cours: "string",
                    heure_debut: "13:00:00",
                    heure_fin: "15:05:00",
                    code_salle: "string",
                    nom_jour: "Saturday",
                    id_plage: 1,
                },
            ],
            rooms: [],
        };
    },
    mounted() {
        this.fetchRooms();
    },
    methods: {
        fetchDatas() {
            // this.fetchActivities();
            // this.fetchCourses();
            this.$store.commit("setCurrentRoomCode", this.selectRoom)
            this.viewTimeTable = true
        },
        fetchRooms() {
            this.axios
                .get(this.$store.state.requestPaths.room + "/all")
                .then((response) => {
                    this.rooms = response.data;
                });
        },
        fetchActivities() {
            let requestPath =
                this.$store.state.requestPaths.table.activity.room + "/all";
            this.axios
                .get(requestPath, {
                    params: {
                        code: this.selectRoom,
                        semestre: this.selectSemester,
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
                        code: this.selectRoom,
                        semestre: this.selectSemester,
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
    grid-gap: 1rem;
    align-items: center;
    width: 100%;
}
label {
    flex-shrink: 0;
    width: 7rem;
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
