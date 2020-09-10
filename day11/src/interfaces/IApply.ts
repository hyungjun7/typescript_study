//어플라이는 펑터이면서 동시에 ap라는 메서드를 제공하는 인터페이스
import {IFunctor} from "./IFunctor";

export interface IApply<T> extends IFunctor<T> {
  ap<U>(b: U);
}
