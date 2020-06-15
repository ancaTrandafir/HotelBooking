using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelBooking.ViewModels
{
	public class PaginatedList<T>
	{
		public int CurrentPage { get; private set; }
		public int TotalPages { get; private set; }
		public int PageSize { get; private set; }
		public int TotalCount { get; private set; }

		public bool HasPrevious => CurrentPage > 1;
		public bool HasNext => CurrentPage < TotalPages;



		public PaginatedList(List<T> items, int count, int pageNumber, int pageSize)
		{
			TotalCount = count;
			PageSize = pageSize;
			CurrentPage = pageNumber;
			TotalPages = (int)Math.Ceiling(count / (double)pageSize);

			items.AddRange(items);
		}

		public static PaginatedList<T> ToPagedList(IQueryable<T> source, int pageNumber, int pageSize)
		{

			// Say we need to get the results for the third page of our website, counting 20 as the number of results we want. 
			// That would mean we want to skip the first ((3 – 1) * 20) = 40 results, 
			// and then take the next 20 and return them to the caller.

			var count = source.Count();
			var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

			return new PaginatedList<T>(items, count, pageNumber, pageSize);
		}
	}
}
	



	// HasPrevious is true if CurrentPage is larger than 1, and HasNext is calculated if CurrentPage is smaller than the number of total pages.
	// TotalPages is calculated too, by dividing the number of items by the page size and then rounding it to the larger number since a page needs to exist even if there is one item on it.