import React, { useEffect, useState } from "react";
import MapSection from "./MapSection";
import background from "./images/pattern-bg-desktop.png";
import icons from "./images/icon-arrow.svg";
import InputBase from "@mui/material/InputBase";

export const Home = () => {
	const [address, setAddress] = useState("");
	const [ipAddress, setIpAddress] = useState("");
	const checkIpAddress = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
	const checkDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

	useEffect(() => {
		try {
			const getInitialData = async () => {
				const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_RSolMxXJfYDOCnOw9zZWGlLPzTwoO&ipAddress=8.8.8.8`);
				const data = await res.json();
				setAddress(data);
			};
			getInitialData();
		} catch (error) {
			console.trace(error);
			console.log(error);
		}
	}, []);

	const getIpAddress = async () => {
		const res = await fetch(
			`https://geo.ipify.org/api/v2/country,city?apiKey=at_RSolMxXJfYDOCnOw9zZWGlLPzTwoO&
			${checkIpAddress.test(ipAddress) ? `ipAddress=${ipAddress}` : checkDomain.test(ipAddress) ? `domain=${ipAddress}` : ""}`
		);
		const data = await res.json();
		setAddress(data);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		getIpAddress();
		setIpAddress("");
	};

	return (
		<>
			<section>
				<div className="absolute -z-10">
					<img src={background} alt="bg" className="w-screen h-64 object-cover" />
					<MapSection address={address} />
				</div>

				<article className="p-10">
					<h1 className=" font-medium text-white text-center pb-6">IP Address Tracker</h1>

					<form onSubmit={handleSubmit} autoComplete="off" className="flex justify-center max-w-xl mx-auto bg-white rounded-xl">
						<InputBase
							type="text"
							id="ipaddress"
							value={ipAddress}
							onChange={(e) => setIpAddress(e.target.value)}
							fullWidth
							sx={{ px: 2, py: 1 }}
							placeholder="Search for any IP address or domain"
						/>
						<button type="submit" className="bg-black py-4 px-5 rounded-r-xl transition ease-in-out delay-150 hover:scale-110">
							<img src={icons} alt="" />
						</button>
					</form>
				</article>

				<article className=" font-semibold bg-white rounded-xl mx-8 p-8 pl-10 max-w-5xl  lg:mx-auto shadow-md grid grid-cols-1 md:grid-cols-4 gap-5 text-center lg:text-left ">
					<div className="lg:border-r lg:border-slate-400 space-y-1">
						<h2 className="text-gray-400 uppercase md:text-lg text-xs tracking-widest">ip address</h2>

						<p className="sm:text-2xl lg:w-[14rem]">{address.ip}</p>
					</div>

					<div className="lg:border-r lg:border-slate-400 space-y-1">
						<h2 className="text-gray-400 uppercase md:text-lg text-xs tracking-widest">location</h2>
						<p className=" sm:text-2xl lg:w-[14rem]">
							{address?.location?.region}, {address?.location?.country}
						</p>
					</div>

					<div className="lg:border-r lg:border-slate-400 space-y-1">
						<h2 className="text-gray-400 uppercase md:text-lg text-xs tracking-widest">timezone</h2>
						<p className=" sm:text-2xl lg:w-[14rem]">{address?.location?.timezone}</p>
					</div>

					<div className=" space-y-1">
						<h2 className="text-gray-400 uppercase md:text-lg text-xs tracking-widest">isp</h2>
						<p className=" sm:text-2xl lg:w-[14rem]">{address.isp}</p>
					</div>
				</article>
			</section>
		</>
	);
};
