import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';  


import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("384423225851060") //FB appID
  },
]);
export function provideConfig() {
  return config;
}


import { AppComponent } from './app.component';

import { UserService } from './user/shared/user.service';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UsersListComponent } from './user/users-list/users-list.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HotelComponent } from './hotel/hotel.component';
import { AddHotelComponent } from './hotel/add-hotel/add-hotel.component';
import { HotelListComponent } from './hotel/hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './hotel/hotel-details/hotel-details.component';
import { UpdateHotelComponent } from './hotel/update-hotel/update-hotel.component';
import { ReservationDetailsComponent } from './reservation/reservation-details/reservation-details.component';
import { ReservationListComponent } from './reservation/reservation-list/reservation-list.component';
import { UpdateReservationComponent } from './reservation/update-reservation/update-reservation.component';
import { AddReservationComponent } from './reservation/add-reservation/add-reservation.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationService } from './reservation/shared/reservation.service';



@NgModule({

  declarations: [
    AppComponent,
    NavMenuComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    UserComponent,
    UsersListComponent,
    HotelComponent,
    AddHotelComponent,
    UpdateHotelComponent,
    HotelListComponent,
    HotelDetailsComponent,
    ReservationComponent,
    AddReservationComponent,
    UpdateReservationComponent,
    ReservationListComponent,
    ReservationDetailsComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    SocialLoginModule.initialize(config),
    NgxPaginationModule
  ],

  providers: [ReservationService, UserService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
     {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
