//import * as 구문
//어떤 모듈을 다른 파일에서 가져왔을 때 어떤 파일인지 알수 있게 해줌
import * as U from '../utils/makeRandomNumber';
import IPerson from './IPerson';
//index 파일의 모듈화

//ts의 클래스 선언 및 인터페이스 상속
export default class Person implements IPerson {
    constructor(public name: string, public age: number = U.makeRandomNumber()) {;}
}

//함수 선언할 때 파라미터에 바로 값을 집어넣는게 가능하다.

//export는 interface, class, type, let, const 등의 키워드 앞에 사용할 수 있다.
//U라는 단어로 makeRandomNumber 함수에 접근할 수 있게 한다.
export const makePerson = (name: string, 
    age:number = U.makeRandomNumber()): IPerson => ({name, age});