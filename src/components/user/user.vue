<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row class="myrow">
      <el-col :span="6">
        <el-input v-model="query" placeholder="请输入内容" class="input-with-select">
          <el-button @click.prevent="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain @click.prevent="adddialog">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格内容 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <!-- slot-scope: 当前行的数据源 -->
      <el-table-column prop="mobile" label="当前状态">
        <template slot-scope="scope">
          {{scope.row}}
          <el-switch @change="selChange(scope.row.id,scope.row.mg_state)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
        <template slot-scope="scope">
          <el-button
            @click.prevent="edit(scope.row.id)"
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>
          <el-button
            @click.prevent="del(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
          ></el-button>
          <el-button
            @click.prevent="role(scope.row.id)"
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页内容 -->
    <el-pagination
      @current-change="currChange"
      @size-change="sizeChange"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 新增对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialog">
      {{addUser}}
      <el-form :model="addUser">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="addUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="addUser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="addUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="addCancle">取 消</el-button>
        <el-button type="primary" @click.prevent="addUserFn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对话弹框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialog">
      {{editUser}}
      <el-form :model="editUser">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="editUser.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="editUser.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="editDialog=false">取 消</el-button>
        <el-button @click.prevent="editConture" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色面板 -->
    <el-dialog title="分配角色" :visible.sync="roleDialog">
      <el-form>
        {{roleUser}}
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input autocomplete="off"  v-model="roleUser.username"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          {{ roleUser.rid }}
          <el-select v-model="roleUser.rid" placeholder="请选择">
            <el-option
              v-for="item in setDateList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="roleDialog=false">取 消</el-button>
        <el-button @click.prevent="roleConture" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 3,
      tableData: [],
      pagesizes: [1, 3, 5],
      total: 0,
      dialog: false,
      editDialog: false,
      roleDialog: false,
      formLabelWidth: "80px",

      // 新增用户对象
      addUser: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 编辑用户对象
      editUser: {
        id: "",
        username: "",
        email: "",
        mobile: ""
      },
      // 分配角色对象
      roleUser: {
        id: "",
        rid: "",
        username: ""
      },
      // 角色选项数据
      setDateList:[]
    };
  },
  methods: {
    // 获取表格数据
    gateTableData() {
      this.$http({
        method: "get",
        url: `users?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        // console.log(res);
        let { meta, data } = res.data;
        if (meta.status == 200) {
          if (data.users.length == 0 && this.pagenum != 1) {
            this.pagenum--;
            this.gateTableData();
            return;
          }
          this.tableData = data.users;
          this.total = data.total;
        }
      });
    },
    // 页容量改变
    sizeChange(pagesize) {
      this.pagesize = pagesize;
      this.gateTableData();
    },
    // 当前页改变
    currChange(pagenum) {
      this.pagenum = pagenum;
      this.gateTableData();
    },
    // 搜索内容
    search() {
      this.gateTableData();
    },
    // 打开新增框
    adddialog() {
      this.dialog = true;
    },
    // 关闭新增框
    addCancle() {
      this.dialog = false;
    },
    //新增添加数据
    addUserFn() {
      this.$http({
        method: "post",
        url: "users",
        data: this.addUser,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        if (res.data.meta.status == 201) {
          this.$message({
            message: "恭喜你，添加用户成功",
            type: "success"
          });
          // 更新数据
          this.gateTableData();
        } else {
          this.$message.error("错了哦，添加用户失败");
        }

        // this.addUser.username='',
        // this.addUser.password='',
        // this.addUser.email='',
        // this.addUser.email='',
        // this.addUser.mobile=''
        for (var key in this.addUser) {
          this.addUser[key] = "";
        }
        this.dialog = false;
      });
    },
    //  删除按钮
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            method: "delete",
            url: `http://localhost:8888/api/private/v1/users/${id}`,
            headers: {
              Authorization: window.localStorage.getItem("token")
            }
          }).then(res => {
            // console.log(res.data)
            let { meta } = res.data;
            if (meta.status == 200) {
              this.$message({
                message: meta.msg,
                type: "success"
              });
            } else {
              this.$message.error(meta.msg);
            }
            this.gateTableData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑按钮
    edit(id) {
      this.editDialog = true;
      console.log(id);
      // 根据ID获取数据
      this.$http({
        method: "get",
        url: `http://localhost:8888/api/private/v1/users/${id}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        let { meta, data } = res.data;
        if (meta.status == 200) {
          this.editUser.id = data.id;
          this.editUser.username = data.username;
          this.editUser.email = data.email;
          this.editUser.mobile = data.mobile;
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    // 编辑确定按钮
    editConture() {
      // 编辑数据
      this.$http({
        method: "PUT",
        url: `http://localhost:8888/api/private/v1/users/${this.editUser.id}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        },
        data: {
          email: this.editUser.email,
          mobile: this.editUser.mobile
        }
      }).then(res => {
        // console.log(res);
        let { meta } = res.data;
        if (meta.status == 200) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
          this.gateTableData();
        } else {
          this.$message.error(meta.msg);
        }
        this.editDialog = false;
      });
    },
    // 弹出角色框
    role(id) {
      this.roleDialog = true;
      // 根据id获取数据
      this.$http({
        method: "get",
        url: `http://localhost:8888/api/private/v1/users/${id}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        // console.log(res.data)
        let { meta, data } = res.data;
        if (meta.status == 200) {
          this.roleUser.id = data.id;
          this.roleUser.rid = data.rid;
          this.roleUser.username = data.username;

          // 获取角色列表
           this.$http({
             method: 'get',
             url: `http://localhost:8888/api/private/v1/roles`,
             headers: {
               Authorization: window.localStorage.getItem('token')
             }
           }).then(res=>{
            //  console.log(res.data)
             let {meta, data} = res.data
             if (meta.status==200) {
             this.setDateList =data
             }
           })
        }
      });
    },
    // 更改角色
    roleConture(){
      this.$http({
        method: 'put',
        url: `http://localhost:8888/api/private/v1/users/${this.roleUser.id}/role`,
        data:{
          rid: this.roleUser.rid
        },
        headers: {
         Authorization:window.localStorage.getItem('token')
        }
      }).then(res=>{
        // console.log(res)
        let {meta} = res.data
        if (meta.status==200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
         this.gateTableData()
        } else {
          this.$message.error(meta.msg)
        }
         this.roleDialog = false
      })
    },
    // 更改用户状态
    selChange(id,type){
      this.$http({
        method: 'put',
        url: `http://localhost:8888/api/private/v1/users/${id}/state/${type}`,
        headers:{
          Authorization:window.localStorage.getItem('token')
        }
      }).then(res=>{
        // console.log(res.data)
        let {meta} = res.data
        if (meta.status==200){
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted() {
    this.gateTableData();
  }
};
</script>

<style>
.myrow {
  margin-top: 30px;
}
</style>
