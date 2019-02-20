<template>
  <div class="role-users">
    <Row class="crumbs-bg">
      <Breadcrumb class="crumbs-center" separator=">">
        <BreadcrumbItem>用户中心</BreadcrumbItem>
        <BreadcrumbItem>权限管理</BreadcrumbItem>
        <BreadcrumbItem>角色管理</BreadcrumbItem>
      </Breadcrumb>
    </Row>
    <div class="role-users-con">
      <Row class="operation-row">
        <Col span="2">
        <span  class="role-name">{{roleName}}</span>
        </Col>
        <Col span="4">
        <Button icon="chevron-left" v-on:click="backTable">返回角色管理</Button>
        </Col>
        <Col class="users-num" span="8">
        <span>共计<span class="red-alert">{{total}}</span>人使用当前角色</span>
        </Col>
        <Col span="9">
        <Input v-model="accountName" placeholder="请输入账号/用户名称">
        <Button slot="append" icon="ios-search" v-on:click="getList"></Button>
        </Input>
        </Col>
      </Row>
      <Row id="table" class="searchable-table-con1">
        <Table :content="self" :columns="tab1columns" :data="tabdata" :loading="loading"></Table>
        <Page class="users-page" :total="total" :pageSize="pageSize" :page-size-opts="[10, 20]" show-total show-sizer show-elevator
              @on-change="changepage" @on-page-size-change="changePageSize" ></Page>
      </Row>
    </div>
  </div>
</template>

<script>
import Request from '@/utils/request'
import Const from '@/utils/const'
import UrlUtil from '@/utils/urlparam'

export default {
  data: function () {
    return {
      self: this,
      visible: false,
      tab1columns: [
        {
          title: '账号',
          key: 'userName'
        },
        {
          title: '用户名称',
          key: 'fullName'
        },
        {
          title: '手机',
          key: 'mobile'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '授权时间',
          key: 'roleCreateTime'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          className: 'table-column-operation',
          render: (h, params) => {
            return [
              h('Button', {
                props: {
                  size: 'small',
                  icon: 'trash-a'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '确认框',
                      content: '<p>当前信息被删除后将不能在恢复，您是否删除？</p>',
                      okText: '确认删除',
                      cancelText: '取消',
                      onOk: () => {
                        const userId = params.row.userId
                        this.deleteItem(userId)
                      }
                    })
                  }
                }
              }, '删除')
            ]
          }
        }
      ],
      curPage: 1,
      tabdata: [],
      total: 0,
      pageSize: 10,
      loading: true,
      selected: [],
      accountName: '',
      roleName: UrlUtil.getUrlKey('roleName')
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    changepage(_curPage) {
      this.curPage = _curPage
      this.getList()
    },
    changePageSize(_pageSize) {
      this.pageSize = _pageSize
      this.getList()
    },
    getList() {
      this.loading = true
      const _config = {
        successFn: (res) => {
          this.loading = false
          this.tabdata = res.data
          if (this.accountName === '') {
            this.total = res.totalCount
          }
        },
        errorFn: (err) => {
          this.loading = false
          Request.errorHandler(err)
        }
      }
      const url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_AUTHORIZATIONS_URL + '/' + UrlUtil.getUrlKey('roleId') + '/users'
      const param = {
        accountName: this.accountName,
        tenantId: UrlUtil.getUrlKey('tenantId'),
        pageIndex: this.curPage,
        pageSize: this.pageSize
      }
      Request.get(url, param, _config)
    },
    deleteItem(userId) {
      const _config = {
        successFn: () => {
          this.$Message.info('操作成功！')
          this.getList()
        }
      }
      const param = {
        userId: userId
      }
      const _url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_AUTHORIZATIONS_URL  + '/' +  UrlUtil.getUrlKey('roleId') + '/users'
      Request.delete(_url, param, _config)
    },
    backTable() {
      this.$router.push({
        name: 'role-table'
      })
    }
  }
}
</script>

<style lang="less">
  @import '../../css/role-users.less';
</style>
