<template>
  <div id="container"  v-loading="listLoading" element-loading-text="Loading">
    <ul id="ul-movie">
      <li id="movie" v-for="movie in moviedata" :key="movie.id">
        <img :src="movie.images.small">
        <div class="right-content">
          <div class="title">{{ movie.title}}</div>
          <div class="type mt5">
            <span v-for="(genres,index) in movie.genres" :key="genres">
              {{genres}}
              <span v-show="index < movie.genres.length-1">/</span>
            </span>
          </div>
          <div class="direct mt5">
            <span v-for="(director,index) in movie.directors">
              {{director.name}}
              <span v-show="index < movie.directors.length-1">/</span>
            </span>
          </div>
          <div class="actor mt5">
            <span v-for="(cast,index) in movie.casts">
              {{cast.name}}
              <span v-show="index < movie.casts.length-1">/</span>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <el-pagination
      v-show="show"
      @current-change="handleCurrentChange"
      :page-size="pageConfig.count"
      :total="pageConfig.totalPage"
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>
<script>
import { getMovieList } from '@/api/movie'

export default {
  name: 'douban',
  data() {
    return {
      moviedata: null,
      pageConfig: {
        start: 0,
        count: 5,
        totalPage: 250,
      },
      listLoading: false,
      show: false
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.getMoive((val - 1) * this.pageConfig.count, this.pageConfig.count);
    },
    getMoive: function (start, count) {
      this.listLoading = true
      getMovieList('/mapi/top250', { start: start, count: count }).then(res => {
        this.moviedata = res.subjects
        this.listLoading = false
        this.show = true
      })
    }
  },

  created: function () {
    this.getMoive(0, 5)
  }
}
</script>
<style>
#container {
  width: 390px;
  margin: auto;
}
#movie {
  height: 135px;
  list-style: none;
  padding: 5px;
  box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: all 0.2s;
  margin-bottom: 10px;
  cursor: pointer;
}
#movie:hover {
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
}
#movie img {
  float: left;
  height: 125px;
  width: 85px;
}
.right-content {
  width: 250px;
  float: left;
  padding: 3px 5px 5px 15px;
  height: 125px;
}
.mt5 {
  margin-top: 12px;
}
.title,
.type,
.direct,
.actor {
  padding-left: 5px;
  text-align: left;
  height: 21px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px
}
</style>
