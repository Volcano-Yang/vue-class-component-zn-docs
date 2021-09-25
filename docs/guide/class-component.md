# 类组件

`@Component`装饰器使你的类成为 Vue 组件：

```js
import Vue from 'vue'
import Component from 'vue-class-component'

// HelloWorld class will be a Vue component
@Component
export default class HelloWorld extends Vue {}
```

## 数据

初始的`data`能被声明为类属性。

```vue
<template>
  <div>{{ message }}</div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class HelloWorld extends Vue {
    // Declared as component data
    message = 'Hello World!'
  }
</script>
```

上面的组件在`<div>`元素中渲染组件数据`message`为`Hello World!`。

注意，如果初始值为`undefined`，类属性将不是反应性的，这意味着不会检测到属性的更改：

```js
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // `message` will not be reactive value
  message = undefined
}
```

为了避免这种情况，您可以使用`null`或使用`data`钩子：

```js
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // `message` will be reactive with `null` value
  message = null

  // See Hooks section for details about `data` hook inside class.
  data() {
    return {
      // `hello` will be reactive as it is declared via `data` hook.
      hello: undefined,
    }
  }
}
```

## 方法

组件`methods`可以直接声明为类原型方法：

```vue
<template>
  <button v-on:click="hello">Click</button>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class HelloWorld extends Vue {
    // Declared as component method
    hello() {
      console.log('Hello World!')
    }
  }
</script>
```

## 计算属性

可以将计算属性声明为类的`getter`/`setter`属性：

```vue
<template>
  <input v-model="name" />
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class HelloWorld extends Vue {
    firstName = 'John'
    lastName = 'Doe'

    // Declared as computed property getter
    get name() {
      return this.firstName + ' ' + this.lastName
    }

    // Declared as computed property setter
    set name(value) {
      const splitted = value.split(' ')
      this.firstName = splitted[0]
      this.lastName = splitted[1] || ''
    }
  }
</script>
```

## 钩子

`data`，`render`和 Vue 所有生命周期钩子也同样可被声明为类原型方法，但你不能调用它们的实例本身。声明自定义方法时，应避免使用这些保留名称。

```jsx
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class HelloWorld extends Vue {
  // Declare mounted lifecycle hook
  mounted() {
    console.log('mounted')
  }

  // Declare render function
  render() {
    return <div>Hello World!</div>
  }
}
```

## 其他选项

对于所有其他选项，请将它们传递给装饰器函数：

```vue
<template>
  <OtherComponent />
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import OtherComponent from './OtherComponent.vue'

  @Component({
    // Specify `components` option.
    // See Vue.js docs for all available options:
    // https://vuejs.org/v2/api/#Options-Data
    components: {
      OtherComponent,
    },
  })
  export default class HelloWorld extends Vue {}
</script>
```
