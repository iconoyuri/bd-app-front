<template>
    <h2>Insert Teachers</h2>

    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Matricule</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Path</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tfoot>
            <tr v-if="addBtnVisible">
                <td></td>
                <td></td>
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
                v-for="teacher in entries"
                :key="teacher"
                :modificationlock="modificationlock"
                @update="updateEntry(teacher)"
                @delete="deleteEntry(teacher)"
                @start-modify="turnModifyStateOn(teacher)"
                @end-modify="turnModifyStateOff"
            >
                <td class="type">{{ teacher.matricule }}</td>
                <td class="type">{{ teacher.nom }}</td>
                <td class="type">{{ teacher.email }}</td>
                <td class="type">{{ teacher.code_filiere }}</td>
                <!--  -->
                <template v-slot:inputs>
                    <label for="line-form-1">Teacher matricule</label>
                    <input
                        type="text"
                        placeholder="teacher matricule"
                        v-model="cache.matricule"
                        class="form-control"
                        required
                        id="line-form-1"
                    />
                    <label for="line-form-2">Teacher name</label>
                    <input
                        type="text"
                        placeholder="Teacher Name"
                        v-model="cache.nom"
                        class="form-control"
                        required
                        id="line-form-2"
                    />
                    <label for="line-form-3">Teacher email</label>
                    <input
                        type="email"
                        placeholder="teacher email"
                        v-model="cache.email"
                        class="form-control"
                        required
                        id="line-form-3"
                    />
                    <label for="line-form-4">Teacher path</label>
                    <select class="form-control" v-model="cache.code_filiere" id="line-form-4">
                        <option
                            v-for="path in paths"
                            :key="path.code"
                            :value="path.code"
                        >
                            {{ path.nom }}
                        </option>
                    </select>
                </template>
            </Line>
            <!--Here we follow the git vocabulary (stage)-->
            <LineForm
                v-if="addLineVisible"
                @stageChanges="postCache"
                @abortChanges="turnAddingStateOff"
            >
                <label for="line-form-1">Teacher matricule</label>
                <input
                    type="text"
                    placeholder="teacher matricule"
                    v-model="cache.matricule"
                    class="form-control"
                    required
                    id="line-form-1"
                />
                <label for="line-form-2">Teacher name</label>
                <input
                    type="text"
                    placeholder="Teacher Name"
                    v-model="cache.nom"
                    class="form-control"
                    required
                    id="line-form-2"
                />
                <label for="line-form-3">Teacher email</label>
                <input
                    type="email"
                    placeholder="teacher email"
                    v-model="cache.email"
                    class="form-control"
                    required
                    id="line-form-3"
                />
                <label for="line-form-4">Teacher path</label>
                <select class="form-control" v-model="cache.code_filiere" id="line-form-4">
                    <option
                        v-for="path in paths"
                        :key="path.code"
                        :value="path.code"
                    >
                        {{ path.nom }}
                    </option>
                </select>
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
            requestPath: {
                teacher: "/teacher",
                paths: "/filiere",
            },
            cache: {},
            entries: [],
            paths: [],
        };
    },
    mounted() {
        this.getPaths();
        this.getDatas();
    },
    methods: {
        getPaths() {
            this.axios
                .get(this.requestPath.paths + "/all")
                .then((response) => {
                    this.paths = response.data;
                })
                .catch((e) => console.log(e));
        },
        getDatas() {
            this.turnAddingStateOff();
            this.axios
                .get(this.requestPath.teacher + "/all")
                .then((response) => {
                    this.entries = response.data;
                })
                .catch((e) => console.log(e));
        },
        postCache() {
            this.axios
                .post(this.requestPath.teacher, this.cache)
                .then(() => {
                    this.getDatas();
                })
                .catch((e) => console.log(e));
        },
        updateEntry(entry) {
            this.axios
                .put(this.requestPath.teacher, this.cache, {
                    params: {
                        code: entry.code,
                    },
                })
                .then(() => {
                    entry = this.cache;
                })
                .catch((e) => console.log(e));
        },
        deleteEntry(entry) {
            this.axios
                .delete(this.requestPath.teacher, {
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
            this.cache = { code: "" };
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
