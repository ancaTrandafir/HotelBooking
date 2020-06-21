import { User } from '../../user/shared/user.model';
import { Hotel } from '../../hotel/shared/hotel.model';

export class Reservation {
  Id: number;
  Hotel: Hotel;
  Guest: string;
  NoOfPersons: number;
  ArrivalDate: string;
  DepartureDate: string;
  RoomType: RoomType
  RoomFare: number;
  BreakfastIncluded: boolean;
  UserId: number;
  User: User
}


export enum RoomType {
  Economy,
  Balcony,
  Seaview,
  Deluxe
}
