
<style lang="less">
  .console-menu{
    margin-top: 70px;
    background: #ffffff;
    min-height: 700px;
  }
</style>
<template>
  <Sider hide-trigger class="console-menu">
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
</template>
