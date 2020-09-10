//모나드
  //판타지랜드 규격에서 모나드는 체인과 애플리커티브를 구현한 인터페이스이다.

  import {IChain} from "./IChain";
  import {IApplicative} from "./IApplicative";
  
  export interface IMonad<T> extends IChain<T>, IApplicative<T> {}
