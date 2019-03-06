<template>
  <div class="wrapper">
    <span>{{selected}}</span>
  </div>
</template>

<script>

  export default {
    name: 'chartson',
    mounted(){
    },
    data () {
      return {
        msg: ''
      }
    },
    props:{
      selected:{
      },
      title:{
        type:String
      }
    },
    methods: {},
  }
</script>

