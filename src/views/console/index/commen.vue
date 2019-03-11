<template>
  <div class="wrapper">
    <span>commen</span>
    <!--<console-chartson title='儿子' :selected='selected'></console-chartson>-->
    <Menu @on-select="changeMenu">
      <MenuItem name="1-1">亚马逊云·中国</MenuItem>
      <MenuItem name="1-2">阿里云</MenuItem>
      <MenuItem name="1-3">腾讯云</MenuItem>
    </Menu>
    <div class="charts">
      {{this.$route.params.id}}
    </div>
  </div>
</template>

<script>

  export default {
    name: 'hello',
    data () {
      return {
        tableDataList: '',
        providerName:'',
      }
    },
    mounted(){
      console.log(this.$route.params.id)

    },
    methods: {
      changeMenu(name){
        this.tableDataList = [];
        this.providerName = "aliyun_china";
        if(name == "1-1"){
          this.providerName = "aws_china"
        }else if(name == "1-2"){
          this.providerName = "aliyun_china";
        }else if(name == "1-3"){
          this.providerName = "tencent";
        }
        this.$router.push('/console/commen/'+this.providerName)

      },
    },
    components:{
    },
    watch: {
      providerName(val) {
        console.log('val',val)
      }
    }
  }
</script>

