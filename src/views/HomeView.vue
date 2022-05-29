<template>
    <!--CCM stands for ChooseClassModal-->
    <HomepageMain @showCCM="showChooseClassModal" />
    <teleport to="#modals">
        <ChooseClass
            v-if="visibleChooseClassModal"
            @closeModal="closeChooseClassModal"
        />
    </teleport>
</template>

<script>
import HomepageMain from "../components/HomepageMain.vue";
import ChooseClass from "../components/ChooseClass.vue"
export default {
    name: "HomeView",
    components: { HomepageMain , ChooseClass},
    data() {
        return {
            visibleChooseClassModal: false,
        };
    },
    methods: {
        showChooseClassModal() {
            this.visibleChooseClassModal = true;
            console.log(this.visibleChooseClassModal )
        },
        closeChooseClassModal() {
            this.visibleChooseClassModal = false;
            console.log(this.visibleChooseClassModal )
        },
    },
};
</script>

<style></style>
