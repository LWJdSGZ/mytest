<template>
  <div class="layout">
    <Layout>
      <Header>
        <span class="sys-name">租户管理控制台</span>
      </Header>
      <Layout>
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
            <router-view></router-view>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
