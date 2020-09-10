//클래스 이름의 의미
  //함수형 프로그래밍에서 identity 는 항상 다음처럼 구현하는 특별한 의미의 함수임
  //const identity = <T>(value: T): T => value;
  //Identity 는 map, ap, of, chain 같은 메서드만 구현한 모나드이다.
  //카테고리 이론에서 자신의 타입에서 다른 타입으로 갔다가 돌아올 때 값이 변경되지 않는 것을 Identity 라고 한다.
  
import {ISetoid} from "../interfaces/ISetoid";
import {IMonad} from "../interfaces/IMonad";


export class Identity<T> implements ISetoid<T>, IMonad<T>{
  constructor(private _value: T) {}
  
  //IValuable
  value() {return this._value}
  
  //ISetoid
  equals<U>(that: U): boolean {
    if(that instanceof Identity) {
      //매개변수 that 과 인스턴스가 같다면 값을 비교한다 같지 않다면 false
      return this.value() == that.value();
    }
    return false;
  }
  
  //IFunctor
  map<U, V>(fn: (x: T) => U) {
    return new Identity<U>(fn(this.value()));
  }
  //엔도 펑터의 형태로 동작함, 타입은 바뀌었지만 여전히 Identity
  
  //IApply
  ap<U>(b: U) {
    const f = this.value();
    if(f instanceof Function) {
      return Identity.of<U>((f as Function)(b));
    }
  }
  
  //IApplicative
  static of<T>(value: T): Identity<T> {return new Identity<T>(value);}
  
  //IChain
  chain<U> (fn: (T) => U):U {
    //chain 메서드는 map 메서드와 다르게 엔도펑터를 유지하지 않아도 된다.
    //엔도펑터(시작할 때의 타입과 끝날 때의 타입이 같음)
    return fn(this.value());
  }
}
