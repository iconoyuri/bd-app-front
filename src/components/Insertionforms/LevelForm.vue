<template>
    <ContentInjector
        header="Insert Levels"
        :requestPath="requestPath"
        :cache="cache"
        @wipeCache="wipeCache"
        @backupEntry="backupEntry"
    >
        <template v-slot:table-headers> <th scope="col">Code</th> </template>
        <!--  -->
        <template v-slot:inputs>
            <label for="line-form">Level code</label>
            <input
                type="text"
                placeholder="Level code"
                v-model="cache.code"
                class="form-control"
                required
                id="line-form"
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
            requestPath: "/level",
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
