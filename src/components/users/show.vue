<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">User</el-breadcrumb-item>
      <el-breadcrumb-item>{{ form.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">{{ $store.getters['user/currentDate'] }}</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <h2>Display User</h2>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Name</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">{{ form.name }}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Title</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">{{ form.title }}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Email</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">{{ form.email }}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Phone</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">{{ form.phone }}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Role</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">Guest</div></el-col>
          </el-row>
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
      form: {},
      loading: false
    };
  },
  name: 'home',
  components: {
    LayoutMain,
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$store.dispatch('user/view', { id: this.$route.params.id }).then((user) => {
        this.form = user;
      });
    },
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

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
