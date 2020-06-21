import { User } from '../../user/shared/user.model';
import { Review } from "./review.model";

export class HotelReview {
  Id: number;
  HotelName: string;
  City: string;
  Capacity: number;
  Rating: number;
  User: User;
  Reviews: Review;
}



