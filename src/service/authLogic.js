import {signInWithPopup, getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, EmailAuthProvider, sendEmailVerification } from "firebase/auth";
//import firebase from 'firebase';

class AuthLogic {
  //생성자 정의 - 자바와는 다르게 선언없이 초기화 가능
  //firebaseAuth변수명, googleProvider변수명 - 전역변수
  constructor() {
    this.firebaseAuth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
    this.auth=getAuth();
  }
  //로그인 시도시 구글인증인지 아니면 깃허브 인증인지 문자열로 넘겨받음
  //구글인증인 경우 - Google
  //깃허브 인증인 경우 - Github
  
  getUserAuth=()=>{
    return this.auth
  }
  getGoogleAuthProvider=()=>{
    return this.googleProvider;
  }
  
  login(providerName) {
    console.log("providerName : " + providerName);
    //파라미터로 넘겨 받은 문자열로 비교하여 각 제공자의 객체 주입받음
    const authProvider = this.getProvider(providerName);
    //제공자의 정보이면 팝업을 띄워서 로그인을 진행하도록 유도함
    return signInWithPopup(this.firebaseAuth, authProvider);
  }
  //로그아웃 버튼 클릭시 호출하기
  logout() {
    this.firebaseAuth.signOut();
  }
  //사용자가 변경되는지 지속적 으로 체크하여 변경될 때마다 호출됨
  onAuthChange(onUserChanged) {
    // 사용자가 바뀌었을 때 콜백함수를 받아서
    this.firebaseAuth.onAuthStateChanged((user) => {
      //사용자가 바뀔 때마다
      onUserChanged(user);
    });
  }

  getProvider(providerName) {
    switch (providerName) {
      case "Google":
        return this.googleProvider;
      case "Github":
        return this.githubProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}
/* 외부 js에서 사용하려면 반드시 추가할 것 */
/* 왜 리덕스를 공부해야 하나? - 대답 */
export default AuthLogic;



export const onAuthChange=(auth)=>{
  return new Promise((resolve)=>{
auth.onAuthStateChanged((user) => {
  //사용자가 바뀔 때마다 콜백함수를 받아서
resolve(user) 
})
})   //end of Promise
} //end of onAuthChange


//로그아웃 버튼  클릭 시 호출하기 
export const logout=(auth) => {
  return new Promise((resolve, reject) =>{
      auth.signOut().catch(e=>reject(e+'로그아웃 오류입니다.'));
      //로그인 성공시 세션 스토리지에 담아 둔 정보를 모두 지운다. 
      sessionStorage.clear();
    //서비스를 더 이상 사용하지 않는 경우이므로 돌려줄 값은 없다. 
      resolve();  //그래서 파라미터는 비웠다. 
  });
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
 
  
 export const  loginGoogle=(auth, googleProvider) => {
    return new Promise((resolve, reject)=>{
      signInWithPopup(auth, googleProvider).then(
      (result)=>{
        const user = result.user;    //구글에 등록되어 있는 profile 정보가 담겨 있음 
        console.log(user)
        resolve(user)
      }).catch(e=>reject(e))
      })
    }
  

    export const signupEmail = (auth, user) => {
      return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
            sendEmail(userCredential.user).then(() => {
              resolve(userCredential.user.uid);
            });
          })
          .catch((e) => reject(e));
      });
    };
    export const linkEmail = (auth, user) => {
      console.log(auth);
      console.log(auth.currentUser);
      console.log(user);
      return new Promise((resolve, reject) => {
        console.log(user.email + "," + user.password);
        const credential = EmailAuthProvider.credential(user.email, user.password);
        console.log(credential);
        console.log(auth.currentUser.uid);
        resolve(auth.currentUser.uid)
        /* 인증정보가 다른 사용자 계정에 이미 연결되어 있다면 아래 코드 에러 발생함
        linkWithCredential(auth.currentUser, credential)
          .then((usercred) => {
            console.log(usercred);
            const user = usercred.user;
            console.log("Account linking success", user.uid);
            resolve(user.uid);
          })
          .catch((e) => reject(e));
        */
      });
    };

    export const sendEmail = (user) => {
      return new Promise((resolve, reject) => {
        sendEmailVerification(user)
          .then(() => {
            resolve("해당 이메일에서 인증메세지를 확인 후 다시 로그인 해주세요.");
          })
          .catch((e) => reject(e + ": 인증메일 오류입니다."));
      });
    };