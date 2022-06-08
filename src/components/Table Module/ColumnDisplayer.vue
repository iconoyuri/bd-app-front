<template>
    <section>
        <h4>{{ dayName }}</h4>
        <div class="wrapper">
            <SessionCell
                v-for="session in sessions"
                :key="session"
                :field="session"
            />
            <ActivityCell
                v-for="activity in activities"
                :key="activity"
                :field="activity"
            />
            <!-- {{sessions}}
            {{activities}} -->
        </div>
    </section>
</template>

<script>
import SessionCell from "./Cells/Session/SessionCell.vue";
import ActivityCell from "./Cells/Activities/ActivityCell.vue";
export default {
    props: {
        dayName: {
            default: "Dididi",
        },
        sessions: {
            default: [],
        },
        activities: {
            default: [],
        },
    },
    components: { SessionCell, ActivityCell },
    // mounted(){
    //     alert("test")
    // },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
        };
    },
    methods: {},
};
</script>

<style scoped>
section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}
h4 {
    background-color: var(--bg-dark-color);
    color: white;
    text-align: center;
    border-radius: 7px 0;
    width: 100%;
}
.wrapper {
    position: absolute;
    margin-top: 5rem;
    width: 90%;
    height: var(--grid-height);
}
</style>
