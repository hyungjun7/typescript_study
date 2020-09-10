//Chain
  //Apply 이면서 chain 이라는 메서드를 구현하는 인터페이스
import {IApply} from "./IApply";

export interface IChain<T> extends IApply<T> {
  chain<U>(fn: (T) => U);
  //모나드의 특성에 따라 chain 은 U 타입을 반환하지 않을 수도 있다.
}
