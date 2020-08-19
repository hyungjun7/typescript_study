//함수와 메서드
/**
 * js에서는 function 키워드로 만드는 함수와
 * 화살표로 만드는 화살표 함수가 있다. ( () => {} )
 */

 //function 키워드로 만드는 함수
 function printMyName() {
     console.log('hyungjun');
 }

 //ts 함수 선언부 
 function printYourName(name: string, age: number) : void {
    console.log(name, age);
 }
 //위와 같이 매개변수 넣는 곳에 타입을 명시해주고, 그 뒤에 중괄호가 오기 전에
 //리턴타입을 명시해준다. 이것 또한 생략가능하지만 왠만하면 그냥 넣자

//함수 시그니처(function signature)
/**
 * 함수의 타입을 함수 시그니처라고 부르고 다음과 같이 표현함
 * (type, type ...) => 반환타입
 */
let printMe: (string, number) => void = (name:string, age:number) : void => {}

//type (type alias)
/**
 *  C언어에서 구조체에 별명 붙이듯이 사용하면 된다.
 * type 새로만들 타입 = 기존 타입
 */
type strNumFunc = (string, number) => void;
let f: strNumFunc = (name: string, age: number): void => {}
// 함수 시그니처를 명시해놓고 type 키워드로 설정해놓고 사용하면 함수 매개변수 설정할 때 
// 다르게 설정하는 것을 미연에 방지할 수 있다고 한다.

//선택적 매개변수(optional parameter)
/**
 * 인터페이스에서 선택 속성을 사용할 수 있듯이, 
 * 함수의 매개변수에도 선택 속성을 사용할 수 있다. (약간 오버로딩?? 같은 느낌 느낌만 그렇다)
 * (arg1: string, arg?: number) : void => {}
 */
function fn(name: string, age?: number): void {
    console.log(name, age);
}
fn('node', 1);
fn('react'); //undefined

//함수 표현식(function expression)
/**
 * js에서의 함수는 function 클래스의 인스턴스라고 한다.
 * -> ???????????? 
 *  그렇다면 함수는 객체인가?
 */
//함수 표현식
let add = /*여기부터*/ (a:number, b:number): number => {return a+b;} /**여기까지를 함수 표현식이라고 함 */
console.log(add(1,2));

//일등 함수(first-class function)
/**
 * 어떤 프로그래밍 언어가 일등함수 기능을 제공하면 함수형 프로그래밍 언어라고 한다.
 * 일등 함수란 함수와 변수를 구분하지 않겠다는 의미이다.
 */
let f1 = (a, b) : number => {return a+b;}
f1 = (a,b) : number => {return a-b;}
//위와 같이 f1은 변수인지 함수인지 구별을 할 수가 없다.
//함수와 변수를 구분하지 않기에 f1이라는 공간에 a-b 함수를 넣을 수 있다.

/**
 * 계산법
 * 조급한 계산법(eager evaluation)과 지연 계산법(lazy evaluation)이 있다.
 * 컴파일러가 1+2 를 만난 경우 조급한 계산법을 적용하여 3을 만들고
 * 위와 같이 함수표현식을 만나면 a와 b가 뭔지 모르니까 지연 계산법을 적용한다.
 */

 //함수 호출 연산자(functin call operator)
 /**
  * 어떤 변수가 함수 표현식을 가지고 있을 때, 그 변수 이름 뒤에 함수 호출 연산자를 붙여
  * 호출할 수 있다. 
  * 컴파일러가 함수 호출문을 만났을 때, 지연 계산법으로 미루고 있던 방법을 조급한 계산법으로
  * 바꿔서 해당 함수를 값으로 만든다.
  */

  //익명 함수(anonymous function)
  /**
   * 타 언어에서 언급되는 익명 함수와는 다른 표현이다.
   */
let f2 = (function(a:number, b:number) : number {return a+b;}) (1, 2);
/**
 * 위의 코드를 이해하기 위해서는 연산자 우선순위(operator precedence)를 고려해야 하는데
 * 앞의 함수 표현식에 괄호를 씌워주지 않는 경우 호출 연산자의 우선순위가 매우 높기 때문에
 * 뒤에 있는 코드가 먼저 실행될 가능성이 있으니 앞의 함수 표현식에 괄호를 씌워준다.
 */

 //const과 함수 표현식
 /**
  * let과 같은 변수는 도중에 값이 변할 수가 있다. 때문에 const를 사용하여 
  * 함수 표현식이 변하지 않도록 하자
  */


