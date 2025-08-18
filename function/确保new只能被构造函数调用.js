// 方法一(瑕疵:可以通过伪造构造函数的方法骗过构造函数里的判断)
// 借助 instanceof 和 new 绑定的原理，适用于低版本浏览器
// function Person(name, age) {
//     this.name = name
//     this.age = age
//     if (!(this instanceof Person)) {
//         throw new Error('构造函数只能被new调用!!!')
//     }
//     Person.prototype.write = function () {
//         console.log(`name: ${this.name}   age:${this.age}`)
//     }
// }
// const p = new Person('wjl', 20)
// p.write()
// // console.log(new Person('wjl', 20))
// // console.log(Person('hxy', 20))
// console.log(Person.call(new Person('hxy', 20))) //通过伪造构造函数的方法骗过构造函数里的判断
// console.log(p instanceof Person)

// 方法二(new.target + class)
// 借助 new.target 属性，可与 class 配合定义抽象类
// class Person {
//     constructor(name) {
//         if(new.target === Person){
//             throw new Error("父类不可调用");
//         }
//         this.name = name
//         console.log(new.target)
//     }
// }

// class Student extends Person {
//     constructor(name, age) {
//         super(name)
//         this.age = age
//     }
// }
// console.log(new Student('hxy', 20)) // 子类继承父类时,new.target返回子类构造器 =>利用此特性可以实现父类不可调用而子类可调用
// console.log(new Person('hxy')) // 父类不可调用,抛出错误

// 方法三(class 最佳方案)
// 类的构造器必须使用new调用
class Person {
    constructor(name) {
        this.name = name
    }
}
console.log(new Person('wjl'))
console.log(Person('hxy')) // 直接调用构造函数,抛出错误
