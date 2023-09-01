import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SuccessComponent } from './pages/success/success.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '',
    redirectTo: 'product-list',
    pathMatch: 'full'
  },
  { path: 'product-list',
    component: ProductListComponent
  },
  { path: 'shopping-cart',
    component: ShoppingCartComponent,
    canActivate:[authGuard]
  },
  { path: 'checkout',
    component: CheckoutComponent,
    canActivate:[authGuard]
  },
  { path: 'success',
    component: SuccessComponent,
    canActivate:[authGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
