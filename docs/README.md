# 总览

Vue Class Component 是一个库，可让您使用类样式的语法创建 Vue 组件。例如，以下是用 Vue Class Component 编写的简单计数器组件：

```vue
<template>
  <div>
    <button v-on:click="decrement">-</button>
    {{ count }}
    <button v-on:click="increment">+</button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Component from 'vue-class-component'

  // Define the component in class-style
  @Component
  export default class Counter extends Vue {
    // Class properties will be component data
    count = 0

    // Methods will be component methods
    increment() {
      this.count++
    }

    decrement() {
      this.count--
    }
  }
</script>
```

如示例所示，您可以通过使用@Component 装饰器为类添加注释，从而以直观和标准的类语法定义组件数据和方法。您可以简单地用类样式的组件替换您的组件定义，因为它等同于组件定义的普通 options 对象样式。

通过以类样式定义组件，您不仅可以更改语法，还可以利用某些 ECMAScript 语言功能，例如类继承和装饰器。还提供了一个用于 mixin 继承的[`mixins`](guide/extend-and-mixins.md#Mixins)助手，以及一个轻松创建自己的装饰器的[`createDecorator`](guide/custom-decorators.md)函数。

您可能还需要了解[Vue Property Decorator](https://github.com/kaorun343/vue-property-decorator)提供的`@Prop`和`@Watch`装饰器。