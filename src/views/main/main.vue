<template>
  <div class="layout">
    <!--<Layout>-->
      <main-head></main-head>
      <router-view></router-view>
      <!--<Layout>

        <Layout>

        </Layout>
      </Layout>-->
    <!--</Layout>-->
  </div>
</template>
<script>
  import headMenu from "com/public/header.vue"
  import comment from '../food/comment/comment/comment.vue'
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
        'main-comment': comment,
        'main-head': headMenu,
    },
  }
</script>
