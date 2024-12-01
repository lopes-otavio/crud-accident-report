import React from "react";
import { AccidentReport } from "../../interfaces";
import { Pencil, Trash2 } from "lucide-react";
import "./reportListingItem.scss";

type Props = {
	report: AccidentReport;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
};

export default function ReportListingItem({ report, onEdit, onDelete }: Props) {
	return (
		<div className="report-item">
			<span>{report.id}</span>
			<span>{report.stolenVechile.vehicleType}</span>
			<span>{report.stolenVechile.vehicleBrand}</span>
			<span>{report.incidentLocal.city}</span>
			<span>{new Date(report.incidentDate).toLocaleDateString()}</span>
			<button onClick={() => onEdit(report.id)} className="edit-button">
				<Pencil size={18} />
			</button>
			<button onClick={() => onDelete(report.id)} className="delete-button">
				<Trash2 size={18} />
			</button>
		</div>
	);
}
