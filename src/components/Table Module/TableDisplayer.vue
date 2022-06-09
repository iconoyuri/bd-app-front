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
                v-for="dayProgram in weekSplitedProgram"
                :key="dayProgram"
                :dayName="dayProgram.nom"
                :sessions="dayProgram.sessions"
                :activities="dayProgram.activities"
            />
            <!-- {{courses}} -->
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
            weekSplitedProgram: {},
        };
    },
    mounted() {
        this.getWeekSplitedProgram();
    },
    methods: {
        getWeekSplitedProgram() {
            this.axios.get(this.requestPath.day + "/all").then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    this.weekSplitedProgram[response.data[i].nom] = response.data[i];
                    this.weekSplitedProgram[response.data[i].nom]["sessions"] =
                        this.session_selectDay(this.Tcourses, response.data[i].nom);
                    this.weekSplitedProgram[response.data[i].nom]["activities"] =
                        this.activity_selectDay(this.Tactivities, response.data[i].nom);
                    // console.log(this.weekSplitedProgram)
                    // console.log(this.Tactivities)
                }
            });
            console.log(this.weekSplitedProgram)
        },
        session_selectDay(table, dayName) {
            return table.filter(
                (element) => element.nom_jour == dayName
            );
        },
        activity_selectDay(table, dayName) {
            return table.filter(
                (element) => element.nom_jour == dayName
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
