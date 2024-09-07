import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { platformServer } from '@angular/platform-server';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslayteService {
  private readonly _TranslateService=inject(TranslateService);
  private readonly _platId=inject(PLATFORM_ID);
  private readonly _Renderer2=inject(RendererFactory2).createRenderer(null,null);

  constructor() { 
    if (isPlatformBrowser(this._platId)) {
        //1-getlang localstorage
        let savedLang=localStorage.getItem('lang');

        //2-set default lang
        this._TranslateService.setDefaultLang('en');

        //3-use lang
        if(savedLang){
          this._TranslateService.use(savedLang!)
        }else{
          this._TranslateService.use('en')
          }

        //Direction---->eng-->ltr ,ar-->rtl
        this.changeDirection()

    }


    
  }
  changeDirection():void{
    if (isPlatformBrowser(this._platId)) {
        let savedLang=localStorage.getItem('lang');

        // if(savedLang=='en'){

        //   document.documentElement.dir='ltr';
        //   document.documentElement.setAttribute("lang",'en');
  
        // }else if (savedLang=='ar') {
        //   document.documentElement.dir='rtl';    
        //   document.documentElement.setAttribute("lang",'ar');

        // }
        
        if(savedLang=='en'){
          this._Renderer2.setAttribute(document.documentElement,'dir','ltr')
          this._Renderer2.setAttribute(document.documentElement,'lang','en')
   

        }else if (savedLang=='ar') {
          this._Renderer2.setAttribute(document.documentElement,'dir','rtl')
          this._Renderer2.setAttribute(document.documentElement,'lang','ar')

        
        }
    
    }
   
  }

  changeLang(lang:string):void{
    if (isPlatformBrowser(this._platId)) {
      localStorage.setItem('lang',lang);
      this._TranslateService.use(lang)
      this.changeDirection()
    }
}
}
