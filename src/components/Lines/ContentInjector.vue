<template>
    <h2>{{ header }}</h2>
    <table class="table">
        <thead class="thead-dark">
            <tr ref="headers">
                <slot name="table-headers"></slot>
                <th scope="col"></th>
            </tr>
        </thead>
        <tfoot>
            <tr v-if="addingEnabled && addBtnVisible">
                <td v-for="i in lakingCells" :key="i"></td>
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
        <tbody>
            <Line
                v-for="entry in entries"
                :key="entry"
                :modificationlock="modificationlock"
                @update="$emit('update', entry)"
                @delete="$emit('delete', entry)"
                @start-modify="turnModifyStateOn(entry)"
                @end-modify="turnModifyStateOff"
            >
                <td class="type" v-for="key in entry" :key="key">{{ key }}</td>

                <!--  -->
                <template v-slot:inputs>
                    <slot name="inputs"></slot>
                </template>
            </Line>
            <!--Here we follow the git vocabulary (stage)-->
            <LineForm
                v-if="addingEnabled && addLineVisible"
                :cellsNb="lakingCells"
                @stageChanges="postCache"
                @abortChanges="turnAddingStateOff"
            >
                <slot name="inputs"></slot>
            </LineForm>
        </tbody>
    </table>
</template>

<script>
import LineForm from "./LineForm.vue";
import Line from "./Line.vue";
export default {
    emits: ["wipeCache", "backupEntry", "update", "delete"],
    props: ["header", "cache", "requestPath", "addingEnabled"],
    props: {
        header: {
            default: "Insertion",
        },
        cache: {
            default: {},
        },
        requestPath: {
            default: "/",
        },
        addingEnabled: {
            default: true,
        },
    },
    components: { LineForm, Line },
    data() {
        return {
            addLineVisible: false,
            addBtnVisible: true,
            modificationlock: false,
            lakingCells: 0,
            entries: [],
        };
    },
    mounted() {
        this.lakingCells = this.$refs.headers.children.length - 1;
        this.getDatas();
    },
    methods: {
        getDatas() {
            this.turnAddingStateOff();
            this.axios
                .get(this.requestPath + "/all")
                .then((response) => {
                    this.entries = response.data;
                })
                .catch((e) => console.log(e));
        },
        postCache() {
            this.axios
                .post(this.requestPath, this.cache)
                .then(() => {
                    this.getDatas();
                })
                .catch((e) => console.log(e));
        },
        turnAddingStateOn() {
            this.$emit("wipeCache");
            //
            this.showInputForm();
            this.hideAddBtn();
        },
        turnAddingStateOff() {
            this.hideInputForm();
            this.showAddBtn();
        },
        turnModifyStateOn(entry) {
            this.$emit("backupEntry", entry);
            //
            this.turnAddingStateOff();
            this.hideAddBtn();
            this.modificationlock = true;
        },
        turnModifyStateOff() {
            this.turnAddingStateOff();
            this.modificationlock = false;
        },
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
    computed: {
        deleteLine(entry) {
            return this.entries.filter((e) => e != entry);
        },
    },
};
</script>

<style scoped>
.table {
    border-radius: 7px 0 0 0;
    overflow: hidden;
}
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
