import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {SignupComponent} from './signup/signup.component';

import {ShoppingEditComponent} from './add-property/basic-info.component';
import {LayoutPrizingComponent} from './layout-prizing/layout-prizing.component';
import {FacilitiesAndServicesComponent} from './facilities-and-services/facilities-and-services.component';
import {AddPhotosComponent} from './add-photos/add-photos.component';
import {PoliciesComponent} from './policies/policies.component';
import {PaymentsComponent} from './payments/payments.component';
import {SideNavComponent} from './side-nav/side-nav.component';
import {AuthGuard} from './auth/auth.guard';

import {ResultPageComponent} from './result-page/result-page.component';
import {AdministrationPanelComponent} from './administration-panel/administration-panel.component';
import {AvialabilityComponent} from './avialability/avialability.component';
import {HomePageComponent} from './home-page/home-page.component';
import {SigninComponent} from './signin/signin.component';
import {MapComponent} from './map/map.component';

const appRoutes: Routes = [
  {path: 'result-page', component: ResultPageComponent, canActivate: [AuthGuard]},
 // {path: 'add-property/:id', component: ShoppingEditComponent, canActivate: [AuthGuard],  outlet: 'sidebar'},
  {path: 'add-property', component: ShoppingEditComponent, canActivate: [AuthGuard],  outlet: 'sidebar'},
  {path: 'location', component: MapComponent, canActivate: [AuthGuard],  outlet: 'sidebar'},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'layout-prizing', component: LayoutPrizingComponent, canActivate: [AuthGuard],  outlet: 'sidebar' },
  {path: 'facilities-and-services', component: FacilitiesAndServicesComponent, canActivate: [AuthGuard],  outlet: 'sidebar' },
  {path: 'add-photos', component: AddPhotosComponent, canActivate: [AuthGuard],  outlet: 'sidebar' },
  {path: 'policies', component: PoliciesComponent, canActivate: [AuthGuard],  outlet: 'sidebar' },
  {path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard],  outlet: 'sidebar' },
  {path: 'sidenav', component: SideNavComponent, canActivate: [AuthGuard] },
  {path: 'administration-panel', component: AdministrationPanelComponent},
  {path: 'aviability', component: AvialabilityComponent, canActivate: [AuthGuard]},
  {path: 'home-page', component: HomePageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

