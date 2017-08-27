<template lang="html">
    <li class="list-group-item">Planet: {{planet.name}}. Visited: {{planet.visits}}


    <span v-show="planet.visits > 0" class="fa fa-rocket fa-2x pull-right"
          aria-hidden="true">
    </span>

    <button v-show="planet.visits < 3"
            type="button"
            class="btn btn-primary"
            @click="visit">
        Visit
    </button>

    </li>
</template>

<script>

require('font-awesome');

export default {
    props : [
        'planet'
    ],
    data() {
        return {}
    },
    methods : {
        visit() {
            this.planet.visits++;
        }
    },
    computed : {

    }
}
</script>
