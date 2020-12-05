<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/workflow' }">Workflow</el-breadcrumb-item>
      <el-breadcrumb-item>Edit</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">{{ $store.getters['user/currentDate'] }}</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <h2>Edit Workflow {{ $route.params.id }}</h2>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Steps">
            </el-form-item>
            <el-form-item
              v-for="(step, index) in form.steps"
              :label="'Step ' + step.id"
              :key="step.id"
              :prop="'steps.' + index + '.action'"
              :rules="{
                required: true, message: 'step can not be null', trigger: 'blur'
              }">
              <el-select v-model="step.action" placeholder="please select action">
                <el-option label="Approve" value="approve"></el-option>
                <el-option label="Review" value="review"></el-option>
                <el-option label="Notify" value="notify"></el-option>
              </el-select>
              <span> - </span>
              <el-select v-model="step.userId" placeholder="please select user">
                <el-option label="Jhon Smith" value="Jhon Smith"></el-option>
                <el-option label="Jane Doe" value="Jane Doe"></el-option>
                <el-option label="Peter Parker" value="Peter Parker"></el-option>
              </el-select>
              <span> - </span>
              <el-button type="danger" @click.prevent="removeStep(step)">Remove Step</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="addStep">Add Step</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Update</el-button>
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
      workflowSearch: '',
      form: {
        id: '1',
        name: 'Invoice Verification',
        steps: [{
          id: 1,
          action: 'review',
          userId: 'Jhon Smith',
        },{
          id: 2,
          action: 'approve',
          userId: 'Jane Doe',
        },{
          id: 3,
          action: 'notify',
          userId: 'Peter Parker',
        }],
        author: 'Jhon Smith',
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
          message: 'Congrats, workflow updated successfully.',
          type: 'success'
        });
    },
    removeStep(item) {
      var index = this.form.steps.indexOf(item);
      if (index !== -1) {
        this.form.steps.splice(index, 1);
      }
    },
    addStep() {
      let count = this.form.steps.length+1;
      this.form.steps.push({
        id: count,
        action: '',
        userId: '',
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
