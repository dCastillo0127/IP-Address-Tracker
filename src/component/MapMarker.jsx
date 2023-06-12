import React, { useEffect } from "react";
import {  useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locationIcon from "../images/icon-location.svg";

const icon = L.icon({
	iconSize: [25, 33],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: locationIcon,
	shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});
function MapMarker({position}) {
	const map = useMap();

	useEffect(() => {
		map.flyTo(position, 13, {
			animate: true,
		});
	}, [map, position]);
	return (
		<>
			<Marker position={position} icon={icon}>
				<Popup>IP Address location here</Popup>
			</Marker>
		</>
	);
}

export default MapMarker;
