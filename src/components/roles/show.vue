<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">Role</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.params.id }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">{{ $store.getters['user/currentDate'] }}</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <h2>Display Role {{ $route.params.id }}</h2>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Name</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">{{ form.name }}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Create</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple"><i v-if="form.create" class="el-icon-check" style="color: green;font-weight: 900;"></i></div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Read</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple"><i v-if="form.read" class="el-icon-check" style="color: green;font-weight: 900;"></i></div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Update</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple"><i v-if="form.update" class="el-icon-check" style="color: green;font-weight: 900;"></i></div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Delete</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple"><i v-if="form.delete" class="el-icon-check" style="color: green;font-weight: 900;"></i></div></el-col>
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
      roleSearch: '',
      form: {
        id: '2',
        name: 'Finance',
        create: true,
        read: false,
        update: true,
        delete: false,
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
          message: 'Congrats, role created successfully.',
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
