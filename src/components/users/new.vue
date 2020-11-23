<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">User</el-breadcrumb-item>
      <el-breadcrumb-item>New</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">Today is Saturday, 21 November 2020</span>
          <span>Hi Jane Done!</span>
          <el-divider></el-divider>
          <h2>New User</h2>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Full name">
              <el-input v-model="form.fullName"></el-input>
            </el-form-item>
            <el-form-item label="Title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="Role">
              <el-select v-model="form.role" placeholder="please select role">
                <el-option label="Manager" value="Manager"></el-option>
                <el-option label="Supervisor" value="Supervisor"></el-option>
                <el-option label="Staff" value="Staff"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Activate account">
              <el-switch v-model="form.active"></el-switch>
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
      userSearch: '',
      form: {
        id: '1',
        fullName: '',
        title: '',
        email: '',
        phone: '',
        role: '',
        active: false,
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
          message: 'Congrats, user created successfully.',
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
