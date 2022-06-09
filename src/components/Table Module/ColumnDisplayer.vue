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

            <button
                @click="displayAddingForm"
                class="btn btn-outline-primary btn-lg add-button"
                v-if="addingEnabled"
            >
                <i class="fas fa-plus"></i>
                <span>Add a course</span>
            </button>
        </div>
        <SessionCellModifier v-if="visibleCellModifier" :dayName="dayName" @abortChanges="hideAddingForm" />
    </section>
</template>

<script>
import SessionCell from "./Cells/Session/SessionCell.vue";
import SessionCellModifier from "./Cells/Session/SessionCellModifier.vue";
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
        addingEnabled: {
            default: true,
        },
    },
    components: { SessionCell, SessionCellModifier, ActivityCell },
    // mounted(){
    //     alert("test")
    // },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
            visibleCellModifier: false,
        };
    },
    methods: {
        displayAddingForm() {
            this.visibleCellModifier = true;
        },
        hideAddingForm() {
            this.visibleCellModifier = false;
            console.log(this.visibleCellModifier)
        },
        addSession() {},
    },
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
    position: sticky;
    position: -webkit-sticky; /* Safari */
    top: 0;
}
.wrapper {
    position: absolute;
    margin-top: 5rem;
    width: 90%;
    height: var(--grid-height);
}
.add-button {
    font-size: 1rem;
    /* position: -webkit-sticky !important;
    position: sticky !important;
    bottom: 0px !important; */
    display: flex;
    align-items: center;
}
.add-button i {
    width: 2rem;
}
</style>
