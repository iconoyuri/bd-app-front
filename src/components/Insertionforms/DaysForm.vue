<template>
    <h4>Select the week's days while courses can be planned</h4>

    <ul>
        <li>
            <input type="checkbox" id="lundi" v-model="lundi" />
            <label for="lundi">Lundi</label>
        </li>
        <li>
            <input type="checkbox" id="mardi" v-model="mardi" />
            <label for="mardi">mardi</label>
        </li>
        <li>
            <input type="checkbox" id="mercredi" v-model="mercredi" />
            <label for="mercredi">mercredi</label>
        </li>
        <li>
            <input type="checkbox" id="jeudi" v-model="jeudi" />
            <label for="jeudi">jeudi</label>
        </li>
        <li>
            <input type="checkbox" id="vendredi" v-model="vendredi" />
            <label for="vendredi">vendredi</label>
        </li>
        <li>
            <input type="checkbox" id="samedi" v-model="samedi" />
            <label for="samedi">samedi</label>
        </li>
        <li>
            <input type="checkbox" id="dimanche" v-model="dimanche" />
            <label for="dimanche">dimanche</label>
        </li>
    </ul>
    <div class="bottom">
        <button class="btn btn-outline-primary" @click.prevent="submit">Submit</button>
    </div>
</template>

<script>
export default {
    name: "DaysForm",
    data() {
        return {
            lundi: false,
            mardi: false,
            mercredi: false,
            jeudi: false,
            vendredi: false,
            samedi: false,
            dimanche: false,
        };
    },
    methods: {
        submit(){
            console.log("days submission")
        },
    }
};
</script>

<style scoped>
ul {
    margin: 0 0 0 2rem;
    padding: 0;
    list-style-type: none;
    font-size: 1.2rem;
}
input {
    margin-right: 0.5rem;
}
label {
    text-transform: capitalize;
}
.bottom {
    display: flex;
    flex-direction: row-reverse;
}
</style>
