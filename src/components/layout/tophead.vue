<template>
  <el-row>
    <el-col :span="4">
      <img src="../../assets/imgs/logo.png" alt>
    </el-col>
    <el-col :span="16">
      <h1>电商后台管理系统</h1>
    </el-col>
    <el-col :span="4">
      <a class="mylink" href="#" @click.prevent="logout">退出</a>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$confirm('你确定要退出系统吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        this.$router.push({name: 'login'})
        window.localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消成功'
        })
      })
      // this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
