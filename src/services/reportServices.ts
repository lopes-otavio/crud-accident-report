import axios from "axios";
import { AccidentReport } from "../interfaces";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getAllReports(): Promise<AccidentReport[]> {
	try {
		return (await axios.get(`${baseUrl}/accident-reports`)).data;
	} catch (error) {
		console.error(`Erro ao buscar relatórios`, error);
		throw error;
	}
}

export async function deleteReport(reportId: string): Promise<void> {
	try {
		await axios.delete(`${baseUrl}/accident-reports/${reportId}`);
	} catch (error) {
		console.error(`Erro ao deletar o relatório ${reportId}:`, error);
		throw error;
	}
}
