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
    .head-console-index{
      font-size: 16px;
      a{
        color: #fff;
      }
    }
    .head-console-tohome{
      font-size: 16px;
      a{
        color: #fff;
      }
    }
  }
</style>
<template>
  <div class="head-console">
    <Row class="center">
      <Col class="head-console-index" span="3" offset="1">
        <router-link to="/console/index">控制台首页</router-link>
      </Col>
      <Col class="head-console-tohome" span="4" offset="16">
        <router-link to="/index">回首页</router-link>
      </Col>

    </Row>
  </div>
</template>

