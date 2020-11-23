<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Template</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">Today is Saturday, 21 November 2020</span>
          <span>Hi Jane Done!</span>
          <el-divider></el-divider>
          <h2>Manage Template</h2>
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
              prop="description"
              sortable
              label="Description">
            </el-table-column>
            <el-table-column
              prop="metadata"
              sortable
              label="Metadata">
              <template slot-scope="scope">
                <span v-for="(metadata) in scope.row.metadata" v-bind:key="metadata.id">
                  {{ metadata.name }},
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="workflow"
              sortable
              label="Workflow">
              <template slot-scope="scope">
                {{ scope.row.workflow.name }}
              </template>
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
                  v-model="templateSearch"
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
      :visible.sync="deleteTemplate.dialogVisible"
      width="30%">
      <span>Confirm template {{ deleteTemplate.item.fullName }} deletion?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteTemplate.dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="handleDelete(deleteTemplate.index, deleteTemplate.item)">Confirm Deletion</el-button>
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
      templateSearch: 'john',
      deleteTemplate: {
        dialogVisible: false,
        index: null,
        item: {},
      },
      tableData: [{
        id: '1',
        name: 'Invoice Form',
        description: 'Invoice Form',
        metadata: [{
          id: '2',
          name: 'PO Amount',
          description: 'PO Amount',
          model: 'poAmount',
          label: 'PO Amount',
          inputType: 'number',
          required: true,
          author: 'Jhon Smith',
          createdAt: '2020-11-14 00:00:00',
          updatedAt: '2020-11-14 00:00:00'
        }, {
          id: '3',
          name: 'GR/IR Amount',
          description: 'GR/IR Amount',
          model: 'grirAmount',
          label: 'GR/IR Amount',
          inputType: 'number',
          required: true,
          author: 'Jhon Smith',
          createdAt: '2020-11-14 00:00:00',
          updatedAt: '2020-11-14 00:00:00'
        }],
        workflow: {
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
        },
        author: 'Jhon Smith',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '2',
        name: 'Invoice Form',
        description: 'Invoice Form',
        metadata: [{
        id: '4',
        name: 'VAT/WHT',
        description: 'VAT/WHT',
        model: 'vatwht',
        label: 'VAT/WHT',
        inputType: 'number',
        required: true,
        author: 'Jhon Smith',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }],
        workflow: {
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
        },
        author: 'Jhon Smith',
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
      this.$router.push(`/template/${row.id}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push(`/template/${row.id}/edit`);
    },
    confirmDelete(index, row) {
      console.log(index, row);
      this.deleteTemplate.index = index;
      this.deleteTemplate.item = row;
      this.deleteTemplate.dialogVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      let idx = this.tableData.indexOf(row);
      if (idx > -1) {
          this.tableData.splice(idx, 1);
      }
      this.deleteTemplate.dialogVisible = false;
      this.$message({
          message: `Congrats, template ${row.fullName} deleted successfully.`,
          type: 'success'
        });
    },
    handleSearch(scope) {
      console.log(scope);
      this.$message({
          message: `Congrats, template ${this.templateSearch}`,
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
