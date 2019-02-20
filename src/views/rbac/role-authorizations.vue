<template>
  <div class="role-users">
    <Row class="crumbs-bg">
      <Breadcrumb class="crumbs-center" separator=">">
        <BreadcrumbItem>用户中心</BreadcrumbItem>
        <BreadcrumbItem>权限管理</BreadcrumbItem>
        <BreadcrumbItem>用户授权管理</BreadcrumbItem>
      </Breadcrumb>
    </Row>
    <div class="role-authorizations-con">
      <Row class="operation-row">
        <Col span="8">
        <Input v-model="accountName" placeholder="请输入账号/用户名称">
        <Button slot="append" icon="ios-search" v-on:click="getList"></Button>
        </Input>
        </Col>
        <Col span="2" offset="2">
        所属角色：
        </Col>
        <Col span="4">
        <Select v-model="roleId" clearable style="width:200px" placeholder="所有角色" filterable @on-change="getList">
          <Option v-for="item in roles" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
        </Col>
      </Row>
      <Row id="table" class="searchable-table-con1">
        <Table :content="self" :columns="tab1columns" :data="tabdata" :loading="loading"></Table>
        <Page class="users-page" :total="total" @on-change="changePage" @on-page-size-change="changePageSize"
              show-total></Page>
      </Row>
      <Modal
        v-model="editAuth"
        title="用户授权">
        <div class="slot-header" slot="header">
          <p class="role-authorizations-title"><span class="red-alert">*</span>用户授权</p><p class="alert-txt" v-show="alertTxt">未获得角色的用户无法使用平台权限</p>
        </div>
        <CheckboxGroup id="authOption" v-model="authOption">
          <Checkbox v-for="item in roles" :key="item.id" :value="item.id" :label="item.id">{{ item.name }}
          </Checkbox>
        </CheckboxGroup>
        <div slot="footer">
          <Button type="primary" v-on:click="authorizations(index)">确认并授权</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import Request from '@/utils/request'
import Const from '@/utils/const'
import Login from '@/utils/loginutil'
import Util from '@/utils/util'

export default {
  name: 'role-authorizations',
  data: function () {
    return {
      self: this,
      visible: false,
      tab1columns: [
        {
          title: '账号',
          key: 'name'
        },
        {
          title: '用户名称',
          key: 'fullname'
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
          title: '所属角色',
          key: 'roleNames'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            let view = '授权角色'
            if (params.row.selectedRoles.length > 0) {
              view = '编辑授权'
            }
            return [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, view)
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
      roleId: '',
      roles: [],
      editAuth: false,
      authOption: [],
      index: '',
      alertTxt: false,
      tenantId: ''
    }
  },
  async mounted() {
    const user = await Login.getUser(process.env.BASE_API)
    if (user === null) {
      this.$Notice.error({ title: '请先登录' })
    }
    this.tenantId = user.tenantId
    // this.tenantId = 'b11647e8-0e36-44fd-84fa-262c4fcfbe43'
    await this.getRoles()
    this.getList()
  },
  methods: {
    show(index) {
      this.authOption = []
      this.editAuth = true
      const selectedRoles = this.tabdata[index].selectedRoles
      for (let i = 0; i < selectedRoles.length; i++) {
        this.authOption.push(selectedRoles[i].id)
      }
      this.index = index
      if (selectedRoles.length > 0) {
        this.alertTxt = false
      } else {
        this.alertTxt = true
      }
    },
    getRoles() {
      const _config = {
        successFn: (res) => {
          if (Util.isNull(res.data)) {
            return
          }
          for (const i in res.data) {
            if (res.data[i].inuse) {
              this.roles.push(res.data[i])
            }
          }
        },
        errorFn: (err) => {
          Request.errorHandler(err)
        }
      }
      const url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_ROLE_URL
      const param = {
        tenantId: this.tenantId //'b11647e8-0e36-44fd-84fa-262c4fcfbe43'
      }
      Request.get(url, param, _config)
    },
    changePage(_curPage) {
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
          this.total = res.totalCount
        },
        errorFn: (err) => {
          this.loading = false
          Request.errorHandler(err)
        }
      }
      const url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_AUTHORIZATIONS_USERS_URL
      const param = {
        accountName: this.accountName,
        roleId: this.roleId,
        tenantId: this.tenantId, //'b11647e8-0e36-44fd-84fa-262c4fcfbe43',
        pageIndex: this.curPage,
        pageSize: this.pageSize
      }
      Request.get(url, param, _config)
    },
    authorizations(index) {
      const roleUser = this.tabdata[index]
      if (roleUser.selectedRoles.length > 0) {
        this.updateAuthorizations(roleUser.mainId, this.authOption)
      } else {
        this.addAuthorizations(roleUser.mainId, this.authOption)
      }
    },
    addAuthorizations(userId, roleIds) {
      const _config = {
        successFn: () => {
          this.$Message.info('操作成功！')
          this.editAuth = false
          this.getList()
        },
        errorFn: (err) => {
          Request.errorHandler(err)
        }
      }
      const param = {
        userId: userId,
        roleIds: roleIds
      }
      const _url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_AUTHORIZATIONS_USERS_URL + '/' + userId
      Request.post(_url, param, _config)
    },
    updateAuthorizations(userId, roleIds) {
      const _config = {
        successFn: () => {
          this.$Message.info('操作成功！')
          this.editAuth = false
          this.getList()
        },
        errorFn: (err) => {
          Request.errorHandler(err)
        }
      }
      const param = {
        userId: userId,
        roleIds: roleIds
      }
      const _url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_AUTHORIZATIONS_USERS_URL + '/' + userId
      Request.put(_url, param, _config)
    }
  }
}
</script>

<style lang="less">
  @import '../../css/role-users.less';
</style>
