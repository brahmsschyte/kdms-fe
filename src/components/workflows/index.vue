<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Workflow</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">{{ $store.getters['user/currentDate'] }}</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <h2>Manage Workflow</h2>
          <el-table
            v-loading="loading"
            :data="filteredData"
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
              prop="author"
              sortable
              label="Author">
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
                  v-model="workflowSearch"
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
      :visible.sync="deleteWorkflow.dialogVisible"
      width="30%">
      <span>Confirm workflow {{ deleteWorkflow.item.fullName }} deletion?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteWorkflow.dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="handleDelete(deleteWorkflow.index, deleteWorkflow.item)">Confirm Deletion</el-button>
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
      workflowSearch: '',
      deleteWorkflow: {
        dialogVisible: false,
        index: null,
        item: {},
      },
      tableData: [{
        id: '1',
        name: 'Invoice Verification',
        steps: [{
          id: 1,
          action: 'review',
          userId: 2,
        },{
          id: 2,
          action: 'approve',
          userId: 3,
        },{
          id: 3,
          action: 'notify',
          userId: 4,
        }],
        author: 'Jhon Smith',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '2',
        name: 'Tax Review',
        steps: [{
          id: 1,
          action: 'review',
          userId: 2,
        },{
          id: 2,
          action: 'approve',
          userId: 3,
        },{
          id: 3,
          action: 'notify',
          userId: 4,
        }],
        author: 'Jhon Smith',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }],
      filteredData: [],
      loading: true
    };
  },
  name: 'home',
  components: {
    LayoutMain,
  },
  mounted() {
    this.getWorkflowList();
  },
  methods: {
    getWorkflowList() {
      this.filteredData = this.tableData;
      this.loading = false;
    },
    handleShow(index, row) {
      console.log(index, row);
      this.$router.push(`/workflow/${row.id}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push(`/workflow/${row.id}/edit`);
    },
    confirmDelete(index, row) {
      console.log(index, row);
      this.deleteWorkflow.index = index;
      this.deleteWorkflow.item = row;
      this.deleteWorkflow.dialogVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      let idx = this.tableData.indexOf(row);
      if (idx > -1) {
          this.tableData.splice(idx, 1);
      }
      idx = this.filteredData.indexOf(row);
      if (idx > -1) {
          this.filteredData.splice(idx, 1);
      }
      this.deleteWorkflow.dialogVisible = false;
      this.$message({
          message: `Congrats, workflow ${row.fullName} deleted successfully.`,
          type: 'success'
        });
    },
    handleSearch(scope) {
      console.log(scope);
      this.filteredData = this.tableData.filter(item => item.name.toLowerCase().includes(this.workflowSearch.toLowerCase()));
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
