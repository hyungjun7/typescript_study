//애플리커티브(Applicative)
  //자신이 어플라이(Apply)이면서 동시에 of 라는 클래스 메서드를 제공하는 인터페이스이다.
  import {IApply} from "./IApply";
  export interface IApplicative<T> extends IApply<T> {
    //현재 타입스크립트에서 인터페이스에 정적 메서드 구현이 불가능하여 주석처리
    //static of(value: T);
  }
