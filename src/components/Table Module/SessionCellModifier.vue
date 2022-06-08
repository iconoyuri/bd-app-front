<template>
    <slot></slot>
        <div class="forms">

        </div>
    <div class="buttons" @dblclick.self="abort">
        <button
            @click.prevent="updateCell"
            class="btn btn-outline-success"
        >
            <i class="fas fa-check"></i>
        </button>
        <button @click.prevent="$emit('abortChanges')" class="btn btn-danger">
            <i class="fas fa-times"></i>
        </button>
    </div>
</template>

<script>
export default {
    emits: ["abortChanges", "stageChanges"],
    props: {
        field: {
            default: []
        }
    },
    data(){
        return{
            requestPath: this.$store.state.requestPaths,
            cache : [...field]
        }
    },
    methods: {
        updateCell(){
            this.axios.put(this.requestPath.table.course.room, {params : {

            }}).then((response)=>{
                this.$emit("stageChanges", response.data)
            })
        }
    }
};
</script>

<style scoped>
.form-line {
    width: 100%;
    padding: 1rem;
    border: 2px solid rgb(200, 232, 253);
    border-radius: 7px;
    box-shadow: 0 0 3px rgba(200, 232, 253, 0.5);
}
.form-line:hover {
    box-shadow: 0 0 5px rgba(165, 219, 255, 0.8);
    background-color: rgb(245, 247, 255);
}
.form-line p {
    text-transform: capitalize;
}
.buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin: 1rem 0 0;
}
</style>
