<template>
    <!--CCM stands for ChooseClassModal-->
    <!--CRM stands for ChooseRoomModal-->
    <!--DIM stands for DataInsertionModal-->
    <HomepageMain
        @showCCM="showChooseClassModal"
        @showCRM="showChooseRoomModal"
        @showDIM="showDataInsertionModal"
    />
    <teleport to="#modals">
        <ChooseClass
            v-if="visibleChooseClassModal"
            @closeModal="closeChooseClassModal"
        />
        <ChooseRoom
            v-if="visibleChooseRoomModal"
            @closeModal="closeChooseRoomModal"
        />
        <DataInsertion
            v-if="visibleDataInsertionModal"
            @closeModal="closeDataInsertionModal"
        />
    </teleport>
</template>

<script>
import HomepageMain from "../components/HomepageMain.vue";
import ChooseClass from "../components/ChooseClass.vue";
import ChooseRoom from "../components/ChooseRoom.vue";
import DataInsertion from "../components/DataInsertion.vue";
export default {
    name: "HomeView",
    components: { HomepageMain, ChooseClass, ChooseRoom, DataInsertion },
    data() {
        return {
            visibleChooseClassModal: false,
            visibleChooseRoomModal: false,
            visibleDataInsertionModal: false,
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
        showDataInsertionModal() {
            this.visibleDataInsertionModal = true;
        },
        closeDataInsertionModal() {
            this.visibleDataInsertionModal = false;
        },
    },
};
</script>

<style></style>
