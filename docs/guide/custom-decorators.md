# 自定义装饰器

您可以通过创建自己的装饰器来扩展此库的功能。Vue Class Component 提供`createDecorator`帮助你创建自定义装饰器。`createDecorator`期望将回调函数作为第一个参数，并且该回调将接收以下参数：

- `options`: Vue 组件选项。对该对象所做的更改将影响原组件。
- `key`: 此装饰应用的属性或方法。
- `parameterIndex`: 如果装饰器用于参数，此为装饰器参数的索引。

创建`Log`装饰器的示例，该装饰器在调用装饰的方法时输出带有方法名称和传递的参数的日志消息：

```js
// decorators.js
import { createDecorator } from 'vue-class-component'

// Declare Log decorator.
export const Log = createDecorator((options, key) => {
  // Keep the original method for later.
  const originalMethod = options.methods[key]

  // Wrap the method with the logging logic.
  options.methods[key] = function wrapperMethod(...args) {
    // Print a log.
    console.log(`Invoked: ${key}(`, ...args, ')')

    // Invoke the original method.
    originalMethod.apply(this, args)
  }
})
```

将其用作方法装饰器：

```js
import Vue from 'vue'
import Component from 'vue-class-component'
import { Log } from './decorators'

@Component
class MyComp extends Vue {
  // It prints a log when `hello` method is invoked.
  @Log
  hello(value) {
    // ...
  }
}
```

在上面的代码中，当`hello`方法传入参数`42`调用时，将输出一下日志：

```
Invoked: hello( 42 )
```
