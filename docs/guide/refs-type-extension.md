# `$refs`类型扩展

一个组件的`$refs`类型是被声明用于处理所有关于引用的可能类型的最广泛类型。理论上来说是一个集合，但在大多数情况下，每个引用实际上都只有一个特定的元素或组件。

你可以在类组件中通过覆盖`$refs`指定一个具体的引用类型。

```vue
<template>
  <input ref="input" />
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class InputFocus extends Vue {
    // annotate refs type.
    // The symbol `!` (definite assignment assertion)
    // is needed to get rid of compilation error.
    $refs!: {
      input: HTMLInputElement
    }

    mounted() {
      // Use `input` ref without type cast.
      this.$refs.input.focus()
    }
  }
</script>
```

你可以在不使用类型转换的的情况下访问`input`，因为在上例类组件中`$refs.input`指定了类型。

请注意，它应该是类型注释（使用冒号`:`），而不是值赋值（`=`）。
