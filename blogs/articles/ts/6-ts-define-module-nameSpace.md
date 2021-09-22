---
title: TS入门笔记6——ts中的声明文件、模块、命名空间
sidebar: 'auto'
categories:
 - 原创文章
tags:
 - typescript
publish: true
isShowComments: true
---	

## 一、声明文件

> 在企业开发中，我们经常会把声明类型的部分单独抽离成一个声明文件，方便别人使用我们的types，或者方便使用别人的types。



### (1) 自己编写声明文件

```typescript
declare let myName:string;

declare function say(name:string, age:number):void;
// 注意点: 声明中不能出现实现

declare class Person {
    name:string;
    age:number;
    constructor(name:string, age:number);
    say():void;
}

interface Man{
    name:string
    age:number
}
```

> 一般test.ts的声明文件只需要命名成test.d.ts既可以了，ts会自动去对应名字的.d.ts文件查找类型

### (2) 引入别人的声明文件

1. 对于常用的第三方库, 其实已经有大神帮我们编写好了对应的声明文件，所以在企业开发中, 如果我们需要使用一些第三方JS库的时候我们只需要安装别人写好的声明文件即可。

​    2. TS声明文件的规范 @types/xxx， 例如: 想要安装jQuery的声明文件, 那么只需要npm install @types/jquery 即可。





## 二、模块

因为ts是js的超集，js中的模块用法我们都可以继续使用，你可以选择es6模块用法，也可以选择nodejs的模块用法，还可以选择ts为了兼容es6 moudle和 node moudle创造的`export =` 和 `import = require()`；

**需要注意的是：**

> TypeScript与ECMAScript 2015一样，任何包含**顶级`import`或者`export`的文件**都被当成一个模块。
>
> 相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为全局可见的（因此对模块也是可见的）。



### 1.ES6模块

#### (1) 分开导入导出

```javascript
export xxx;

export yyy;

import {xxx} from "path";
```

#### (2) 一次性导入导出

```javascript
export {xxx, yyy, zzz};

import {xxx, yyy, zzz} from "path";

// 解构赋值
```

#### (3)默认导入导出

```javascript
export default function (s: string) {
    return s.length === 5 && numberRegexp.test(s);
}
// 默认导出的东西是不用命名的
```

```javascript
import validate from "./StaticZipCodeValidator";
// 引入时直接给default给个命名

let strings = ["Hello", "98052", "101"];

// Use function validate
strings.forEach(s => {
  console.log(`"${s}" ${validate(s) ? " matches" : " does not match"}`);
});
```

#### (4) 导入之后又全部导出

```javascript
export * from "./StringValidator"; // exports interface StringValidator
export * from "./LettersOnlyValidator"; // exports class LettersOnlyValidator
export * from "./ZipCodeValidator";  // exports class ZipCodeValidator
```

#### (5)导入之后重命名

```javascript
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();
```

```javascript
//将整个模块导入到一个变量，并通过它来访问模块的导出部分
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();
```





### 2.Node模块

#### (1)通过exports.xxx = xxx导出

通过const xxx = require("path");导入

通过const {xx, xx} = require("path");导入



#### (2)通过module.exports.xxx = xxx导出

通过const xxx = require("path");导入

通过const {xx, xx} = require("path");导入

[Node.js模块里exports与module.exports的区别?](https://www.zhihu.com/question/26621212)



### 3.`export =` 和 `import = require()`；

>  ES6的模块和Node的模块是不兼容的, 所以TS为了兼容两者就推出了

```javascript
export = xxx;

import xxx = require('path');
```



## 三、命名空间



### 1.什么是命名空间?

命名空间可以看做是一个微型模块,

当我们先把相关的业务代码写在一起, 又不想污染全局空间的时候, 我们就可以使用命名空间

本质就是定义一个大对象, 把变量/方法/类/接口...的都放里面



### 2.命名空间和模块区别

在程序内部使用的代码, 可以使用命名空间封装和防止全局污染

在程序内部外部使用的代码, 可以使用模块封装和防止全局污染

总结: 由于模块也能实现相同的功能, 所以大部分情况下用模块即可



### 3.命名空间的用法

#### 定义：

```typescript
namespace Validation {

    const lettersRegexp = /^[A-Za-z]+$/;

    export const LettersValidator = (value) =>{

        return lettersRegexp.test(value);

    }
	//只有命名空间中export的东西，外部引入命名空间之后才能使用。
}
```

#### 引入：

利用/// 和reference标签引入

```typescript
/// <reference path="./56/test.ts" />

console.log(Validation.LettersValidator('abc'));

console.log(Validation.LettersValidator(123));
```



