import './polyfills.server.mjs';
import{a as h}from"./chunk-7BEEK474.mjs";import"./chunk-ZY3Z4VSQ.mjs";import{G as S}from"./chunk-RXAJKQTO.mjs";import{Gb as l,Hb as m,Ma as p,Ob as x,Qa as c,Y as d,aa as g,fb as u,hb as f,lb as v,pb as o,qb as r,rb as y,zb as C}from"./chunk-XCB6WECV.mjs";import"./chunk-VVCT4QZE.mjs";function b(i,e){if(i&1&&(o(0,"section")(1,"h1",0),l(2,"Details Product"),r(),o(3,"div",1)(4,"div",2)(5,"div"),y(6,"img",3),r()(),o(7,"div",4)(8,"div")(9,"h2",5),l(10),r(),o(11,"p",6),l(12),r()()()()()),i&2){let s=C();c(6),f("src",s.detailsCategory.image,p)("alt",s.detailsCategory.name),c(4),m(s.detailsCategory.name),c(2),m(s.detailsCategory.slug)}}var I=(()=>{let e=class e{constructor(){this._CategoriesService=d(h),this._ActivatedRoute=d(S),this.detailsCategory=null}ngOnInit(){this._ActivatedRoute.paramMap.subscribe({next:t=>{console.log(t);let n=t.get("id");this.getSepecificProSub=this._CategoriesService.getSpecificCategory(n).subscribe({next:a=>{console.log(a.data),this.detailsCategory=a.data},error(a){console.error(a)}})}})}ngOnDestroy(){this.getSepecificProSub?.unsubscribe()}generateGradient(t){return`linear-gradient(90deg,  #ffc908 ${t}%, transparent ${t}%)`}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=g({type:e,selectors:[["app-details-category"]],standalone:!0,features:[x],decls:1,vars:1,consts:[[1,"text-center","text-main","my-2"],[1,"row","align-items-center","mb-2"],[1,"col-md-3"],[1,"w-100",3,"src","alt"],[1,"col-md-9"],[1,"text-main","my-2"],[1,"text-muted"]],template:function(n,a){n&1&&u(0,b,13,4,"section"),n&2&&v(0,a.detailsCategory?0:-1)}});let i=e;return i})();export{I as DetailsCategoryComponent};
