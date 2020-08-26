//비동기 구문 Promise와 async await
    //동기와 비동기
    /**
     * nodejs에는 파일 시스템과 관련된 기능을 모아둔 fs 패키지를 제공하는데
     * 같은 기능을 동기(synchronous)와 비동기(asynchronous)로 나누어 제공한다.
     * 대표적인 예로 readFileSync와 readFile이다.
     */
    import {readFileSync, readFile} from 'fs';
import { resolve } from 'path';
    //동기 방식으로 파일 읽어오기
    console.log('동기 방식으로 파일 읽어오기');
    const buffer: Buffer = readFileSync('./package.json');
    console.log(buffer.toString());
    //readFileSync는 해당 파일을 읽어서 Buffer라는 타입으로 전달해주는데
    //Buffer는 nodejs에서 구현되어 있는 바이너리 데이터를 저장하는 클래스이다.
    //해당 데이터를 문자열로 만들기 위해서는 toString메서드를 사용한다.
    //또한 동기방식이라 11행에서 잠시 멈춘다.


    //비동기 방식으로 파일 읽어오기
    readFile('./package.json', (err:Error, buffer:Buffer) => {
        console.log('비동기 방식으로 파일 읽어오기');
        console.log(buffer.toString());
    })
    //동기 버전과 달리 예외가 발생하면 해당 예외를 콜백함수의 첫번째 매개변수에 전달한다.
    //비동기 방식이라 19번째 줄을 실행할 때 멈추지 않고 바로 23번 줄을 실행할 것이다.

    //단일스레드
    /*
     *  JS는 단일 스레드(single-thread)로 동작하므로 될 수 있다면 동기API는 사용하지 않는게 좋다.
     *  동기API가 실행되면 OS는 작업 결과를 반환해주어야 하기 때문에 해당 스레드를 일시 정지 한 다음
     *  다른 스레드에서 작업한 후 일시 정지했던 API를 재생시키면서 결과를 반환한다.
     *  이는 서버의 반응속도를 떨어뜨리고, 일시적으로 접속이 불가능한 현상이 발생한다. 
     */

    //Promise와 async/await으로 파일 읽어오기
    const readFilePromise = (filename: string): Promise<string> => 
        new Promise<string>((resolve, reject)=> {
            readFile(filename, (err:Error, buffer:Buffer) => {
                if(err) reject(err);
                else resolve(buffer.toString());
            });
        });

    (async() => {
        const content = await readFilePromise('./package.json');
        console.log('Promise와 async/await으로 파일 읽어오기');
        console.log(content);
    })()

    //Promise
    //const promise = new Promise(콜백);
    //Promise는 두 개의 매개변수를 가진다. (resolve, reject) => {}
    /**
     * TS에서의 Promise는 제네릭의 형태로 사용한다.
     * num:Promise = new Promise<number>(콜백);
     */
    //TS의 Promise형태
    // new Promise((
    //     resolve: (sucessValue: T) => void,
    //     reject: (any) => void
    // ) => {
    //     //실행문
    // })

    //resolve와 reject
    const readFilePromise1 = (filename: string): Promise<string> =>
        new Promise<string>((
            resolve: (value: string) => void,
            reject: (err: Error) => void) => {
                readFile(filename, (err:Error, buffer:Buffer) => {
                    //에러가 발생하면 호출
                    if(err) reject(err);
                    //아무 문제 없이 실행되었을 때 호출
                    else resolve(buffer.toString());
                })
            })

    //위의 함수 사용하기
    readFilePromise1('./package.json')
        .then((content: string) => {
            console.log(content);  //package.json을 읽고 
            return readFilePromise1('./tsconfig.json') //이것을 다음 then에 전달
        })
        .then((content: string) => {
            console.log(content); //마찬가지로 읽고
            return readFilePromise1('.'); //다음으로 전달 
            //하지만 읽을 것이 없어 오류메세지가 전달된다.
        })
        .catch((err:Error) => console.log('error', err.message))
        .finally(()=> console.log('종료'));

    //Promise.resolve
    /**
     * 위에서 Promise객체의 resolve 함수를 호출했는데 
     * Promise.resolve는 이를 클래스 메서드로 구현한 것이다.
     * Promise.resolve(value)형태로 호출하면 value는 .then에서만 얻을 수 있다.
     */
    Promise.resolve(1)
        .then(value => console.log(value));
    Promise.resolve('qwerqwe')
        .then(value => console.log(value));
    Promise.resolve([1,2,3,4,5])
        .then(value => console.log(value));
    Promise.resolve({name: 'node', age: '23'})
        .then(value => console.log(value));

    //Promise.reject
    /**
     * Promise.reject(error타입 객체)
     * 해당 메서드의 객체는 catch의 콜백함수에서 얻을 수 있다.
     */
    Promise.reject(new Error('에러'))
        .catch((err:Error)=> console.log('error', err.message))

    //then 체인
    Promise.resolve(1)
        .then((value:number) => { 
            console.log(value)
            return Promise.resolve(true)
        })
        .then((value: boolean) => {
            console.log(value)
            return [1,2,3]
        })
    //이런 형태로 사용

    //Promise.all
    /**
     * Array클래스는 every라는 인스턴스 메서드를 제공함 해당 메서드는
     * 배열의 모든 아이템이 어떤 조건을 만족하면 true를 반환함
     * 이와 비슷한 기능을 제공하는 것이 Promise.all 이다.
     * all(Promise 객체 배열: Promise[]): Promise<resolve된 값들의 배열 아니면 any>
     */
    const getAllResolvedResult = <T>(promises: Promise<T>[]) => Promise.all(promises);

    getAllResolvedResult<any>([Promise.resolve(true), Promise.resolve('stri')])
        .then(result => console.log(result));
    
    getAllResolvedResult<any>([Promise.reject(new Error('error')), Promise.resolve(1)])
        //이 구문을 실행하지 않고 
        .then(result => console.log(result))
        //에러가 발생하여 바로 reject함
        .catch(error => console.log('error', error.message));
    /**
     * Promise.all은 resolve로 해소된 값들의 배열을 then 메서드로 호출하여 받는다.
     * 하지만 err가 발생했을 경우 바로 catch문에서 reject된다.
     */

     //Promise.race
    /**
     * Array클래스는 조건 중 하나라도 만족하면 true를 반환하는 some 메서드를 제공한다.
     * Promise.race는 배열에 담긴 프로미스 객체가 하나라도 resolve가 된다면 
     * resolve가 된 값을 담은 Promise.resolve 객체를 반환함 
     * 하지만 reject가 먼저 발생한다면 Promise.reject 객체를 반환함
     */
    //race(프로미스 객체 배열: Promise[]):Promise<가장 먼저 resolve된 객체 타입 or err>
    Promise.race([Promise.resolve(true), Promise.resolve('hello')])
        .then(value => console.log(value)); //true 가 먼저 출력되고 hello가 출력된다. 순서대로

    Promise.race([Promise.resolve(true), Promise.reject(new Error('error'))])
        .then(value => console.log(value))
        .catch(err => console.log('error', err.message)); //위에서 resolve가 먼저 되었으니 호출되지 않는다.
        //그 반대도 마찬가지

    //async/await
    const test = async() => {
        //await
        //await은 async라는 함수 수정자(function modifier)가 있는 함수 몸통에서만 사용할 수 있음
        //피연산자(operand)의 값을 반환해줌 피연산자가 Promise객체라면 then을 호출해 얻은 값을 반환함
        const value = await Promise.resolve(1);
        console.log(value);
    }
    test();

    //async의 성질
    /**
     * async가 붙은 함수는 일반 함수처럼 사용할 수 있다.
     * Promise 객체로 사용할 수 있다.
     */

    //async 함수의 return
    const asyncReturn = async() => {
        return [1,2,3]
    }
    asyncReturn()
        .then(value => console.log(value));
    //async가 반환하는 값은 Promise객체로 반환되고 then을 통해 resolve될 수 있다.

    //async의 예외처리
    //async함수에서 예외가 발생한 경우 프로그램이 비정상적으로 종료된다.
    //프로그램이 종료되는 것을 방지하기 위해 async함수가 반환하는 객체의 catch메서드를 호출해야 한다.
    const asyncException = async() => {
        throw new Error('error');
    }
    asyncException()
        .catch(err => console.log('error', err.message));
    //이런 경우는 await도 똑같이 적용하면 된다.

    //async와 Promise.all
    const readFileAll = async(filenames: string[]) => {
        return await Promise.all(
            filenames.map(filename => readFilePromise1(filename))
            //filenames에 담긴 아이템들을 map으로 하나씩 프로미스 객체로 반환하고 반환된 것들을
            //Promise.all로 하나의 배열로 만듦
        )
    }
    //해당 함수는 Promise객체를 반환하므로 then과 catch를 통해 값을 알아냄과 동시에
    //프로그램이 비정상적으로 종료되는 것을 방지함
    readFileAll(['./package.json', './tsconfig.json'])
        .then(([pkgJson, tcfJson]) => {
            console.log('패키지 json', pkgJson)
            console.log('tsconfig', tcfJson)
        })
        .catch(err => console.log('error', err.message));
        