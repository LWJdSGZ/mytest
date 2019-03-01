<template>
  <div>
      <main-head></main-head>
      <router-view></router-view>
  </div>
</template>
<script>
  import headMenu from "com/public/header.vue"
  export default {
    data() {
      return {};
    },

    created() {

    },

    mounted() {

    },

    methods: {},

    computed: {},

    watch: {},

    components: {
        'main-head': headMenu,
    },
  }
</script>
