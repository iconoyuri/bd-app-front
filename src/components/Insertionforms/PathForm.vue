<template>
    <h2>Insert Paths</h2>

    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Code</th>
                <th scope="col">Name</th>
                <th scope="col"></th>
            </tr>
        </thead>
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
        <tbody>
            <Line
                v-for="path in entries"
                :key="path"
                :modificationlock="modificationlock"
                @update="updateEntry(path)"
                @delete="deleteEntry(path)"
                @start-modify="turnModifyStateOn(path)"
                @end-modify="turnModifyStateOff"
            >
                <td class="type">{{ path.code }}</td>
                <td class="type">{{ path.nom }}</td>

                <!--  -->
                <template v-slot:inputs>
                    <label for="line-form-1">Path code</label>
                    <input
                        type="text"
                        placeholder="Path code"
                        v-model="cache.code"
                        class="form-control"
                        required
                        id="line-form-1"
                    />

                    <label for="line-form-2">Path name</label>
                    <input
                        type="text"
                        placeholder="Path name"
                        v-model="cache.nom"
                        class="form-control"
                        required
                        id="line-form-2"
                    />
                </template>
            </Line>
            <!--Here we follow the git vocabulary (stage)-->
            <LineForm
                v-if="addLineVisible"
                @stageChanges="postCache"
                @abortChanges="turnAddingStateOff"
            >
                    <label for="line-form-1">Path code</label>
                    <input
                        type="text"
                        placeholder="Path code"
                        v-model="cache.code"
                        class="form-control"
                        required
                        id="line-form-1"
                    />

                    <label for="line-form-2">Path name</label>
                    <input
                        type="text"
                        placeholder="Path name"
                        v-model="cache.nom"
                        class="form-control"
                        required
                        id="line-form-2"
                    />
            </LineForm>
        </tbody>
    </table>
</template>

<script>
import LineForm from "../Lines/LineForm.vue";
import Line from "../Lines/Line.vue";

export default {
    components: { LineForm, Line },
    data() {
        return {
            addLineVisible: false,
            addBtnVisible: true,
            modificationlock: false,
            requestPath: "/filiere",
            cache: {},
            entries: [],
        };
    },
    mounted() {
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
        updateEntry(entry) {
            this.axios
                .put(this.requestPath, this.cache, {
                    params: { code: entry.code },
                })
                .then(() => {
                    entry = this.cache;
                })
                .catch((e) => console.log(e));
        },
        deleteEntry(entry) {
            this.axios
                .delete(this.requestPath, {
                    params: { code: entry.code },
                })
                .then(() => {
                    this.entries = this.deleteLine(entry);
                });
        },
        backupEntry(entry) {
            this.cache = { ...entry };
        },
        wipeCache() {
            this.cache = {};
        },
        turnAddingStateOn() {
            this.wipeCache();
            //
            this.showInputForm();
            this.hideAddBtn();
        },
        turnAddingStateOff() {
            this.hideInputForm();
            this.showAddBtn();
        },
        turnModifyStateOn(entry) {
            this.backupEntry(entry);
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
