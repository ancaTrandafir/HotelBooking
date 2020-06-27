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
import { ReservationDetailsComponent } from './reservation/reservation-details/reservation-details.component';
import { AdminComponent } from './admin/admin.component';
import { Role } from './user/shared/role';




const routes: Routes = [

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }, //, data: { roles: [Role.Admin] } },

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
  { path: 'fetch-reservations/:id', component: ReservationComponent },
  { path: 'hotel-details/:id', component: HotelDetailsComponent },
  { path: 'reservation-details/:id', component: ReservationDetailsComponent },
  { path: 'add-hotel', component: AddHotelComponent },
  { path: 'add-reservation/:id', component: AddReservationComponent },
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
