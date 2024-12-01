import React, { useState } from "react";
import { AccidentReport } from "../../interfaces";
import ReportListingItem from "../ReportListingItem/ReportListingItem";
import For from "../For/For";
import { PlusCircle, ClipboardListIcon } from "lucide-react";

import "./reportListing.scss";

export default function ReportListing() {
	const [searchTerm, setSearchTerm] = useState("");

	const reports: AccidentReport[] = [
		{
			id: "1",
			incidentDate: "2023-05-15",
			incidentPeriod: "Morning",
			incidentLocal: {
				street: "Main St",
				number: "123",
				neighborhood: "Downtown",
				city: "New York",
				state: "NY",
			},
			stolenVechile: {
				fabricationYear: "2020",
				vehicleColor: "Red",
				vehicleBrand: "Toyota",
				vehicleType: "Sedan",
				vehicleRegistration: {
					registration: "",
					vehicleState: "",
					vehicleCity: "",
				},
			},
		},
		{
			id: "2",
			incidentDate: "2023-05-15",
			incidentPeriod: "Morning",
			incidentLocal: {
				street: "Main St",
				number: "123",
				neighborhood: "Downtown",
				city: "New York",
				state: "NY",
			},
			stolenVechile: {
				fabricationYear: "2020",
				vehicleColor: "Red",
				vehicleBrand: "ddd",
				vehicleType: "ccc",
				vehicleRegistration: {
					registration: "",
					vehicleState: "",
					vehicleCity: "",
				},
			},
		},
		{
			id: "3",
			incidentDate: "2023-05-15",
			incidentPeriod: "Morning",
			incidentLocal: {
				street: "Main St",
				number: "123",
				neighborhood: "Downtown",
				city: "New York",
				state: "NY",
			},
			stolenVechile: {
				fabricationYear: "2020",
				vehicleColor: "Red",
				vehicleBrand: "aaa",
				vehicleType: "bbb",
				vehicleRegistration: {
					registration: "",
					vehicleState: "",
					vehicleCity: "",
				},
			},
		},
	];

	const handleEdit = (id: string) => {
		console.log(`Editing report with id: ${id}`);
	};

	const handleDelete = (id: string) => {
		console.log(`Deleting report with id: ${id}`);
	};

	const filteredReports = reports.filter((report) => {
		const searchLower = searchTerm.toLowerCase();
		return (
			report.id.toLowerCase().includes(searchLower) ||
			report.stolenVechile.vehicleType.toLowerCase().includes(searchLower) ||
			report.stolenVechile.vehicleBrand.toLowerCase().includes(searchLower) ||
			report.incidentLocal.city.toLowerCase().includes(searchLower)
		);
	});

	return (
		<div className="report-container">
			<div className="report-header">
				<div className="logo">
					<ClipboardListIcon className="logo-icon" />
					<h1>Reports</h1>
				</div>
				<div className="search-container">
					<div className="search-input-wrapper">
						<input
							type="text"
							placeholder="Search by ID, Vehicle Type, Brand, or City..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="search-input"
						/>
					</div>
					<button
						className="search-button"
						onClick={() => console.log("criando novo boletim")}
					>
						Criar Boletim
						<PlusCircle size={20} />
					</button>
				</div>
			</div>

			<div className="report-listing">
				<div className="header">
					<span>ID</span>
					<span>Vehicle Type</span>
					<span>Vehicle Brand</span>
					<span>City</span>
					<span>Incident Date</span>
					<span className="action">Edit</span>
					<span className="action">Delete</span>
				</div>
				<For
					items={filteredReports}
					render={(report: AccidentReport, index: number) => (
						<ReportListingItem
							key={`${report.id}-${index}`}
							report={report}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					)}
					fallback={<div className="fallback">Nenhum item encontrado...</div>}
				/>
			</div>
		</div>
	);
}
