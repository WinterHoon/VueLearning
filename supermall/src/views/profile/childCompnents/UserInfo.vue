<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
          <img class="avatar-img float-left" src="~assets/img/profile/avatar.svg" alt="">
      </slot>
      <div class="login-info float-left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <img class="phone-icon" src="~assets/img/profile/phone.svg" alt="">
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <img class="arrow-img float-right" src="~assets/img/common/arrow-left.svg" alt="">
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo"
}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }
  #user-info .avatar-img {
    width: 60px;
    height: 60px;

  }
  .float-left {
    float: left;
  }
  .float-right {
    float: right;
  }
  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }
  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 12px;
    font-weight: 300;
  }
  #user-info .arrow-img {
    width: 22px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .phone .phone-icon {
    position: absolute;
    left: -15px;
    top: 0;
    width: 18px;
    height: 18px;

  }
  .clear-fix::after {
    content: "";
    clear: both;
    display: table;
  }
</style>