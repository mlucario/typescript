/* -------------------------------- interface ------------------------------- */

interface Person {
  age: number;
  name: string;
  DOB: Date;
  // defined function
  displayInfo(): string;
}

// Some inportant properties

/* -------------------------- 1. OPTINAL PROPERTIES ------------------------- */
interface Person_With_Optional {
  age: number;
  //NOTE: ? mean optional which means you can have or don't have name is this person
  name?: string;
  DOB: Date;
}

/* ------------------------------- 2. READONLY ------------------------------ */
interface Person_Readonly {
  readonly id: number;
}

let person1: Person_Readonly = { id: 15 };
//! We get error if change id
// person1.id = 100 ;  //ERROR

//NOTE: array we use ReadonlyArray<T>

/* ------------------------- Excess Property Checks ------------------------- */
//! VERY IMPORTANT CASE

/**
 * Some time we don't know how many property of interface or custom types
 * but we know the structure such as someName : value
 * we can use excess property checks to do this case
 */

interface houseConfig {
  color?: string;
  width?: number;

  // ! later we want height but we don't want change it at all already coded classes
  //NOTE: USES EXCESS PROPERTY CHECKS
  //?: use ANY because we have color string but width number
  [propName: string]: any;
}

/* -------------------------- Inplements Interface -------------------------- */
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// //   OTHER EXAMPLE
// interface ClockConstructor {
//   new (hour: number, minute: number): ClockInterface;
// }

// interface ClockInterface {
//   tick(): void;
// }

// function createClock(
//   ctor: ClockConstructor,
//   hour: number,
//   minute: number
// ): ClockInterface {
//   return new ctor(hour, minute);
// }

// class DigitalClock implements ClockInterface {
//   constructor(h: number, m: number) {}
//   tick() {
//     console.log("beep beep");
//   }
// }

// class AnalogClock implements ClockInterface {
//   constructor(h: number, m: number) {}
//   tick() {
//     console.log("tick tock");
//   }
// }

// let digital = createClock(DigitalClock, 12, 17);
// let analog = createClock(AnalogClock, 7, 32);

/* ---------------------------- Extends Interface --------------------------- */
interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
