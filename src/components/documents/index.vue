<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Document</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">Today is Saturday, 21 November 2020</span>
          <span>Hi Jane Done!</span>
          <el-divider></el-divider>
          <h2>Manage Document</h2>
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
              prop="fileName"
              sortable
              label="Name">
            </el-table-column>
            <el-table-column
              prop="fileSize"
              sortable
              label="Size">
            </el-table-column>
            <el-table-column
              prop="status"
              sortable
              label="Status">
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
                  v-model="documentSearch"
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
      :visible.sync="deleteDocument.dialogVisible"
      width="30%">
      <span>Confirm document {{ deleteDocument.item.fileName }} deletion?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDocument.dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="handleDelete(deleteDocument.index, deleteDocument.item)">Confirm Deletion</el-button>
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
      documentSearch: 'john',
      deleteDocument: {
        dialogVisible: false,
        index: null,
        item: {},
      },
      tableData: [{
        id: '1',
        fileName: 'invoice01.pdf',
        fileSize: '2.2 MB',
        status: 'Reviewed',
        physicalLocation: 'Room 1 Shelf 2C',
        template: 'Invoice Form',
        author: 'John Smith',
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
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '6',
        fileName: 'invoice06.pdf',
        fileSize: '2.2 MB',
        status: 'Submitted',
        physicalLocation: 'Room 1 Shelf 2C',
        template: 'Invoice Form',
        author: 'Keanu Reeves',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '7',
        fileName: 'invoice07.pdf',
        fileSize: '2.2 MB',
        status: 'Submitted',
        physicalLocation: 'Room 1 Shelf 2C',
        template: 'Invoice Form',
        author: 'Will Smith',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '8',
        fileName: 'invoice08.pdf',
        fileSize: '2.2 MB',
        status: 'Submitted',
        physicalLocation: 'Room 1 Shelf 2C',
        template: 'Invoice Form',
        author: 'Jhonny Depp',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '9',
        fileName: 'invoice09.pdf',
        fileSize: '2.2 MB',
        status: 'Submitted',
        physicalLocation: 'Room 1 Shelf 2C',
        template: 'Invoice Form',
        author: 'Ryan Reynolds',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      }, {
        id: '10',
        fileName: 'invoice10.pdf',
        fileSize: '2.2 MB',
        status: 'Submitted',
        physicalLocation: 'Room 1 Shelf 2C',
        template: 'Invoice Form',
        author: 'Peter Parker',
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
      this.$router.push(`/document/${row.id}`);
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push(`/document/${row.id}/edit`);
    },
    confirmDelete(index, row) {
      console.log(index, row);
      this.deleteDocument.index = index;
      this.deleteDocument.item = row;
      this.deleteDocument.dialogVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
      let idx = this.tableData.indexOf(row);
      if (idx > -1) {
          this.tableData.splice(idx, 1);
      }
      this.deleteDocument.dialogVisible = false;
      this.$message({
          message: `Congrats, document ${row.fileName} deleted successfully.`,
          type: 'success'
        });
    },
    handleSearch(scope) {
      console.log(scope);
      this.$message({
          message: `Congrats, document ${this.documentSearch}`,
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
