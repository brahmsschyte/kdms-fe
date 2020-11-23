<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Role</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">Today is Saturday, 21 November 2020</span>
          <span>Hi Jane Done!</span>
          <el-divider></el-divider>
          <h2>Manage Role</h2>
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
              prop="name"
              sortable
              label="Name">
            </el-table-column>
            <el-table-column
              prop="create"
              sortable
              label="Create"
              align="center">
              <template slot-scope="scope">
                <h1 v-if="scope.row.create"><i class="el-icon-check" style="color: green;font-weight: 900;"></i></h1>
                <h1 v-else><i class="el-icon-close" style="color: red;font-weight: 900;"></i></h1>
              </template>
            </el-table-column>
            <el-table-column
              prop="read"
              sortable
              label="Read"
              align="center">
              <template slot-scope="scope">
                <h1 v-if="scope.row.read"><i class="el-icon-check" style="color: green;font-weight: 900;"></i></h1>
                <h1 v-else><i class="el-icon-close" style="color: red;font-weight: 900;"></i></h1>
              </template>
            </el-table-column>
            <el-table-column
              prop="update"
              sortable
              label="Update"
              align="center">
              <template slot-scope="scope">
                <h1 v-if="scope.row.update"><i class="el-icon-check" style="color: green;font-weight: 900;"></i></h1>
                <h1 v-else><i class="el-icon-close" style="color: red;font-weight: 900;"></i></h1>
              </template>
            </el-table-column>
            <el-table-column
              prop="delete"
              sortable
              label="Delete"
              align="center">
              <template slot-scope="scope">
                <h1 v-if="scope.row.delete"><i class="el-icon-check" style="color: green;font-weight: 900;"></i></h1>
                <h1 v-else><i class="el-icon-close" style="color: red;font-weight: 900;"></i></h1>
              </template>
            </el-table-column>
            <el-table-column
              prop="createdAt"
              sortable
              label="created At">
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
                  v-model="roleSearch"
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
      :visible.sync="deleteRole.dialogVisible"
      width="30%">
      <span>Confirm role {{ deleteRole.item.fullName }} deletion?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteRole.dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="handleDelete(deleteRole.index, deleteRole.item)">Confirm Deletion</el-button>
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
      roleSearch: 'john',
      deleteRole: {
        dialogVisible: false,
        index: null,
        item: {},
      },
      tableData: [{
        id: '1',
        name: 'Administrator',
        create: true,
        read: true,
        update: true,
        delete: true,
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '2',
        name: 'Finance',
        create: true,
        read: false,
        update: true,
        delete: false,
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '3',
        name: 'General Affair',
        create: false,
        read: true,
        update: false,
        delete: true,
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '4',
        name: 'Accounting',
        create: false,
        read: true,
        update: false,
        delete: false,
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
      this.$router.push(`/role/${row.id}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push(`/role/${row.id}/edit`);
    },
    confirmDelete(index, row) {
      console.log(index, row);
      this.deleteRole.index = index;
      this.deleteRole.item = row;
      this.deleteRole.dialogVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      let idx = this.tableData.indexOf(row);
      if (idx > -1) {
          this.tableData.splice(idx, 1);
      }
      this.deleteRole.dialogVisible = false;
      this.$message({
          message: `Congrats, role ${row.fullName} deleted successfully.`,
          type: 'success'
        });
    },
    handleSearch(scope) {
      console.log(scope);
      this.$message({
          message: `Congrats, role ${this.roleSearch}`,
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
