<template>
    <main>
        <header>
            <h1>Welcome to your workshop</h1>
            <h3>What will you do today ?</h3>
        </header>
        <main class="splited">
            <section>
                <h3>Consult my timetable</h3>
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
            </section>
            <section>
                <h3>Create a new activity</h3>
                <button
                    @click="displayActivityPlanningForm"
                    type="button"
                    class="btn btn-dark"
                >
                    Plan an activity
                </button>
                <ActivityCellModifier v-if="activityPlanDisplay" />
            </section>
        </main>
        <h1>Classroom timetable</h1>
        <TableDisplayer
            :courses="courses"
            :activities="activities"
        ></TableDisplayer>
    </main>
</template>

<script>
import TableDisplayer from "../components/Table Module/TableDisplayer.vue";
import ActivityCellModifier from "../components/Table Module/Cells/Activities/ActivityCellModifier.vue";
export default {
    name: "TeacherWorkshopView",
    components: { TableDisplayer, ActivityCellModifier },
    data() {
        return {
            selectRoom: "",
            selectSemester: 2,
            activities: [],
            activityPlanDisplay: false,
        };
    },
    mounted() {
        this.fetchDatas();
    },
    methods: {
        displayActivityPlanningForm() {
            this.activityPlanDisplay = true;
        },
        hideActivityPlanningForm() {
            this.activityPlanDisplay = false;
        },
        fetchDatas() {
            this.fetchActivities();
            this.fetchCourses();
        },
        fetchActivities() {
            let requestPath =
                this.$store.state.requestPaths.table.activity.teacher + "/all";
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
            let requestPath =
                this.$store.state.requestPaths.table.course.teacher + "/all";
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
main,
header,
section,
h1 {
    text-align: center;
}
header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.splited {
    display: flex;
    align-content: stretch;
}
section {
    width: 100%;
    min-height: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 5rem;
    /* text-align: center; */
}
section + section {
    border-left: 1px solid #ccc;
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
