class Animal{
	constructor(name){
		this.name = name;
	}
	sayName(){
		console.log(this.name);
	}
}
class Programmer extends Animal{
	constructor(name){
		super(name);
	}
	program(){
		console.log("11");
	}
}

var animal = new Animal("cs");
var programmer = new Programmer("n");
	