# 属性类型声明

有时，您必须在类组件之外定义组件属性和方法。例如，Vue 官方状态管理库[Vuex](https://github.com/vuejs/vuex)，提供`mapGetters`和`mapActions`帮助程序将存储映射到组件属性和方法。这些帮助程序需要在组件选项对象中使用。

即使在这种情况下，您也可以将组件选项传递给`@Component`装饰器的参数。但是，在 runtime 环境工作时，它不会在类型级别上自动声明属性和方法。

你需要在类组件中手动声明其类型：

```ts
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters, mapActions } from 'vuex'

// Interface of post
import { Post } from './post'

@Component({
  computed: mapGetters(['posts']),

  methods: mapActions(['fetchPosts']),
})
export default class Posts extends Vue {
  // Declare mapped getters and actions on type level.
  // You may need to add `!` after the property name
  // to avoid compilation error (definite assignment assertion).

  // Type the mapped posts getter.
  posts!: Post[]

  // Type the mapped fetchPosts action.
  fetchPosts!: () => Promise<void>

  mounted() {
    // Use the mapped getter and action.
    this.fetchPosts().then(() => {
      console.log(this.posts)
    })
  }
}
```
