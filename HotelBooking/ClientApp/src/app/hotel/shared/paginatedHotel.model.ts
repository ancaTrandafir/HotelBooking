import { Hotel } from "./hotel.model";


export interface PaginatedHotel {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  items: Hotel[];

}



