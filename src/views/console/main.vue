<style scoped lang="less">
  .console-index {
    display: flex;
    flex-direction: row;
    height: 100%;
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
