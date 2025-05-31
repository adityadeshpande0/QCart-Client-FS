// pages/Profile.tsx or wherever

import MapWithLocation from "./MapWithLocation";


export default function Profile() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Current Location</h2>
      <MapWithLocation />
    </div>
  );
}
