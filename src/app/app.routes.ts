import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';


export const routes: Routes = [

 {path:'',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((c)=>c.AuthLayoutComponent),canActivate:[logedGuard],children:[
   
    //thats meen if path is empty and then (login, register ) will load  (login, register)

    {path:'',redirectTo:'login',pathMatch:'full'},   
    {path:'login',loadComponent:()=>import('./components/login/login.component').then((c)=>c.LoginComponent)},
    {path:'register',loadComponent:()=>import('./components/register/register.component').then((c)=>c.RegisterComponent)},
    {path:'forgot',loadComponent:()=>import('./components/forgotpassword/forgotpassword.component').then((c)=>c.ForgotpasswordComponent)},
   
 ]},
 
 {path:'',loadComponent:()=>import('./layouts/blank-layout/blank-layout.component').then((c)=>c.BlankLayoutComponent),canActivate:[authGuard],children:[
   
    //thats meen if path is empty and then (home ,products ,cart ,.. ) will load  (home ,products ,cart ,.. )
    {path:'',redirectTo:'home',pathMatch:'full'},   
    {path:'home',loadComponent:()=>import('./components/home/home.component').then((c)=>c.HomeComponent)},
    {path:'products',loadComponent:()=>import('./components/products/products.component').then((c)=>c.ProductsComponent)},
    {path:'brands',loadComponent:()=>import('./components/brands/brands.component').then((C)=>C.BrandsComponent)},
    {path:'categories',loadComponent:()=>import('./components/categories/categories.component').then((c)=>c.CategoriesComponent)},
    {path:'cart',loadComponent:()=>import('./components/cart/cart.component').then((c)=>c.CartComponent)},
    
    {path:'favourites',loadComponent:()=>import('./components/favorites/favorites.component').then((c)=>c.FavoritesComponent)},
    {path:'details/:id',loadComponent:()=>import('./components/details/details.component').then((c)=>c.DetailsComponent)},
    {path:'detailsCategory/:id',loadComponent:()=>import('./components/details-category/details-category.component').then((c)=>c.DetailsCategoryComponent)},
    {path:'detailsBrand/:id',loadComponent:()=>import('./components/details-brand/details-brand.component').then((c)=>c.DetailsBrandComponent)},
    {path:'allorders',loadComponent:()=>import('./components/allorders/allorders.component').then((c)=>c.AllordersComponent)},
    {path:'orders/:id',loadComponent:()=>import('./components/orders/orders.component').then((c)=>c.OrdersComponent)},

    {path:'**',loadComponent:()=>import('./components/notfound/notfound.component').then((c)=>c.NotfoundComponent)}   

]},
 
 {path:'**',loadComponent:()=>import('./components/notfound/notfound.component').then((c)=>c.NotfoundComponent)}   

];
