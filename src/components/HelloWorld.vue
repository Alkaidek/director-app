<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button v-on:click="getUsers">
      siema
    </button> <br />

    <ul class="list">
    <li v-bind:key="item.memid" v-for="item in info">
      {{ item.memid }}{{item.firstname}} {{item.lastname}}
    </li>
  </ul>
    <ul class="list">
      <li v-bind:key="item.memid" v-for="item in users">
        {{ item.memid }}, {{item.firstname}}, {{item.lastname}}
      </li>
    </ul>
  </div>
</template>

<script>
    import axios from 'axios';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    data () {
        return {
            info: null,
            users: null,
            link: '/api/test1'
        }
    },
    methods: {
            getUsers: function(){
                axios
                    .get(this.link)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.users = response.data
                        console.log(this.users)
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
    },
   /* mounted () {
        axios
            .get(this.link)
            .then(response => (this.info = response.data))
    }*/

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  .list{
    li{
      display: block;
    }
  }

</style>
