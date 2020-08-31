function Logger(logString: string) {
    console.log('LOGGER RUN...');
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                // any logics we want
                console.log('Rendering template');
                // console.log('Rendering template.. .');
                const hookEl = document.getElementById(hookId);
                // const p = new originalConstructor();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    };
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name = 'Quy';

    constructor() {
        console.log('Creating person object . . .');
    }
}

const pers = new Person();

// console.log('pers', pers);

// Other example

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, description: PropertyDescriptor) {
    console.log('Accessor decorator! Log2');
    console.log(target);
    console.log('name: ' + name);
    console.log(description);
}

// We can use decorate return a new set of methods
function Log3(target: any, name: string | Symbol, description: PropertyDescriptor) {
    console.log('MEthod decorator! Log3');
    console.log(target);

    console.log('name: ' + name);
    console.log(description);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('PARAMATER decorator! Log4');
    console.log(target);

    console.log('name: ' + name);
    console.log(position);
}
class Product {
    @Log
    title: string;
    @Log
    private _price: number;
    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price..negative detected');
        }
    }

    @Log3
    getPriceWithTax(@Log4 tax: number): number {
        return this._price * (1 - tax);
    }
}

const p1 = new Product('book1', 1);
const p2 = new Product('book2', 2);

//NOTE: Decorator can return something

//NOTE: example auto binding value

function AutoBind(_: any, _2: string, description: PropertyDescriptor) {
    const originalMethod = description.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,

        get() {
            const boundCF = originalMethod.bind(this);

            return boundCF;
        },
    };

    return adjDescriptor;
}
class Printer {
    message = 'This works';

    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();
const button = document.querySelector('button')!;

// button.addEventListener('click', p.showMessage.bind(p));
button.addEventListener('click', p.showMessage);

// NOTE validate with Decorator

/**
 * Case study: we fetch some fake data online, but we can't gaurantee that
 * all data will have same format with class. Therefore, we should have
 * a validate function here
 */

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]; // ['required', 'positive']
    };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...registeredValidators[target.constructor.name][propName], 'required'],
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...registeredValidators[target.constructor.name][propName], 'positive'],
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    // we can add validate here but we also use with Decorator
    //NOTE: bad approach because we have to validate every time we use new Course
    //Example: if we have couble more feature to create new course, then we have to check all of them

    /* ----------------------- We should create decorator ----------------------- */
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(createdCourse);
});
