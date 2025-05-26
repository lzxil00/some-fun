// 发布订阅

// 订阅器
function dingyueFactory() {
  return {
    listenList: [],
    listen: function (event, callback) {
      if (typeof callback !== 'function') return false;
      const hasListener = this.listenList.find(item => item.event === event);
      if (!hasListener) { // 未订阅
        this.listenList.push({
          event,
          callbackList: [callback],
        })
      } else { // 已订阅
        hasListener.callbackList.push(callback);
      }
      return true;
    },
    dispatch: function (event) {
      const hasListener = this.listenList.find(item => item.event === event);
      if (hasListener) {
        hasListener.callbackList.forEach(callback => {
          callback()
        })
      }
    },
    remove: function (event, callback) {
      const hasListener = this.listenList.find(item => item.event === event);
      if (hasListener) {
        hasListener.callbackList.splice(hasListener.callbackList.indexOf(callback), 1);
      }
    }
  }
}


// test
const dingyue = dingyueFactory();

// 添加订阅器
const callback = () => {
  console.log('event1 被触发')
}
dingyue.listen('event1', callback);

// 触发
dingyue.dispatch('event1')
// 移除
dingyue.remove('event1', callback);
// 触发
dingyue.dispatch('event1')


