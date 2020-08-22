//배열(array)
    /**
     * js에서 배열은 Array클래스의 인스턴스이다.
     * 배열에 담기는 값은 아이템(item) 또는 원소(element)라고 함
     * function 키워드와 마찬가지로 배열 또한 객체임
     */



    //사이즈가 5인 배열의 생성
    let ar = new Array(5);
    //아래와 같이 사이즈를 안정하고 사용해도 된다.
    ar = new Array();
    ar.push(1);

    //배열 생성 단축 구문
    ar = [1, 2, 3];

    //배열의 타입
    let ar1: number[] = [1,2,3];
    type Person = {name:string, age:number}
    let arPerson: Person[] = [{name: 'ts', age:6}, {name: 'node', age: 5}];

    /**
     * 문자열에서 배열 변환
     * ts는 문자형(char) 자료형이 없음 또한 문자열의 내용을 바꿀 수 없음 
     * -> 문자열을 가공하려면 배열로 변환한 후 가공해야함
     * 이런 상황에서는 split(구분자: string): string[] 을 사용함
     */
    //문자열을 받아 구분자로 나누어 배열로 반환해주는 함수 split
    const split = (str: string, delim: string): string[] => str.split(delim);

    /**
     * 배열에서 문자열 변환
     * 해당 문자와 구분자를 결합하여 새로운 문자열을 만들어냄
     */
    const join = (strAr: string[], delim: string): string => strAr.join(delim);

    //인덱스 연산자(index operator)
    //배열에서 특정 위치에 있는 아이템을 얻고자 할 때 사용함 array[index]
    const numbers: number[] = [1,2,3,4,5];
    for (let i = 0; i < numbers.length; i++) {
        let element = numbers[i];
    }

    //배열의 비구조화 할당
    //배열에도 비구조화 할당을 적용할 수 있는데, 배열은 []을 사용함
    let [...rest] = numbers;

    //for ...in 반복문
    //배열의 인덱스값을 순회함
    for (let i in numbers) {
        const number = numbers[i];
    }
    //객체를 대상으로 사용할 떄에는 해당 객체의 속성값을 가지고 순회함
    //key와 value의 형태로 나옴
    let person: Person = {name: 'nodejs', age: 6}
    for (let i in person) {
        console.log(`${i} 와 ${person[i]}`);
    }

    //for ...of문
    //해당 반복문은 인덱스값으로 순회하지 않고 어떤 특정한 아이템 값을 가지고 순회함
    for (const name of arPerson) {
        console.log(name);
    }

    /**
     * 제네릭(generic)
     * 배열을 다루는 함수를 만들 때, 타입이 고정되어 있는 함수보단 T[] 와 같은 형태로 표현할 수 있다
     */
    const arrayLength = (array) => array.length;
    //해당 함수가 다양한 타입을 가질 수 있게 해주는 것이 바로 T[]이다.
    //const arrayLength1 = (array: T[]): number => array.length;
    //하지만 위와 같은 형태로 해놓으면 컴파일러가 해석을 못하기 때문에.
    const arrayLength1 = <T>(array: T[]): number => array.length;

    //제네릭의 타입 추론
    //제네릭으로 구현된 함수는 원칙적으로 함수명<타입변수>(매개변수)의 형식을 지켜줘야 하지만, 
    //TS는 타입 변수 부분을 생략가능하게 만들어져 있다.
    arrayLength1(numbers);
    console.log(arrayLength1<number>(numbers));

    //배열의 전개 연산자
    let ar_1: number[] = [1,2,3];
    let ar_2: number[] = [4,5,6];
    let merge: number[] = [...ar_1, ...ar_2, 7,8,9];

    //전개 연산자(spread operator)를 이용한 ramda pkg의 range 함수 구현
    const range = (from: number, to: number): number[] => 
        from < to ? [from, ...range(from+1, to)] : []
        //재귀함수(recursive function)의 형태

//선언형 프로그래밍과 배열
    /**
     * 함수형 프로그래밍과 연관이 있음, 또한 명령형 프로그래밍이란 것이 있는데
     * 이것은 저수준(low-level)언어이고, 선언형은 고수준(high-level)언어임
     * 저수준 언어는 보다 CPU친화적이고, 선언형은 사람에게 친화적임
     */
    //여러개의 데이터를 처리하는 방법 1 to 100 더하기
    //명령형 프로그래밍
    let sum = 0;
    for (let i = 0; i < 100; ++i) {
        sum += i;
    }
    console.log(sum);

    //선언형 프로그래밍
    let number1:number[] = range(1, 100+1);
    //필요한 모든 데이터를 배열에 담고 시작함
    //배열에 담겨있는 모든 데이터를 더할땐 fold라는 함수를 사용함
    //fold는 T[] 타입 배열을 가공하여 T타입으로 반환함
    const fold = <T>(array:T[], callback: (result: T, val:T)=> T, initValue: T)=> {
        let result:T = initValue;
        for (let i = 0; i < array.length; ++i) {
            const value = array[i];
            result = callback(result, value);
        }
        return result;
    }
    let number2:number = fold(number1, (result, value)=>result+value, 0);
    console.log(number2);
    //fold(대상 배열, 콜백(누적값, 더해줄 값), 초기화 값)

    //1 to 100 홀수의 합 구하기
    //filter 함수 사용함, filter함수는 원하는 값을 추려내 배열을 반환함
    const filter = <T>(array: T[], callback: (value:T, index?: number) => boolean): T[] => {
        let result:T[] = [];
        for (let i = 0; i < array.length; ++i) {
            const value = array[i];
            if(callback(value, i)) 
                result = [...result, value]
        } 
        return result;
    }

    const isOdd = (n: number):boolean => n % 2 !=0; 
    let number3 = fold(
        filter(number1, isOdd), 
        (result, value) => result+value, 0);

    console.log(number3);
    //filter((대상 배열, 인덱스), 조건식)
    //짝수의 경우 isOdd 조건식만 바꿔주면 수월하게 풀 수 있다.

    //map, 배열 데이터 가공하기
    //map은 x ~> y 형태로 어떤값을 다른 값으로 바꿔주는 역할을 함
    //x에다 뭔가를 했는데 y가 타입이 바뀔 수도 있음
    const map = <T, Q>(array: T[], callback: (value:T, index?: number) => Q): Q[] => {
        let result: Q[] =[];
        for (let i = 0; i < array.length; ++i) {
            const value = array[i];
            result = [...result, callback(value, i)]
        }
        return result;
    }
    let number4 = fold(
        map(number1, value=> value * value),
        (result, value) => result + value, 0);
    console.log(number4);

    //배열의 map, reduce, filter 메서드
    //filter 메서드
    //array.filter(callback:(value:T, index?: number): boolean): T[]
    let odd: number[] = number1.filter((value) => value % 2 == 0);
    //filter의 index속성
    //index는 현재 처리하고 있는 배열의 인덱스를 가르킴
    const half = number1.length / 2;
    let belowHalf: number[] = number1.filter((value, index) => index < half);

    //map
    //array.map(callback(value: T, index?: number): Q):Q[]
    let squres: number[] =range(1, 5+1).map((value)=> value = value*value);
    //숫자형을 문자열로 바꿔보기
    let ch_string: string[] = range(1, 5+1).map((val)=> `이것은 ${val}번`);
    console.log(ch_string);

    //reduce
    //아까 구현했던 fold 함수를 reduce 메서드로 대체할 수 있음
    //array.reduce(callback: (result: T, value: T), initValue: T): T
    let rdcSum: number = range(1, 100+1).reduce((result: number, value: number)=> result+value, 0);

//순수 함수(pure function)와 배열(array)
    /**
     * 함수형 프로그래밍에서 함수는 순수 함수라는 조건을 만족시켜야 함
     * js나 ts의 Array클래스에는 해당 조건에 부합하지 않는 메서드들이 많음
     */
    //순수 함수 조건
    /**
     * 함수 body에 I/O관련 코드가 없어야 함
     * 매개변수 값을 변경시키지 않는다. 
     * body에서 만들어진 값을 반환함
     * 함수 내부에 전역변수나 정적 변수를 사용하지 않는다.
     * 함수가 Exception을 발생시키지 않는다.
     * 함수가 콜백으로 구현되었거나, body에 콜백을 사용하는 코드가 없다.
     * body에 비동기 방식으로 작동하는 코드가 없다.
     */
    //위 조건을 지키지 않을 시 불순함수(impure function)이라고 부름
    //매개변수의 값을 변경하지 못하게 하기 위해 const나 readonly 키워드를 사용하는데
    //매개변수에서 const는 사용하지 못하니 readonly 키워드를 사용한다.
    // function pure(array: readonly number[]) {
    //     array.push(1); <- 오류
    // }

    //불변성(immutable)과 가변성(mutable)
    //변수가 const나 readonly를 명시하고 있으면 해당 변수는 언제나 초기값을 유지함 이를 불변성이라 하고
    //let 키워드나 readonly를 명시하지 않았다면 가변성이라 함

    //깊은 복사(deep-copy)와 얕은 복사(shallow-copy)
    //깊은 복사
    let original = 1;
    let copied = original;
    copied += 2;
    console.log(original, copied);
    //순수 함수를 구성하기 위해서는 불변성이 필수이기에 깊은 복사를 사용해야함
    //하지만 객체나 배열은 얕은 복사의 방식으로 기능함
    //아마도 객체나 배열은 복사할 때 해당 값을 가르키고 있는 주소를 복사하는 것이기 때문에 그런거 같다.

    //전개 연산자(spread operator)와 깊은 복사
    const arNum = [1,2,3,4,5];
    const arCopied = [...arNum];
    
    //Array 클래스의 sort 메서드를 순수 함수로 구현
    const pureSort = <T>(array: readonly T[]): T[] => {
        let deepCopied = [...array];
        return deepCopied.sort();
    }

    //filter 메서드의 순수 삭제
    /**
     * 배열에서 특정 아이템을 삭제할 때에는 splice 메서드를 사용하는데 이럴 경우 원본이 바뀌어
     * 순수 함수에서는 사용할 수 없다. 때문에 filter를 사용하여 원본 배열을 훼손하지 않고
     * 조건에 따른 새로운 배열을 반환받을 수 있다.
     */
    
    //가변 인수(variadic arguments)
    //함수를 호출할 때 인수의 갯수를 제한하지 않는 것
    //mergeArray의 매개변수는 전개연산자(spread operator)가 아닌 가변 인수를 표현하는 구문임
    //제네릭을 사용하여 타입에 상관없이 동작할 수 있도록 함
    const mergeArray = <T>(...arrays: readonly T[][]) :T[]=> {
        let result:T[] = []
        for (let i = 0; i < arrays.length; i++) {
            const array:T[] = arrays[i];
            //result와 array의 전개하여 합쳐야 T[]타입 배열을 생성할 수 있음
            result = [...result, ...array];
        }
        return result;
    }
    //배열을 받아 배열로 반환함
    const mergeAr: string[] = mergeArray(['Hello'], ['typescript']);

//튜플
    //어떤 프로그래밍 언어에는 튜플(tuple)이라는 타입이 존재하지만 JS에는 존재하지 않고 
    //단순하게 배열의 한 종류로 취급된다
    const ar11: number[] = [1,2,3,4,5]
    const ar12: [number, string] = [1, 'node'];

    //type alias
    type makeType = [number, string]
    const stdno: makeType[] = [[1, 'node'], [2, 'react'], [3, 'typescript']]




    

    








 