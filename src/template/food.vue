<template>
    <div class="text-center col-lg-4">
        <p style="font-size: 40px;">{{ votes }}</p>
        <button type="button"
                name="button"
                class="btn btn-primary"
                @click="vote">
            {{name}}
        </button>
    </div>
</template>

<script>
var main = require("../main.js");

export default {
    props : ['name'],
    data() {
        return {
            "votes" : 0
        }
    },
    methods : {
        vote(event) {
            console.log(event.srcElement.textContent);
            this.votes++;
            this.$emit('voted');
        },
        reset() {
            this.votes = 0;
        }
    },
    created () {
        main.bus.$on('reset', this.reset);
    }
}
</script>
