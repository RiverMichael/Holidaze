import { IoWifi, IoCar, IoPaw, IoCafe } from "react-icons/io5";

export default function VenueFeaturesList({ features }) {
  const featuresIcons = {
    wifi: <IoWifi size={20} className="text-primary" />,
    parking: <IoCar size={20} className="text-primary" />,
    pets: <IoPaw size={20} className="text-primary" />,
    breakfast: <IoCafe size={20} className="text-primary" />,
  };

  return features.map(
    ([feature, value], index) =>
      value && (
        <span key={index} className="text-sm px-3 py-1 rounded-full bg-secondary capitalize flex items-center gap-1">
          <span>{featuresIcons[feature]}</span>
          {feature}
        </span>
      )
  );
}
