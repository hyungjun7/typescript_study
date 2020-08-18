import IPerson from '../../day01/src/person/IPerson';
import IAdr from './adr/IAdr';
import IName from './name/IName';

//데이터의 구조화
let myName: string = 'hyungjun';
let myAge: number = 23;

//위의 변수들 처럼 구조화를 하면 번거롭고 기능을 확장하기 어렵다
//때문에 클래스로 새로운 타입을 만들어 구조화를 한다.
let hyungjun: IPerson = {name: 'hyungjun', age: 23};

//구조화된 데이터의 일부만 사용하고자 할 때 데이터를 분해해서 사용하는데 이것을 비구조화라고 한다.
let newName: string = hyungjun.name;

//비구조화 할당
let {name, age} = hyungjun;

console.log(name, age);

//잔여 연산자(비구조화 할당에서의 ... 연산자)
let adr: IAdr = {
    country: 'korea',
    city: 'gyunggi',
    adr1: 'honggil-dong',
    adr2: 'munsu-myun',
    adr3: 'babo-ri'
};

const {country, city, ...detail} = adr;
console.log(detail);

//전개 연산자 (비구조화 할당이 아닌 곳에서의 ...연산자)
//객체의 속성을 모두 전개하여 새로운 객체로 만들어줌
let part1 = {name: 'typescript'}, part2 = {age: 23}, part3 = {company: 'google'};
let merge = {...part1, ...part2, ...part3};
console.log(merge);

//타입변환
let info: object = {name: 'hyungjun', age: 23};
//info.name;
//위와 같이 사용하면 object에는 name이라는 속성이 없어 오류가 남
//따라서 아래와 같이 name을 가지고 있는 타입으로 형변환하여 사용
(<{name: string}>info).name
//위와 같은 (<타입>객체) or (객체 as 타입) 구문을 타입스크립트에서는 타입 단언이라고 부름
//위는 모두 js 구문이 아님, -> js의 타입 변환과 구분하기 위해 타입 단언 이라는 말을 사용함

//인터페이스로 만들어 타입 단언
let name1 = (<IName> info).name;
let name2 = (info as IName).name;
console.log(name1, name2);


 


