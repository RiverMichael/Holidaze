import { GOOGLE_MAPS_API_KEY } from "../../constants/apiKey";

export default function VenueMap({ name, location }) {
  const { lat, lng, city, country } = location;
  const googleMapsApiKey = GOOGLE_MAPS_API_KEY;
  const mapSize = "300x200";
  let center;

  if (lat && lng) {
    center = `${lat},${lng}`;
  } else if (city && country) {
    center = `${city},${country}`;
  }

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=12&size=${mapSize}&maptype=roadmap&markers=color:red|label:V|${center}&key=${googleMapsApiKey}`;

  return <img src={mapUrl} alt={`Map of ${name}`} className="w-full rounded" />;
}
