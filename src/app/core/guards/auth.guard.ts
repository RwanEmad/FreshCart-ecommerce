import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { read } from 'fs';
//******guard  is fun not class***************************
export const authGuard: CanActivateFn = (route, state) => {
/* 
  CODE RUN 
  1-ssr(server)--> dont see global object browser(it is reneder in browser )
  2-browser

  **
  global object browser --window - document - localStorage - location - navigation 
   --> if use global object browser in Guard - lifeCycle component   =>ERROR (ssr)
     Guard - lifeCycle component Run in server while global object browser render in browser
     when use them in Guard -lifeCycle component it will render in browser and server donot see them ==>ERROR

     BUT--> methods run with specific action so we can use global object browser in methods to be ok we render in browser 


  */
 /*
 to solve the error we should check we now on server or browser??!

 -->by check type of Global Object !== Undefined
 
 */


// if (typeof localStorage!== 'undefined') {

//   if(localStorage.getItem('userToken') !=null){
//     return true;
//   }else{
//     //navigate to login
//     _Router.navigate(['/login']);
//     return false;
//   }

// }else return false;//Guard waite for return so must return to it







 const _Router= inject(Router);


 //plateformId id (service) -- isPlateFormBrowser(id):boolean - isPlateFormServer(id):boolean


 const _PLATFORM_ID= inject(PLATFORM_ID);


 if (isPlatformBrowser(_PLATFORM_ID)) {
  if(localStorage.getItem('userToken') !=null){
    return true;
  }else{
    //navigate to login
    _Router.navigate(['/login']);
    return false;
  }
}else return false;//Guard waite for return so must return to it



//can use in specific spaces like (inject methide) -> in constructor() || global in class 
//not in another method xxxx

// run only in browser
// afterRender(()=>{

// });//run with every change detection run more than time

// afterNextRender(()=>{

// });//run only one time


};
