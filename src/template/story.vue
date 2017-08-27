<template>
  <li class="list-group-item">
      {{story.plot}} {{story.upvote}}
      <button type="button"
              name="button"
              class="btn btn-primary"
              @click="_upvote">
              Upvote
      </button>

      <button v-show="!isFavorite"
              @click="setFavorite"
              class="btn btn-primary">
              Favorite
      </button>

      <span v-show="isFavorite"
            class="glyphicon glyphicon-star pull-right"
            aria-hidden="true">
      </span>
  </li>
</template>

<script>
const props = [
    'story',
    'favorite'
]




  export default {
      props : props,
      data() { return {} },
      methods : {
          _upvote() {
              this.story.upvote++;
          },
          setFavorite() {
              //this.favorite = this.story;
              this.$emit("update", this.story);
          }
      },
      computed : {
          isFavorite() {
              return (this.story == this.favorite)? true : false;
          }
      }
  }
</script>
