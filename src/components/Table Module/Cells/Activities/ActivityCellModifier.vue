<template>
    <!-- <slot></slot> -->
    <ModalWindow @closeModal="$emit('abortChanges')" title="Activity Form">
        <div class="alert alert-danger" v-if="errors">
            <ul>
                <li v-for="err in errors" :key="err">{{ err }}</li>
            </ul>
        </div>
        <form>
            <label for="line-form-1">Activity name</label>
            <input
                type="text"
                placeholder="Activity name"
                v-model="cache.nom"
                class="form-control"
                required
                id="line-form-1"
            />

            <label for="line-form-2">Date</label>
            <input
                type="date"
                v-model="cache.date_act"
                class="form-control"
                required
                id="line-form-2"
                min="2021-09-01"
                max="2022-08-31"
            />

            <label for="line-form-3">Start time</label>
            <input
                type="time"
                v-model="cache.heure_debut"
                class="form-control"
                required
                id="line-form-3"
            />

            <label for="line-form-3">End time</label>
            <input
                type="time"
                v-model="cache.heure_fin"
                class="form-control"
                required
                id="line-form-3"
            />

            <div class="form-group">
                <label for="line-form-1">Jours</label>
                <select
                    class="form-control"
                    v-model="cache.nom_jour"
                    id="exampleFormControlSelect1"
                >
                    <option v-for="day in days" :key="day">
                        {{ day.nom }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="line-form-1">Code Salle</label>
                <select
                    class="form-control"
                    v-model="cache.code_salle"
                    id="exampleFormControlSelect1"
                >
                    <option v-for="classe in classes" :key="classe">
                        {{ classe.code }}
                    </option>
                </select>
            </div>
        </form>
        <div class="buttons" @dblclick.self="abort">
            <button
                @click.prevent="setActivity"
                class="btn btn-outline-success"
            >
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
            .get(this.$store.state.backend_domain + "/room/all")
            .then((res) => {
                this.classes = res.data;
            })
            .catch((err) => {
                return err;
            });
    },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
            matricule: this.$store.state.matricule,
            cache: { ...this.field },
            days: [],
            classes: [],
            errors: undefined,
        };
    },
    methods: {
        setActivity() {
            this.axios
                .post(
                    this.$store.state.backend_domain + "/timetable/activity",
                    {
                        nom: this.cache.nom,
                        date_act: this.cache.date_act,
                        matricule_enseignant: this.matricule,
                        heure_debut: this.cache.heure_debut,
                        heure_fin: this.cache.heure_fin,
                        code_salle: this.cache.code_salle,
                        nom_jour: this.cache.nom_jour,
                    }
                )
                .then((response) => {
                    //this.$emit("stageChanges", response.data);
                    return response.data;
                })
                .catch((err) => {
                    if (err.response.data !== undefined) {
                        this.errors = err.response.data.detail;
                    }
                });
        },
        getDayName(date) {
            let fdate = new Date(date);
            return this.days[fdate.getDay()];
        },
    },
    computed: {},
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
