//화살표 함수
/**
 * const 함수명 = (arg1: type, arg2: type ...) : return type => { function body }
 * 위와 같은 형태로 사용된다.
 * 함수 바디에는 중괄호를 생략하고 => arg1 + arg2 이런 형태로 사용할 수 있다.
 * 중괄호를 생략 여부에 따라 동작하는 방식이 바뀌는데
 * 실행문(execution statement)와 표현식 문(expression statement)로 나뉜다.
 */
const f = (a:number, b:number) : number => {return a+b;}

//실행문과 표현식 문
/**
 * 프로그래밍 언어는 예전부터 실행 지향 언어(execution-oriented lang)와 
 * 표현식 지향 언어(expression-oriented lang)으로 나뉘는데 타입스크립트는 
 * 위의 두가지를 동시에 지원하는 멀티 패러다임 언어(multi-paradigm lang)이다
 * 실행문은 CPU에서 실행되는 코드를 의미한다. 실행문은 CPU에서 실행만 되고 결과를 알려주지 않는데
 * 이를 위해 return 키워드를 사용하는 것이고, 표현식은 return 키워드를 사용하지 않아도 알려준다.
 */
let tmp = 10;
if(tmp < 10) console.log(`숫자는 : ${tmp}`);
//위와 같이 tmp < 10 라는 연산의 결과를 자동으로 알려주는 것이 표현식 문이다.

//복합 실행문
/**
 * if문 같은 경우 조건에 맞으면 단순히 한 줄만 실행하는 방식으로 설계가 되는데
 * if문 조건에 따라 실행문이 2개 이상이 있다면 {} 중괄호를 이용해 if문이 실행문을 
 * 한 줄로 인식하게 한다. 함수의 body 또한 마찬가지이다. 함수의 body는 무조건 
 * 중괄호로 감싸야 하는데 이는 복합 실행문을 의미한다.
 */

//return 
/**
 * return은 실행문에서 결과를 알려주지 않기에 도입된 기능이고
 * 반드시 함수의 body에서만 사용할 수 있고
 * 복합 실행문 안에서만 사용될 수 있다.
 */

//표현문 방식의 화살표 함수
let f2 = (a:number, b:number) : number => {return a+b;}
f2 = (a:number, b:number) : number => a+b;
//하지만 f2 = (a:number, b:number) : number => return a+b; 은 에러이다.
//리턴은 복합 실행문 {} 안에서만 사용될 수 있기 때문이다.

//일등함수 구성
/**
 * 콜백 함수(callback func)
 *  매개변수의 형태로 동작하는 함수
 */
import {start} from './util/start';
start(() => console.log('진행중'));

/**
 * 중첩 함수(nested func)
 * 함수는 해당 함수안에 여러개의 함수를 중첩하여 사용할 수 있다.
 */
const live = (days: number, callback: (string) => void): void => {
    let eat = (a: string, b: string): string => {return `점심은 ${a} 저녁은 ${b}`}
    
    function today(a: string, b: string): string{
        return `오늘은 ${a}를 먹었고, ${b}를 했습니다.`;
    }

    let todayResult = today(eat('치킨', '양념치킨'), '타입스크립트');
    callback(todayResult);
}

live(12, (result: string) => {console.log(`오늘 일과입니다. ${result}`)});

/**
 * 고차 함수(high-order func)와 클로저(closure)
 * 고차 함수는 또 다른 함수를 반환하는 함수를 말합니다.
 * 함수 표현식은 단순히 값이기 때문에 다른 함수를 반환할 수 있음
 */
const add = (a:number): (number) => number => (b: number): number => a+b;
const result = add(1)(2); //3
/**
 * 매개변수 a를 받아서 함수를 반환하는 함수와 B를 받아 a+b를 반환하는 함수
 * 이해하기가 참 어렵다. 조금 보기 좋게 함수 시그니처로 만들어 사용해보면
 */
type numberFunc = (number) => number
const add1 = (a:number) :numberFunc => {
    const addR: numberFunc = (b:number) : number => {
        return a+b;
    }
    return addR;
}
/**
 * return a+b는 클로저라고 하는 기능이다.
 * 고차함수를 사용할 때에는 클로저라는 기능이 필요하다고 함.
 * 위의 함수는 이런 형태로 사용할 수도 있다.
 */
let fn1: numberFunc = add1(1);
console.log(fn1(2));
//fn1은 그저 add(1)를 저장하는 임시변수에 해당한다. 이런 것들을 부분 함수(partially applied func)라고 부른다

//함수 구현 기법
/**
 * 디폴트 매개변수(default parameter)
 * 함수 호출 시 인수를 전달받지 못해도 기본값을 지정할 수 있다.
 */
type Car = {name: string, options: string}
const makeCar = (name: string, options: string = 'default'): Car => {
    const car = {name: name, options: options}
    return car;
} 

/**
 * 객체 생성시 값을 생략할 수 있다. 예시로 위의 코드를 바꿔보자면
 */
const makeCar1 = (name: string, options: string = 'default'): Car => {
    const car = {name, options}
    return car;
}
//위와 같이 사용할 수 도 있다.

/**
 * 객체를 반환하는 화살표 함수
 * 주의해야 할 점이 중괄호를 먼저 사용하면 컴파일러가 복합 실행문으로 인식을 한다.
 * 따라서 먼저 소괄호로 감싸준 후 중괄호를 사용한다.
 */
const makeCar2 = (name: string, options: string = 'default'): Car => ({name, options});

/**
 * 매개변수의 비구조화 할당
 *  매개변수도 변수의 일종이라서 비구조화 할당이 가능하다.
 */
const printCar = ({name, options}: Car): void => console.log(name, options);

/**
 * Key와 value로 객체 만들기
 *  ts에서는 key와 value의 형태를 색인 가능 타입(indexable type)이라고 한다
 */
const makeCar3 = (key, value) => ({[key]: value});
//색인 가능 타입
type keyType = {
    [key:string]:string
}
const makeCar4 = (key: string, value: string): keyType => ({[key]: value});

//클래스 메서드 
    /**
     * ts는 function 키워드로 만든 함수에는 this 키워드를 사용할 수 있지만, 
     * 화살표 함수에서는 사용할 수 없다.
     * ts에서의 메서드는 function 키워드로 만든 함수 표현식을 메서드라고 부른다.
     */
    class Dev {
        lang: string = 'Typescript';
        dev: () => void = function() :void {
            console.log(this.lang);
        }
    }
    const d: Dev = new Dev;
    d.dev();
    //위의 코드는 너무 난잡하다 때문에 아래의 코드로도 같은 결과를 낼 수 있다.
    class Bread {
        constructor(public price: number = 0) {;}
        sayPrice(): void {
            console.log(this.price);
        }
    }

    //정적 메서드
    class Gundam {
        static gundam(): string {
            return 'RX-78-2';
        }
    }

    //메서드 체인(method chain)
    //Jquery와 같은 라이브러리에서 객체의 메서드를 연속으로 계속 호출하는 방식
    //TS에서도 메서드 체인을 구현하려면 this를 계속 반환하면 된다.
    class cal {
        constructor(public val: number = 0){;}
        add(val: number){
            this.val += val;
            return this;
        }
        divide(val: number) {
            this.val /= val;
            return this;
        }
    }
    





 