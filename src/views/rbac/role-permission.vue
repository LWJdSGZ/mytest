<template>
  <div class="role-permisson">
    <!--面包屑-->
    <Row class="crumbs-bg">
      <Breadcrumb class="crumbs-center" separator=">">
        <BreadcrumbItem>用户中心</BreadcrumbItem>
        <BreadcrumbItem>权限管理</BreadcrumbItem>
        <BreadcrumbItem>角色权限管理</BreadcrumbItem>
      </Breadcrumb>
    </Row>
    <div class="role-permission-con">
      <Form ref="roleInfo" :model="roleInfo" >
        <FormItem>
          <Row>
            <Col class="role-name-label" span="4"> 角色名称：</Col>
            <Col span="10">
            <Input class="role-name" placeholder="请输入角色名称" v-model="roleInfo.name" @on-blur="roleNameCheck"></Input>
            </Col>
            <Col span="10" class="red-alert">限1-20个字，超出不显示。仅能以汉字、英文字母、数字命名</Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col class="role-desc-label" span="4"> 角色描述：</Col>
            <Col span="10">
            <Input class="roleDesc" type="textarea" placeholder="请输入角色描述" :rows="1" :maxlength="30" v-model="roleInfo.description" />
            </Col>
            <Col span="10" class="red-alert">限1-30个字，超出不显示</Col>
          </Row>
        </FormItem>
      </Form>
      <Row class="role-recovery">
        <Col class="role-recovery-btn"></Col>
      </Row>
      <Row class="role-auth-table">
        <Col class="role-auth" span="4">权限管理：</Col>
        <Col class="role-menu">菜单与操作项</Col>
        <Col class="role-operation">操作权限
        <Button class="role-recover-btn" type="primary" @click="resetTree">恢复初始状态</Button>
        </Col>
      </Row>
      <Row>
        <Col class="" span="4">&nbsp;&nbsp;</Col>
        <Col id="permission-tree" span="18">
        <Tree :data="permissionTree" multiple ref="tree" :render="renderContent" show-checkbox></Tree>
        </Col>
      </Row>
      <Row>
        <Col class="primary-con" span="24">
        <Button type="primary" @click="addOrUpdate">确认保存</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import Request from '@/utils/request'
  import Const from '@/utils/const'
  import BusiUtil from '@/utils/busi'
  import UrlUtil from '@/utils/urlparam'
  import Login from '@/utils/loginutil'
  import Util from '@/utils/util'
  import Http from '@/utils/http'
  import util from "../../utils/util";

  export default {
    data() {
      return {
        baseUrl: process.env.BASE_API + '/',
        roleId: '',
        roleInfo: {
          id: '',
          name: '',
          description: '',
          permissionIds: []
        },
        initialSelectedIds: [],
        srcPermissionTree: [],
        permissionTree: [],
        load: false,
        isUpdate: false,
        tenantId: ''
      }
    },
    beforeMount() {
      const roleId = UrlUtil.getUrlKey('roleId')
      if (roleId) {
        this.roleId = roleId
        this.isUpdate = true
      }
    },
    async mounted() {
      const user = await Login.getUser(process.env.BASE_API)
      if (user === null) {
        this.$Notice.error({ title: '请先登录' })
      }
      this.tenantId = user.tenantId
      await this.getRole()
      await this.getPermissions()
      this.loadTree()
    },
    methods: {
      renderContent(h, { root, node, data }) {
        return h('span', {
          class: 'table'
        }, [
          h('span', {
            class: 'table-tree-menu'
          }, data.title),
          h('span', {
            class: 'table-tree-operation'
          }, [
            h('span', {
              style: {
                marginRight: '3px'
              }
            })
          ])
        ]);
      },
      async getRole() {
        if (this.roleId) {
          const _url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_ROLE_URL + '/' + this.roleId
          const res = await Http.get(_url, {})
          this.roleInfo = BusiUtil.setJsonValueFromJson(this.roleInfo, res.data)
          if (this.roleInfo.permissionIds) {
            this.initialSelectedIds = [].concat(this.roleInfo.permissionIds)
          }
        }
      },
      async getPermissions() {
        const _url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_PERMISSION_URL
        const res = await Http.get(_url, {})
        this.srcPermissionTree = res.data.permissions
      },
      loadTree() {
        for (let i = 0; i < this.srcPermissionTree.length; i++) {
          const child = this.initNode(this.srcPermissionTree[i])
          if (child) {
            this.permissionTree.push(child)
          }
        }
        this.load = true
      },
      initNode(srcNode) {
        const destNode = {}
        if (srcNode) {
          destNode.id = srcNode.id
          destNode.title = srcNode.name
          destNode.leaf = srcNode.leaf
          destNode.expand = true
          destNode.checked = this.getInitialCheckStatus(srcNode.id)
        }
        destNode.children = []
        if (srcNode.children) {
          for (let i = 0; i < srcNode.children.length; i++) {
            const descChild = this.initNode(srcNode.children[i])
            if (descChild) {
              destNode.children.push(descChild)
            }
          }
        }
        return destNode
      },
      getInitialCheckStatus(id) {
        if (this.initialSelectedIds.indexOf(id) >= 0) {
          return true
        }
        return false
      },
      resetTree() {
        this.showCheckedNode()
        if (this.permissionTree) {
          this.resetNode(this.permissionTree)
        }
        this.showCheckedNode()
      },
      resetNode(nodes) {
        if (nodes) {
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i]
            node.checked = this.getInitialCheckStatus(node.id)
            if (node.children) {
              this.resetNode(node.children)
            }
          }
        }
      },
      showCheckedNode() {
        const titles = []
        const checkNodes = this.$refs.tree.getCheckedNodes()
        if (checkNodes && checkNodes.length > 0) {
          for (let i = 0; i < checkNodes.length; i++) {
            titles.push(checkNodes[i].title)
          }
        }
        console.log(titles)
      },
      addOrUpdate() {
        if (Util.isNull(this.roleInfo.name)) {
          this.$Notice.error({ title: '请输入角色名称' })
          return
        }
        if (Util.isNull(this.roleInfo.description)) {
          this.$Notice.error({ title: '请输入角色描述' })
          return
        }
        this.loadSelectIds()
        if (Util.isNull(this.roleInfo.permissionIds)) {
          this.$Notice.error({ title: '请选择权限' })
          return
        }
        if (this.roleId) {
          this.update()
        } else {
          this.add()
        }
      },
      loadSelectIds() {
        this.roleInfo.permissionIds = []
        const checkNodes = this.$refs.tree.getCheckedNodes()
        if (checkNodes && checkNodes.length > 0) {
          for (let i = 0; i < checkNodes.length; i++) {
            if (checkNodes[i].checked && checkNodes[i].leaf) {
              this.roleInfo.permissionIds.push(checkNodes[i].id)
            }
          }
        }
        // console.log('loadSelectIds=')
        // console.log(this.roleInfo.permissionIds)
      },
      add() {
        const _config = {
          successFn: (res) => {
            if (util.isNull(res)) {
              this.$Notice.error({ title: '创建失败',
                desc: '后台服务异常，请重试！' })
            } else if (res.code !== 0) {
              this.$Notice.error({ title: '创建失败',
                desc: util.isNull(res.msg) ? '后台服务异常，请重试！' : res.msg })
            } else {
              this.$Notice.success({ title: '创建成功' })
              setTimeout(() => {
                this.$router.push({
                  name: 'role-table'
                });
              }, 1000);
            }
          }
        }
        const _url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_ROLE_URL + '?tenantId=' + this.tenantId
        Request.post(_url, this.roleInfo, _config)
      },
      update() {
        const _config = {
          successFn: (res) => {
            if (util.isNull(res)) {
              this.$Notice.error({ title: '修改失败',
                desc: '后台服务异常，请重试！' })
            } else if (res.code !== 0) {
              this.$Notice.error({ title: '修改失败',
                desc: util.isNull(res.msg) ? '后台服务异常，请重试！' : res.msg })
            } else {
              this.$Notice.success({ title: '修改成功' })
              setTimeout(() => {
                this.$router.push({
                  name: 'role-table'
                });
              }, 1000);
            }
          }
        }
        const _url = process.env.PROTAL_URL + Const.REQUEST_URLS.RBAC_ROLE_URL + '/' + this.roleId
        Request.put(_url, this.roleInfo, _config)
      },
      roleNameCheck() {
        console.log(this.roleInfo)
        if (Util.isNull(this.roleInfo.name)) {
          this.$Message.error('角色名不能为空')
        }
        if (this.roleInfo.name === '租户管理员') {
          this.$Message.error('为了方便您的管理，角色名称请不要命名为租户管理员')
        }
      }
    }
  }
</script>

<style lang="less">
  @import '../../css/role-permission.less';
</style>
