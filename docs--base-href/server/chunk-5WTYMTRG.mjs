import './polyfills.server.mjs';
import{a as e}from"./chunk-ZY3Z4VSQ.mjs";import{t as p}from"./chunk-RXAJKQTO.mjs";import{S as o,Y as c,g as n}from"./chunk-XCB6WECV.mjs";var h=(()=>{let t=class t{constructor(){this._HttpClient=c(p),this.cartNumber=new n(0)}addProductToCart(r){return this._HttpClient.post(`${e.baseUrl}/api/v1/cart`,{productId:r})}getProductsCart(){return this._HttpClient.get(`${e.baseUrl}/api/v1/cart`)}deleteSpecificCartItem(r){return this._HttpClient.delete(`${e.baseUrl}/api/v1/cart/${r}`)}updateProductQuantity(r,a){return this._HttpClient.put(`${e.baseUrl}/api/v1/cart/${r}`,{count:a})}clearCart(){return this._HttpClient.delete(`${e.baseUrl}/api/v1/cart`)}};t.\u0275fac=function(a){return new(a||t)},t.\u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();export{h as a};
