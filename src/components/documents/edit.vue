<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/document' }">Document</el-breadcrumb-item>
      <el-breadcrumb-item>Edit</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">{{ $store.getters['user/currentDate'] }}</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <h2>Edit Document {{ $route.params.id }}</h2>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Template">
              <el-select v-model="form.template.id" placeholder="please select template" disabled>
                <el-option label="Invoice Form" value="1"></el-option>
                <el-option label="Tax Form" value="2"></el-option>
              </el-select>
            </el-form-item>
            <div v-if="form.template.id == '1'">
              <el-form-item label="Document">
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                  <div class="el-upload__tip" slot="tip">pdf files with a size less than 50mb</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="Physical Location">
                <el-input type='textarea' v-model="form.physicalLocation"></el-input>
              </el-form-item>
              <el-form-item label="PO Amount">
                <el-input v-model="form.template.metadata[0].value"></el-input>
              </el-form-item>
              <el-form-item label="GR/IR Amount">
                <el-input v-model="form.template.metadata[1].value"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">Update</el-button>
              </el-form-item>
            </div>
            <div v-else-if="form.template.id == '2'">
              <el-form-item label="Document">
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                  <div class="el-upload__tip" slot="tip">pdf files with a size less than 50mb</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="Physical Location">
                <el-input type='textarea' v-model="form.physicalLocation"></el-input>
              </el-form-item>
              <el-form-item label="VAT/WHT">
                <el-input v-model="form.template.metadata[0].value"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">Update</el-button>
              </el-form-item>
            </div>
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
      documentSearch: '',
      form: {
        id: '1',
        fileName: 'invoice01.pdf',
        fileSize: '2.2 MB',
        status: 'Reviewed',
        physicalLocation: 'Room 1 Shelf 2C',
        template: {
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
            updatedAt: '2020-11-14 00:00:00',
            value: '200000000'
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
            updatedAt: '2020-11-14 00:00:00',
            value: '50000000'
          }],
          workflow: {
            id: '1',
            name: 'Invoice Verification',
            steps: [{
              id: 1,
              action: 'review',
              userId: 'Jhon Smith',
              status: 'approved',
              type: 'success',
              icon: 'el-icon-check',
              updatedAt: '2020-11-15 00:00:00',
            },{
              id: 2,
              action: 'approve',
              userId: 'Jane Doe',
              updatedAt: '',
            },{
              id: 3,
              action: 'notify',
              userId: 'Peter Parker',
              updatedAt: '',
            }],
            author: 'Jhon Smith',
            createdAt: '2020-11-14 00:00:00',
            updatedAt: '2020-11-14 00:00:00'
          },
          author: 'Jhon Smith',
          createdAt: '2020-11-14 00:00:00',
          updatedAt: '2020-11-14 00:00:00'
        },
        author: 'John Smith',
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
          message: 'Congrats, document updated successfully.',
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
