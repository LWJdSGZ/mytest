<style scoped lang="less">
  .console-index {
    display: flex;
    flex-direction: row;
    height: 100%;
    .content {
      padding: 80px 20px 20px 15px;
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
</style>

<template>
    <div class="console-index">
        <console-head></console-head>
        <console-menu></console-menu>
        <div class="content">
            <router-view/>
        </div>

    </div>
</template>
<script>
  import consoleHead from "com/public/headerConsole.vue"
  import consoleMenu from "com/public/menuConsole.vue"
  export default {
    data() {
      return {}
    },
    components: {
      "console-head": consoleHead,
      "console-menu": consoleMenu,
    },
  }
</script>
