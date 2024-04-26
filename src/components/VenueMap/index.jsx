import { GOOGLE_MAPS_API_KEY } from "../../constants/api";

export default function VenueMap({ lat, lng, city, country }) {
  const googleMapsApiKey = GOOGLE_MAPS_API_KEY;
  const mapSize = "350x250";
  let center;

  if (lat && lng) {
    center = `${lat},${lng}`;
  } else if (city && country) {
    center = `${city},${country}`;
  }
  console.log("center", center);

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=12&size=${mapSize}&maptype=roadmap&markers=color:red|label:V|${center}&key=${googleMapsApiKey}`;

  return <img src={mapUrl} alt={`Map of ${city}, ${country}`} className="w-full rounded" />;
}
