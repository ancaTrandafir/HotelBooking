using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.Models
{
    public class PagingParameters
    {
		const int maxPageSize = 50;
		public int PageNumber { get; set; }  = 0;

		private int _pageSize = 5;
		public int PageSize
		{
			get
			{
				return _pageSize;
			}
			set
			{
				_pageSize = (value > maxPageSize) ? maxPageSize : value;
			}
		}
	}
}



// We are using constant maxPageSize to restrict our API to a maximum of 50 owners.
// We have two public properties – PageNumber and PageSize.
// If not set by the caller, PageNumber will be set to 0, and PageSize to 10.

// In service, la getMovies, adaugam parametru PagingParameters