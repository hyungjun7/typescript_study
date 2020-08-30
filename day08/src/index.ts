//함수형 프로그래밍
  /**
   * 함수형 프로그래밍은 순수 함수와 선언형 프로그래밍의 토대 위에
   * 함수 조합(function composition)과 모나드 조합(monadic composition)으로
   * 코드를 설계하고 구현하는 기법이다.
   *
   * 함수형 프로그래밍 언어는 다음과 같은 기능을 지원한다.
   *  1. 정적 타입(static type)
   *  2. 자동 메모리 관리(automatic memory management)
   *  3. 계산법(evaluation)
   *  4. 타입 추론(type inference)
   *  5. 일등 함수(first-class function)를 기반으로 하여 제공하는 고급 기능
   *    1. 모나드(monad)
   *    2. 고차 함수(high-order function)
   *    3. 대수 데이터 타입(algebraic data type)
   *    4. 패턴 매칭(pattern matching) 등
   *  하지만 모든 함수형 프로그래밍 언어가 해당 기능들을 지원하는 것은 아니다.
   */

  //제네릭 함수(generic function)
  /**
   * 제네릭
   * function g1<T>(a: T): void{}
   * function g2<T, Q>(a:T, b:Q): void{}
   *
   * 화살표 함수로 표현하기
   * const a = <T>(a: T): void => {}
   * const a1 = <T, Q)(a: T, b:Q):void => {}
   *
   * 타입 별칭(type alias)
   * type Typefunc<T> = (T) => void
   * type Typefunc2<T,Q> = (T,Q) => void
   * type Typefunc3<T,Q,R> = (T,Q) => R
   * 위의 타입은 매개변수로 T와 Q를 받아서 R로 리턴하는 타입이다.
   */

  //고차 함수(high-order function)
  import compileStreaming = WebAssembly.compileStreaming;
import {read} from "fs";
import {init} from "ramda";

/**
   * 함수에서 매개변수의 갯수를 애리티(arity)라고 한다.
   * f() 는 애리티가 0인 함수인것이고 애리티가 같다면
   * ans = f(g(y(x))) 이런 형태로 이어서 사용할 수 있다.
   * 함수형 프로그래밍에서는 compose나 pipe함수를 이용하여
   * 새로운 함수를 만들 수 있다.
   *
   * TS에서 함수는 그저 변수에 담긴 함수 표현식이고 해당 표현식은 값이다.
   * 따라서 함수의 반환값으로 또 다른 함수를 사용할 수 있다.
   * 이처럼 어떤 함수가 또 다른 함수를 반환할 때 해당 함수를 고차 함수(high-order function)이라고 한다.
   * 함수가 단순히 값을 반환한다면 1차 함수이고 함수가 함수를 반환하는 경우 2차 함수이다
   * 2차 함수가 또 함수를 반환하면 3차 함수이고 계속 차수가 올라간다.
   */
  //고차 함수의 함수 시그니처
  type firstOrderFunc<T, R> = (T) => R;
  type secondOrderFunc<T, R> = (T) => firstOrderFunc<T, R>
  type thirdOrderFunc<T, R> = (T) => secondOrderFunc<T, R>

  //use first-order function
  const inc: firstOrderFunc<number, number> = (x: number): number => x*1.5;
  console.log(inc(5));

  //use Second-order function
  const add: secondOrderFunc<number, number> =
    (x:number): firstOrderFunc<number, number> =>
      (y: number): number => x+y;
  console.log(`second-order func : ${add(5)(6)}`);
  //add(x)(y)처럼 함수의 호출 연산자가 2개 이상 있는 것을 커리(curry)라고 한다.

  //use Third-order function
  const add3: thirdOrderFunc<number, number> =
    (x: number): secondOrderFunc<number, number> =>
      (y: number): firstOrderFunc<number, number> =>
        (z: number): number => x*y*z;
  console.log(`Third-order function : ${add3(6)(7)(9)}`);

  //부분 적용 함수(partially applied function)
  //add3(x)(y) 처럼 자신의 차수보다 호출 연산자를 덜 사용하면 부분 적용 함수라고 한다.
  const add1: firstOrderFunc<number, number> = add(1);
  console.log(`부분 적용 함수 : ${add1(2)} \n original function : ${add(1)(2)}`);

  //클로저(closure)
  //고차 함수의 몸통에서 선언되는 변수들은 클로저라는 유효 범위를 가진다.
  //클로저는 지속되는 유효범위(persistence scope)를 의미한다.
  function _add(x: number): (number) => number { //바깥쪽 유효 범위
    return function (y: number): number { //안쪽 유효 범위
      return x + y; //클로저
    }
  }
  //add가 반환하는 함수의 범위만 본다면 x라는 변수는 이해할 수 없는 변수이다.
  //이처럼 범위 안에서 이해할 수 없는 변수를 자유 변수(free variable)이라고 한다.
  //클로저를 지속되는 유효범위라고 하는 이유는 변수x가 메모리에서 해제되지 않기 때문이다.
  const test = _add(1) //자유변수 x의 메모리 유지
  const result = test(2) //자유변수 x의 메모리 해제
  //고차 함수가 부분 함수가 아닌 값을 발생시켜야 비로소 자유변수는 메모리가 해제된다.
  //이처럼 자유 변수의 메모리가 해제되는 범위를 클로저라고 한다.

  //클로저는 메모리가 해제되지 않고 지속될 수도 있음
  const makeNames = (): () => string => {
    const names = ['node' , 'react', 'typescript'];
    let index = 0;
    return (): string => {
      if(index == names.length) index = 0;
      return names[index++];
    }
  }

  const makename: ()=> string = makeNames();
  console.log([1,2,3,4,5,6].map(n => makename()));
  //[ 'node', 'react', 'typescript', 'node', 'react', 'typescript' ]
  //배열의 아이템 수 만큼 makename()함수가 호출되어 6번 출력되었다.
  //makeNames함수에는 원형 리스트(circular list)방식으로 동작하는 names와 index라는 자유변수가 있는데
  //index는 names.length와 같이 값이 0과 같아지면 다시 0이 되기 때문에
  //makename함수를 계속 사용하는 동안은 makeNames에 할당된 클로저는 해제되지 않는다.

  //함수 조합(function composition)
  // 작은 기능을 구현한 함수를 조합하여 더 의미있는 함수를 만들어내는 기법
  //함수 조합을 할 수 있는 언어들은 compose나 pipe등의 이름의 함수를 제공하거나 만들 수 있다.
  const f = <T>(x:T):string => `f(${x})`;
  const g = <T>(x:T):string => `g(${x})`;
  const h = <T>(x:T):string => `h(${x})`;

  //function compose
  const compose = <T, R>(...functions: readonly Function[]): Function =>
    (x:T): (T) => R => {
      const deepCopiedFunctions = [...functions];
      return deepCopiedFunctions.reverse().reduce((value, func) => func(value), x);
    }

  const composedFGH = compose(f,g,h);
  console.log(composedFGH('node with typescript'));

  const inc1 = (x):number => x+ 1;
  console.log(compose(inc1, inc1, inc1)(1));
  //compose 함수에 의해 (((1+1)+1)+1)이 되어 값은 4가 나온다.

  //function pipe
  //pipe함수는 compose와 매개변수를 해석하는 순서가 다르다.
  const pipe = <T, R>(...functions: readonly Function[]): Function =>
    (x:T): (T) => R => {
    return functions.reduce((value, func) => func(value), x);
    }
  //pipe함수는 compose를 역순으로 나열한 경우 같은 결과를 보임
  const piped = pipe(f,g,h);
  console.log(piped('node with typescript'));

  //pipe와 compose함수 분석
  //먼저 pipe의 경우 매개변수가 가변인수 방식으로 동작하므로
  //pipe = (...functions)의 형태를 가지고 있는데.
  //가변인수 functions의 타입을 결정하기가 어렵다 예를 들어
  //가변인자들의 타입이 전부 다르다면 이들을 모두 포함할 수 있는 제네릭 타입을 만들기가 어렵다.
  //따라서 타입을 Function들의 배열은 Function[]으로 설정한다.
  //pipe는 함수들을 조합해 어떤 함수를 반환하는 함수이기 때문에 리턴 타입은 Function이다.
  //const pipe = <T,R>(...functions readonly Function[]): Function => (x:T) => (T) => R
  //조합한 함수들의 애리티가 1이기 때문에 매개변수 x:T를 입력받고 (T) => R의 함수를 반환하는 것이다.
  //return functions.reduce((함수), (초기값));
  //우리가 알고 있는 변수 x를 초기값으로 설정하면 함수만 구현하면 되는데
  //해당 함수부분은 (value, func)의 형태로 매개변수의 구조를 가지고 있어야 하는데 x가 항상 배열의 아이템이기 때문이다.
  //return functions.reduce((value, func) => func(value), x);

  //compose의 경우
  //compose함수는 pipe함수와 매개변수의 방향이 반대로 진행된다.
  //따라서 리턴 부분이 pipe함수의 리턴 부분에서 reverse()만 추가하여 분석하면 되지만
  //compose는 순수함수의 형태로 동작하여야 하기 때문에 변수에 전개 연산자를 통해 매개변수로 받은 배열을 깊은 복사하여 사용한다.

  //부분 함수와 함수 조합
  //고차 함수의 부분 함수는 함수 조합에 사용될 수 있다.
  const addTest = x => y => x+y;
  const inc2 = addTest(1);

  const addTest1 = pipe(
    inc2,
    addTest(1)
  );
  console.log(addTest1(3));
  //addTest1 함수가 실행되면 inc2와 매개변수가가 더해져 4가 되고 addTest함수가 실행되어 5가 된다.

  //포인트가 없는 함수(pointless function)
  //함수 조합을 고려하여 설계한 함수를 포인트가 없는 함수라고 한다.
  const map = f => a => a.map(f);
  //함수 조합 코드는 타입을 생략하여 컴파일러가 타입을 추론하게 하는 것이 보기 편하다고 한다.
  const square = value => value * value;
  //포인트가 없는 함수
  const squaredMap = map(square);
  //포인트가 있는 함수
  const _squaredMap = a => map(square)(a);

  const fourSquare = pipe(
    squaredMap,
    squaredMap
  );
  
  console.log(fourSquare([3, 4]));
  //fourSquare([squaredMap * squaredMap, squaredMap * squaredMap,])
  
  //reduce를 사용하는 포인트가 없는 함수
  const reduce = (f, initValue) => a => a.reduce(f, initValue);
  //version generic
  const reduceGeneric = <T>(f: (sum: T, value: T) => T, initValue: T) => 
    (a: T[]): T => a.reduce(f, initValue);
  
  const sum = (result, value) => result + value;
  const sumArray = reduce(sum, 0);
  
  const pitagoras = pipe(
    squaredMap,
    sumArray,
    Math.sqrt
  );
  console.log(pitagoras([3,4]));
  









console.log('나는 행복합니다.');
