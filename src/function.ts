/* -------------------------- POWER OF DEFAUL VALUE ------------------------- */

function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob"); // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined); //! still works, also returns "Bob Smith"

//let result3 = buildName("Bob", "Adams", "Sr."); //! error, too many parameters
// Expected 1-2 arguments, but got 3.

let result4 = buildName("Bob", "Adams"); // ah, just right

/* ----------------------- USE OPTONAL WORTH THIS CASE ---------------------- */
function buildName2(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}

let result11 = buildName2("Bob"); // works correctly now
//let result12 = buildName2("Bob", "Adams", "Sr."); // error, too many parameters
//   Expected 1-2 arguments, but got 3.
let result13 = buildName2("Bob", "Adams"); // ah, just right

//NOTE: optional can passed but we also may have to define last name in missing case

/* ----------------------------- Rest Parameters ---------------------------- */

function buildName3(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie");
