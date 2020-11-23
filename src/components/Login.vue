<template>
  <LayoutFull>
    <div id="login-container">

      <el-form ref="form" :model="form" :rules="formRules" style="max-width: 22em;">
        <img alt="Cyclops logo" src="../assets/logo.png" style="width: 40%;">
        <p style="font-size: small; margin-top: 0;">Knowledge and Document Management Made Easy.</p>
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" placeholder="username" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="password" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.remember">Remember me</el-checkbox>
          <a href="mailto:bramanthyo.andrian@ui.ac.id" style="float: right;">Trouble logging</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" style="width: 100%;">Log in</el-button>
        </el-form-item>
        <el-form-item>
          Login with LDAP/Domain User
          <span style="float: right;">v2.0.0.pre</span>
        </el-form-item>
      </el-form>

    </div>
  </LayoutFull>
</template>

<script>
import LayoutFull from '@/components/layouts/Full.vue';
// Import component
// Import stylesheet

export default {
  components: {
    LayoutFull,
  },

  data() {
    return {
      name: 'login',
      isLoading: true,
      fullPage: true,
      form: {
        username: '',
        password: '',
        remember: true,
      },
      formRules: {
        username: [
          { required: true, message: 'Please input your username!', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'Please input your password!', trigger: 'blur' },
        ],
      },
    };
  },

  beforeCreate() {
  },

  mounted() {
  },

  beforeDestroy() {
  },

  destroyed() {
  },

  computed: {
  },

  watch: {
  },

  methods: {
    submitForm(formName) {
      console.log(formName);
      if (this.form.password != 'password') {
        this.$message({
            message: `Failed to login, incorrect username and/or password.`,
            type: 'error'
          });
      } else {
        this.$message({
            message: `Successful login, welcome back.`,
            type: 'success'
          });
        this.$router.push(`/`);
      }
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$store.dispatch('user/login', this.form).then(() => {
      //       this.$message({
      //         message: 'Authentication successful.',
      //         type: 'success',
      //       });

      //       this.$router.push({ name: 'home' });
      //     }).catch(() => {
      //       this.$message({
      //         message: 'Authentication failed.',
      //         type: 'error',
      //       });
      //     });
      //   } else {
      //     // console.log('error submit!!');
      //     return false;
      //   }
      // });
    },
  },
};
</script>

<style scoped>
  #login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
</style>
