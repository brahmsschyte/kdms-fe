<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/workflow' }">Workflow</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.params.id }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">Today is Saturday, 21 November 2020</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <h2>Display Workflow {{ $route.params.id }}</h2>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Name</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">{{ form.name }}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Author</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">{{ form.author }}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Steps</div></el-col>
            <el-col :span="18">
              <div class="grid-content bg-purple">
                <el-timeline :reverse="false">
                  <el-timeline-item
                    v-for="(step, index) in form.steps"
                    :key="index">
                    <h4>{{ step.action }}</h4>
                    <p>{{ step.userId }}</p>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-col>
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
          message: 'Congrats, workflow created successfully.',
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
