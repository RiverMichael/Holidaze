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
  git;
  return (
    <form id="sortForm">
      <div className="flex w-max">
        <select id="sortVenuesSelect" className="btn border-secondary focus:ring-0 focus:border-secondary hover:border-primary" onChange={handleSortChange}>
          <option value="" disabled>
            Sort venues
          </option>
          <option value="rating">Highest rating</option>
          <option value="price-low">Lowest price</option>
          <option value="price-high">Highest price</option>
          <option value="a-z">Name A - z</option>
          <option value="z-a">Name Z - a</option>
        </select>
      </div>
    </form>
  );
}
