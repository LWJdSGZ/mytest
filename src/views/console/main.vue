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
