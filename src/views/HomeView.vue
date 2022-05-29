<template>
    <!--CCM stands for ChooseClassModal-->
    <!--CRM stands for ChooseRoomModal-->
    <HomepageMain @showCCM="showChooseClassModal" @showCRM="showChooseRoomModal" />
    <teleport to="#modals">
        <ChooseClass
            v-if="visibleChooseClassModal"
            @closeModal="closeChooseClassModal"
        />
        <ChooseRoom
            v-if="visibleChooseRoomModal"
            @closeModal="closeChooseRoomModal"
        />
    </teleport>
</template>

<script>
import HomepageMain from "../components/HomepageMain.vue";
import ChooseClass from "../components/ChooseClass.vue";
import ChooseRoom from "../components/ChooseRoom.vue";
export default {
    name: "HomeView",
    components: { HomepageMain, ChooseClass, ChooseRoom },
    data() {
        return {
            visibleChooseClassModal: false,
            visibleChooseRoomModal: false,
        };
    },
    methods: {
        showChooseClassModal() {
            this.visibleChooseClassModal = true;
        },
        closeChooseClassModal() {
            this.visibleChooseClassModal = false;
        },
        showChooseRoomModal() {
            this.visibleChooseRoomModal = true;
        },
        closeChooseRoomModal() {
            this.visibleChooseRoomModal = false;
        },
    },
};
</script>

<style></style>
