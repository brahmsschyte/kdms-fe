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
          <el-menu-item index="/"><h1 style="margin: 0;">Delapan</h1></el-menu-item>
          <el-menu-item index="#">
            <el-autocomplete
              class="inline-input"
              v-model="inputSearch"
              :fetch-suggestions="querySearch"
              placeholder="Search document..."
              @select="handleSearch"
            >
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>
          </el-menu-item>
          <el-submenu index="#" style="float: right;">
            <template slot="title"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></template>
            <el-menu-item index="/option">Settings</el-menu-item>
            <el-menu-item index="/logout">Sign out</el-menu-item>
          </el-submenu>
          <el-menu-item index="#" style="float: right;">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-message-solid" style="color: #FFF"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><i class="el-icon-document"></i>Pending Invoice01.pdf needs review</el-dropdown-item>
                <el-dropdown-item divided><i class="el-icon-document"></i>Pending Invoice02.pdf needs review</el-dropdown-item>
                <el-dropdown-item divided><i class="el-icon-document"></i>Pending Invoice03.pdf needs review</el-dropdown-item>
                <el-dropdown-item divided><i class="el-icon-document"></i>Pending Invoice04.pdf needs review</el-dropdown-item>
                <el-dropdown-item divided>See All Messages</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
      docs: [{
        id: '1',
        fileName: 'invoice01.pdf',
        fileSize: '2.2 MB',
        status: 'Reviewed',
        physicalLocation: 'Room 1 Shelf 2C',
        template: 'Invoice Form',
        author: 'John Smith',
        value: 'invoice01.pdf',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '2',
        fileName: 'invoice02.pdf',
        fileSize: '2.2 MB',
        status: 'Submitted',
        physicalLocation: 'Room 1 Shelf 2C',
        template: 'Invoice Form',
        author: 'Jane Doe',
        value: 'invoice02.pdf',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '3',
        fileName: 'invoice03.pdf',
        fileSize: '2.2 MB',
        status: 'Submitted',
        physicalLocation: 'Room 1 Shelf 2C',
        template: 'Invoice Form',
        author: 'Chris Evan',
        value: 'invoice03.pdf',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '4',
        fileName: 'invoice04.pdf',
        fileSize: '2.2 MB',
        status: 'Submitted',
        physicalLocation: 'Room 1 Shelf 2C',
        template: 'Invoice Form',
        author: 'Scarlett Johansson',
        value: 'invoice04.pdf',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '5',
        fileName: 'invoice05.pdf',
        fileSize: '2.2 MB',
        status: 'Submitted',
        physicalLocation: 'Room 1 Shelf 2C',
        template: 'Invoice Form',
        author: 'Tom Hardy',
        value: 'invoice05.pdf',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }],
    };
  },
  mounted() {
  },
  methods: {
    querySearch(queryString, cb) {
      var docs = this.docs;
      var results = queryString ? docs.filter(this.createFilter(queryString)) : docs;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      return (doc) => {
        return (doc.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(key) {
      if (key === '/logout') {
        this.$store.dispatch('user/logout');
        this.$router.push('/login');
      } else if (key !== '#') {
        if (this.$route.path !== key) this.$router.push(key)
      }
    },
    handleSearch(item) {
      console.log(item);
      this.$router.push(`/document/${item.id}`);
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
