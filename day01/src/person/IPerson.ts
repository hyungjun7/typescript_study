
//자바스크립트와 호환하기 위한 export default 구문
//한 모듈이 내보내는 기능 중 단 하나만 붙일 수 있음
//export default 키워드는 import할 때 중괄호 없이 import할 수 있다.
export default interface IPerson {
    name: string
    age: number
}