console.clear();
/* --------------------------------- Boolean -------------------------------- */
let isDone: boolean = false;

/* --------------------------------- Number --------------------------------- */
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
// let big: bigint = 100n; // new in 2020

/* --------------------------------- String --------------------------------- */

let color: string = "blue";
let my_name: string = "Quy";
let sentence: string = `Hello, my name is ${my_name}.`;

//NOTE check if string object is exist or not
let my_name_default = my_name || "DEFAULT";

/* ---------------------------------- Array --------------------------------- */
let list: number[] = [1, 2, 3];

// NOTE this is an example of define generic array  Array<elemType>
let list_generic: Array<number> = [1, 2, 3];

/* ---------------------------------- Tuple --------------------------------- */
// Tuple is an static array ( keep size same , no extend size)

// Declare a tuple type
let tuple_string: [string, string];
let tuple_number: [number, number];
let tuple_mix: [string, number];

//ACCESS to tuple
tuple_string = ["Test1", "Test 2"];
let firstElement: string = tuple_string[0];

/* ---------------------------------- Enum ---------------------------------- */
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green; //ANCHOR green index is 1

// Enum will start from 1
enum Color_With_Start_Value {
  Red = 1,
  Green,
  Blue,
}
let c2: Color = Color.Green; //ANCHOR green index is 2

enum Colorr_With_Any_Value {
  Red = 1,
  Green = 15,
  Blue = 4,
}
let c3: Color = Color.Green; //ANCHOR  green index is 15

/* --------------------------------- Unknown -------------------------------- */
let notSure: unknown = 4;
notSure = "maybe a string instead";

// NODE Unknown type can be : string, object, boolean, undefined, or other types

/* ---------------------------------- Void ---------------------------------- */
// Void ussually is used for method which means no return any thing
function warnUser(): void {
  console.log("This is my warning message");
}

/* ---------------------------------- Never --------------------------------- */

//! Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}

//! Inferred return type is never
function fail() {
  return error("Something failed");
}

//! Function returning never must not have a reachable end point
function infiniteLoop(): never {
  while (true) {}
}

