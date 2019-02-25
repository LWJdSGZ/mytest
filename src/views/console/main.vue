<!--<style scoped lang="scss">
    .console-index {
        display: flex;
        flex-direction: row;
        height: 100%;

        .content {
            padding: 80px 20px 20px 15px;
            width: 1220px;
            flex-grow: 1;
            overflow-y: auto;

            &::before {
                content: "";
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #f3f3f3;
                z-index: -1;
            }
        }
    }
</style>-->

<template>
    <div class="console-index">
      21212
        <ci-console-head></ci-console-head>
        <!--<ci-console-menu></ci-console-menu>-->
        <div class="content">
            <router-view/>
        </div>

    </div>
</template>
<script>
  import consoleHead from "com/public/headerconsole.vue"
  export default {
    data() {
      return {}
    },
    components: {
      "ci-console-head": consoleHead,
    },
  }
</script>
<!--<script>
    //租户平台首页 axl
   /* import consoleHead from "com/public/headConsole.vue"
    import consoleMenu from "com/public/menu/console-menu.vue"*/

    export default {
        data() {
            return {}
        },
        components: {
            // "ci-my-service-instance": MyServiceInstance,
            // "ci-back-log": BackLog,
            // "ci-accoun-overview": AccountOverview,
            "ci-console-head": consoleHead,
            "ci-console-menu": consoleMenu,

        },
    }
</script>-->
