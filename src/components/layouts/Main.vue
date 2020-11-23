<template>
  <div id="main">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          @select="handleSelect"
          class="el-menu-navbar"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/"><h1 style="margin: 0;">ProtoKDMS</h1></el-menu-item>
          <el-menu-item>
            <el-input
              placeholder="Search document..."
              v-model="inputSearch">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-menu-item>
          <el-submenu index="#" style="float: right;">
            <template slot="title"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></template>
            <el-menu-item index="/option">Settings</el-menu-item>
            <el-menu-item index="/login">Sign out</el-menu-item>
          </el-submenu>
          <el-menu-item index="#" style="float: right;">
            <i class="el-icon-message-solid" style="color: #FFF"></i>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="#" @click="toggleSidebar">
            <i :class="iconCollapse"></i>
          </el-menu-item>
          <el-submenu index="/document">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">Manage Document</span>
            </template>
            <el-menu-item index="/document">
              <span slot="title">Display Document</span>
            </el-menu-item>
            <el-menu-item index="/document/new">
              <span slot="title">New Document</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/metadata">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span slot="title">Manage Metadata</span>
            </template>
            <el-menu-item index="/metadata">
              <span slot="title">Display Metadata</span>
            </el-menu-item>
            <el-menu-item index="/metadata/new">
              <span slot="title">New Metadata</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/role">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">Manage Role</span>
            </template>
            <el-menu-item index="/role">
              <span slot="title">Display Role</span>
            </el-menu-item>
            <el-menu-item index="/role/new">
              <span slot="title">New Role</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/template">
            <template slot="title">
              <i class="el-icon-document-copy"></i>
              <span slot="title">Manage Template</span>
            </template>
            <el-menu-item index="/template">
              <span slot="title">Display Template</span>
            </el-menu-item>
            <el-menu-item index="/template/new">
              <span slot="title">New Template</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/user">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">Manage User</span>
            </template>
            <el-menu-item index="/user">
              <span slot="title">Display User</span>
            </el-menu-item>
            <el-menu-item index="/user/new">
              <span slot="title">New User</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/workflow">
            <template slot="title">
              <i class="el-icon-coordinate"></i>
              <span slot="title">Manage Workflow</span>
            </template>
            <el-menu-item index="/workflow">
              <span slot="title">Display Workflow</span>
            </el-menu-item>
            <el-menu-item index="/workflow/new">
              <span slot="title">New Workflow</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/login">
            <i class="el-icon-user"></i>
            <span slot="title">Sign in</span>
          </el-menu-item>
        </el-menu>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '/',
      isCollapse: true,
      iconCollapse: 'el-icon-caret-right',
      inputSearch: '',
    };
  },
  mounted() {
  },
  methods: {
    handleSelect(key, keyPath) {
      // if (key === '/logout') {
      //   this.$store.dispatch('user/logout');
      //   this.$router.push('/login');
      // } else {
        this.$router.push(key);
      // }
      console.log(key, keyPath);
    },
    toggleSidebar() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.iconCollapse = 'el-icon-caret-right';
      } else {
        this.iconCollapse = 'el-icon-caret-left';
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
};
</script>

<style lang="less" scoped>
  body #app #main {
    height: 100%;
  }
  body #app #main .el-container {
    height: 100%;
  }
  .el-header, .el-main {
    padding: 0 !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
  }
</style>
