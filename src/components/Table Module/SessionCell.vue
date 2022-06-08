<template>
    <article ref="article">
        <p class="session-type">{{ cache.course.nom_seance }}</p>
        <div>
            <p class="course-code">{{ cache.course.code }}</p>
            <p class="class-code">{{ cache.course.code_classe }}</p>
        </div>
        <p class="teacher-name">{{ teacherName }}</p>
        <div v-if="adminLogged" class="buttons">
            <button @click.prevent="editSession" class="btn btn-danger">
                <i class="fa-solid fa-pencil"></i>
            </button>
            <button @click.prevent="deleteSession" class="btn btn-danger">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    </article>
    <SessionCellModifier
        v-if="modificationFormVisible"
        @stageChanges="refreshCell"
        @abortChanges="endModify"
        :field="cache"
    >
        <slot name="inputs"></slot>
    </SessionCellModifier>
</template>

<script>
import SessionCellModifier from "./SessionCellModifier.vue";

export default {
    props: {
        field: {
            default: [],
        },
    },
    components: { SessionCellModifier },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
            adminLogged: this.$store.getters.userIsAdmin,
            cache: [...field],
            teacherName: "",
            sessionTypes: [],
            dateRoot: this.$store.state.dateRoot,
            time0: this.$store.state.time0,
        };
    },
    mounted() {
        this.calculatePositioning();
        this.getSessionTypes();
        this.getInformations();
        this.setDimensions();
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
        refreshCell(field) {
            this.cache = [...field];
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
        deleteSession() {},
        setDimensions() {
            this.$refs.article.style.top = this.field.top + "%";
            this.$refs.article.style.height = this.field.height + "%";
        },
        startModify() {
            this.modificationFormVisible = true;
        },
        endModify() {
            this.modificationFormVisible = false;
        },
        calculatePositioning() {
            let startTime = cache.programmation.heure_debut;
            let endTime = cache.programmation.heure_fin;

            let startTimeValue = this.positioningValue(startTime);
            let endTimeValue = this.positioningValue(endTime);

            cache.top = this.percentPositioningValue(startTimeValue);
            cache.height = this.percentPositioningValue(
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
    background-color: rgb(92, 157, 255);
    border-radius: 3px;
    font-size: 0.8em;
    box-shadow: 2px 2px 3px #8885;
}
.buttons {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    top: -0.5rem;
    right: -0.5rem;
    /* border-radius: 8rem; */
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
