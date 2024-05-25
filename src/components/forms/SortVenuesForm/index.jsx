export default function SortVenuesForm({ setSortTerm, setSortOrder }) {
  const handleSortChange = (event) => {
    const value = event.target.value;

    switch (value) {
      case "rating":
        setSortTerm("rating");
        setSortOrder("desc");
        break;
      case "price-low":
        setSortTerm("price");
        setSortOrder("asc");
        break;
      case "price-high":
        setSortTerm("price");
        setSortOrder("desc");
        break;
      case "a-z":
        setSortTerm("name");
        setSortOrder("asc");
        break;
      case "z-a":
        setSortTerm("name");
        setSortOrder("desc");
        break;
      default:
        break;
    }
  };

  return (
    <form id="sortVenuesForm">
      <div className="relative">
        <label htmlFor="sortVenuesSelect" className="absolute ps-3 pt-1 text-sm font-bold overflow-hidden">
          Sort venues by
        </label>
        <select
          id="sortVenuesSelect"
          className="btn font-normal border-secondary focus:ring-0 focus:border-secondary hover:border-primary cursor-pointer appearance-none w-full pt-6 ps-4"
          onChange={handleSortChange}>
          <option value="rating" default>
            Highest rating
          </option>
          <option value="price-low">Lowest price</option>
          <option value="price-high">Highest price</option>
          <option value="a-z">Name A - z</option>
          <option value="z-a">Name Z - a</option>
        </select>
      </div>
    </form>
  );
}
