
<template>
  <div >
    <div class="title">
      <Breadcrumb class="center" separator=">">
        <BreadcrumbItem>用户中心</BreadcrumbItem>
        <BreadcrumbItem to="./index.html">评价管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div id="comment-con">
      <a class="comment-rule" @click="commentModal = true">
        查看评价规则
      </a>
      <Tabs id="tab-list" class="tab-list" value="tab2" @on-click="refTab">
        <TabPane class="tab-list-pane"  :label="label1" key="tab1" name="tab1">
          <commentInstanceList ref="table1" @getTotal="getTotal"></commentInstanceList>
        </TabPane>
        <TabPane class="tab-list-pane" label="已评价" key="tab2" name="tab2">
          <commentResult ref="table2"></commentResult>
        </TabPane>
      </Tabs>
    </div>
    <Modal id="noticeModal"
           v-model="commentModal"
           title=""
           :closable="true">
      <div style="margin-top: 20px;font-size: 14px;">
        <p>请您根据本次交易，给予真实、客观、仔细地评价。您的评价将是其他会员的参考，也将影响产品的信用。</p>
        <p>1、禁止发表赌博、嫖娼等违法和不健康言论。</p>
        <p>2、禁止发布反党反人民的言论，以及淫秽色情等不健康内容。</p>
        <p>3、禁止恶意刷屏。</p>
        <p>4、禁止辱骂、人身攻击。</p>
        <p>5、禁止发布各种不良广告。</p>
      </div>
      <div class="footer" slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">

import commentInstanceList from '../comment-instance-list/comment-instance-list.vue'
import comment from '../comment/comment.vue'
import commentResult from '../comment-result/comment-result.vue'

export default {
  name: 'CommentsList',
  components: { commentInstanceList, comment, commentResult },
  data() {
    return {
      commentModal: false,
      label1: (h) => {
        return h('div', [
          h('span', '待评价 '),
          h('Badge', {
            props: {
              count: this.total
            }
          })
        ])
      },
      total: 0
    }
  },

  methods: {
    refTab(key) {
      if (key === 'tab1') {
        this.$refs.table1.getList()
      } else if (key === 'tab2') {
        this.$refs.table2.getList()
      } else if (key === 'tab3') {
        this.$refs.table3.getList()
      }
    },
    getTotal(num) {
      this.total = num
    }
  }
}
</script>
<style lang="less">
  @import '../../../../css/comment-instance-list.less';
</style>
