//제네릭 프로그래밍
  /**
   * 어떤 인터페이스가 value라는 속성을 가지고 number, string 타입을 가질 때,
   * 타입을 특정하지 않고 T라는 속성으로 지정하여 제네릭 타입으로 만들 수 있다
   * */
  interface test<T> {
    value: T;
  }
  
  //제네릭 함수
  function identity<T>(arg: T): T {return arg}
  
  //generic type alias
  type IValueable<T> = {
    value: T;
  }
  
  //generic class
  class Valuable<T> {
    constructor(public value: T) {}
  }
  
  //interface generic
  interface IValue<T> {
    value: T;
  }
  //인터페이스를 구현하는 클래스는 자신이 가진 타입 변수를 인터페이스쪽 타입 변수로 넘길 수 있다.
  class Valueable1<T> implements IValue<T> {
    constructor(public value: T) {}
  }
  //제네릭 함수는 자신의 타입 변수 T를 인터페이스의 타입 변수 쪽으로 넘길 수 있다.
  const printValue = <T>(o: IValue<T>): void => console.log(o.value);
  printValue(new Valueable1<boolean>(true));
  printValue(new Valueable1<number>(1));
  printValue(new Valueable1<string>('hey typescript'));
  //타입 변수 부분을 생략해도 타입 추론으로 인하여 정상적으로 작동한다.

  //제네릭 타입 제약(generic type constraint)
  //타입 변수에 적용할 수 있는 타입을 한정하는 역할을 한다.
  //<최종 타입1 extend 타입1, 최종 타입2 extend 타입2>(arg1: 최종 타입1, arg2: 최종 타입2, arg3...)
  
  //printValue 에 타입 제약 걸기
    const printValueT = <Q, T extends IValue<Q>>(o: T): void => console.log(o.value);
    printValueT(new Valueable1(true));
    
  //new 타입 제약
  //factory function 은 new 연산자를 사용하여 객체를 생성하는 기능을 하는 함수를 의미한다.
  //factory function 은 객체를 생성하는 방법이 복잡할 때 구현하여 사용한다.
  //아래의 코드의 매개변수 type은 타입이다. 따라서 type의 타입 T는 타입의 타입인 것이다.
  //const create = <T>(type: T): T => new type(); <- err
  const create = <T extends {new(): T}>(type: T): T => new type();
  //오류가 나기 때문에 타입 변수 T를 new 타입으로 바꿔서 해결이 됐다.
  //이는 조금 더 간결하게 표현할 수 있다.
  const create1 = <T>(type: new() => T): T => new type();
  //결론적으로 {new(): T} 와 new() => T는 같다는 말이다.
  
  const create2 = <T>(type: {new(...args): T}, ...args): T => new type(...args);
  class Point {constructor(public x: number, public y: number) {}}
  [
    create2(Date),
    create2(Point, 0, 0 )
  ].forEach(s => console.log(s));
  //create2 함수가 클래스의 인스턴스를 생성하는 것을 확인할 수 있다.

  //인덱스 타입 제약(index type constraint)
  //객체의 일정 속성을 추려 단순한 객체를 만들 때 사용한다.
  //다음 코드는 4개의 속성을 가진 객체에서 2가지의 속성만 추출한다
  const pick = (obj, keys) => keys.map(k => ({[k]: obj[k]}))
    .reduce((result, value) => ({...result, ...value}));
  
  const obj = {name: 'jane', age: 23, city: 'seoul', country: 'korea'}
  console.log(
    pick(obj, ['name', 'age']),
    pick(obj, ['namee', 'agee'])
  );
  //위와 같이 key 값에 엉뚱한 값을 입력하면 undefined가 출력되는데
  //이를 방지하기 위해 keyof T 형태로 타입 제약을 설정할 수 있다. 이것을 인덱스 타입 제약이라고 한다.
  //<T, K extends keyof T>
  const pick1 = <T, K extends keyof T>(obj: T, keys: K[]) =>
    keys.map(k => ({[k]: obj[k]}))
      .reduce((result, value) => ({...result, ...value}), {});
  console.log(pick1(obj, ['name', 'age']));
  
  //대수 데이터 타입(algebraic data type)
  /*
    객체지향 언어에서 ADT라는 용어는 추상 데이터 타입(abstract data type)을 의미하지만
    함수형 언어에서는 대수 데이터 타입을 의미한다.
    타입스크립트에서 대수형 타입은 합집합(union)과 교집합(intersection) 두 가지가 있다
   */
  //합집합 타입
  //합집합은 or 의 의미를 가지고 있는 | 연산자를 이용하여 만든 타입을 말한다.
  type numberOrString = number | string;
  let ns: numberOrString = 1;
  ns = 'typescript';
  
  //교집합 타입
  /*
    교집합 타입은 and 의 의미인 &를 사용한다. 교집합 타입의 예로는 두 개의 객체를 통합하여
    새로운 객체를 만들 때 사용한다.
   */
  //타입 T와 Q의 매개변수를 받아 두 타입을 합쳐서 반환하는 함수
  const mergeObj = <T, Q>(a: T, b:Q): T & Q => ({...a, ...b});
  
  type name = {name: string};
  type age = {age: number};
  
  const nameAndAge: name & age = mergeObj({name: 'typescript'}, {age: 23});
  console.log(nameAndAge);
  
  //합집합 타입 구분
  interface ISquare {tag: 'sq', size: number}
  interface IRectangle {tag: 'rec', width: number, height: number}
  interface ICircle {tag: 'cir', radius: number}
  
  const sq: ISquare = {tag: 'sq', size: 23};
  const rec: IRectangle = {tag: 'rec', width: 12, height: 24};
  const cir: ICircle = {tag: 'cir', radius: 10};
  
  //위의 도형 객체들을 모두 받아서 면적을 계산해주는 함수
  //구현하기 위해서는 3가지 도형의 인터페이스를 합집합 타입으로 만들어줘야 한다.
  type IShape = ISquare | ICircle | IRectangle;
  const calcArea = (a: IShape): number => {
    //여기서 각 타입별로 어떤 반환식을 사용할 것인지 구분을 해야한다.
    //식별 합집합(discriminated unions)라는 구문을 이용하여 구분한다.
    //식별 합집합 구문을 이용하기 위해서는 본래의 타입에 tag라는 속성을 포함시켜야 한다.
    switch (a.tag) {
      case "sq": return a.size * a.size;
      case "rec": return a.width * a.height;
      case "cir": return Math.PI * a.radius * a.radius;
    }
    return 0;
  }
  console.log(calcArea(sq), calcArea(rec), calcArea(cir));
  
  //타입 가드(type guard)
  class Bird {fly() {console.log('omg i can fly')}}
  class Human {eat() {console.log('cook cook some chicken')}}
  
  const flyOrEat = (a: Bird | Human): void => {
    //a 라는 매개변수가 정확히 어떤 타입인지 알아야 한다
    //이것을 검사하기 위해  instanceof 연산자를 사용한다.
    //객체 instanceof 타입  -> boolean 값 반환
    if(a instanceof Bird) {(a as Bird).fly()}
    else if(a instanceof Human) {(<Human>a).eat()}
    //위와 같이 사용할 수 있다.
  }
  //타입스크립트에서는 instanceof 연산자에 타입 가드(type guard) 기능이 있다.
  //타입 가드는 타입을 변환하지 않은 코드 때문에 프로그램이 비정상적으로 종료되는 상황을 보호해 준다는 의미
  type birdOrHuman = Bird | Human;
  const typeGuardTest = (a: birdOrHuman): void => {
    if(a instanceof Bird) {a.fly()}
    else if(a instanceof Human) {a.eat()}
    //위와 같이 타입을 변환시켜주지 않아도 타입 가드로 인하여 자동으로 해당 타입 객체로 전환된다.
  }
  [new Bird, new Human].forEach(typeGuardTest);
  
  //is연산자를 활용한 사용자 정의 함수
  //타입 가드 기능을 하는 함수는 접두에 is라는 키워드를 붙인다.
  //변수 is 타입 <- is operator
  const isFly = (a: birdOrHuman): a is Bird => {
    return a instanceof Bird;
  }
  const isEat = (a: birdOrHuman): a is Human => {
    return a instanceof Human;
  }
  //사용자 정의 함수는 if문에서 사용해야 한다.
  const isTest = (a: birdOrHuman) => {
    if(isFly(a)) {a.fly()}
    else if(isEat(a)) {a.eat()}
  }
[new Bird, new Human].forEach(typeGuardTest);
  
  
