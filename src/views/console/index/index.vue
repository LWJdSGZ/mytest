<template>

    <div class="console-index">
        <Row style="width:100%">
          <i-col span="10">
            121
          </i-col>
          <i-col span="7">
            121

          </i-col>
          <i-col span="7">
            121

          </i-col>
            <!--<i-col span="10">
                <ci-my-service-instance></ci-my-service-instance>
            </i-col>
            <i-col span="7">
                <ci-back-log></ci-back-log>
            </i-col>
            <i-col span="7">
                <ci-accoun-overview></ci-accoun-overview>
            </i-col>-->
        </Row>

    </div>

</template>

<script>


/*import consoleHead from "com/public/headConsole.vue"
import consoleMenu from "com/public/menu/console-menu.vue"

import MyServiceInstance from "com/console/index/my-service-instance";
import BackLog from "com/console/index/backlog";
import AccountOverview from "com/console/index/account-overview";*/


export default {
  data() {
      return {};
  },
  components: {
      "ci-my-service-instance": MyServiceInstance,
      "ci-back-log": BackLog,
      "ci-accoun-overview": AccountOverview,
    "ci-console-head": consoleHead,
    "ci-console-menu": consoleMenu,

  },
    methods: {}
};
</script>

<style scoped>
.console-index{
  width: 100%;
  min-height: 800px;

}


</style>
