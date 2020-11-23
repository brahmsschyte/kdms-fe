<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/template' }">Template</el-breadcrumb-item>
      <el-breadcrumb-item>New</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">Today is Saturday, 21 November 2020</span>
          <span>Hi Jane Done!</span>
          <el-divider></el-divider>
          <h2>New Template</h2>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Description">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="Metadata">
              <el-select v-model="form.metadata" multiple placeholder="please select metadata">
                <el-option label="Nomor Surat Jalan" value="1"></el-option>
                <el-option label="PO Amount" value="2"></el-option>
                <el-option label="GR/IR Amount" value="3"></el-option>
                <el-option label="VAT/WHT" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Workflow">
              <el-select v-model="form.workflow" placeholder="please select workflow">
                <el-option label="Invoice Verification" value="1"></el-option>
                <el-option label="Tax Review" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Create</el-button>
            </el-form-item>
          </el-form>
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
      templateSearch: '',
      form: {
        id: '1',
        name: '',
        description: '',
        metadata: [],
        workflow: '',
        author: '',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      },
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
    onSubmit() {
      this.$message({
          message: 'Congrats, template created successfully.',
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
