<template>
  <div>
    <div class="cuscontainer">
      <div
        class="connectList"
        v-for="(item, index) in customList"
        :key="index"
        @click="goChat(item)"
      >
        <img :src="item.customInfo.userImg" class="usericon" />
        <div class="info">
          <p class="p1">{{ item.customInfo.userName }}</p>
          <p class="p2">这是最新的消息</p>
        </div>
        <div class="newsTime">
          <p class="p3">09:29</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Connect',
  data() {
    return {
      messageList: [],
      customList: [
        // type 1 表示已接入 2 表示未接入
        {
          type: 1,
          customInfo: {
            userId: 1,
            userName: 'Tom',
            userImg: require('../../asset/user2.png')
          }
        },
        {
          type: 1,
          customInfo: {
            userId: 2,
            userName: 'Jek',
            userImg: require('../../asset/user.png')
          }
        }
      ]
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    goChat(user) {
      this.$router.push('/kefuChatRoom')
      const userData = { userInfo: user }
      sessionStorage.setItem('userstorage', JSON.stringify(userData))
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.usericon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 5px 5px 5px 5px;
}
.cuscontainer {
  display: flex;
  flex-direction: column;

  .connectList {
    display: flex;
    height: 60px;
    align-items: center;
    text-align: left;
    border-bottom: 1px solid #eeeeee;
    .info {
      margin-left: 10px;
      line-height: 30%;
      .p1 {
        font-size: 14px;
        font-weight: 500;
      }
      .p2 {
        font-size: 10px;
        color: #8e8e93;
      }
    }
  }
  .newsTime {
    font-size: 10px;
    color: #8e8e93;
    margin-left: 190px;
  }
}
</style>
