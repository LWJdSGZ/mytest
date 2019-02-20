<template>
  <div>
    <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultFileList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="100"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      name="multipartFile"
      type="drag"
      :action=uploadUrl
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="图片预览" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%">
      <div class="footer" slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
import Request from '@/utils/request'

export default {
  props: ['imgs'],
  data() {
    return {
      defaultFileList: [],
      imgUrl: '',
      visible: false,
      uploadList: [],
      uploadUrl: process.env.FILE_SERVER_URL + '/fileServer/uploadImageFile.do'
    }
  },
  methods: {
    handleView(url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      this.$emit('removeImg', { url: file.url, uuid: file.uuid })
      Request.delete(process.env.FILE_SERVER_URL + file.uuid + '/fileServer/deleteFile.do', null, null)
    },
    handleSuccess(res, file) {
      file.url = res.image_url
      file.uuid = res.image_uuid
      this.$emit('addImg', { url: file.url, uuid: file.uuid })
    },

    handleFormatError() {
      this.$Notice.warning({
        title: '图片文件格式有误。'
      })
    },
    handleMaxSize() {
      this.$Notice.warning({
        title: '文件大小不能超过100K。'
      })
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: '最多只能上传5张图片。'
        })
      }
      return check
    }
  },
  created() {
    for (const index in this.imgs) {
      this.defaultFileList.push({ url: this.imgs[index].url, uuid: this.imgs[index].uuid })
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList
  }
}
</script>
<style>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
