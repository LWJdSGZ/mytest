<style lang="less">
  @import "../../css/header.less";
</style>
<template>
  <Menu class="menu" mode="horizontal" active-name="1">
    <Row class="center">
      <Col class="menuoption" span="4">
        <router-link to="/console/index">控制台首页</router-link>
      </Col>
      <Col class="menuoption" span="4" offset="16">
        <router-link to="/index">回首页</router-link>
      </Col>

    </Row>
  </Menu>
</template>

