<template>
  <div class="wrapper">
    <span>commen</span>
    <!--<console-chartson title='儿子' :selected='selected'></console-chartson>-->
    <div class="charts">
      {{this.$route.params.id}}
    </div>
  </div>
</template>

<script>

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
      console.log(this.$route.params.id)

    },
    methods: {
    },
    components:{
    },
  }
</script>

