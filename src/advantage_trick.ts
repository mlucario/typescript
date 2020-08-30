console.log("Advantage Types");

//NOTE use custom types
type Admin = {
  name: string;
  privilege: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type IntersectionTypeDemo = Admin & Employee;

let e1: IntersectionTypeDemo = {
  name: "Quy",
  privilege: ["Testing"],
  startDate: new Date(),
};

console.log("e1 ", e1);
console.log("==========================================");
/* ########################################################################## */

// NOTE use interface

interface Admin1 {
  name: string;
  privilege: string[];
}

interface Employee1 {
  name: string;
  startDate: Date;
}

type IntersectionTypeDemo1 = Admin1 & Employee1;
let e2: IntersectionTypeDemo1 = {
  name: "Quy",
  privilege: ["Testing"],
  startDate: new Date(),
};

console.log("e2 ", e2);
console.log("==========================================");
/* -------------------------------TYPE GUARDS ------------------------------- */
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // ! Will get number type only

/* ---------------------------- FUNCTION OVERLOAD --------------------------- */
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
  // /* TYPE GUARDS
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

//TEST
console.log("TEST FUNCTION OVERLOAD ====================");
const test1 = add(1, 4);
console.log("test1 with number", test1);
const test2 = add("Hello", " There");
console.log("test1 with number", test2);
console.log("END FUNCTION OVERLOAD ====================");
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  //! Can't use typeof because Admin will return as object
  //NOTE we should use  'privilege' in emp
  if ("privilege" in emp) {
    console.log("Privileges: " + emp.privilege);
  }

  if ("startDate" in emp) {
    console.log("startDate: " + emp.startDate);
  }
}

printEmployeeInformation({ name: "Quy", startDate: new Date() });
console.log("==========================================");

class Car {
  drive() {
    console.log("Driving car ...");
  }
}

class Truck {
  drive() {
    console.log("Driving truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo amount ", amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  // both of classes have driver => we can use it
  vehicle.drive();

  // NOTE we can use instanceof
  //!but we can't use instanceof with interface, use for class only
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

console.log("Car Class");
useVehicle(v1);
console.log("==========================================");
console.log("Truck Class");
useVehicle(v2);
console.log("==========================================");

/* -------------------------- DISCRIMINATED UNIONS -------------------------- */
console.log("DISCRIMINATED UNIONS=========>");
interface Bird {
  //NOTE discriminated
  type: "bird";

  flyingSpeed: number;
}

interface Horse {
  //NOTE discriminated
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

//ANCHOR first approach
function moveAnimal1(animal: Animal) {
  if ("flyingSpeed" in animal) {
    console.log("Animal moving with speed: ", animal.flyingSpeed);
  }
}

//ANCHOR BETTER APPROACH
function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;

    case "horse":
      speed = animal.runningSpeed;
      break;

    default:
      console.log("default");
      break;
  }

  console.log("Moving at speed: " + speed);
}

let aBird: Animal = {
  type: "bird",
  flyingSpeed: 100,
};

let aHorse: Animal = {
  type: "horse",
  runningSpeed: 500,
};

console.log("bird");
moveAnimal(aBird);

console.log("horse");
moveAnimal(aHorse);

/* ------------------------------ TYPE CASTING ------------------------------ */
console.log("TYPE CASTING");

// const userInputText = <HTMLInputElement>document.getElementById("user-input")!;
const userInputText = document.getElementById(
  "user-input"
)! as HTMLInputElement;
userInputText.value = "Hi there";
console.log("END TYPE CASTING ================");

/* ---------------------------- INDEX PROPERTIES ---------------------------- */
interface ErrorContainer {
  ///* check email {email: 'Not a valid email', username: 'Must start with character'}

  // We don't know how many value such as email, password, username which are errors
  // some time people mess with username but not with email

  [prop: string]: string; // mean I don't know value name ( email, username) but i know the error is string

  //! we can have as much as we can the value => 2 . 3 ...10
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
  1: "test with 1 because 1 is also a string",
  username: "username need start with capital character!",
};

console.log("END INDEX PROPERTIES===============");

/* ----------------------- OPTIONAL CHAINING IMPORTANT ---------------------- */
const fetchUserData = {
  id: "u1",
  name: "Max",
  job: { title: "CEO", decription: "My own company" },
};

// console.log(fetchUserData.job && fetchUserData.job.title); //! not work
console.log(fetchUserData?.job?.title);

/* ----------------------------- NULL COALESCING ---------------------------- */
const aUserInput = null;
const storedData = aUserInput ?? "DEFAULT";

console.log("storedData : ==>", storedData);
     