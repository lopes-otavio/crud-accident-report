/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipboardListIcon, ArrowLeft } from "lucide-react";
import "./EditReport.scss";
import { getReportById, updateReport } from "../../services/reportServices";
import { AccidentReport } from "../../interfaces";
import ReportForm from "../ReportForm/ReportForm";

export default function EditReport() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [report, setReport] = useState<AccidentReport | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchReport = async () => {
			try {
				if (id) {
					const fetchedReport = await getReportById(id);
					setReport(fetchedReport);
				}
			} catch (err) {
				setError("Failed to fetch report. Please try again.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchReport();
	}, [id]);

	const handleSubmit = async (updatedReport: AccidentReport) => {
		try {
			await updateReport(updatedReport);
			navigate("/reports");
		} catch (err) {
			setError("Failed to update report. Please try again.");
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="edit-report-container">
			<div className="edit-report-header">
				<div className="logo">
					<ClipboardListIcon className="logo-icon" />
					<h1>Editar Boletim de Ocorrência</h1>
				</div>
				<button className="back-button" onClick={() => navigate("/reports")}>
					<ArrowLeft size={20} />
					Voltar
				</button>
			</div>
			{report && (
				<ReportForm
					initialData={report}
					onSubmit={handleSubmit}
					submitButtonText="Atualizar Boletim"
				/>
			)}
		</div>
	);
}
