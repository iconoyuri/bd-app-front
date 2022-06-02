<template>
    <h2>Insert sessions types</h2>

    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Type</th>
                <th scope="col">Duration</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <SessionLine
                v-for="session in sessions"
                :nom="session.nom"
                :duree="session.duree"
                :key="session.nom"
                :modificationlock="modificationlock"
                @refresh="loadSessions"
                @start-modify="turnModifyStateOn"
                @end-modify="turnModifyStateOff"
            />
            <SessionLineForm
                v-if="addLineVisible"
                @refresh="loadSessions"
                @abort="turnAddingStateOff"
            />
        </tbody>
        <tfoot>
            <tr v-if="addBtnVisible">
                <td></td>
                <td class="buttons" colspan="2">
                    <button
                        @click.prevent="turnAddingStateOn"
                        class="btn btn-outline-primary"
                    >
                        Add <i class="fas fa-plus"></i>
                    </button>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import SessionLineForm from "./InsertionComponents/SessionLine/SessionLineForm.vue";
import SessionLine from "./InsertionComponents/SessionLine/SessionLine.vue";

export default {
    name: "SessionForm",
    components: { SessionLineForm, SessionLine },
    data() {
        return {
            addLineVisible: false,
            addBtnVisible: true,
            modificationlock: false,
            sessions: [],
        };
    },
    mounted() {
        this.loadSessions();
    },
    methods: {
        loadSessions() {
            console.log("Sessions Loading");
            this.turnAddingStateOff();
            this.axios
                .get("/course_type")
                .then((response) => {
                    this.sessions = response.data;
                })
                .catch((e) => console.log(e));
        },
        turnAddingStateOn() {
            this.showInputForm();
            this.hideAddBtn();
        },
        turnAddingStateOff() {
            this.hideInputForm();
            this.showAddBtn();
        },
        turnModifyStateOn() {
            this.turnAddingStateOff();
            this.hideAddBtn();
            this.modificationlock = true;
        },
        turnModifyStateOff() {
            this.turnAddingStateOff();
            this.modificationlock = false;
        },
        addSession() {},
        hideInputForm() {
            this.addLineVisible = false;
        },
        showInputForm() {
            this.addLineVisible = true;
        },
        hideAddBtn() {
            this.addBtnVisible = false;
        },
        showAddBtn() {
            this.addBtnVisible = true;
        },
    },
};
</script>

<style scoped>
.table td {
    text-transform: capitalize;
}
.table td:nth-child(1) {
    min-width: 8rem;
}
.buttons {
    text-align: right;
}
.buttons button {
    width: 5rem;
}
</style>
