import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';

import {ShoppingEditComponent} from './add-property/basic-info.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {AppRoutingModule} from './app-routing.module';

import {BasicInfoServices} from './services/basic-info.services';
import {HttpClientModule, HttpClient} from '@angular/common/http';


import {MatCardModule, MatInputModule, MatTabsModule} from '@angular/material';
import {LayoutPrizingComponent} from './layout-prizing/layout-prizing.component';
import {TestModule} from './test/test.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FacilitiesAndServicesComponent} from './facilities-and-services/facilities-and-services.component';
import {AddPhotosComponent} from './add-photos/add-photos.component';
import {PoliciesComponent} from './policies/policies.component';
import {PaymentsComponent} from './payments/payments.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SideNavComponent} from './side-nav/side-nav.component';
import {FooterComponent} from './footer/footer.component';
import {ActiveDirectiveDirective} from './active-directive.directive';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './home/home.component';

import {WindowRef} from './services/WindowRef';
import {FormDataService} from './data/formData.service';
import {CompareValidatorDirective} from './shared/compare-validator.directive';
import {ImageUploadModule} from 'angular2-image-upload';

import {
  AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider,
  SocialLoginModule
} from 'angular-6-social-login';
import {UploadFileService} from './services/upload-file.service';
import {ResultPageComponent} from './result-page/result-page.component';
import {AdministrationPanelComponent} from './administration-panel/administration-panel.component';
import {AvialabilityComponent} from './avialability/avialability.component';
import {HomePageComponent} from './home-page/home-page.component';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import { SecondeHeaderComponent } from './seconde-header/seconde-header.component';
import { Footer2Component } from './footer2/footer2.component';
import {AgmCoreModule} from '@agm/core';
import { MapComponent } from './map/map.component';



export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('Your-Facebook-app-id')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('473365203269-sdvpp6q4qpe14noj1j0nd2f6m7t1beqa.apps.googleusercontent.com')
      },
      // {
      //   id: LinkedinLoginProvider.PROVIDER_ID,
      //   provider: new LinkedinLoginProvider('1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com')
      // },
    ],
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingEditComponent,
    DropdownDirective,
    SigninComponent,
    SignupComponent,
    LayoutPrizingComponent,
    FacilitiesAndServicesComponent,
    AddPhotosComponent,
    PoliciesComponent,
    PaymentsComponent,
    SideNavComponent,
    FooterComponent,
    ActiveDirectiveDirective,
    HomeComponent,
    CompareValidatorDirective,
    ResultPageComponent,
    AdministrationPanelComponent,
    AvialabilityComponent,
    HomePageComponent,
    SecondeHeaderComponent,
    Footer2Component,
   MapComponent

    //   DialogDataExampleDialogComponent,
  ],

  imports: [

    SocialLoginModule,
    ImageUploadModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule, HttpClientModule, TestModule, MatTabsModule, BrowserAnimationsModule, FormsModule,
    NgbModule.forRoot(),
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAPkt2YpUePoz9q6NpZZknm4b7IRHtw17A',
      libraries: ['places']
    })


  ],


  providers: [FormDataService, BasicInfoServices, AuthGuard, UploadFileService, WindowRef, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent],
  entryComponents : [MapComponent]

})


export class AppModule {
}


