<template>
  <div>
  <Table :columns="columns" :data="mylist" :loading="loading" class="mt10"></Table>
  <Page class="mt10" :total="total" :pageSize="pageSize" show-total show-sizer show-elevator @on-change="changepage" @on-page-size-change="changePageSize"
        :page-size="10" :page-size-opts="[10,20]"></Page>
  </div>
</template>
<script>
import Request from '@/utils/request'
import Const from '@/utils/const'
import Login from '@/utils/loginutil'

export default {
  data() {
    return {
      columns: [
        {
          title: '实例id',
          key: 'instanceId'
        },
        {
          title: '实例显示名称',
          key: 'serviceName'
        },
        {
          title: '实例计费类型',
          key: 'costType'
        },
        {
          title: '应用基线',
          key: 'appBaseLine'
        },
        {
          title: '创建时间',
          key: 'instanceCreateTime'
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
                  icon: 'edit'
                },
                on: {
                  click: () => {
                    this.toForm(params.row.instanceId)
                  }
                }
              }, '发表评价')
            ]
          }
        }
      ],
      curPage: 1,
      mylist: [],
      total: 0,
      pageSize: 10,
      loading: true,
      user: ''
    }
  },
  async mounted() {
    this.user = await Login.getUser(process.env.BASE_API)
    if (this.user === null) {
      this.$Notice.error({ title: '请先登录。' })
    } else {
      this.getList()
    }
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
      //console.log('getList')
      this.loading = true
      const _config = {
        successFn: (res) => {
          //console.log('res=')
          //console.log(res)
          this.loading = false
          this.mylist = res.instanceList
          this.total = res.totalNumber
          this.$emit('getTotal', this.total)
        },
        errorFn: () => {
          this.loading = false
        }
      }
      //console.log('user:', this.user)
      const tenantAdmin = Login.isTenantAdmin(this.user.roles)
      Request.get(process.env.FEEDBACK_URL + Const.REQUEST_URLS.INSTANCE_LIST_URL, {
        pageIndex: this.curPage,
        pageSize: this.pageSize,
        userId: this.user.userId,
        tenantId: this.user.tenantId,
        tenantAdmin: tenantAdmin
      }, _config)
    },
    toForm(instanceId) {
      location.href = './comment.html?instanceId=' + instanceId
    }
  }
}
</script>
