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
    <Menu class="menu" mode="horizontal" active-name="1">
        <Row class="center">
            <Col span="3">
                <a href="../../">
                    <!--<img class="logo" src="../assets/logo.png">-->
                </a>
            </Col>
            <Col span="4">
                <Submenu class="yuntype" name="3">
                    <template slot="title">
                        信云享
                    </template>
                    <MenuGroup title="服务目录">
                        <MenuItem name="3-1">信云享</MenuItem>
                        <MenuItem name="3-2">信云开</MenuItem>
                        <MenuItem name="3-3">信云汇</MenuItem>
                        <MenuItem name="3-3">信云智</MenuItem>
                    </MenuGroup>
                </Submenu>
            </Col>

            <Col class="menuoption" span="2" offset="16">
                <router-link to="/console/index">控制台</router-link>
            </Col>
        </Row>
    </Menu>
</template>
