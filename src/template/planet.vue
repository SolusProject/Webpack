<template lang="html">
    <li class="list-group-item">Planet: {{planet.name}}. Visited: {{planet.visits}}


    <span
          class="glyphicon glyphicon-star pull-right"
          aria-hidden="true">
    </span>

    </li>
</template>

<script>
import bootstrap from "bootstrap";

export default {
    props : [
        'planet'
    ],
    data() {
        return {}
    },
    methods : {

    },
    computed : {

    }
}
</script>
