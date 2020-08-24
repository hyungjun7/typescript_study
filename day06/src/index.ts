//반복기
    /**
     * for ..in 과 for ..of 
     * 타입에 무관하게 배열 값을 얻을 수 있다.
     */

     //for of
     /**
      * JAVA의 iterator같은 느낌이고
      * next() 라는 이름의 메서드를 제공함
      * next에는 value와 done이라는 두가지 속성을 제공함
      */
     const createRange = (from: number, to: number) => {
         let current = from;
         return {
             next() {
                 //current가 to보다 작으면 ++하고 아니면 value에 undefined
                 const value = current < to ? current++ : undefined

                 //우선순위가 적용되어 비교연산 후 대입연산한다. value가 undefined일 경우 true 아닐 경우 false
                 const done = value == undefined
                 return {value, done}
             }
         }
     }
     //createRange 함수는 next객체를 반환하는데, 이를 반복기 제공자(iterable)이라고 함
     const iterator = createRange(1, 5+1);
     while (true) {
        const {value, done} = iterator.next();
        if(done) break;
        console.log(value);
     }

    //for ..of구문과 Symbol.iterator
    /**
     * 범위를 정해주는 range함수는 for ..of 에서 of 뒤에 올 수 있다.
     * 하지만 위에서 만든 코드를 of 뒤에 써보면 Symbol.iterator가 없다고 하는데.
     * 이것은 우리가 만든 함수를 클래스로 구현해야 한다는 것을 의미한다.
     */
    class RangeIterator{
        constructor(public from: number, public to: number) {;}
        [Symbol.iterator]() {
            //클래스의 메서드 또한 function 키워드로 만들어지는데, 생략 가능하다. 
            //해당 키워드를 가지고 만들어진 
            //함수나 메서드는 this 키워드를 사용할 수 있다.
            const that = this;
            let current = that.from;
            return {
                next() {
                    //여기서 that의 활용이 나온다. next 또한 마찬가지로 function 키워드로 생성되는 메서드 이기 때문에
                    //this를 활용하면 next의 this로 인식하는 것을 방지하기 위하여 that에 미리 this를 넣어 놓는다.
                    const value = current < that.to ? current++ : undefined;
                    const done = value == undefined;
                    return {value, done}
                }
            }
        }
    }

    const iterator1 = new RangeIterator(1, 6+1);
    for (let iter of iterator1) {
        console.log(iter);
    }

    //iterator<T>와 iterable<T> 인터페이스
    /**
     * TS는 반복기 제공자에 제네릭 인터페이스를 사용할 수 있다.
     * Iterable<T>는 자신을 구현하는 클래스가 Symbol.iterator를 제공한다는 것을 명시함
     * Iterator<T>는 반복기가 생성할 값의 타입을 명확하게 해준다.
     */
    class StringIterable implements Iterable<string> {
        constructor(public strings: string[] = [], private currentNum: number = 0) {;}
        [Symbol.iterator](): Iterator<string> {
            const that = this;
            let current = that.currentNum, length = that.strings.length;

            const iterator: Iterator<string> = {
                next(): {value: string, done: boolean} {
                    const value = current < length ? that.strings[current++] : undefined;
                    const done = value == undefined;
                    return {value, done}
                }
            }
            return iterator;
        }
    }

    for (let iter of new StringIterable(['node', 'react', 'typescript'])) {
        console.log(iter);
    }

//생성기
    /**
     * JS와 TS에는 yield 라는 키워드를 제공합니다. 이 키워드는 return처럼 값을 반환합니다.
     * 해당 키워드는 반드시 function* 를 사용한 함수에서만 사용할 수 있고 function* 키워드로 만든 함수를
     * 생성기(generator)라고 합니다.
     */
    function* generator() {
        console.log('start');
        let value = 1;
        while (value < 4) yield value++;
        console.log('finish');
    }

    for (let iter of generator()) {
        console.log(iter);
    }
    //실행결과
    // start
    // 1
    // 2
    // 3
    // finish
    //경악을 금치 못했다.
    //결과를 이해하기 위해서 코루틴을 알아야 하는데, 코루틴은 애플리케이션 레벨의 스레드라고 한다.
    //이는 운영체제에서 무리가 없을 만큼만 스레드를 사용할 수 있게 한다.
    //코루틴은 일정 주기에 따라 자동으로 반복실행한다. 하지만 세미 코루틴은 절반만 코루틴으로 
    //반복실행은 가능하지만 자동으로 실행되지는 못한다. 
    //생성기는 사용할 때 반복자의 next 메서드가 호출될 때 한 번만 실행되고 바로 멈춘다. 
    //때문에 for ..of문으로 끝날 때 까지 계속 next()를 반환하여 함수를 종료시킨다.

    //이런 방식으로 동작하는 형태를 세미코루틴(semi-coroutine, 반협동 루틴) 이라고 하는데
    //세미코루틴은 TS처럼 단일 스레드로 동작하는 언어를 다중 스레드로 동작하는 것 처럼 보일 수 있게하는 것

    //setinterval로 세미 코루틴 동작방식 알아보기
    //setInterval(콜백, 호출 주기), 해당 함수는 무한반복이지만 clearInterval로 멈출 수 있음
    // const period = 1000;
    // let count = 0;
    // console.log('setInterval start');
    // const id = setInterval(()=> {
    //     if(count >= 5) {
    //         clearInterval(id);
    //         console.log('setInterval finish');
    //     } else {
    //         console.log(++count);
    //     }
    // }, period);

    //function* 키워드
    /**
     * 화살표 함수 사용 불가능, 반복기를 제공하는 반복기 제공자로써 동작함
     * 또한 중괄호 안에 yield 키워드가 존재
     */

    //yield 키워드
    /**
     * 해당 키워드는 연산자(operator)형태로 동작하고 반복기를 자동으로 만들어주는 역할을 함
     * 또한 반복기 제공자 역할도 수행 
     */
    function* rangeGene(from: number, to:number) {
        let value = from;
        while (value < to) {
            yield value++;
        }
    }

    //while패턴으로 동작하는 생성기
    let iterator2 = rangeGene(1, 5+1);
    while(1) {
        const {value, done} = iterator2.next();
        if(done) break;
        console.log(value);
    }

    //for ..of패턴으로 동작하는 생성기
    iterator2 = rangeGene(6, 10+1);
    for (let itor of iterator2) {
        console.log(itor);
    }

    // //생성기를 사용하면 위에서 구현했던 StringIterable 클래스를 간단하게 만들 수 있다.
    // class UseGenerator<T> implements Iterable<T> {
    //     constructor(public values: T[] = [], private currentNum: number=0) {;}
    //     [Symbol.iterator] = function* () {
    //         while(this.currentNum < this.values.length) {
    //             yield this.values[this.currentNum]
    //         }
    //     }
    // }
    // for (let iter of new UseGenerator([1,2,3])) {
    //     console.log(iter);
    // }

    //yield* 키워드
    /**
     * yield는 값을 대상으로 동작하지만 yield*는 다른 생성기나 배열을 대상으로 동작함
     */

    function* gen12() {
        yield 1
        yield 2
    }

    function* gen12345() {
        //gen12()를 호출하고 해당 함수의 첫번째 yield를 실행하고 for문 종료 2번째 반복에서 2번째 yield실행
        yield* gen12();
        //위랑 같음 하나씩 실행함 3 -> 4
        yield* [3,4]
        yield 5;
    }

    for (let iter of gen12345()) {
        console.log(iter);
    }

    //yield반환값
    /**
     * yield는 반환값이 있다. 
     * yield가 반환하는 값은 반복기에서 next()가 호출될 떄 매개변수에 전달되는 전달값임
     */
    function* gen() {
        let count = 5;
        let select = 0;
        while (count--) {
            select = yield `you select ${select}`;
        }
    }
    const random = (max, min) => Math.round(Math.random() * (max-min))+min;

    const iter = gen();
    while (true) {
        const {value, done} = iter.next(random(10, 1));
        if(done) break;
        console.log(value);
    }





