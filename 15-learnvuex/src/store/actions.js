export default {
  //context上下文，在这里就是指store
  aUpdateInfo(context,payload) {
    // setTimeout(() => {
    //   context.commit('updateInfo');
    //   console.log(payload);
    // }, 1000);
    return new Promise(resolve => {
      setTimeout(() => {
        context.commit('updateInfo');
        console.log(payload);
        resolve('1111111');
      }, 1000);
    })
  }
}