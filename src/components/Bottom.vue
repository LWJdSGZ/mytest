<template>
 <div class="bottom">
   <Row class-name="gridRow">
     <Col class="gridCol" span="12" offset="4">
     <br/>
     <span>配置费用总计：</span>
     <br/>
     <span v-for="item in this.price" :key="item.price" class="priceFont">{{item.price}}</span>
     <span>{{item.unit}}</span>
     </Col>
     <Col span="8" class="gridCol">
     <Button class="bottomButton" type="error" shape="circle" v-on:click="submit">立即购买</Button>
     <Button class="bottomButton" v-on:click="addOrder" shape="circle">加入订单</Button>
     </Col>
   </Row>
 </div>
</template>

<script>
export default {
  name: 'bottom',
  props: [
    'price',
    'unit'
  ],
  methods: {
    submit: function () {
      this.$emit('submit')
    },
    addOrder: function () {
      this.$emit('addOrder')
    }
  }
}
</script>

<style scoped>
  .bottom{
    height: 200px;
    position:fixed;
    bottom:0;
    z-index:999;
    background-color: #F6F7F8;
  }
  .bottomButton{
    height: 40px;
    width: 140px;
    margin-top: 70px;
    margin-right: 20px;
    font-size: 15px;
    font-weight: bold;
  }
  .gridRow{
    height: 200px;
  }
  .gridCol{
    height: 200px;
  }
  .priceFont{
    font-size: 40px;
    color: red;
  }
  span{
    font-size: 15px;
  }
</style>
