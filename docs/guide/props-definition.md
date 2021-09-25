# props 定义

Vue Class Component 没有提供用于`props`定义的专用 API。但是，你可以通过使用`Vue.extend`API 来做到这一点：

```vue
<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  // Define the props by using Vue's canonical way.
  const GreetingProps = Vue.extend({
    props: {
      name: String,
    },
  })

  // Use defined props by extending GreetingProps.
  @Component
  export default class Greeting extends GreetingProps {
    get message(): string {
      // this.name will be typed
      return 'Hello, ' + this.name
    }
  }
</script>
```

当`Vue.extend`推断已定义的 prop 类型时，可以通过扩展在类组件中使用它们。

如果你要扩展一个超类组件或 mixins，使用`mixins`将定义的 props 与它们组合。

```vue
<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component, { mixins } from 'vue-class-component'
  import Super from './super'

  // Define the props by using Vue's canonical way.
  const GreetingProps = Vue.extend({
    props: {
      name: String,
    },
  })

  // Use `mixins` helper to combine defined props and a mixin.
  @Component
  export default class Greeting extends mixins(GreetingProps, Super) {
    get message(): string {
      // this.name will be typed
      return 'Hello, ' + this.name
    }
  }
</script>
```
