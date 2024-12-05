import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardListIcon, ArrowLeft } from "lucide-react";
import "./CreateReport.scss";
import { createReport } from "../../services/reportServices";
import { AccidentReport } from "../../interfaces";
import { initialFormData } from "../../mock/initialFormData";
import ReportForm from "../ReportForm/ReportForm";

export default function CreateReport() {
	const navigate = useNavigate();

	const handleSubmit = async (report: AccidentReport) => {
		try {
			await createReport(report);
			navigate("/reports");
		} catch (err) {
			console.error("Failed to create report:", err);
		}
	};

	return (
		<div className="create-report-container">
			<div className="create-report-header">
				<div className="logo">
					<ClipboardListIcon className="logo-icon" />
					<h1>Gerar Boletim de Ocorrência</h1>
				</div>
				<button className="back-button" onClick={() => navigate("/reports")}>
					<ArrowLeft size={20} />
					Voltar
				</button>
			</div>
			<ReportForm
				initialData={initialFormData}
				onSubmit={handleSubmit}
				submitButtonText="Gerar Boletim"
			/>
		</div>
	);
}
