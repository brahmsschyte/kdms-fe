<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/metadata' }">Metadata</el-breadcrumb-item>
      <el-breadcrumb-item>Edit</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">{{ $store.getters['user/currentDate'] }}</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <h2>Edit Metadata</h2>
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="Name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Field Name">
              <el-input v-model="form.fieldName"></el-input>
            </el-form-item>
            <el-form-item label="Field Type">
              <el-select v-model="form.fieldType" placeholder="please select input type">
                <el-option label="Text" value="text"></el-option>
                <el-option label="Text Area" value="textarea"></el-option>
                <el-option label="Number" value="number"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Required">
              <el-switch v-model="form.isRequired"></el-switch>
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
      metadataSearch: '',
      form: {
        id: '',
        name: '',
        fieldName: '',
        fieldType: '',
        isRequired: false,
      },
      loading: false,
      rules: {
        name: [
          { required: true, message: 'Please input your name!', trigger: 'blur' }
        ],
        fieldName: [
          { required: true, message: 'Please input your fieldName!', trigger: 'blur' }
        ],
        fieldType: [
          { required: true, message: 'Please input your fieldType!', trigger: 'blur' }
        ]
      }
    };
  },
  name: 'home',
  components: {
    LayoutMain,
  },
  mounted() {
    this.getMetadata();
  },
  methods: {
    getMetadata() {
      this.$store.dispatch('metadata/view', { id: this.$route.params.id }).then((metadata) => {
        this.form.id = metadata._id;
        this.form.name = metadata.name;
        this.form.fieldName = metadata.fieldName;
        this.form.fieldType = metadata.fieldType;
        this.form.isRequired = metadata.isRequired;
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('metadata/update', this.form).then((metadata) => {
            this.$message({
              message: 'Congrats, metadata updated successfully.',
              type: 'success',
            });

            this.$router.push({ name: 'show_metadata', params: { id: metadata._id } });
          }).catch(() => {
            this.$message({
              message: 'metadata update failed.',
              type: 'error',
            });
          });
        } else {
          return false;
        }
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
