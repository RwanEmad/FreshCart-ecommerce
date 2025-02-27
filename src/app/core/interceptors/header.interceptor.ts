import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  //handle req----logic------send headers

  if(localStorage.getItem("userToken") !=null){
  
    if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')) {
          req=req.clone({
            setHeaders:{
              token:localStorage.getItem('userToken')!,
              // lang:'ar'
            },
          }) 
    }
  }

  return next(req);
};
