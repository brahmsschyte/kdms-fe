<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>Home</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">Today is Saturday, 21 November 2020</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <div>
            <h2>Welcome to Delapan Web Apps</h2>
            <p>A Knowledge and Document Collaboration Platform</p>
            
            <el-row :gutter="20">
              <el-col :span="6">
                <el-card shadow="hover">
                  <el-row>
                    <el-col :span="8">
                  <i class="el-icon-user" style="font-size: 73px;"></i>
                    </el-col>
                    <el-col :span="16">
                      <el-row><span style="float: right;">Team Members</span></el-row>
                      <el-row><span style="float: right; font-size: xxx-large;">6</span></el-row>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card shadow="hover">
                  <el-row>
                    <el-col :span="8">
                  <i class="el-icon-document" style="font-size: 73px;"></i>
                    </el-col>
                    <el-col :span="16">
                      <el-row><span style="float: right;">Documents</span></el-row>
                      <el-row><span style="float: right; font-size: xxx-large;">1,378</span></el-row>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card shadow="hover">
                  <el-row>
                    <el-col :span="8">
                  <i class="el-icon-takeaway-box" style="font-size: 73px;"></i>
                    </el-col>
                    <el-col :span="16">
                      <el-row><span style="float: right;">Archives</span></el-row>
                      <el-row><span style="float: right; font-size: xxx-large;">243</span></el-row>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card shadow="hover">
                  <el-row>
                    <el-col :span="8">
                  <i class="el-icon-timer" style="font-size: 73px;"></i>
                    </el-col>
                    <el-col :span="16">
                      <el-row><span style="float: right;">Pending Docs</span></el-row>
                      <el-row><span style="float: right; font-size: xxx-large;">10</span></el-row>
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="18">
                <div class="grid-content bg-purple">
                  <h2>Pending Document <el-button type="text" icon="el-icon-search" @click="$router.push({ name: 'document' })">View All</el-button></h2>
                  <el-table
                    v-loading="loading"
                    :data="tableData"
                    stripe
                    :default-sort = "{prop: 'id', order: 'ascending'}"
                    style="width: 100%">
                    <el-table-column
                      prop="fileName"
                      sortable
                      label="Name">
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
                      prop="updatedAt"
                      sortable
                      label="Last Modified">
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <pie-chart :donut="true" title="Storage Summary" :bytes="true" :data="[['Used', 1000000000], ['Free', 10000000000]]"></pie-chart>
                </div>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <area-chart title="Document by Day"  :data="{'2020-11-15': 1, '2020-11-16': 3, '2020-11-17': 5, '2020-11-18': 0, '2020-11-19': 7, '2020-11-20': 11, '2020-11-21': 6}"></area-chart>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-container>
  </LayoutMain>
</template>

<script>
// @ is an alias to /src
import LayoutMain from '@/components/layouts/Main.vue';

export default {
  data() {
    return {
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
