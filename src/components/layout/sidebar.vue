<template>
  <el-aside  width="200px">
    <el-menu  default-active="2" :router="true" :unique-opened="true" class="mymenu el-menu-vertical-demo">

      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
         <el-menu-item index="/user">
             <i class="el-icon-menu"></i>
             用户列表
             </el-menu-item>
      </el-submenu>
              <el-submenu index="2">
            <!-- template：菜单选项的内容 -->
            <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>权限管理</span>
            </template>
            <!-- 菜单选项下的子选项目：二级菜单 -->
            <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                角色列表
            </el-menu-item>
            <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                权限列表
            </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <!-- template：菜单选项的内容 -->
            <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>商品管理</span>
            </template>
            <!-- 菜单选项下的子选项目：二级菜单 -->
            <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                商品列表
            </el-menu-item>
            <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                分类参数
            </el-menu-item>
            <el-menu-item index="3-3">
                <i class="el-icon-menu"></i>
                商品分类
            </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <!-- template：菜单选项的内容 -->
            <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>订单管理</span>
            </template>
            <!-- 菜单选项下的子选项目：二级菜单 -->
            <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                <span>订单列表</span>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
            <!-- template：菜单选项的内容 -->
            <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>数据统计</span>
            </template>
            <!-- 菜单选项下的子选项目：二级菜单 -->
            <el-menu-item index="5-1">
                <i class="el-icon-menu"></i>
                <span>数据报表</span>
            </el-menu-item>
        </el-submenu>

    </el-menu>
  </el-aside>
</template>

<script>
export default {}
</script>

<style>
</style>
