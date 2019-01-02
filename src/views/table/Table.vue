<template>
  <el-table
    :data="tableData"
    :default-sort="{prop: 'date', order: 'descending'}"
    style="width: 100%"
  >
    <el-table-column prop="id" label="id" sortable></el-table-column>
    <el-table-column prop="CreateTime" label="日期" sortable></el-table-column>
    <el-table-column prop="UserName" label="姓名" sortable></el-table-column>
    <el-table-column :formatter="formatter" prop="Address" label="地址"></el-table-column>
    <el-table-column prop="role" label="角色" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.role === 'admin' ? 'success' : 'primary'" disable-transitions>{{scope.row.role}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row.id)">查看</el-button>
        <el-button type="text" size="small" @click="handleDel(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { getUserList, getUserInfo, deleteUser } from '@/api/tabletwo'
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      tableData: null
    }
  },
  methods: {
    formatter(row, column) {
      return row.Address
    },
    handleDel(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser('/user/deleteUser', {
          id: id
        }).then(res => {
          if (res.affectedRows > 0) {
            this.$message({
              message: '删除成功！！',
              type: 'success'
            });
            this.getUsers()
          } else {
            this.$message.error('出错了！！');
          }
        })
      })
    },
    handleClick(id) {
      console.log(id)
    },
    // 使用mock 获取数据
    // getUser() {
    //   // 获取 User数据
    //   getUserList().then(res => {
    //     this.tableData = res.data
    //   })
    // },

    //使用express 连接 mysql 拿到数据
    getUsers() {
      getUserInfo('/user/queryUser').then(res => {
        this.tableData = res
      })
    }
  },
  created() {
    // this.getUser(),
    this.getUsers()
  }
}
</script>
<style>
.app-main {
  padding: 5px;
  margin: 5px;
}
</style>
