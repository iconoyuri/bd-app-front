<template>
    <main>
        <div class="grid-background">
            <div><span>7H</span></div>
            <div><span>8H</span></div>
            <div><span>9H</span></div>
            <div><span>10H</span></div>
            <div><span>11H</span></div>
            <div><span>12H</span></div>
            <div><span>13H</span></div>
            <div><span>14H</span></div>
            <div><span>15H</span></div>
            <div><span>16H</span></div>
            <div><span>17H</span></div>
            <div><span>18H</span></div>
            <div><span>19H</span></div>
            <div><span>20H</span></div>
            <div><span>21H</span></div>
            <div><span>22H</span></div>
        </div>
        <div class="columns">
            <ColumnDisplayer
                v-for="daysSessions in weekSessions"
                :key="daysSessions"
                :fields="daysSessions"
            />
        </div>
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
            time0: Date.parse("June 9, 2022 07:00:00"),
            dateRoot: "June 9, 2022 ",
            sessionTypes: [],
            weekSessions: {},
        };
    },
    mounted() {
        this.transformCourses();
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
        getWeekSessions() {
            this.axios.get(this.requestPath.day + "/all").then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    this.weekSessions[response.data[i].nom] = response.data[i];
                    this.weekSessions[response.data[i].nom]["sessions"] =
                        this.selectDay(this.Tcourses, response.data[i].nom);
                }
            });
        },
        positioningValue(time) {
            let numerictime = Date.parse(this.dateRoot + time) - this.time0;
            return numerictime / 10000;
        },
        percentPositioningValue(val) {
            return (val * 100) / this.containerHeight;
        },
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

<style scoped>
main {
    --padding-left: 4rem;
    --grid-height: 40rem;
    position: relative;
    padding: 0 var(--padding-left);
    min-height: 50rem;
    overflow-x: auto;
}
.grid-background {
    position: absolute;
    margin-top: 5rem;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: var(--grid-height);
    opacity: 0.35;
}
.grid-background div {
    width: 100%;
    height: 100%;
    border-top: 1px solid #555;
    padding-left: 1rem;
}
.grid-background span {
    font-size: 0.75rem;
    font-style: oblique;
    font-weight: bold;
}
.columns {
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, minmax(7rem, 1fr));
    gap: 1rem;
    height: 100%;
}
</style>
