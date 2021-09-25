# 附加的钩子

如果你使用[Vue Router](https://router.vuejs.org/)等 Vue 插件，则可能希望类组件解析它们提供的钩子。在这种情况下，`Component.registerHooks`允许你注册这样的钩子：

```js
// class-component-hooks.js
import Component from 'vue-class-component'

// Register the router hooks with their names
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate'])
```

注册钩子后，类组件将它们实现为类原型方法：

```js
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // The class component now treats beforeRouteEnter,
  // beforeRouteUpdate and beforeRouteLeave as Vue Router hooks
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    next()
  }

  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  }

  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    next()
  }
}
```

建议将此注册代码写入单独的文件中，因为你必须在任何组件定义之前注册它们。 您可以通过将`import`钩子注册语句放在主文件的顶部来确保执行顺序：

```js
// main.js

// Make sure to register before importing any components
import './class-component-hooks'

import Vue from 'vue'
import App from './App'

new Vue({
  el: '#app',
  render: (h) => h(App),
})
```
