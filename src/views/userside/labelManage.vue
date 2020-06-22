<template>
  <div>
    <div class="top">
      <img class="icon lefticon" src="../../asset/left.png" @click="returnHome" />
      <p>倾诉留言卡</p>
    </div>
    <div class="container" v-for="(item, index) in userlabels" :key="index">
      <!-- 有评论时 -->
      <div class="detail">
        <img src="../../asset/user2.png" class="icon" @click="lookdetail(item)" />
        <img src="../../asset/delete.png" class="icon" @click="deletealert(item.tbId, index)" />
        <input
          id="label-input"
          class="label-input"
          type="text"
          readonly="readonly"
          :value="item.content"
        />
      </div>
    </div>
    <!-- 没有评论时 -->
    <div class="nonelabel" v-show="show">
      <p class="p1">暂时没有人评论</p>
      <button class="btn" @click="goShare">邀请好友评论</button>
    </div>
    <!-- 留言者详情框 -->
    <div class="userdetail" v-show="flag">
      <p class="p2">评论人</p>
      <div class="usercontent">
        <img :src="userInfo.avatar" class="usericon" />
        <div class="name-time">
          <p>{{ userInfo.userName }}</p>
          <p>{{ detail.gmtCreate }}</p>
        </div>
      </div>
      <button class="confirmbtn" @click="closealert">我知道了</button>
    </div>
    <!-- 删除警示框 -->
    <div class="userdetail" v-show="deleteflag">
      <p style="font-weight:600">警告</p>
      <p style="font-size:14px;color:#8E8E93;">删除评论无法恢复，确认删除吗？</p>
      <div class="selectarea">
        <button class="d-btn" @click="closealert">取消</button>
        <button class="d-btn" style="color:#FF2525" @click="deletelabel">确认</button>
      </div>
    </div>
    <!-- 客服icon -->
    <img src="../../asset/kefu.png" class="kefu" @click="chartRoom" />
  </div>
</template>

<script>
export default {
  name: 'LabelManage',
  data() {
    return {
      userlabels: [],
      flag: false, //留言详情弹窗
      deleteflag: false, //删除警示框
      detail: [], //详情信息，数据传递
      deleteID: 0, //删除id
      index: 0,
      show: false,
      userInfo: []
    }
  },
  components: {},
  created() {
    // 查询所有留言
    this.axios({
      url: this.GLOBAL.baseUrl + '/api/comment/selectComment'
    }).then((res) => {
      this.userlabels = res.data.data
      console.log(this.userlabels)
      // 如果没有留言
      if (this.userlabels.length === 0) {
        this.show = !this.show
      }
    })
  },
  mounted() {},
  methods: {
    returnHome() {
      //返回上一个页面
      this.$router.go(-1)
    },

    /**
       留言详情
     根据用户Id查找用户
    */
    lookdetail(item) {
      this.flag = true
      this.detail = item
      this.axios({
        url: this.GLOBAL.baseUrl + '/api/user/selectById',
        params: {
          userId: item.userId
        }
      }).then((res) => {
        this.userInfo = res.data.data
      })
    },
    /**
      删除警示框
      e表示传过来的留言tbId,index表示当前留言下标
     */
    deletealert(e, index) {
      this.deleteflag = !this.deleteflag
      this.deleteID = e
      this.index = index
    },
    // 关闭弹窗
    closealert() {
      ;(this.flag = false), (this.deleteflag = false)
    },
    /**
      删除留言
     */
    deletelabel() {
      this.axios({
        method: 'delete',
        url: this.GLOBAL.baseUrl + '/api/comment/delete',
        params: {
          tbId: this.deleteID
        }
      }).then((res) => {
        console.log(res)
      })
      ;(this.deleteflag = false), this.userlabels.splice(this.index, 1)
      // 删除之后再次判断，如果没有留言
      if (this.userlabels.length === 0) {
        this.show = !this.show
      }
    },
    // 聊天室
    chartRoom() {
      this.$router.push('/chartRoom')
    },
    // 处理时间的方法
    replace(e) {
      let time = e.replace('T', '-')
      return time
    },
    goShare() {
      this.$router.push('/share')
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
}
.top {
  display: flex;
  height: 40px;
  background-color: #00c7ff;
  color: #ffffff;
  font-size: 14px;
  align-items: center;
}
.icon {
  width: 25px;
  height: 25px;
}
.lefticon {
  margin-left: 7%;
  margin-right: 27%;
}

.nonelabel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50%;
}
.p1 {
  font-size: 16px;
  color: #757575;
}
.btn {
  border: none;
  outline: none;
  background-color: #00c7ff;
  margin-left: 80px;
  width: 200px;
  height: 40px;
  border-radius: 60px;
  color: #ffffff;
  font-size: 14px;
}
.detail {
  display: flex;
  height: 40px;
  width: 90vw;
  align-items: center;
  justify-content: space-evenly;
  margin: 10px 1px 0 1px;
}
.label-input {
  border-bottom: 1px solid #bbbbbb;
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: transparent;
  width: 200px;
  outline: none;
  vertical-align: middle; //表单控件上下居中对齐,解决输入文字时，下边框微微移动问题
}
.kefu {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 500px;
  left: 270px;
  z-index: 1;
  border-radius: 50%;
  box-shadow: 0 3px 4px 0 rgba(92, 189, 170, 0.5), 0 6px 10px 0 rgba(92, 189, 170, 0.2);
}
.userdetail {
  position: absolute;
  width: 70%;
  height: 150px;
  z-index: 99;
  margin: 0 auto;
  top: 250px;
  left: 60px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  border: 1px solid #eeeeee;
  border-radius: 5px;
}
.usercontent {
  display: flex;
  height: 60px;
  text-align: left;
  align-items: center;
  justify-content: center;
  margin: 1px 10px 1px 10px;
  border-bottom: 1.5px solid #eeeeee;
}
.usericon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 50%;
}
.name-time {
  margin-left: 1px;
  font-size: 10px;
}
.p2 {
  text-align: left;
  font-size: 12px;
  margin-left: 10px;
  font-weight: bold;
}
.confirmbtn {
  color: #ff2525;
  font-size: 18px;
  margin-top: 6px;
  border: none;
  outline: none;
  background-color: transparent;
}
.selectarea {
  margin-top: 20px;
  margin-bottom: 0px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
  border-top: 1px solid #eeeeee;
}
.d-btn {
  font-size: 16px;
  border: none;
  outline: none;
  background-color: transparent;
  font-weight: bold;
}
</style>
