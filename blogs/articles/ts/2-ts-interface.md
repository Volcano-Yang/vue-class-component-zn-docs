---
title: TS入门笔记2——TS接口进阶详解
sidebar: 'auto'
categories:
 - 原创文章
tags:
 - typescript
publish: true
isShowComments: true
---

## 一、为什么需要接口？

```typescript
let obj:object; // 定义了一个只能保存对象的变量
// obj = 1;
// obj = "123";
// obj = true;
obj = {name:'lnj', age:33};
console.log(obj);
```

> 之前我们已经介绍了用这种方式定义一个ts的对象，但是这样定义内部的属性并没有被限制，意义是不大的。
>
> 为了进一步定义对象内的各种属性，就产生了接口。



## 二、什么是接口类型?

> 和number,string,boolean,enum这些数据类型一样,接口也是一种类型, 也是用来约束使用者的，他的作用是进一步定义对象内的各种属性。



## 三、基本用法

```typescript
// 需求: 要求定义一个函数输出一个人完整的姓名, 这个人的姓必须是字符串, 这个人的名也必须是一个字符

interface FullName{
    firstName:string
    lastName:string
}

let obj = {
    firstName:'Jonathan',
    lastName:'Lee'
    // lastName:18 会报错
};

//{firstName, lastName}使用了解构赋值
function say({firstName, lastName}:FullName):void {
    console.log(`我的姓名是:${firstName}_${lastName}`);
}
say(obj);

```



## 四、属性数量不确定时的定义方法

如果使用接口来限定了变量或者形参, 那么在给变量或者形参赋值的时候, 赋予的值就必须和接口限定的一模一样才可以, 多一个或者少一个都不行。

但是开发中我们往往可能会遇到少一个或者多一个的场景。

### （1）少一个，用可选属性

可选属性意如其名，用法也简单，只需要在属性名字后面加一个？即可。

```typescript
// 需求: 如果传递了middleName就输出完整名称, 如果没有传递middleName, 那么就输出firstName和lastName
interface FullName{
    firstName:string
    lastName:string
    middleName?:string
    [propName:string]:any
}

function say({firstName, lastName, middleName}:FullName):void {
    // console.log(`我的姓名是:${firstName}_${lastName}`);
    if(middleName){
        console.log(`我的姓名是:${firstName}_${middleName}_${lastName}`);
    }else{
        console.log(`我的姓名是:${firstName}_${lastName}`);
    }
}

say({firstName:'Jonathan', lastName:'Lee', middleName:"666"});
say({firstName:'Jonathan', lastName:'Lee'});
```



### （2）多一个，用索引签名

用于描述那些“通过索引得到”的类型，比如arr[10]或obj["key"]。

意思有点抽象，可以大概理解为是在**定义对象中key（propName）和value的数据结构**，后续对象中的属性，只要key和value满足索引签名的限定即可, 无论有多少个都无所谓。



```typescript
interface FullName {
    [propName:string]:string
}
let obj:FullName = {
    // 注意点: 只要key和value满足索引签名的限定即可, 无论有多少个都无所谓
    firstName:'Jonathan',
    lastName:'Lee',
    // middleName:false // 报错
    // 无论key是什么类型最终都会自动转换成字符串类型, 所以没有报错
    // false: '666' 
}



interface stringArray {
    [propName:number]:string
}

let arr:stringArray = {
    0:'a',
    1:'b',
    2:'c'
};

// let arr:stringArray = ['a', 'b', 'c'];
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);
```



## 五、接口的继承

TS中的接口和JS中的类一样是可以继承的

```typescript
interface LengthInterface {

  length:number

}

interface WidthInterface {

  width:number

}

interface HeightInterface {

  height:number

}

interface RectInterface extends LengthInterface,WidthInterface,HeightInterface {

  // length:number

  // width:number

  // height:number

  color:string

}

let rect:RectInterface = {

  length:10,

  width:20,

  height:30,

  color:'red'

}

```





## 六、函数接口



函数本质上是一个特殊的对象，我们也可以用接口来定义函数的参数和返回值。



```typescript
interface SumInterface {
  (a:number, b:number):number
}

// 建议使用这种写法
let sum:SumInterface= function(x,y) {
  return x + y;
}

let res = sum(10, 20);

console.log(res);
```