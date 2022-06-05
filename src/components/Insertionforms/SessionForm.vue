<template>
    <ContentInjector
        header="Insert Sessions Types"
        :requestPath="requestPath"
        :cache="cache"
        @wipeCache="wipeCache"
        @backupEntry="backupEntry"
    >
        <template v-slot:table-headers>
            <th scope="col">Name</th>
            <th scope="col">Duration</th>
        </template>
        <!--  -->
        <template v-slot:inputs>
            <label for="line-form-1">Session type</label>
            <input
                type="text"
                placeholder="Session type"
                v-model="cache.nom"
                class="form-control"
                required
                id="line-form-1"
            />

            <label for="line-form-2">Duration</label>
            <input
                type="time"
                v-model="cache.duree"
                class="form-control"
                required
                id="line-form-2"
            />
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
            requestPath: "/course_type",
            cache: {},
        };
    },
    methods: {
        backupEntry(entry) {
            this.cache = { ...entry };
        },
        wipeCache() {
            this.cache = {};
        },
    },
};
</script>
