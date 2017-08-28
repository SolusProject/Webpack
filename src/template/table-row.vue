<template lang="html">
    <tr>
        <td>
            <span>{{story.id}}</span>
        </td>
        <td>
            <span v-if="!edit">{{story.plot}}</span>
            <input v-else type="text" class="form-control" v-model="story.plot">
        </td>
        <td>
            <span v-if="!edit">{{story.writer}}</span>
            <input v-else type="text" class="form-control" v-model="story.writer">
        </td>
        <td>
            <span>{{story.upvotes}}</span>
        </td>
        <td style="width:230px">
            <div class="btn-group" v-if="!edit">
                <button type="button"
                        name="button"
                        class="btn btn-primary"
                        @click="upvote"
                        >
                    Upvote
                </button>
                <button type="button"
                        name="button"
                        class="btn btn-secondary"
                        :="trigger"
                        @click="edit = true"
                        >
                    Edit
                </button>
                <button type="button"
                        name="button"
                        class="btn btn-danger"
                        @click="deleteStory"
                        >
                    Delete
                </button>
            </div>
            <div class="btn-group" v-else>
                <button type="button"
                        name="button"
                        class="btn btn-success"
                        @click="updateStory"
                        >
                    Apply
                </button>
                <button type="button"
                        name="button"
                        class="btn btn-secondary"
                        @click="cancelEdit"
                        >
                    Cancel
                </button>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    props : ['story'],
    data() {
        return {
            'edit' : false
        }
    },
    methods : {
        upvote() {
            //this.story.upvotes++;
            this.$emit('upvote', this.story);
        },
        deleteStory() {
            // this.$parent.something.splice(index, 1);
            this.$emit('delete', this.story);
        },
        updateStory() {
            this.edit=false;
            this.$emit(this.story.id == undefined? 'create' : 'update', this.story);
        },
        cancelEdit() {
            this.edit = false;
            if(this.story.id == undefined) this.$emit('pop');
        }
    },
    computed : {
        trigger() {
            if(this.story && this.story.id == undefined) this.edit = true;
        }
    }
}
</script>
