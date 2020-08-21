
export const start = (callback: () => void) : void => {
    console.log('시작합니다.');
    callback();
    console.log('종료되었습니다.');
}