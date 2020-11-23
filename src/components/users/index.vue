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
          <span>Hi Jane Done!</span>
          <el-divider></el-divider>
          <h2>Manage User</h2>
          <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            :default-sort = "{prop: 'id', order: 'ascending'}"
            style="width: 100%">
            <el-table-column
              prop="id"
              sortable
              label="ID">
            </el-table-column>
            <el-table-column
              prop="fullName"
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
      tableData: [{
        id: '1',
        fullName: 'John Smith',
        title: 'Supervisor',
        email: 'jhon.smith@example.com',
        phone: '08123456789',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '2',
        fullName: 'Jane Doe',
        title: 'Manager',
        email: 'jane.doe@example.com',
        phone: '08123456789',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '3',
        fullName: 'Chris Evan',
        title: 'Captain America',
        email: 'chris.evan@example.com',
        phone: '08123456789',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '4',
        fullName: 'Scarlett Johansson',
        title: 'Black Widow',
        email: 'scarlett.johansson@example.com',
        phone: '08123456789',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '5',
        fullName: 'Tom Hardy',
        title: 'Good Guy',
        email: 'tom.hardy@example.com',
        phone: '08123456789',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '6',
        fullName: 'Keanu Reeves',
        title: 'Samurai',
        email: 'keanu.reeves@example.com',
        phone: '08123456789',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '7',
        fullName: 'Will Smith',
        title: 'Prince',
        email: 'will.smith@example.com',
        phone: '08123456789',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '8',
        fullName: 'Jhonny Depp',
        title: 'Captain',
        email: 'jhonny.depp@example.com',
        phone: '08123456789',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '9',
        fullName: 'Ryan Reynolds',
        title: 'Supervisor',
        email: 'ryan.reynolds@example.com',
        phone: '08123456789',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '10',
        fullName: 'Peter Parker',
        title: 'Staff',
        email: 'peter.parker@example.com',
        phone: '08123456789',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }],
      loading: false
    };
  },
  name: 'home',
  components: {
    LayoutMain,
  },
  created() {
  },
  methods: {
    handleShow(index, row) {
      console.log(index, row);
      this.$router.push(`/user/${row.id}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push(`/user/${row.id}/edit`);
    },
    confirmDelete(index, row) {
      console.log(index, row);
      this.deleteUser.index = index;
      this.deleteUser.item = row;
      this.deleteUser.dialogVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      let idx = this.tableData.indexOf(row);
      if (idx > -1) {
          this.tableData.splice(idx, 1);
      }
      this.deleteUser.dialogVisible = false;
      this.$message({
          message: `Congrats, user ${row.fullName} deleted successfully.`,
          type: 'success'
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
