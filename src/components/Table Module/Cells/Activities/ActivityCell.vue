<template>
    <article ref="article">
        <p class="session-type">Act</p>
        <div>
            <p class="course-code">{{ cache.nom_seance }}</p>
            <!-- <p class="class-code">{{ cache.course.code_classe }}</p> -->
        </div>
        <p class="teacher-name">{{ teacherName }}</p>
        <div v-if="ownerLogged" class="buttons">
            <button @click.prevent="editActivity" class="btn btn-primary">
                <i class="fa-solid fa-pencil"></i>
            </button>
            <button @click.prevent="deleteActivity" class="btn btn-danger">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    </article>
    <ActivityCellModifier
        v-if="modificationFormVisible"
        @stageChanges="refreshCell"
        @abortChanges="endModify"
        :field="cache"
        :dayName="dayName"
    >
        <slot name="inputs"></slot>
    </ActivityCellModifier>
</template>

<script>
import ActivityCellModifier from "./ActivityCellModifier.vue";

export default {
    props: {
        field: {
            default: {},
        },
        dayName: {
            default: "Dididi",
        },
    },
    components: { ActivityCellModifier },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
            ownerLogged: true,
            cache: { ...this.field },
            teacherName: "",
            matricule: this.$store.state.matricule,
            dateRoot: this.$store.state.dateRoot,
            time0: this.$store.state.time0,
            modificationFormVisible: false,
        };
    },
    mounted() {
        this.calculatePositioning();
        this.getInformations();
        this.setDimensions();
    },
    methods: {
        getInformations() {
            this.getTeacher(this.field.matricule_enseignant);
        },
        refreshCell(field) {
            this.cache = { ...field };
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
        editActivity(){
            this.startModify();
        },
        deleteActivity() {
            this.axios
                .delete(this.requestPath.activity, {
                    params: {
                        matricule_enseignant: this.field.matricule_enseignant,
                        id_plage: this.field.id_plage,
                        code_salle: this.field.code_salle,
                        nom_jour: this.field.nom_jour,
                    },
                })
                .catch((e) => alert("Désolé. Seul le propriétaire de cette activité peut la supprimer"));
        },
        setDimensions() {
            this.$refs.article.style.top = this.cache.top + "%";
            this.$refs.article.style.height = this.cache.height + "%";
        },
        startModify() {
            this.modificationFormVisible = true;
        },
        endModify() {
            this.modificationFormVisible = false;
        },
        calculatePositioning() {
            let startTime = this.cache.heure_debut;
            let endTime = this.cache.heure_fin;

            let startTimeValue = this.positioningValue(startTime);
            let endTimeValue = this.positioningValue(endTime);

            this.cache.top = this.percentPositioningValue(startTimeValue);
            this.cache.height = this.percentPositioningValue(
                endTimeValue - startTimeValue
            );
        },
        positioningValue(time) {
            let numerictime = Date.parse(this.dateRoot + time) - this.time0;
            return numerictime / 10000;
        },
        percentPositioningValue(val) {
            return (val * 100) / this.containerHeight;
        },
    },
    computed: {
        containerHeight() {
            return (
                this.positioningValue("22:00:00") -
                this.positioningValue("07:00:00")
            );
        },
    },
};
</script>

<style scoped>
article {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.8rem 0.8rem 0.7rem 0.5rem;
    background-color: rgb(235, 255, 123);
    border-radius: 3px;
    font-size: 0.8em;
    box-shadow: 2px 2px 3px #8885;
}
.buttons {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    top: -1rem;
    right: -2rem;
}
.buttons button {
    padding: 0;
}
.buttons i {
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.3rem;
    height: 1.3rem;
}
p {
    margin: 0;
    padding: 0;
}
div {
    display: flex;
    margin-right: 0.5rem;
    justify-content: space-between;
    gap: 0.7rem;
}
.session-type {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 0.8em;
    opacity: 0.8;
}
.course-code,
.class-code,
.teacher-name {
    text-transform: capitalize;
}
.course-code {
    text-transform: uppercase;
}
.class-code {
    font-weight: bold;
}
.teacher-name {
    font-size: 0.8rem;
}
.course-code,
.class-code {
    font-size: 0.8rem;
}
</style>
