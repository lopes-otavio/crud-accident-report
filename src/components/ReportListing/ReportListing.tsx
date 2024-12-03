import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccidentReport } from "../../interfaces";
import ReportListingItem from "../ReportListingItem/ReportListingItem";
import For from "../For/For";
import { PlusCircle, ClipboardListIcon } from "lucide-react";
import { deleteReport, getAllReports } from "../../services/reportServices";

import "./reportListing.scss";

export default function ReportListing() {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [reports, setReports] = useState<AccidentReport[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 15;

	useEffect(() => {
		async function getReports() {
			try {
				const fetchedReports = await getAllReports();
				setReports(fetchedReports);
			} catch (error) {
				console.error("Erro ao buscar relatórios:", error);
			} finally {
				setLoading(false);
			}
		}

		getReports();
	}, []);

	const filteredReports = reports.filter((report) => {
		const searchLower = searchTerm.toLowerCase();
		return (
			report.id.toLowerCase().includes(searchLower) ||
			report.stolenVechile.vehicleType.toLowerCase().includes(searchLower) ||
			report.stolenVechile.vehicleBrand.toLowerCase().includes(searchLower) ||
			report.incidentLocal.city.toLowerCase().includes(searchLower)
		);
	});

	const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentReports = filteredReports.slice(startIndex, endIndex);

	const goToNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handleEdit = (id: string) => {
		console.log(`Editing report with id: ${id}`);
	};

	const handleCreate = () => {
		navigate("/create-report");
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteReport(id);
			setReports((prevReports) =>
				prevReports.filter((report) => report.id !== id)
			);
		} catch (error) {
			console.error(`Erro ao deletar o relatório com ID ${id}:`, error);
		}
	};
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
					<button className="search-button" onClick={handleCreate}>
						Criar Boletim
						<PlusCircle size={20} />
					</button>
				</div>
			</div>

			<div className="report-listing">
				{loading ? (
					<div className="loading">Carregando relatórios...</div>
				) : (
					<>
						<div className="header">
							<span>ID</span>
							<span>Tipo Veículo</span>
							<span>Marca Veículo</span>
							<span>Cidade</span>
							<span className="center">Data </span>
							<span className="action">Editar</span>
							<span className="action">Deletar</span>
						</div>
						<For
							items={currentReports}
							render={(report: AccidentReport, index: number) => (
								<ReportListingItem
									key={`${report.id}-${index}`}
									report={report}
									onEdit={handleEdit}
									onDelete={handleDelete}
								/>
							)}
							fallback={
								<div className="fallback">Nenhum item encontrado...</div>
							}
						/>
						<div className="pagination-controls">
							<button
								onClick={goToPreviousPage}
								disabled={currentPage === 1}
								className="pagination-button"
							>
								Anterior
							</button>
							<span>
								Página {currentPage} de {totalPages}
							</span>
							<button
								onClick={goToNextPage}
								disabled={currentPage === totalPages}
								className="pagination-button"
							>
								Próxima
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
