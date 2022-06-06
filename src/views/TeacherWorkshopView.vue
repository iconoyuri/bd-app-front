<template>
    <main>
        <header>
            <h1>Classroom timetable</h1>
            <form>
                <div>
                    <label for="line-form-1">Semester</label>
                    <select
                        class="form-control"
                        v-model="selectSemester"
                        id="line-form-1"
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
            :courses="courses"
            :activities="activities"
        ></TableDisplayer>
    </main>
</template>

<script>
import TableDisplayer from "../components/Table Module/TableDisplayer.vue";
export default {
    name: "TeacherWorkshopView",
    components: { TableDisplayer },
    data() {
        return {
            selectRoom: "",
            selectSemester: 2,
            activities: [],
        };
    },
    mounted() {
        this.fetchDatas();
    },
    methods: {
        fetchDatas() {
            this.fetchActivities();
            this.fetchCourses();
        },
        fetchActivities() {
            let requestPath =
                this.$store.state.requestPaths.table.activity.teacher;
            this.axios
                .get(requestPath, {
                    params: {
                        matricule: this.$route.params.matricule,
                        semestre: this.selectSemester,
                    },
                })
                .then((response) => {
                    this.activities = response.data;
                });
        },
        fetchCourses() {
            let requestPath = this.$store.state.requestPaths.table.course.teacher;
            this.axios
                .get(requestPath, {
                    params: {
                        matricule: this.$route.params.matricule,
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
