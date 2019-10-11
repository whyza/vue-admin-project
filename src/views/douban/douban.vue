<template>
  <div id="container" v-loading="listLoading" element-loading-text="Loading">
    <ul id="ul-movie">
      <li id="movie" v-for="movie in moviedata" :key="movie.id">
        <img :src="getImages(movie.images.small)" />
        <div class="right-content">
          <div class="title">片名：{{ movie.title}}</div>
          <div class="type mt5">
            <span v-for="(genres,index) in movie.genres" :key="genres">
              类型：{{genres}}
              <span v-show="index < movie.genres.length-1">/</span>
            </span>
          </div>
          <div class="direct mt5">
            导演：
            <span v-for="(director,index) in movie.directors" :key="director">
              {{director.name}}
              <span v-show="index < movie.directors.length-1">/</span>
            </span>
          </div>
          <div class="actor mt5">
            演员：
            <span v-for="(cast,index) in movie.casts" :key="cast">
              {{cast.name}}
              <span v-show="index < movie.casts.length-1">/</span>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <el-pagination
      v-show="show"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1,5,10,20,50]"
      :page-size="pageConfig.count"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageConfig.totalPage"
    ></el-pagination>
  </div>
</template>
<script>
import { getMovieList } from "@/api/movie";

export default {
  name: "douban",
  data() {
    return {
      moviedata: null,
      pageConfig: {
        start: 0,
        count: 5,
        totalPage: 250
      },
      listLoading: false,
      show: false
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageConfig.count = val;
      this.getMoive(this.pageConfig.start, val);
    },
    getImages(_url) {
      if (_url !== undefined) {
        let _u = _url.substring(7);
        return "https://images.weserv.nl/?url=" + _u;
      }
    },
    handleCurrentChange(val) {
      this.getMoive((val - 1) * this.pageConfig.count, this.pageConfig.count);
    },
    getMoive: function(start, count) {
      this.listLoading = true;
      getMovieList("/mapi/top250", {
        start: start,
        count: count,
        apikey: "0df993c66c0c636e29ecbb5344252a4a"
      }).then(res => {
        this.moviedata = res.subjects;
        this.listLoading = false;
        this.show = true;
      });
    }
  },

  created: function() {
    this.getMoive(0, 5);
  }
};
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
  font-size: 12px;
}
</style>
