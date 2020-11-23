<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Metadata</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">Today is Saturday, 21 November 2020</span>
          <span>Hi Jane Done!</span>
          <el-divider></el-divider>
          <h2>Manage Metadata</h2>
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
              prop="model"
              sortable
              label="Model">
            </el-table-column>
            <el-table-column
              prop="label"
              sortable
              label="Label">
            </el-table-column>
            <el-table-column
              prop="inputType"
              sortable
              label="Input Type">
            </el-table-column>
            <el-table-column
              prop="required"
              sortable
              label="Required"
              align="center">
              <template slot-scope="scope">
                <h1 v-if="scope.row.required"><i class="el-icon-check" style="color: green;font-weight: 900;"></i></h1>
                <h1 v-else><i class="el-icon-close" style="color: red;font-weight: 900;"></i></h1>
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
              label="Created At">
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
                  v-model="metadataSearch"
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
      :visible.sync="deleteMetadata.dialogVisible"
      width="30%">
      <span>Confirm metadata {{ deleteMetadata.item.fullName }} deletion?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteMetadata.dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="handleDelete(deleteMetadata.index, deleteMetadata.item)">Confirm Deletion</el-button>
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
      metadataSearch: 'john',
      deleteMetadata: {
        dialogVisible: false,
        index: null,
        item: {},
      },
      tableData: [{
        id: '1',
        name: 'Nomor Surat Jalan',
        description: 'Nomor Surat Jalan',
        model: 'noSuratJalan',
        label: 'Nomor Surat Jalan',
        inputType: 'text',
        required: true,
        author: 'Jhon Smith',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
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
      }, {
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
      this.$router.push(`/metadata/${row.id}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push(`/metadata/${row.id}/edit`);
    },
    confirmDelete(index, row) {
      console.log(index, row);
      this.deleteMetadata.index = index;
      this.deleteMetadata.item = row;
      this.deleteMetadata.dialogVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      let idx = this.tableData.indexOf(row);
      if (idx > -1) {
          this.tableData.splice(idx, 1);
      }
      this.deleteMetadata.dialogVisible = false;
      this.$message({
          message: `Congrats, metadata ${row.fullName} deleted successfully.`,
          type: 'success'
        });
    },
    handleSearch(scope) {
      console.log(scope);
      this.$message({
          message: `Congrats, metadata ${this.metadataSearch}`,
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
