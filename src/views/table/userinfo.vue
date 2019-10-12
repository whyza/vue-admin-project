<template>
  <div>
    <el-table
      :data="tableData"
      :default-sort="{prop: 'date', order: 'descending'}"
      style="width: 100%"
    >
      <el-table-column prop="userId" label="userId" sortable></el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="updateTime" label="更新日期" sortable></el-table-column> -->
      <el-table-column prop="userName" label="姓名" sortable></el-table-column>
      <el-table-column prop="city" label="地址"></el-table-column>
      <el-table-column prop="avatarUrl" label="头像" width="100" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.avatarUrl" alt style="width:40px;height:40px;" />
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名" sortable></el-table-column>
      <el-table-column prop="role" label="性别" width="100" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.gender == 1  ? 'success' : 'primary'"
            disable-transitions
          >{{scope.row.gender == 1 ? "男":"女"}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色" width="100" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.roleId == 1  ? 'success' : 'primary'"
            disable-transitions
          >{{scope.row.roleId == 1 ? "admin":"user"}}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row.id)">查看</el-button>
        <el-button type="text" size="small" @click="handleDel(scope.row.id)">删除</el-button>
      </template>
      </el-table-column>-->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSize"
      :page-size="pageConfig.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="13"
    ></el-pagination>
  </div>
</template>
<script>
import { getUserInfo2 } from "@/api/tabletwo";
import { parseTime } from "@/utils/index";
export default {
  data() {
    return {
      tableData: null,
      pageSize: [1, 5, 10],
      pageConfig: {
        pageStart: 0,
        pageSize: 5,
        totalPage: 0
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageConfig.pageSize = val;
      this.getUsers(this.pageConfig.pageStart, val);
    },
    handleCurrentChange(val) {
      this.getUsers((val - 1) * this.pageConfig.pageSize, this.pageConfig.pageSize);
    },
    getUsers(pageStart,pageSize) {
      getUserInfo2("https://iazuresky.com:8443/queryUser", {
        pageNum: pageStart,
        pageSize: pageSize
      }).then(res => {
        this.tableData = res.list;
        this.totalPage = res.total;
      });
    }
  },
  created() {
    this.getUsers(0,5);
  }
};
</script>
<style>
.app-main {
  padding: 5px;
  margin: 5px;
}
</style>
