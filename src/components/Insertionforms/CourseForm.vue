<template>
    <ContentInjector
        header="Insert Courses"
        :requestPath="requestPath.course"
        :cache="cache"
        ref="injector"
        @update="updateEntry"
        @delete="deleteEntry"
        @wipeCache="wipeCache"
        @backupEntry="backupEntry"
    >
        <template v-slot:table-headers>
            <th scope="col">Code</th>
            <th scope="col">Title</th>
            <th scope="col">Semester</th>
            <th scope="col">Session type</th>
            <th scope="col">Teacher</th>
            <th scope="col">Path</th>
            <th scope="col">Class</th>
            <th scope="col">Speciality</th>
        </template>
        <!--  -->
        <template v-slot:inputs>
            <label for="line-form-1">Course code</label>
            <input
                type="text"
                placeholder="Course code"
                v-model="cache.code"
                class="form-control"
                required
                id="line-form-1"
            />
            <label for="line-form-2">Course title</label>
            <input
                type="text"
                placeholder="Course title"
                v-model="cache.titre"
                class="form-control"
                required
                id="line-form-2"
            />
            <label for="line-form-3">Course semester</label>
            <input
                type="number"
                placeholder="Course semester"
                v-model="cache.semestre"
                class="form-control"
                required
                id="line-form-3"
            />
            <label for="line-form-4">Course session type</label>
            <select
                class="form-control"
                v-model="cache.nom_seance"
                id="line-form-4"
            >
                <option
                    v-for="session in sessions"
                    :key="session.nom"
                    :value="session.nom"
                >
                    {{ session.nom }}
                </option>
            </select>
            <label for="line-form-4">Lecturer</label>
            <select
                class="form-control"
                v-model="cache.matricule_enseignant"
                id="line-form-4"
            >
                <option
                    v-for="teacher in teachers"
                    :key="teacher.matricule"
                    :value="teacher.matricule"
                >
                    {{ teacher.nom }}
                </option>
            </select>
            <label for="line-form-6">Course path</label>
            <select
                class="form-control"
                v-model="cache.code_filiere"
                id="line-form-6"
            >
                <option
                    v-for="path in paths"
                    :key="path.code"
                    :value="path.code"
                >
                    {{ path.nom }}
                </option>
            </select>
            <label for="line-form-7">Course Class</label>
            <select
                class="form-control"
                v-model="cache.code_classe"
                id="line-form-7"
                @change="getSpecialities(cache.code_classe)"
            >
                <option
                    v-for="classe in classes"
                    :key="classe.code"
                    :value="classe.code"
                >
                    {{ classe.code }}
                </option>
            </select>
            <label for="line-form-8"
                >Is it a speciality exclusive course ?</label
            >
            <select
                class="form-control"
                v-model="cache.id_specialite"
                id="line-form-8"
            >
                <option
                    v-for="speciality in specialities"
                    :key="speciality.id"
                    :value="speciality.id"
                >
                    {{ speciality.nom }}
                </option>
            </select>
        </template>
        <!--  -->
    </ContentInjector>
</template>

<script>
import ContentInjector from "../Lines/ContentInjector.vue";

export default {
    components: { ContentInjector },
    data() {
        return {
            requestPath: this.$store.state.requestPaths,
            cache: {},
            sessions: [],
            teachers: [],
            paths: [],
            classes: [],
            specialities: [],
        };
    },
    mounted() {
        this.getAuxDatas();
    },
    methods: {
        getAuxDatas() {
            this.axios
                .get(this.requestPath.path + "/all")
                .then((response) => {
                    this.paths = response.data;
                })
                .catch((e) => console.log(e));
            this.axios
                .get(this.requestPath.session + "/all")
                .then((response) => {
                    this.sessions = response.data;
                })
                .catch((e) => console.log(e));
            this.axios
                .get(this.requestPath.teacher + "/all")
                .then((response) => {
                    this.teachers = response.data;
                })
                .catch((e) => console.log(e));
            this.axios
                .get(this.requestPath.classe + "/all")
                .then((response) => {
                    this.classes = response.data;
                })
                .catch((e) => console.log(e));
        },
        getSpecialities(classCode) {
            this.axios
                .get(this.requestPath.speciality + "/all", {
                    params: { code: classCode },
                })
                .then((response) => {
                    this.specialities = response.data;
                })
                .catch((e) => console.log(e));
        },
        updateEntry(entry) {
            this.axios
                .put(this.$refs.injector.requestPath, this.cache, {
                    params: { id: entry.id },
                })
                .then(() => {
                    // entry = this.cache;
                    this.$refs.injector.getDatas();
                })
                .catch((e) => console.log(e));
        },
        deleteEntry(entry) {
            this.axios
                .delete(this.$refs.injector.requestPath, {
                    params: { id: entry.id },
                })
                .then(() => {
                    this.$refs.injector.deleteLine(entry);
                });
        },
        backupEntry(entry) {
            this.cache = { ...entry };
        },
        wipeCache() {
            this.cache = {};
        },
    },
};
</script>
