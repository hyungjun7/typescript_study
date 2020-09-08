//F-바운드 다형성
  /*
    TS에서 this 키워드는 타입으로도 사용되는데
    this가 타입으로 사용됐을 때 객체지향 언어에서 의미하는
    다형성(polymorphism) 효과가 나는데, 일반적인 다형성과 구분하기 위해
    this로 인한 다형성을 F-바운드 다형성이라고 한다.
   */
  //F-바운드 타입
  //자신을 구현하거나 상속하는 서브타입(subtype)을 포함하는 타입

  //자신을 상속하지 않는 타입

interface IValue<T> {
    value(): T;
  }
  
  //자신을 상속하는 F-바운드 타입
  interface IAdd<T>{
    add(value: T): this;
  }
  
  interface IMulti<T>{
    multi(value: T): this;
  }
  
  //3개의 인터페이스를 구현하는 계산기 클래스
  class Calculator implements IValue<number>{
    constructor(private _value: number = 0) {}
    value(): number {return this._value;}
    //클래스의 필드로 접근하는 것이 아닌 메서드를 이용하여 접근함
  }
  
  class stringComposer implements IValue<string> {
    constructor(private _value: string = "") {}
    value(): string { return this._value;}
  }
  
  class Calculator1 implements IValue<number>, IAdd<number> {
    constructor(private _value: number = 0) {}
    value(): number {return this._value;}
    add(value: number): this {
      this._value = this._value + value;
      return this;
    }
  }
  
  class Calculator2 implements IValue<number>, IAdd<number>, IMulti<number> {
    constructor(private _value: number = 0) {}
    value(): number {return this._value;}
    //클래스를 반환
    add(x: number): this {this._value = this._value + x; return this;}
    multi(value: number): this {this._value = this._value * value; return this;}
  }
  
  //계산기 클래스 테스트 코
  const test = (new Calculator2(2))
    .add(3)
    .multi(3)
    .value();
  console.log(test);
  
  //StringComposer
  class StringComposer1 implements IValue<string>, IAdd<string>, IMulti<number> {
    constructor(private _value: string = '') {}
    value(): string {return this._value;}
    add(x: string): this {this._value = this._value + x; return this;}
    multi(repeat: number): this {
      const value = this.value();
      for (let i=0; i < repeat; i++) {
        //사용자가 입력한 숫자만큼 반복하면서 this에 같은 문자열을 계속 더해
        this.add(value);
      }
      return this;
    }
  }
  
  //StringComposer 테스트
  const test1 = (new StringComposer1('awesome typescript'))
    .add(' and nodejs & react\n')
    .multi(4)
    .value();
  console.log(test1);
  
  //nullable 타입
  /*
    자바스크립트와 타입스크립트에는 변수가 초기화되지 않은 경우 undefined 값을 기본으로 설정한다.
    하지만 이와 비슷한 의미로 (==) null이 존재한다.
    타입스크립트에서는 undefined와 null은 서로 호환이 되는데 각 타입의 변수에 할당할 수 있다.
   */
  let testUndefined: undefined = null;
  let testNull: null = undefined;
  //하지만 1같은 값을 할당할 수는 없다.
  //undefined와 null 타입을 nullable 타입이라고 한다.
  type nullable = null | undefined;
  const nullable: nullable = undefined;
  //해당 nullable 타입들은 시스템을 비정상적으로 종료시키는 주요 원인이기도 하다.
  
  //옵션 체이닝 연산자(optional chaining operator)
  interface IPerson {
    name: string
    age? : number
  }
  let person: IPerson;
  //console.log(person.name); 오류가 난다.
  console.log(person?.name);
  // ?. 같은 연산자를 옵션 체이닝 연산자라고 한다.
  //옵션 체이닝 연산자는 세이프 네비게이션 연산자(safe navigation operator) 라고도 한다.
  
  type ICoordinate = {longitude: number}
  type ILocation = {country: string, coords?: ICoordinate}
  type IPerson1 = {name: string, location?: ILocation}
  
  let personTest: IPerson1 = {name: 'typescript'}
  
  //아래의 if문을 한줄로 만들 수 있다.
  let longitude = personTest?.location?.coords?.longitude;
  console.log(longitude);
  
  if(personTest && personTest.location && personTest.location.coords) {
    longitude = personTest.location.coords.longitude;
  }
  
  //널 병합 연산자(nullish coalescing operator) ??
  type ICoordinate1 = {longitude: number}
  type ILocation1 = {country: string, coords: ICoordinate}
  type IPerson11 = {name: string, location: ILocation}
  
  let person3: IPerson1;
  //널 병합 연산자를 사용하여 초기값 설정
  let longitude1 = person3?.location?.coords?.longitude ?? 0;
  console.log(longitude1);
  
  //nullable 타입의 함수형 방식(Option 타입)
 
  //let o: Option = new Option(); 오류 발생 생성자가 private이기 때문
  //Option 타입 객체는 무조건 some이나 none 으로 생성할 수 있음
  //some 메서드는 some의 인스턴스를 반환하고 none도 마찬가지로 none의 인스턴스를 반환한다.
  //함수형 언어들은 어떤 정상적인 값을 가지면 some 타입에 값을 저장하고
  //null 이나 undefined 과 같이 비정상적인 값은 none에 저장한다.
  //Promise의 resolve, reject 같은 느낌?

  //some과 none으로 값 구분하기
  interface IValuable<T> {
    getOrElse(defaultValue: T)
  }
  
  interface IFunctor<T> {
    //함수형 언어에서는 map 메서드가 있는 타입을 functor 라고 부른다.
    map<U>(fn: (value: T)=> U);
  }
  
  //some 클래스 구현
  class Some<T> implements IValuable<T>, IFunctor<T> {
    constructor(private value: T) {}
    getOrElse(defaultValue: T) {
      //사용자는 해당 메서드를 이용해야만 값을 알 수 있음
      return this.value ?? defaultValue;
    }
    map<U>(fn: (T) => U) {
      //사용자는 해당 메서드를 이용해야만 값을 변경할 수 있음
      return new Some<U>(fn(this.value));
    }
  }
  
  //None 클래스 구현
  //None 클래스의 map 메서드에는 콜백함수가 존재하지 않는다.
  //Nullable 타입의 값을 의미하는 None 이 해당 타입을 콜백으로 작동시키면
  //프로그램이 비정상적으로 종료될 수 있기 때문이다.
  class None implements IValuable<nullable>, IFunctor<nullable> {
    getOrElse<T>(defaultValue: T | nullable) {
      return defaultValue;
    }
    map<U>(fn: (T) => U) {
      return new None;
    }
  }
  
  // @ts-ignore
  class Option {
    private constructor() {}
    static Some<T>(value: T) {return new Some<T>(value)}
    static None = new None();
  }
  
  //@ts-ignore
  //Some & None test
  let m = Option.Some(1);
  let value = m.map(value => value+1).getOrElse(1);
  console.log(value);
  
  //@ts-ignore
  let n = Option.None
  value = n.map(value => value +1 ).getOrElse(0)
  console.log(value);
  //None 의 map 메서드에는 콜백를 작성하지 않았으니 value에 저장 0을 반환된

  //Option 타입 예외 처리
  /*
    Option 타입은 불순 함수(impure function)을 순수 함수(pure function)으로 바꿀 때 효과적이다.
    parseInt 함수는 문자열을 숫자로 바꾸는데 해당 문자열이 숫자가 아닌 경우 NaN(not a number)를 반환한다.
   */
  const parseNum = (n: string): IFunctor<number> & IValuable<number> => {
    const value = parseInt(n);
    //@ts-ignore
    return isNaN(value) ? Option.None : Option.Some(value);
  }
  
  let _value = parseNum('1')
    .map(_value => _value + 1)
    .map(_value => _value * 2)
    .getOrElse(0)
  console.log(_value);
  
  _value = parseNum('react')
    .map(_value => _value + 1)
    .map(_value => _value * 2)
    .getOrElse(0);
  console.log(_value);
  //테스트 코드의 값이 정상적으로 변환된다면 정수가 출력되고 아니라면 0이 출력된다.
  
  //JS의 JSON.parse 함수는 예외를 발생시키는 불순 함수이다.
  //옵션을 활용하여 이를 순수 함수로 바꿀 수 있다.
  const parseJson = <T>(json: string): IValuable<T> & IFunctor<T> => {
    try {
      const value = JSON.parse(json);
      //@ts-ignore
      return Option.some<T>(value);
    } catch (e) {
      //@ts-ignore
      return Option.None;
    }
  }
  
  const json = JSON.stringify({name: 'typescript', age: 23});
  let value3 = parseJson(json).getOrElse({});
  console.log(value3);
  
  //try / catch 를 사용하지 않고도 비정상적으로 종료되지 않는다.
  value3 = parseJson('hello world!').getOrElse({})
  console.log(value3);

