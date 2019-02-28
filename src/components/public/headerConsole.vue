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
  }
</style>
<template>
  <div class="menu">
    <Row class="center">
      <Col class="menuoption" span="4">
        <router-link to="/console/index">控制台首页</router-link>
      </Col>
      <Col class="menuoption" span="4" offset="16">
        <router-link to="/index">回首页</router-link>
      </Col>

    </Row>
  </div>
</template>

