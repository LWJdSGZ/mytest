<template>
  <div class="role-table">
    <!--面包屑-->
    <Row class="crumbs-bg">
      <Breadcrumb class="crumbs-center" separator=">">
        <BreadcrumbItem>用户中心</BreadcrumbItem>
        <BreadcrumbItem>权限管理</BreadcrumbItem>
        <BreadcrumbItem>角色管理</BreadcrumbItem>
      </Breadcrumb>
    </Row>
    <div class="role-table-con">
      <Row id="tabledata">
        <Col span="4">
        <Button icon="plus-round" class="add-role-btn" type="error" @click="toForm()">新建角色</Button>
        </Col>
        <Col span="10" offset="10">
        <Input v-model="rolename" placeholder="角色名称" icon="search "  @on-click="searchRole" @on-enter="getAllData"></Input>
        </Col>
      </Row>
      <Table stripe :columns="tab1columns" :data="tabledata" :loading="loading"></Table>
    </div>
  </div>
</template>

<script>
import Request from '@/utils/request'
import Const from '@/utils/const'
import Login from '@/utils/loginutil'

export default {
  data: function () {
    return {
      baseUrl: process.env.BASE_API + '/',
      type: '',
      tab1columns: [
        {
          title: '角色名称',
          width: 300,
          key: 'name',
          render: (h, params) => {
            let na = params.row.name.substring(0, 10)
            const strName = h('p', {
              on: {
                mouseover: (event) => {
                  na = params.row.name
                  event.target.innerHTML = na
                },
                mouseout: (event) => {
                  na = params.row.name.substring(0, 10)
                  event.target.innerHTML = na
                }
              }
            }, na)
            return strName
          }
        },
        {
          title: '角色描述',
          key: 'description',
          render: (h, params) => {
            let descr = params.row.description.substring(0, 30)
            const strDescr = h('p', {
              on: {
                mouseover: (event) => {
                  descr = params.row.description
                  event.target.innerHTML = descr
                },
                mouseout: (event) => {
                  descr = params.row.description.substring(0, 30)
                  event.target.innerHTML = descr
                }
              }
            }, descr)
            return strDescr
          }
        },
        {
          title: '创建时间',
          width: 200,
          key: 'createTime'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          className: 'table-operation',
          width: 400,
          render: (h, params) => {
            const showUserBtn = h('Button', {
              props: {
                size: 'small',
                icon: 'search'
              },
              on: {
                click: () => {
                  const routerParams = {
                    name: 'role-users',
                    query: { roleId: params.row.id, roleName: params.row.name, tenantId: this.tenantId }
                  }
                  this.$router.push(routerParams);
                }
              }
            }, '查看用户')
            const inuseBtn = h('Button', {
              props: {
                size: 'small',
                type: params.row.inuse === true ? 'info' : 'error',
                icon: params.row.inuse === true ? 'close' : 'checkmark'
              },
              className: 'inuse-btn',
              on: {
                click: () => {
                  this.setInuse(params.row.id, params.row.inuse)
                }
              }
            }, params.row.inuse === true ? '禁用' : '启用')

            const delBtn =  h('Button', {
              props: {
                size: 'small',
                icon: 'trash-a',
                disabled: params.row.roleDefault,
                isShow: false
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '确认框',
                    content: '<p>当前信息被删除后将不能在恢复，你是否删除？</p>',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                      this.deleteItem(params.row.id)
                    }
                  })
                }
              }
            }, '删除')

            const editBtn =  h('Button', {
              props: {
                size: 'small',
                icon: 'edit',
                disabled: params.row.roleDefault,
                isShow: false
              },
              on: {
                click: () => {
                  const routerParams = {
                    name: 'role-permission',
                    query: { roleId: params.row.id }
                  }
                  this.$router.push(routerParams);
                  this.toForm(params.row.id)
                }
              }
            }, '编辑')
            const btnArray = [];
            btnArray.push(showUserBtn)
            if (!params.row.roleDefault) {
              btnArray.push(editBtn)
              btnArray.push(delBtn)
              btnArray.push(inuseBtn)
            }
            return btnArray
          }
        }
      ],
      tabledata: [],
      rolename: '',
      tenantId: '',
      loading: true
    }
  },
  async mounted() {
    this.tenantId = await Login.getTenantId(process.env.BASE_API)
    const param = {
      tenantId: this.tenantId
    }
    this.getList(param)
  },
  methods: {
    getList(param) {
      this.loading = true
      const _config = {
        successFn: (res) => {
          this.loading = false
          this.tabledata = res.data
        },
        errorFn: (err) => {
          this.loading = false
          Request.errorHandler(err)
        }
      }
      const url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_ROLE_URL
      Request.get(url, param, _config)
    },
    deleteItem(id) {
      this.operatorItem(id)
    },
    operatorItem(id) {
      const _url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_ROLE_DELETE + '/' + id
      const _config = {
        successFn: () => {
          this.$Message.info('操作成功！')
          const param = {
            tenantId: this.tenantId
          }
          this.getList(param)
        }
      }
      Request.delete(_url, null, _config)
    },
    searchRole() {
      const params = {
        tenantId: this.tenantId,
        name: this.rolename
      }
      this.getList(params)
    },
    setInuse(id, inuse) {
      const _config = {
        successFn: () => {
          this.$Message.info('操作成功！')
          const param = {
            tenantId: this.tenantId
          }
          this.getList(param)
        },
        errorFn: (err) => {
          Request.errorHandler(err)
        }
      }
      const url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_ROLE_INUSE + '/' + id
      const param = {
        id: id,
        inuse: !inuse
      }
      Request.put(url, param, _config)
    },
    getAllData() {
      this.rolename = ''
      const param = {
        tenantId: this.tenantId
      }
      this.getList(param)
    },
    toForm(roleId) {
      const routerParams = {
        name: 'role-permission'
      };
      if (roleId) {
        routerParams.query = { roleId: roleId }
      }
      this.$router.push(routerParams);
    }
  }
}
</script>

<style lang="less">
  @import '../../css/role-table.less';
</style>
