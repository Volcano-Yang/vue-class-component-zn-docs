---
title: TS入门笔记4——TS的类型断言（解释型类型转换）
sidebar: 'auto'
categories:
 - 原创文章
tags:
 - typescript
publish: true
isShowComments: true
---							

### 1.什么是类型断言?

个人理解类型断言主要分为两种含义：

（1）解释型强制类型转换

（2）类型断言就是告诉编译器, 你不要帮我们检查了, 相信我，它就是这个类型。

### 2.使用

#### 方式一

```typescript
let len = (<string>str).length;

//有兼容性问题, 在使用到了JSX的时候兼容性不是很好
```



#### 方式二 as （建议）

let len = (str as string).length;

### 3.示例

例如: 我们拿到了一个any类型的变量, 但是我们明确的知道这个变量中保存的是字符串类型，此时我们就可以通过类型断言将any类型转换成string类型, 使用字符串类型中相关的方法了。

```typescript
let str:any = 'it666';
// 当还是any的时候是没有.length的提示的
let len = (str as string).length;
console.log(len);
```

