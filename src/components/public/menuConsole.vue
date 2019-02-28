
<style lang="less">
  @bgcolor: #f2f2f1;
  @hovercolor:#ce1515;
  .head-console {
    height: 65px;
    line-height: 65px;
    width: 100%;
    background: #424041;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    overflow: hidden;
    color: #ffffff;
    .menu{
      display: block;
    }
  }
</style>
<template>
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
</template>
