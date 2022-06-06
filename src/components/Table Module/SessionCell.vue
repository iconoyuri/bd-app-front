<template>
    <article ref="article">
        <p class="session-type">{{ field.course.nom_seance }}</p>
        <div>
            <p class="course-code">{{ field.course.code }}</p>
            <p class="class-code">{{ field.course.code_classe }}</p>
        </div>
        <p class="teacher-name">{{ teacherName }}</p>
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
        setDimensions(){
            this.$refs.article.style.top = this.field.top + "%"
            this.$refs.article.style.height = this.field.height + "%"
        }
    },
    computed: {},
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
    gap: .5rem;
    padding: 0.8rem 0.8rem 0.7rem 0.5rem;
    background-color: rgb(92, 157, 255);
    border-radius: 3px;
    font-size: 0.8em;
    box-shadow: 2px 2px 3px #8885;
}
p {
    margin: 0;
    padding: 0;
}
div {
    display: flex;
    margin-right: .5rem;
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
    /* font-weight: bold; */
}
.course-code,
.class-code {
    font-size: 0.8rem;
}
</style>
