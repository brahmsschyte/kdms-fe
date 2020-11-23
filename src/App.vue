<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  body #app {
    height: 100%;
  }
  body {
    margin: 0;
    font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  header.el-drawer__header {
    margin-bottom: 15px;
  }
  section.el-drawer__body {
    overflow-y: auto;
  }
  input#left-input.el-input__inner {
    border-radius: 4px 0 0 4px;
  }
  input#right-input.el-input__inner {
    border-radius: 0 4px 4px 0;
  }
  .drawer-divider.el-divider--horizontal {
    margin: 10px 0;
  }
  .el-breadcrumb {
    padding: 20px 0 0 20px;
  }
  body #app #main .el-container .el-main {
    margin-bottom: 60px;
  }
  body #app #main .el-container .el-menu-vertical-demo {
    overflow-y: auto;
  }
</style>
