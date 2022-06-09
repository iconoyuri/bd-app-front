<template>
    <!-- <slot></slot> -->
    <ModalWindow @closeModal="$emit('abortChanges')" :closeRedirect="false" title="Session Form">
        <form>
            <label for="line-form-1">Select Course</label>
            <select
                class="form-control"
                v-model="cache.code_cours"
                id="line-form-1"
            >
                <option
                    v-for="course in courses"
                    :key="course.nom"
                    :value="course.code"
                >
                    {{ course.titre }}
                </option>
            </select>
            <label for="line-form-2">Room code</label>
            <select
                class="form-control"
                v-model="cache.code_salle"
                id="line-form-2"
            >
                <option v-for="room in rooms" :key="room.nom" :value="room.nom">
                    {{ room.nom }}
                </option>
            </select>
            <label for="line-form-3">Start time</label>
            <input
                type="time"
                v-model="cache.heure_debut"
                class="form-control"
                required
                id="line-form-3"
            />
        </form>
        <div class="buttons" @dblclick.self="abort">
            <button @click.prevent="updateCell" class="btn btn-outline-success">
                <i class="fas fa-check"></i>
            </button>
            <button
                @click.prevent="$emit('abortChanges')"
                class="btn btn-danger"
            >
                <i class="fas fa-times"></i>
            </button>
        </div>
    </ModalWindow>
</template>

<script>
import ModalWindow from "../../../../components/assets/ModalWindow.vue";

export default {
    emits: ["abortChanges", "stageChanges"],
    components: { ModalWindow },
    props: {
        field: {
            default: {
                nom: "",
                date_act: "",
                matricule_enseignant: "",
                heure_debut: "",
                heure_fin: "",
                code_salle: "",
                nom_jour: "",
            },
        },
        dayName: {
            default: "Dididi",
        },
        // operation: {
        //     default: "post",
        // },
    },
    mounted() {
        this.axios.get(this.requestPath.day + "/all").then((response) => {
            this.days = response.data;
        });
        this.axios
            .get(this.requestPath.course + "/all/classe", {
                params: {
                    code_classe: "test",
                },
            })
            .then((response) => {
                this.courses = response.data;
            });
        this.axios
            .get(this.requestPath.room + "/all_possible_occupations", {
                params: {
                    effectif: "test",
                },
            })
            .then((response) => {
                this.rooms = response.data;
            });
    },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
            matricule: this.$store.state.matricule,
            cache: { ...this.field },
            courses: [],
            rooms: [],
            days: [],
            classcode: "",
        };
    },
    methods: {
        updateCell() {
            this.axios
                .put(
                    this.requestPath.table.activity.room,
                    {
                        nom: this.cache.nom,
                        date_act: this.cache.date_act,
                        matricule_enseignant: this.matricule,
                        heure_debut: this.cache.heure_debut,
                        heure_fin: this.cache.heure_fin,
                        code_salle: this.cache.code_salle,
                        nom_jour: this.getDayName(this.cache.date_act),
                    },
                    {
                        params: {
                            matricule_enseignant: this.field.matricule,
                            id_plage: this.field.id_plage,
                            code_salle: this.field.code_salle,
                            nom_jour: this.field.nom_jour,
                        },
                    }
                )
                .then((response) => {
                    this.$emit("stageChanges", response.data);
                });
        },
        getDayName(date) {
            let fdate = new Date(date);
            return this.days[fdate.getDay()];
        },
    },
};
</script>

<style scoped>
.form-line {
    width: 100%;
    padding: 1rem;
    border: 2px solid rgb(200, 232, 253);
    border-radius: 7px;
    box-shadow: 0 0 3px rgba(200, 232, 253, 0.5);
}
.form-line:hover {
    box-shadow: 0 0 5px rgba(165, 219, 255, 0.8);
    background-color: rgb(245, 247, 255);
}
.form-line p {
    text-transform: capitalize;
}
.buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin: 1rem 0 0;
}
</style>
