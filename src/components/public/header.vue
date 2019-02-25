<style lang="less">
    @import "../../css/header.less";
</style>
<template>
    <Menu class="menu" mode="horizontal" active-name="1">
        <Row class="center">
            <Col span="3">
                <a href="../../">
                    <!--<img class="logo" src="../assets/logo.png">-->
                </a>
            </Col>
            <Col span="3">
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
                    <MenuGroup title="产品生态">
                        <MenuItem name="3-4">用户留存</MenuItem>
                        <MenuItem name="3-5">流失用户</MenuItem>
                    </MenuGroup>
                </Submenu>
            </Col>
            <Col class="menuoption" span="2" offset="6">
                <a  href="">
                    产品中心
                </a>
            </Col>
            <Col class="menuoption" span="2">
                <a href="">
                服务商
                </a>
            </Col>
            <Col class="menuoption" span="2">
                <a href="">
                    文档中心
                </a>
            </Col>
            <Col class="menuoption last" span="3">
                <a href="">
                    服务商入口
                </a>
            </Col>
            <Col class="menuoption" span="2">
                <a href="">
                    控制台
                </a>
            </Col>
        </Row>
    </Menu>
</template>
