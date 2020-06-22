<template>
  <div class="container">
    <div class="content">
      <form :model="validateForm">
        <!-- 账号 -->
        <input type="text" placeholder="账号" v-model="validateForm.account" ref="account" />

        <!-- 密码 -->
        <input type="password" placeholder="密码" v-model="validateForm.password" ref="password" />

        <div class="btn">
          <!-- 提交 -->
          <button type="submit" @click="submit">登录</button>
          <button @click="clear">重置</button>
        </div>
      </form>
      <div class="otherLogin">
        <button class="other-btn">手机验证码登录</button>
        <button class="other-btn">智慧校园登录</button>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-if="show">
      <div class="dialog">
        <h4>账号或密码错误</h4>
        <button class="center" @click="show = !show">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 验证表单
      validateForm: {
        account: '',
        password: ''
      },
      show: false
    }
  },
  methods: {
    submit() {
      this.axios({
        method: 'post',
        url: this.GLOBAL.baseUrl + '/api/login',
        data: {
          account: this.validateForm.account,
          password: this.validateForm.password
        }
      }).then((res) => {
        // 请求成功判断
        if (res.data.code === 1) {
          // 用户不存在
          if (res.data.data.message != null) {
            console.log(res.data.data.message)
            this.show = true
          }
          //用户存在
          else if (typeof res.data.data.message == 'undefined') {
            // 存token
            localStorage.setItem('token', res.data.data.token)
            console.log(res.data.data.userDto)
            let user = {
              id: res.data.data.userDto.userId,
              name: res.data.data.userDto.userName,
              role: res.data.data.userDto.roleId,
              avatar: res.data.data.userDto.avatar,
              userPath: res.data.data.userDto.userPath
            }
            // 存user信息
            localStorage.setItem('user', JSON.stringify(user))
            if (user.role === '1') {
              console.log('用户:' + user.name)
              this.$router.push('/')
            } else if (user.role === '2') {
              console.log('客服:' + user.name)
              this.$router.push('/kefuHome')
            } else {
              console.log('未找到此用户')
            }
          }
        } else {
          //登录失败
          alert(res.data.msg)
          //清空
          this.clear()
        }
      })
    },
    clear() {
      this.validateForm = {
        account: '',
        password: ''
      }
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  background-image: url('../asset/beijing.jpeg');
  width: 100%;
  height: 100%;
  z-index: -1;
  background-size: 100% 100%;
}
.content {
  display: flex;
  flex-direction: column;
  margin-top: 400px;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
input {
  background-color: transparent;
  border-radius: 7px;
  border-color: #16a085;
  outline: none;
  border: 1px solid #16a085;
  padding: 7px;
  margin-bottom: 20px;
  color: #ffffff;
  width: 200px;
}
.btn {
  display: flex;
  justify-content: space-around;
  width: 210px;
  margin-bottom: 20px;
  button {
    background: #eaf8fb;
    border: none;
    outline: none;
    padding: 5px;
    width: 100px;
    border-radius: 20px;
  }
}
.otherLogin {
  display: flex;
  justify-content: space-evenly;
}
.other-btn {
  background-color: transparent;
  border: none;
  outline: none;
  color: #16a085;
}
.mask {
  z-index: 900;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog {
    z-index: 1000;
    width: 200px;
    background-color: #fff;
    line-height: 30px;
    border-radius: 10px;
    text-align: center;
    .center {
      width: 100px;
      border: none;
      border-bottom: 10px;
      font-size: 16px;
    }
  }
}
</style>
