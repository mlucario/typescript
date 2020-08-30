console.log("demo generic");

function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergeObj = merge(
  { name: "Quy", title: "Software Engineering" },
  { age: 30 }
);

console.log("mergeObj:  ", mergeObj);

/* ----------------------- Generic Constraints Example ---------------------- */

interface Lengthy {
  length: number;
}
function countAndDescripte<T extends Lengthy>(element: T): [T, string] {
  let description = "Got no value";
  if (element.length === 1) {
    description = "Got 1 element";
  } else if (element.length > 1) {
    description = "Get " + element.length + "elements";
  }
  return [element, description];
}

console.log("countAndDescripte:  " + countAndDescripte("Quy Nguyen"));
console.log(
  "countAndDescripte2:  " + countAndDescripte(["Quy Nguyen", "Testing"])
);

/* -------------------------------- MAP DEMO - Generics -------------------------------- */
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value:" + obj[key];
}

console.log(
  "Demo map genericL ==>> " + extractAndConvert({ name: "Quy" }, "name")
);

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity;

/* ------------------------------ CLASS GENERIC ----------------------------- */
// NOTE: T extends string | number | boolean ==> will make sure we can work only their types
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems(): T[] {
    return [...this.data];
  }
}

//ANCHOR: We can create string/text storage
const textStorage = new DataStorage<string>();
textStorage.addItem("Quy1");
textStorage.addItem("Quy2");
textStorage.addItem("Quy3");
textStorage.addItem("Quy4");
//textStorage.addItem(123)  // false
textStorage.removeItem("Quy2");
console.log(textStorage.getItems());

//ANCHOR: we also can create number storage

const numberStorage = new DataStorage<number>();
numberStorage.addItem(2);
numberStorage.addItem(22);
numberStorage.addItem(23);
numberStorage.addItem(24);

numberStorage.removeItem(23);
console.log("numberStorage.getItems", numberStorage.getItems());

// //ANCHOR: object storage
// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "Quy" });
// objStorage.addItem({ name: "John" });
// objStorage.removeItem({ name: "John" });

// console.log("objStorage.getItems", objStorage.getItems());

/* ------------------------------- BONUS EXTRA ------------------------------ */

// Partial kyeword
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
  //   return <CourseGoal>courseGoal;
}

//READONLY
const names: Readonly<string[]> = ["Quy", "Maren"];
