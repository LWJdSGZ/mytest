<template>
  <Row class="mt10 searchable-table-con1">
    <Table :content="self" :columns="tabColumns" :data="tabData" :loading="false" class="mt10" @on-selection-change="getSelected"></Table>
    <Page class="already" :total="total" :pageSize="pageSize" show-total show-sizer show-elevator
          @on-change="changepage" @on-page-size-change="changePageSize" :page-size="10" :page-size-opts="[10,20]"></Page>
    <Modal title="图片预览" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%">
      <div class="footer" slot="footer">
      </div>
    </Modal>
  </Row>
</template>

<script>
import Request from '@/utils/request'
import Const from '@/utils/const'
import Login from '@/utils/loginutil'


export default {
  name: 'CommentResult',
  data() {
    return {
      userId: '',
      imgUrl: '',
      visible: false,
      self: this,
      tabColumns: [
        {
          title: '评价分数',
          className: 'table-info-columnfirst',
          filters: [
            { label: '好评', value: 'good' },
            { label: '中评', value: 'normal' },
            { label: '差评', value: 'bad' }],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 'good') {
              return row.score <= 10 && row.score >= 8
            }
            if (value === 'normal') {
              return row.score < 8 && row.score >= 2
            }
            if (value === 'bad') {
              return row.score < 2
            }
            return true
          },
          render: (h, params) => {
            return [
              [h('Rate', {
                props: {
                  count: 5,
                  value: params.row.score / 2,
                  disabled: true
                }
              }), h('Div', {
                style: {
                  'text-indent': '20%'
                }
              }, this.getRateText(params.row))]
            ]
          }
        }, {
          title: '评价内容',
          width: 500,
          render: (h, params) => {
            let j = 1
            const content = []
            for (let i = 0; i < params.row.imgs.length; i += 1, j += 1) {
              if (params.row.imgs[i]) {
                content[j] = h('Img', {
                  attrs: {
                    src: params.row.imgs[i].url
                  },
                  on: {
                    click: () => {
                      this.imgUrl = params.row.imgs[i].url
                      this.visible = true
                    }
                  },
                  style: {
                    marginRight: '5px',
                    width: '60px',
                    height: '60px',
                    display: 'inline-block',
                    border: '1px solid grey',
                    'border-radius': '4px'
                  }
                })
              }
            }
            return [h('P', {
              attrs: {
                id: 'p_' + params.row._index,
                name: 'toggle'
              },
              style: {
                color: params.row.fontColorChange ? 'red' : '',
                overflow: 'hidden',
                display: '-webkit-box',
                '-webkit-line-clamp': '3',
                '-webkit-box-orient': 'vertical'
              }
            }, params.row.content), h('Div', {
              class: 'toggle-icon ivu-icon',
              attrs: {
                name: 'toggle-icon'
              },
              on: {
                click: () => {
                  const lineLimit = document.getElementById('p_' + params.row._index).style.webkitLineClamp
                  document.getElementById('p_' + params.row._index).style.webkitLineClamp = lineLimit > 3 ? 3 : 100
                }
              }
            }), h('Div', { class: 'img-con' }, content)]
          }
        },
        {
          title: '服务名称',
          key: 'serviceName'
        },
        {
          title: '审核状态',
          key: 'checkStatus'
        },
        {
          title: '提交时间',
          key: 'createTime',
          className: 'table-info-columnend',
          render: (h, params) => {
            const optBtn = this.operationBtn(h, params.row)
            return [
              h('Font', params.row.createTime),
              h('ButtonGroup', optBtn)
            ]
          }
        }

      ],
      curPage: 1,
      tabData: [],
      total: 0,
      pageSize: 10,
      loading: true,
      selected: []
    }
  },
  async mounted() {
    this.userId = await Login.getUserId(process.env.BASE_API)
    this.getList()
  },
  updated() {
    this.ifDisplay()
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
          this.tabData = res.content
          this.total = res.totalElements
        },
        errorFn: (err) => {
          this.loading = false
          Request.errorHandler(err)
        }
      }
      const url = process.env.FEEDBACK_URL + Const.REQUEST_URLS.COMMENTS_URL
      const param = {
        userId: this.userId,
        showAll: true,
        checkStatus: 'all',
        pageIndex: this.curPage,
        pageSize: this.pageSize
      }
      Request.get(url, param, _config)
    },
    getSelected(selection) {
      this.selected = selection
    },
    editComment(commentId) {
      location.href = './comment.html?commentId=' + commentId
    },
    operationBtn(h, row) {
      const optBtn = []
      const checkStatus = row.checkStatus
      const modified = row.modified
      if (checkStatus === '审核中' || checkStatus === '未通过审核') {
        return optBtn;
      } else if (checkStatus === '审核通过') {
        if (modified) return optBtn;
        return [h('Button', {
          props: {
            size: 'small',
            icon: 'edit'
          },
          on: {
            click: () => {
              const id = row.id
              this.editComment(id)
            }
          }
        }, '修改'),
        h('Button', {
          props: {
            size: 'small',
            icon: 'trash-a'
          },
          on: {
            click: () => {
              this.$Modal.confirm({
                title: '确认框',
                content: '<p>确认删除该条评价吗？</p>',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                  const id = row.id
                  this.deleteComment(id)
                }
              })
            }
          }
        }, '删除')
        ]
      }
      return optBtn
    },
    getRateText(row) {
      if (row.score <= 10 && row.score > 8) {
        return '好评'
      }
      if (row.score <= 8 && row.score > 2) {
        return '中评'
      }
      if (row.score <= 2) {
        return '差评'
      }
      return ''
    },
    displayExtendBtn(h, params) {
      //console.log(global.getComputedStyle(document.getElementById('p_' + params.row._index)).height)
    },
    countLines(ele) {
      const styles = window.getComputedStyle(ele, null);
      const lh = parseInt(styles.lineHeight, 10);
      const h = parseInt(styles.height, 10);
      const lc = Math.round(h / lh);
      //console.log('line count:', lc, 'line-height:', lh, 'height:', h);
      return lc;
    },
    deleteComment(id) {
      const _config = {
        successFn: () => {
          this.$Message.info('操作成功！')
          this.getList()
        },
        errorFn: (err) => {
          Request.errorHandler(err)
        }
      }
      const url = process.env.FEEDBACK_URL + Const.REQUEST_URLS.COMMENTS_URL
      Request.delete(url + '/' + id, {}, _config)
    },
    ifDisplay() {
      const divs = document.getElementsByName('toggle')
      const divtoggle = document.getElementsByName('toggle-icon')
      for (let i = 0; i < divtoggle.length; i++) {
        divtoggle[i].innerHTML = '展开'
        divtoggle[i].onclick = this.isShow()
      }
      for (let j = 0; j < divs.length; j++) {
        const toggleIcon = divs[j].parentNode.children[1]
        const toggleHeight = divs[j].offsetHeight
        if ((toggleHeight >= 52) && (toggleHeight !== 54)) {
          toggleIcon.style.display = 'block'
        }
      }
    },
    isShow() {
      if (this.innerHTML === '展开') {
        this.innerHTML = '收起'
        this.className = 'toggle-icon-after ivu-icon'
      } else {
        this.innerHTML = '展开'
        this.className = 'toggle-icon ivu-icon'
      }
    }
  }
}
</script>
