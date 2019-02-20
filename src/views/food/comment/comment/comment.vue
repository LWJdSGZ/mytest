<template>
  <div id="comment">
    <div class="title ">
      <Breadcrumb class="center" separator=">">
        <BreadcrumbItem>用户中心</BreadcrumbItem>
        <BreadcrumbItem to="./index.html">评价管理</BreadcrumbItem>
        <BreadcrumbItem>{{breadCrumbInfo}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="instanceInfo-bg">
      <div class="commentServiceName" v-if="isUpdate">
        被评价服务：{{commentInfo.serviceName}}
      </div>
      <div class="instanceInfo" v-else>
        <Row>
          <Col span="18">
            <Row>
              <Col class="instanceServiceName" span="24">
              {{instanceInfo.serviceName}}
              </Col>
            </Row>
            <Row>
              <Col class="instanceCreateTime" span="24">
              创建时间：{{instanceInfo.instanceCreateTime}}
              </Col>
            </Row>
          </Col>
          <Col class="costDetail" span="6">
          配置费用：<span class="costDetail-price" >{{instanceInfo.costDetail}}</span>
          </Col>
        </Row>
      </div>
    </div>
    <div class="comment-bg">
      <div class="comment-area">
        <Row>
          <Col class="commentInfoScore" span="20">
          <span>满意度评分：</span>
          <Rate v-model="commentRate">
            <span style="color: #f5a623">{{commentRate}}</span>
          </Rate>
          </Col>
          <Col class="commentHelp" span="4" >
            <a type="primary" @click="commentModal = true">评价须知</a>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <div v-if="isUpdate">修改评价：请重新评价当前产品，如需重新上传图片请先删除当前图片。</div>
          <Input class="commentText" type="textarea" :rows="5" :maxlength="500" v-model="commentInfo.content" />
          </Col>
        </Row>
        <Row class="add-pic">
          <Col span="2">添加图片:</Col>
          <Col span="14">
          <PictureUpload v-if="load" :imgs="commentInfo.imgs" v-on:addImg="addImg" v-on:removeImg="removeImg"></PictureUpload>
          </Col>

          <Col span="4">
            <radio-group v-model="commentInfo.anonymous">
              <radio label="false">
                <span>公开</span>
              </radio>
              <radio label="true">
                <span>匿名</span>
              </radio>
            </radio-group>
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col span="24" class="comment-btn">
          <Button v-if="isUpdate" type="primary" @click="updateComment">修改评价</Button>
          <Button v-else type="primary" @click="addComment">发表评价</Button>
          </Col>
        </Row>
      </div>
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

<script>
import Request from '@/utils/request'
import Const from '@/utils/const'
import BusiUtil from '@/utils/busi'
import UrlUtil from '@/utils/urlparam'
import PictureUpload from '@/components/PictureUpload'
import Login from '@/utils/loginutil'
import Util from '@/utils/util'

export default {
  data() {
    return {
      breadCrumbInfo: '',
      instanceId: '',
      instanceInfo: {
        serviceName: '',
        instanceCreateTime: '',
        costDetail: ''
      },
      commentId: '',
      commentInfo: {
        serviceName: '',
        content: '',
        score: 10,
        imgs: [],
        anonymous: 'false',
        userId: '',
        userName: '',
        tenantId: '',
        tenantAdmin: ''
      },
      commentRate: 5,
      isUpdate: false,
      load: false,
      commentModal: false
    }
  },
  components: { PictureUpload },
  beforeMount() {
    const commentId = UrlUtil.getUrlKey('commentId')
    if (commentId) {
      this.commentId = commentId
      this.isUpdate = true
    } else {
      this.instanceId = UrlUtil.getUrlKey('instanceId')
    }
  },
  async mounted() {
    const user = await Login.getUser(process.env.BASE_API)
    if (user === null) {
      this.$Notice.error({ title: '请先登录' })
    } else {
      this.commentInfo.userId = user.userId
      this.commentInfo.userName = user.userName
      this.commentInfo.tenantId = user.tenantId
      this.commentInfo.tenantAdmin = Login.isTenantAdmin(user.roles)
      this.loadInstanceInfo()
      this.getBreadCrumbInfo()
    }
  },
  methods: {
    getBreadCrumbInfo() {
      if (this.commentId) {
        this.breadCrumbInfo = '修改评价'
      } else {
        this.breadCrumbInfo = '发表评价'
      }
    },
    loadInstanceInfo() {
      if (this.commentId) {
        const _url = process.env.FEEDBACK_URL + Const.REQUEST_URLS.COMMENT_URL + this.commentId
        const _config = {
          successFn: (res) => {
            // console.log('res=')
            // console.log(res)
            this.commentInfo = BusiUtil.setJsonValueFromJson(this.commentInfo, res)
            this.commentRate = this.commentInfo.score / 2
            this.load = true
          }
        }
        Request.get(_url, this.userId, _config)
      } else if (this.instanceId) {
        const _url = process.env.FEEDBACK_URL + Const.REQUEST_URLS.INSTANCE_URL + this.instanceId
        const _config = {
          successFn: (res) => {
            // console.log('res=')
            // console.log(res)
            this.instanceInfo = BusiUtil.setJsonValueFromJson(this.instanceInfo, res)
            this.load = true
          }
        }
        Request.get(_url, this.userId, _config)
      } else {
        this.$Notice.error({ title: '页面加载失败,请重试' })
      }
    },
    addImg(value) {
      this.commentInfo.imgs.push(value)
      // console.log('this.commentInfo.addImg')
      // console.log(this.commentInfo.imgs)
    },
    removeImg(value) {
      this.commentInfo.imgs.splice(this.commentInfo.imgs.findIndex((item) => { return item.uuid === value.uuid }), 1)
      // console.log('this.commentInfo.removeImg')
      // console.log(this.commentInfo.imgs)
    },
    addComment() {
      if (Util.isNull(this.commentInfo.content)) {
        this.$Notice.error({ title: '请输入评价内容' })
        return
      }

      const _config = {
        successFn: (res) => {
          if (res === '') {
            this.$Notice.error({ title: '发布失败' })
          } else {
            this.$Notice.success({ title: '发布成功' })
          }
        }
      }
      const _url = process.env.FEEDBACK_URL + Const.REQUEST_URLS.COMMENTS_URL + '?instanceId=' + this.instanceId
      // console.log(_url)
      this.commentInfo.score = this.commentRate * 2
      Request.post(_url, this.commentInfo, _config)
      function delay() { "location.href = './index.html'" }
      setTimeout(delay(), 1000);
    },
    updateComment() {
      const _config = {
        successFn: (res) => {
          if (res === '') {
            this.$Notice.error({ title: '修改失败' })
          } else {
            this.$Notice.success({ title: '修改成功' })
          }
        }
      }
      const _url = process.env.FEEDBACK_URL + Const.REQUEST_URLS.COMMENTS_URL + '/' + this.commentId
      this.commentInfo.score = this.commentRate * 2
      Request.put(_url, this.commentInfo, _config)
      function delay() { "location.href = './index.html'" }
      setTimeout(delay(), 1000);
    }
  }
}
</script>

<style lang="less">
  @import '../../../../css/comment.less';
</style>
