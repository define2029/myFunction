function Person(name, age) {
  this.name = name
  this.age = age
  this.say = function () {
    console.log(this.name, this.age)
  }
}
const p1 = new Person('wjl', 20)
p1.say()
console.log(p1.constructor === Person)
console.log(Object.prototype.toString.call(p1))
