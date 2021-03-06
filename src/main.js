import Vue from 'vue';
import style from './CSS/main.scss';
import story from "./template/story.vue";
import planet from "./template/planet.vue";
import food from "./template/food.vue";
import chariot from "./template/chariot.vue";
import {apiServer} from "./config/apiConfig.js"
import axios from "axios";
import tableRow from "./template/table-row.vue";

Vue.filter("story_filter", function(story) {
    return story.writer +" said: \""+story.plot+"\"";
});

export var bus = new Vue();

var data = {
    selectedColor : "#8000ff",
    color : 1,
    selected_chariot : "",
    chariots : [
        {name : "Olympus", horses : 4},
        {name : "Sagitta", horses : 3},
        {name : "Icarus", horses : 2},
        {name : "Abraxas", horses : 1},
    ],
    favorite : "",
    votes : 0,
    name : "Jackson",
    gender : "male",
    stories: [
        "I crashed my car today!",
        "Yesterday, someone stole my bag!",
        "Someone ate my chocolate...",
    ],
    stories_object: [
        {
            plot: "I crashed my car today!",
            writer: "Alex",
            upvote : 23
        },
        {
            plot: "Yesterday, someone stole my bag!",
            writer: "John",
            upvote : 18
        },
        {
            plot: "Someone ate my chocolate...",
            writer: "John",
            upvote : 27
        },
        {
            plot: "I ate someone's chocolate!",
            writer: "Alex",
            upvote : 21
        },
    ],
    person_object : {
        name : "Sasha",
        weight : "170",
        height : "5.9",
        eyeColor : "blue"
    },
    upvote : 0,
    calculator : {
        a: 0,
        b: 0,
        operator : "+",
        result : 0
    },
    candidates : [
        {"name" : "My Little Pony", "votes" : 121},
        {"name" : "Jack", "votes" : 123},
        {"name" : "John", "votes" : 124},
        {"name" : "Kitty", "votes" : 110},
        {"name" : "Roach", "votes" : 130},
    ],
    query : "",
    sortBy : "desc",
    planets : [
        {"name" : "Venus", "visits" : 0},
        {"name" : "Mars", "visits" : 0},
        {"name" : "Jupiter", "visits" : 0},
        {"name" : "Moon", "visits" : 0}
    ],
    buttonColor : "lime",
    something : {},
};

var math = {
    "+" : (a,b) => {return a+b;},
    "-" : (a,b) => {return a-b;},
    "*" : (a,b) => {return a*b;},
    "/" : (a,b) => {return a/b;},
};


new Vue({
    el: '#app',
    data: data,
    methods : {
        _upvote() {
            ++data.upvote;
        },
        _calculate() {
            data.calculator.result = math[data.calculator.operator]
                (data.calculator.a, data.calculator.b);
        },
        increment_vote(element) {
            element.votes++;
        },
        reset_candidates() {
            data.candidates.forEach((e) => {e.votes = 0;});
        },
        filter_story_by(name) {
            return data.stories_object.filter((story) => {return story.writer == name;});
        },
        changeOrder() {
            data.sortBy = (data.sortBy != "desc")? "desc" : "asc";
        },
        reset() {
            this.votes = 0;
            bus.$emit('reset');
        },
        flipColor() {
            this.color = ++this.color%4;
        },
        upvoteApiStory(story) {
            story.upvotes++;
            axios.patch(apiServer+"stories/"+story.id, story).then(response => {
                console.log(response);
                //throw an allert or something if failed
            });
        },
        deleteApiStory(story) {
            let index = this.something.indexOf(story);
            this.something.splice(index,1);
            axios.delete(apiServer+"stories/"+story.id).then(response => {
                console.log(response.status);
            })
        },
        updateApiStory(story) {
            axios.put(apiServer+"stories/"+story.id, story).then(response => {
                console.log(response.status);
            })
        },
        addNewStory(story) {
            // if id = undefined edit == true
            this.something.unshift({plot : null, writer : null, upvotes : 0});
        },
        createApiStory(story) {
            axios.post(apiServer+"stories", story).then(response => {
                // use Vue.set if you want to modify object in the runtime
                Vue.set(this.something,
                        this.something.indexOf(story),
                        response.data);
            });
        }
    },
    computed : {
        trigger() {
            data.calculator.result = math[data.calculator.operator]
                (data.calculator.a, data.calculator.b);
        },
        // deprecated in favour of inline check html
        // sorted_candidates() {
        //     return _.orderBy(this.candidates, "votes", data.sortBy);
        //     //return this.candidates.sort((a, b) => { return (a.votes - b.votes) *-1;});
        // },
        popular_story() {
            return data.stories_object.filter((story) => {return story.upvote >= 20;});
        },
        queried_story() {
            return data.stories_object.filter((story) =>
                {return story.plot.includes(data.query);});
        }
    },
    components : {
        story,
        planet,
        food,
        chariot,
        tableRow,
    },
    mounted() {
        axios.get(apiServer+"stories").then(response => {
            if(response.status != 200) return;
            this.something = response.data;
        })
    },
    created() {}

});
