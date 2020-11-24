<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>User</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">Today is Saturday, 21 November 2020</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <h2>Manage User</h2>
          <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            :default-sort = "{prop: 'id', order: 'ascending'}"
            style="width: 100%">
            <el-table-column
              prop="name"
              sortable
              label="Name">
            </el-table-column>
            <el-table-column
              prop="title"
              sortable
              label="Title">
            </el-table-column>
            <el-table-column
              prop="email"
              sortable
              label="Email">
            </el-table-column>
            <el-table-column
              prop="phone"
              sortable
              label="Phone">
            </el-table-column>
            <el-table-column
              prop="createdAt"
              sortable
              label="Join Date">
            </el-table-column>
            <el-table-column
              prop="updatedAt"
              sortable
              label="Last Modified">
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              label="Operations">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="userSearch"
                  @change="handleSearch(scope)"
                  size="mini"
                  placeholder="Type to search">
                </el-input>
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  icon="el-icon-search" circle
                  @click="handleShow(scope.$index, scope.row)"></el-button>
                <el-button
                  size="mini"
                  icon="el-icon-edit" circle
                  @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete" circle
                  @click="confirmDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-col>
      </el-row>
    </el-container>
    <el-dialog
      title="WARNING!"
      :visible.sync="deleteUser.dialogVisible"
      width="30%">
      <span>Confirm user {{ deleteUser.item.fullName }} deletion?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteUser.dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="handleDelete(deleteUser.index, deleteUser.item)">Confirm Deletion</el-button>
      </span>
    </el-dialog>
  </LayoutMain>
</template>

<script>
// @ is an alias to /src
import LayoutMain from '@/components/layouts/Main.vue';

export default {
  data() {
    return {
      userSearch: 'john',
      deleteUser: {
        dialogVisible: false,
        index: null,
        item: {},
      },
      tableData: [],
      loading: true
    };
  },
  name: 'home',
  components: {
    LayoutMain,
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$store.dispatch('user/list').then((list) => {
        this.tableData = list;
        this.loading = false;
      });
    },
    handleShow(index, row) {
      console.log(index, row);
      this.$router.push(`/user/${row._id}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push(`/user/${row._id}/edit`);
    },
    confirmDelete(index, row) {
      console.log(index, row);
      this.deleteUser.index = index;
      this.deleteUser.item = row;
      this.deleteUser.dialogVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$store.dispatch('user/delete', { id: row._id}).then(() => {
        let idx = this.tableData.indexOf(row);
        if (idx > -1) {
            this.tableData.splice(idx, 1);
        }
        this.deleteUser.dialogVisible = false;
        this.$message({
            message: `Congrats, user ${row.name} deleted successfully.`,
            type: 'success'
          });
      }).catch(() => {
        this.$message({
          message: 'user deletion failed.',
          type: 'error',
        });
      });
    },
    handleSearch(scope) {
      console.log(scope);
      this.$message({
          message: `Congrats, user ${this.userSearch}`,
          type: 'success'
        });
    }
  }
};
</script>

<style scoped>
  body {
    height: 100%;
    width: 100%;
  }

  .el-container {
    margin: 20px;
    padding: 20px;
    /* text-align: center; */
    display: block;
    border: 1px solid #eee;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
  }
</style>
