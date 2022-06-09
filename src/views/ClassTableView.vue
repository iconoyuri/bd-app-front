<template>
    <main>
        <header>
            <h1>Class timetable</h1>
            <form>
                <div>
                    <label for="line-form-1">Path</label>
                    <select
                        class="form-control"
                        v-model="selectPath"
                        id="line-form-1"
                    >
                        <option
                            v-for="path in paths"
                            :key="path"
                            :value="path.code"
                            @change="fetchClasses"
                        >
                            {{ path.nom }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="line-form-2">Class</label>
                    <select
                        class="form-control"
                        v-model="selectClass"
                        id="line-form-2"
                    >
                        <option
                            v-for="classe in classes"
                            :key="classe"
                            :value="classe.code"
                        >
                            {{ classe.code }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="line-form-3">Semester</label>
                    <select
                        class="form-control"
                        v-model="selectSemester"
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
            :courses="courses"
            :activities="activities"
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
            selectPath: "",
            selectClass: "",
            selectSemester: 2,
            viewTimeTable: false,
            activities: [],
            courses: [],
            paths: [],
            classes: [],
        };
    },
    mounted() {
        this.fetchPaths();
    },
    methods: {
        fetchDatas() {
            this.fetchActivities();
            this.fetchCourses();
            this.viewTimeTable = true
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
                .get(this.$store.state.requestPaths.classe + "/all", {
                    params: {
                        code: this.selectPath,
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
                        code: this.selectRoom,
                        semestre: this.selectSemester,
                    },
                })
                .then((response) => {
                    this.activities = response.data;
                });
        },
        fetchCourses() {
            let requestPath = this.$store.state.requestPaths.table.course.room + "/all";
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
