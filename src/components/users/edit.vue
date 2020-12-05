<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">User</el-breadcrumb-item>
      <el-breadcrumb-item>Edit</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">{{ $store.getters['user/currentDate'] }}</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <h2>Edit User</h2>
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="Full name">
              <el-input v-model="form.name"></el-input>
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
            <el-form-item label="Password" prop="password">
              <el-input placeholder="Please input password" v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="Confirm Pass" prop="checkPass">
              <el-input placeholder="Please input password" v-model="form.checkPass" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">Update</el-button>
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'));
      } else if (value !== this.form.password) {
        callback(new Error('Two inputs don\'t match!'));
      } else {
        callback();
      }
    };
    return {
      userSearch: '',
      form: {
        id: '',
        name: '',
        title: '',
        email: '',
        phone: '',
        password: '',
        checkPass: ''
      },
      loading: false,
      rules: {
        name: [
          { required: true, message: 'Please input your name!', trigger: 'blur' }
        ],
        title: [
          { required: true, message: 'Please input your title!', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input your email!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input your password!', trigger: 'blur' },
          { min: 6, message: 'Length should be more than 6 character', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
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
        this.form.id = user._id;
        this.form.name = user.name;
        this.form.title = user.title;
        this.form.email = user.email;
        this.form.phone = user.phone;
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/update', this.form).then((user) => {
            this.$message({
              message: 'Congrats, user updated successfully.',
              type: 'success',
            });

            this.$router.push({ name: 'show_user', params: { id: user._id } });
          }).catch(() => {
            this.$message({
              message: 'user update failed.',
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
