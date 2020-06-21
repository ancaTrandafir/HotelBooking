import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { HotelComponent } from './hotel/hotel.component';
import { ReservationComponent } from './reservation/reservation.component';
import { HotelDetailsComponent } from './hotel/hotel-details/hotel-details.component';
import { AddHotelComponent } from './hotel/add-hotel/add-hotel.component';
import { AddReservationComponent } from './reservation/add-reservation/add-reservation.component';
import { UpdateHotelComponent } from './hotel/update-hotel/update-hotel.component';
import { UpdateReservationComponent } from './reservation/update-reservation/update-reservation.component';




const routes: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },       // parent component with children
                                                                              // treb sa fii logat sa ajungi la home
      {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
      },
      {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
      },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'fetch-hotels', component: HotelComponent },
  { path: 'fetch-reservations', component: ReservationComponent },
  { path: 'hotel-details/:id', component: HotelDetailsComponent },
  { path: 'reservations-details/:id', component: HotelDetailsComponent },
  { path: 'add-hotel', component: AddHotelComponent },
  { path: 'add-reservation', component: AddReservationComponent },
  { path: 'update-hotel/:id', component: UpdateHotelComponent },
  { path: 'update-reservation/:id', component: UpdateReservationComponent },
  { path: 'delete-hotel/:id', component: HotelComponent },
  { path: 'delete-reservation/:id', component: ReservationComponent },
  { path: '**', component: HomeComponent } // in caz de pageNotFound
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
