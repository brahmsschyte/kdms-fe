<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/template' }">Template</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.params.id }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">{{ $store.getters['user/currentDate'] }}</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <h2>Display Template {{ $route.params.id }}</h2>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Name</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">{{ form.name }}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Description</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">{{ form.description }}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Author</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple">{{ form.author }}</div></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Metadata</div></el-col>
            <el-col :span="18">
              <div class="grid-content bg-purple">
                <el-table
                  v-loading="loading"
                  :data="form.metadata"
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
                </el-table>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">Workflow</div></el-col>
            <el-col :span="18">
              <div class="grid-content bg-purple">
                <el-row :gutter="20">
                  {{ form.workflow.name }}
                </el-row>
                <el-row :gutter="20">
                  Steps
                  <div class="grid-content bg-purple">
                    <el-timeline :reverse="false">
                      <el-timeline-item
                        v-for="(step, index) in form.workflow.steps"
                        :key="index">
                        <h4>{{ step.action }}</h4>
                        <p>{{ step.userId }}</p>
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </el-row>
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
      templateSearch: '',
      form: {
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

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
