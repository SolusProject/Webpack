<template lang="html">
    <li class="list-group-item">
        <h4 class="completed">"{{chariot.name}}" chariot has {{chariot.horses}} horse(s)!</h4>
        <button type="button"
                name="button"
                class="btn btn-primary"
                @click="chariotAction"
                :disabled="isSelected"
                >
            {{action}}
        </button>
    </li>
</template>


<script>
export default {
    props : ['chariot', 'selectedChariot'],
    data() {
        return {}
    },
    methods : {
        chariotAction(event) {
            //console.log(event.srcElement.textContent);
            this.$emit("update", this.chariot);
        }
    },
    computed : {
        isSelected() {
            return this.selectedChariot == this.chariot;
        },
        isDismiss() {
            return this.chariot.horses < this.selectedChariot.horses;
        },
        isHire() {
            return this.chariot.horses > this.selectedChariot.horses;
        },
        action() {
            if(!this.selectedChariot) return "Pick Chariot";
            else if(this.isSelected) return "Riding!";
            else if(this.isHire) return "Hire Horses";
            else if(this.isDismiss) return "Dismiss Horses";
        }
    }
}
</script>

<style lang="css">
</style>
