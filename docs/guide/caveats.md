# 注意事项

Vue Class Component 通过实例化底层的原始构造函数，将类属性作为 Vue 实例数据收集。尽管我们可以像原生类方式那样定义实例数据，但有时我们需要知道其工作方式。

## 属性初始化时的`this`值

如果将箭头函数定义为类属性并在其中访问`this`，它将无法正常工作。这是因为在初始化类属性时，`this`只是 Vue 实例的代理对象 ：

```js
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class MyComp extends Vue {
  foo = 123

  // DO NOT do this
  bar = () => {
    // Does not update the expected property.
    // `this` value is not a Vue instance in fact.
    this.foo = 456
  }
}
```

在这种情况下，你可以简单地定义一个方法而不是一个类属性，因为 Vue 会自动绑定实例：

```js
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class MyComp extends Vue {
  foo = 123

  // DO this
  bar() {
    // Correctly update the expected property.
    this.foo = 456
  }
}
```

## 始终使用生命周期钩子

当调用原始构造函数以收集初始组件数据时，建议自己声明而不是使用`constructor`

```js
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Posts extends Vue {
  posts = []

  // DO NOT do this
  constructor() {
    fetch('/posts.json')
      .then((res) => res.json())
      .then((posts) => {
        this.posts = posts
      })
  }
}
```

上面的代码打算在组件初始化时获取帖子列表，但是由于 Vue Class Component 的工作方式，`fetch`将被意外调用两次。

建议使用生命周期钩子，例如`created`代替`constructor`。

```js
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Posts extends Vue {
  posts = []

  // DO this
  created() {
    fetch('/posts.json')
      .then((res) => res.json())
      .then((posts) => {
        this.posts = posts
      })
  }
}
```
