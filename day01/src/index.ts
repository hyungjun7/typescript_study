//export 키워드로 내보낸 모듈을 import하여 사용
import Person ,{makePerson} from './person/Person';
import IPerson from './person/IPerson';
//Chance는 더미 데이터를 만들어주는 패키지
import Chance from 'chance';
//ramda는 함수형 util 패키지
import * as R from 'ramda';

const chance = new Chance();

let persons: IPerson[] = R.range(0,2)
    .map((n: number) => new Person(chance.name(), chance.age()));

console.log(persons);

// const testMakePerson = () :void => {
//     let react: IPerson = makePerson('React');
//     let node: IPerson = makePerson('node.js');

//     console.log(react, node);
// }

// testMakePerson();



//package.json 
/**
 * dev명령은 개발 중 src디렉토리에 있는 index.ts 파일을 실행하는 용도로 사용함
 * build는 개발이 끝나고 배포하기 위해 dist 디렉토리에 js파일로 만들 때 사용함
 */