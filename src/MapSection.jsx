import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import locationIcon from "./images/icon-location.svg";
import MapMarker from "./component/MapMarker";

const icon = L.icon({
	iconSize: [25, 33],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	iconUrl: locationIcon,
	shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});
export default function MapSection({ address }) {
	const position = [address?.location?.lat, address?.location?.lng];

	return (
		<>
			{address?.location?.lat && address?.location?.lng && (
				<MapContainer zoomControl={false} center={position} zoom={13} scrollWheelZoom={true} style={{ height: "450px", width: "100vw" }}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<MapMarker position={position}/>
				</MapContainer>
			)}
		</>
	);
}
