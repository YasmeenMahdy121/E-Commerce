import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  { path: 'auth',
    loadChildren: ()=> import('./features/auth/auth.module').then(m=>m.AuthModule)
  },
  { path:'store',
    loadChildren: ()=> import('./features/store/store.module').then(m=>m.StoreModule)
  },
  { path: '**',
    component: PageNotFoundComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
