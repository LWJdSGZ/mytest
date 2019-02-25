<template>
  <div class="layout">
    <!--<Layout>-->
      <main-head></main-head>
      <router-view></router-view>
      <!--<Layout>
        <Sider hide-trigger :style="{background: '#fff', overflow: 'auto'}">
          <Menu theme="light" :open-names="['home']" width="auto">
            <Submenu name="home">
              <template slot="title">
                <Icon type="ios-paper"></Icon>
                <span>主页</span>
              </template>
              <router-link to="/">
                <MenuItem name="home1">主页</MenuItem>
              </router-link>
            </Submenu>
            <Submenu name="comment">
              <template slot="title">
                <Icon type="ios-paper"></Icon>
                <span>评价</span>
              </template>
              <router-link to="/comment/index/comment-list">
                <MenuItem name="supplier-list">评价管理列表</MenuItem>
              </router-link>
            </Submenu>
          </Menu>
        </Sider>
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
