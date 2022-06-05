<template>
    <ContentInjector
        header="Insert Courses"
        :requestPath="requestPath"
        :cache="cache"
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
                type="email"
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
            requestPath: "/course",
            auxRequestPath: {
                session: "/",
                teacher: "/",
                classe: "/",
                speciality: "/",
                paths: "/paths",
            },
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
                .get(this.auxRequestPath.paths + "/all")
                .then((response) => {
                    this.paths = response.data;
                })
                .catch((e) => console.log(e));
            this.axios
                .get(this.auxRequestPath.session + "/all")
                .then((response) => {
                    this.sessions = response.data;
                })
                .catch((e) => console.log(e));
            this.axios
                .get(this.auxRequestPath.teacher + "/all")
                .then((response) => {
                    this.teachers = response.data;
                })
                .catch((e) => console.log(e));
            this.axios
                .get(this.auxRequestPath.classe + "/all")
                .then((response) => {
                    this.classes = response.data;
                })
                .catch((e) => console.log(e));
        },
        getSpecialities(classCode) {
            this.axios
                .get(this.auxRequestPath.speciality + "/all", {
                    params: { code: classCode },
                })
                .then((response) => {
                    this.specialities = response.data;
                })
                .catch((e) => console.log(e));
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
