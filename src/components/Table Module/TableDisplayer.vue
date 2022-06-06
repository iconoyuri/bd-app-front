<template>
    <main>
        <ColumnDisplayer
            v-for="daysSessions in weekSessions"
            :key="daysSessions"
            :fields="daysSessions"
        />
    </main>
</template>

<script>
import ColumnDisplayer from "./ColumnDisplayer.vue";

export default {
    props: {
        activities: {
            default: [],
        },
        courses: {
            default: [],
        },
    },
    components: { ColumnDisplayer },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
            Tactivities: [...this.activities],
            Tcourses: [...this.courses],
            time0: Date.parse("June 9, 2022 00:00:00"),
            dateRoot: "June 9, 2022 ",
            sessionTypes: [],
            weekSessions: {},
        };
    },
    mounted() {
        this.transformCourses();
        // this.getSessions();
        this.getWeekSessions();
    },
    methods: {
        transformCourses() {
            this.Tcourses.forEach((element) => {
                let startTime = element.programmation.heure_debut;
                let endTime = element.programmation.heure_fin;

                let startTimeValue = this.positioningValue(startTime);
                let endTimeValue = this.positioningValue(endTime);

                element.top = this.percentPositioningValue(startTimeValue);
                element.height = this.percentPositioningValue(
                    endTimeValue - startTimeValue
                );
            });
        },
        // getSessions() {
        //     this.axios
        //         .get(this.requestPath.session + "/all")
        //         .then((response) => {
        //             this.sessionTypes = response.data;
        //             this.extract();
        //         });
        // },
        getWeekSessions() {
            this.axios.get(this.requestPath.day + "/all").then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    this.weekSessions[response.data[i].nom] = response.data[i];
                    this.weekSessions[response.data[i].nom]["sessions"] =
                        this.selectDay(this.Tcourses, response.data[i].nom);
                }
            });
        },
        // getCoursesPerSessions() {
        //     this.axios.get(this.requestPath.session + "/all").then((response) => {
        //         for (let i = 0; i < response.data.length; i++) {
        //             this.WeekSessions[response.data[i].nom] =
        //                 response.data[i];
        //             this.WeekSessions[response.data[i].nom]["courses"] =
        //                 this.selectDay(this.Tcourses, response.data[i].nom);
        //         }
        //         console.log(this.WeekSessions);
        //     });
        // },
        positioningValue(time) {
            let numerictime = Date.parse(this.dateRoot + time) - this.time0;
            return numerictime / 10000;
        },
        percentPositioningValue(val) {
            return (val * 100) / this.containerHeight;
        },
        // extractSessions(table) {
        //     let splitedContent = [];
        //     this.sessionTypes.forEach((session) => {
        //         splitedContent.push(this.selectSession(table, session.nom));
        //     });
        //     return splitedContent;
        // },
        // selectSession(table, sessionName) {
        //     return table.filter(
        //         (element) => element.course.nom_seance == sessionName
        //     );
        // },
        selectDay(table, dayName) {
            return table.filter(
                (element) => element.programmation.nom_jour == dayName
            );
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

<style></style>
