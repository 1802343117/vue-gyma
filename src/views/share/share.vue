<template>
  <div class="container">
    <div class="title">
      <p>说说平时不敢对我说的话吧</p>
    </div>
    <canvas ref="myQRCode"></canvas>
    <div class="btn">
      <button class="btn1">保存分享到朋友圈</button>
      <button class="btn2">分享给好友评价</button>
    </div>
    <button class="btn3" @click="goHome">返回首页</button>
  </div>
</template>

<script>
// 引入QRCode
import QRCode from 'qrcode'
export default {
  name: 'Share',
  data() {
    return {
      QRCodeMsg: '', //生成二维码信息
      options: {
        margin: 0,
        width: 150,
        height: 150
      }
    }
  },
  methods: {
    //生成分享二维码
    getQRCode() {
      this.QRCodeMsg = window.location.href //生成的二维码为URL地址
      const canvas = this.$refs.myQRCode
      console.log(canvas)
      QRCode.toCanvas(canvas, this.QRCodeMsg, this.options, function(error) {
        if (error) console.error(error)
        console.log('success')
      })
    },
    // 返回首页
    goHome() {
      this.$router.push('/home')
    }
  },
  mounted() {
    this.getQRCode()
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  display: flex;
  height: 100px;
  font-size: 20px;
  background-color: #ffdf06;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
canvas {
  margin: 10% 30% 40% 30%;
}
.btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    height: 30px;
    padding: 5px;
    width: 150px;
    margin-bottom: 10px;
    border-radius: 30px;
    border: none;
    font-size: 12px;
    outline: none;
  }
  .btn1 {
    background-color: #16a085;
    color: #ffffff;
  }
}
.btn3 {
  margin-top: 20%;
  outline: none;
  border: none;
  background: none;
  color: cornflowerblue;
}
</style>
