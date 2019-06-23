<template>
    <!-- 页面容器 -->
    <el-container>
        <!-- 头部 -->
        <el-header>
            <TopHead></TopHead>
        </el-header>
        <el-container>
            <!-- 侧边栏 -->
           <SideBar></SideBar>
            <!-- 内容区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import TopHead from '../layout/tophead'
import SideBar from '../layout/sidebar'
export default {
  components: {
    TopHead: TopHead,
    SideBar: SideBar
  },
  mounted () {
    let token = window.localStorage.getItem('token')
    if (!token) {
      this.$message.error('你还没有登入，请登入')
      this.$router.push({ name: 'login'})
    }
  }

}
</script>

<style>
.el-container {
    height: 100%;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-header h1 {
    margin: 0;
    color: #fff;
}
.el-header .mylink {
    text-decoration: none;
    color: green;
    float: right;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
    height: 100%;
}
.mymenu{
    height: 100%;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
}
</style>
