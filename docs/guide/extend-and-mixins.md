# 继承与混合

## 继承

您可以将现有的类组件扩展为原生类继承。假设您具有以下超类组件：

```js
// super.js
import Vue from 'vue'
import Component from 'vue-class-component'

// Define a super class component
@Component
export default class Super extends Vue {
  superValue = 'Hello'
}
```

您可以使用原生类继承语法对其进行扩展：

```js
import Super from './super'
import Component from 'vue-class-component'

// Extending the Super class component
@Component
export default class HelloWorld extends Super {
  created() {
    console.log(this.superValue) // -> Hello
  }
}
```

请注意，每个超类都必须是一个类组件。换句话说，它需要继承`Vue`构造函数作为祖先并由`@Component`装饰器进行装饰。

## 混合

Vue Class Component 提供了`mixins`辅助功能，以类样式的方式使用[mixins](https://vuejs.org/v2/guide/mixins.html)。通过使用`mixins`助手，`TypeScript`可以推断混合类型并在组件类型上继承它们。

声明`Hello`和`World`用于 mixins 的示例：

```js
// mixins.js
import Vue from 'vue'
import Component from 'vue-class-component'

// You can declare mixins as the same style as components.
@Component
export class Hello extends Vue {
  hello = 'Hello'
}

@Component
export class World extends Vue {
  world = 'World'
}
```

在类样式组件中使用它们：

```js
import Component, { mixins } from 'vue-class-component'
import { Hello, World } from './mixins'

// Use `mixins` helper function instead of `Vue`.
// `mixins` can receive any number of arguments.
@Component
export class HelloWorld extends mixins(Hello, World) {
  created() {
    console.log(this.hello + ' ' + this.world + '!') // -> Hello World!
  }
}
```

与超类相同，所有 mixins 必须声明为类组件。
