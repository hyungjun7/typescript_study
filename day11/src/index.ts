//모나드(monad)
  /*
    모나드는 카테고리 이론(category theory)이라는 분야에서 사용되는 용어이다.
    프로그래밍에서는 일종의 코드 설계 패턴(design pattern) 으로 몇 가지의 인터페이스를 구현한 클래스임
   */
  //타입 클래스(type class)
  const callMap = fn => b => b.map(fn); //고차 함수 callMap은 b 매개변수가 map 메서드를 가진 전제
  callMap(a => a+1)([1]);
  
  // callMap(a => a+1)(1); //해당 함수는 비정상적으로 종료된다. -> map 메서드를 보유하고 있지 않기 때문
  //이를 방지하기 위해 매개변수 b는 반드시 map이라는 메서드가 있는 타입으로 제한을 해야한다.
  const callMap1 = <T, U>(fn: (T) => U) => <T extends {map(fn)}>(b: T) => b.map(fn);
  
  //프로그래밍 언어인 하스켈(haskell)에서는 객체지향 언어라면 위의 문제를 해결하기 위해 클래스를 만들고 map 메서드를
  //구현하는 방식으로 하겠지만 하스켈에서는 map과 of라는 이름의 메서드를 가지고 있는 Monad<T>클래스를 만든다.
  class Monad<T> {
    constructor(public value: T) {}
    static of<U>(value: U): Monad<U> {return new Monad<U>(value)}
    map<U>(fn: (x:T) => U): Monad<U> {return new Monad<U>(fn(this.value))}
  }
  //위와 같은 클래스를 타입 클래스라고 한다.
  const callMonad = (fn) => (b) => Monad.of(b).map(fn).value;
  
  //고차 타입(higher-kinded type)
  //모나드 타입 클래스는 어떤 타입 T를 Monad<T>의 형태로 변환했다가 다시 T로 변환시킨다.
  //이때의 Monad<T>를 고차 타입이라고 한다.

  //카테고리 이론
  //수학에서의 카테고리는 집합의 집합으로 이해할 수 있는데, 프로그래밍에서는 타입의 타입으로 이해할 수 있다.
  //즉 Monad<T>는 T타입의 Monad 타입이니까 고차 타입이다.

  //판타지랜드 규격
  //하스켈에서 사용되는 라이브러리 구조를 자바스크립트 방식으로 재구성한 것
  //어떤 클래스가 다음과 같은 조건을 모두 만족한다면 그 클래스는 모나드이다.
  // 1. 펑터(Functor) : map 이라는 인스턴스 메서드를 가진다.
  // 2. 어플라이(Apply) : 펑터이면서 ap 라는 인스턴스 메서드를 가진다.
  // 3. 애플리커티브(Applicative) : 어플라이면서 of라는 클래스 메서드를 가진다.
  // 4. 체인(chain) : 애플리커티브면서 chain 이라는 메서드를 가진다.

  //Identity 모나드
  //값 컨테이너 구현 인터페이스
  //어떤 타입 T가 있을 때 T[]는 같은 타입의 아이템을 여러개 가지는 컨테이너이다. 컨테이너는 흔히 배열을 의미한다.
  //Monad<T>는 타입이 정해진 것이 아니고 모든 타입을 가질 수 있는 제네릭 클래스라고 생각할 수 있다.
  //이처럼 <T>를 가지는 값의 컨테이너를 값 컨테이너(value container) 라고 부른다.

  import {Identity} from "./classes/Identity";
  
  //ISetoid 인터페이스 테스트
  const one = new Identity(1), anotherOne = new Identity(1);
  const two = new Identity(2);
  console.log(one.equals(anotherOne)); //true
  console.log(two.equals(one)); //alse
  
  //IApply 인터페이스 테스트
  const add = x => y => x+y; //2차 고차 함수
  const id = new Identity(add); //identity 가 2차 고차 함수를 value로 가지고 있음
  console.log(id.ap(1).ap(2).value());
  
  //Chain 과 endoFunctor map의 비교
  console.log(Identity.of(1).map(value => `the cnt is ${value}`).value());
  console.log(Identity.of(1).chain(value => Identity.of(`the cnt is ${value}`)).value());
  //map 은 항상 같은 타입이므로 정해주지 않아도 되지만 chain 은 타입을 스스로 정해야 한다.

