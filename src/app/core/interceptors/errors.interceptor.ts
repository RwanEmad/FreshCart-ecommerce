import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const _ToastrService=inject(ToastrService)

  return next(req).pipe(catchError((err)=>{
    // if (req.url.includes('cart')  ) {
    //   _ToastrService.error(err.message)
    // }
    _ToastrService.error(err.message)
    return throwError(()=>err);//return err:Observable
  }));//res
};
