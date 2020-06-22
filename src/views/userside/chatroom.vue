<template>
  <div>
    <div class="top">
      <img class="icon lefticon" src="../../asset/left-b.png" @click="returnLabel" />
      <p style="font-weight:600">客服</p>
    </div>
    <!-- 主体内容 -->
    <div class="chartContent" ref="scroll">
      <!-- 时间 -->
      <div class="timearea">
        {{ localTime }}
      </div>
      <div v-for="(item, index) in messageList" :key="index">
        <!-- 左侧 -->
        <div class="left" v-if="item.type === 1">
          <img :src="item.kefuInfo.kefuImg" class="usericon" />
          <div class="mssageInput">
            <span>{{ item.message }}</span>
          </div>
        </div>
        <br />

        <!-- 右侧 -->
        <div class="right" v-if="item.type === 2">
          <div class="mssageInput">
            <span>{{ item.message }}</span>
          </div>
          <img :src="item.userInfo.userImg" class="usericon" />
        </div>
        <br />
        <br />
        <br />
      </div>
    </div>
    <!-- 输入区 -->
    <div class="footer">
      <div>
        <input type="text" class="inputarea" v-model="inputValue" @keyup.enter="sendEvent" />
        <button class="sendbtn" @click="sendEvent">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChartRoom',
  data() {
    return {
      // 当前时间
      localTime: '',
      // 用户信息
      userInfo: {
        userId: 1,
        userName: 'Tom',
        userImg: require('../../asset/user2.png')
      },
      // 客服消息
      kefuInfo: {
        kefuId: 1,
        kefuName: 'kufu',
        kefuImg: require('../../asset/user.png')
      },
      // 输入框内容
      inputValue: '',
      // 消息列表
      messageList: [
        // type = 1 对方内容     type = 2 我发送内容
        {
          type: 1,
          message: '你好！',
          kefuInfo: {
            kefuId: 1,
            kefuName: 'kufu',
            kefuImg: require('../../asset/user.png')
          }
        },
        {
          type: 2,
          message: '我有一个问题',
          userInfo: {
            userId: 1,
            userName: 'Tom',
            userImg: require('../../asset/user2.png')
          }
        }
      ],
      // 连接状态
      connectState: true, //模拟连接
      ws: undefined,
      user: null,
      mToUserid: null, // 接收人ID
      receive: null
    }
  },
  methods: {
    // 返回上个页面
    returnLabel() {
      this.$router.go(-1)
      this.ws.close()
      this.userPath = null
    },
    // 滚动
    scroll() {
      this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
    },
    // 连接服务事件
    connectEvent() {},
    // 发送信息
    sendEvent() {
      this.inputValue = this.trim(this.inputValue)
      console.log(this.inputValue)
      if (this.connectState) {
        this.messageList.push({
          type: 2,
          message: this.inputValue,
          userInfo: this.userInfo
        })
      }
      // 向后端推送消息
      let json = {
        mContent: this.inputValue,
        mFromUserid: this.user.id,
        mToUserid: this.mToUserid,
        userPath: this.user.userPath
      }
      console.log('我发送的信息' + JSON.stringify(json))
      this.ws.send(JSON.stringify(json))
      this.inputValue = ''
    },
    trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, '')
    }
  },
  computed: {},
  components: {},
  created() {
    var timestamp = new Date().getTime() //获取当前毫秒时间戳
    var nowdate = new Date(timestamp) / 1000 //把当前日期变成时间戳
    this.localTime = new Date(parseInt(nowdate) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ') //把时间戳转换日期格式

    // 获取用户信息
    this.user = this.$store.state.user
    console.log(this.user)

    console.log('用户ID：' + this.user.id)
    console.log('送信地址：' + this.user.userPath)
    if (this.user != null) {
      let that = this

      // WebSocket连接
      this.ws = new WebSocket('ws://121.199.6.2:8080/websocket?' + this.user.id)
      // 连接时被调用
      this.ws.onopen = function() {
        console.log('连接成功')
      }

      // 收到消息时被调用
      this.ws.onmessage = function(e) {
        // let that = this
        console.log('我收到的信息：' + e.data)

        // 字符串转JSON
        that.receive = JSON.parse(e.data)
        console.log('聊天内容：' + that.receive.mContent)
        // 保存对方送信地址
        if (that.receive.userPath == null) {
          that.mToUserid = null
          console.log('小 T' + that.mToUserid)
        } else {
          that.mToUserid = that.receive.userPath
          console.log('用户' + that.mToUserid)
        }
        that.messageList.push({
          type: 1,
          message: that.receive.mContent,
          kefuInfo: that.kefuInfo
        })
      }
      // 关闭时被调用
      this.ws.onclose = function() {
        console.log('关闭连接')
      }
    } else {
      console.log('连接失败')
    }
  },
  mounted() {
    this.connectEvent()
  },
  updated() {
    this.scroll()
  },
  beforeDestroy() {
    console.log('还原数据')
    this.user = null
    this.mToUserId = null
    this.receive = null
    this.ws.close()
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  height: 40px;
  font-size: 14px;
  align-items: center;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}
.icon {
  width: 25px;
  height: 25px;
}
.lefticon {
  margin-left: 7%;
  margin-right: 30%;
}
.usericon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 5px 5px 5px 5px;
}
.chartContent {
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 50px;
  display: block;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  align-items: center;
  .timearea {
    height: 20px;
    font-size: 10px;
    color: #8e8e93;
    padding: 10px;
  }
  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    height: 40px;
    margin-bottom: 20px;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    margin-left: 10px;
    height: 40px;
    // background-color: #7ee697;
    margin-bottom: 20px;
  }
  .mssageInput {
    display: inline-block;
    padding: 8px;
    border: none;
    background-color: #8dfa69;
    outline: none;
    min-width: 10px;
    max-width: 150px;
    border-radius: 3px;
    font-size: 14px;
  }
}
.footer {
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #fbfbfb;
  margin-top: 565px;
  align-items: center;
  justify-content: space-around;
  .inputarea {
    background-color: #ffffff;
    width: 260px;
    height: 25px;
    outline: none;
    border: 1px solid #bfbfbf;
    border-radius: 20px;
  }
  .sendbtn {
    padding: 5px;
    color: #ffffff;
    width: 60px;
    font-size: 10px;
    height: 25px;
    background-color: #7ee697;
    border: none;
    outline: none;
    border-radius: 4px;
    margin-left: 10px;
  }
}
</style>
