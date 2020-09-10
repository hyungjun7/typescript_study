//판타지 랜드 규격에서 setoid는 equals 라는 이름의 메서드를 제공하는 인터페이스를 의미한다.
import {IValuable} from "./IValuable";

export interface ISetoid<T> extends IValuable<T> {
  equals<U>(value: U): boolean
}
