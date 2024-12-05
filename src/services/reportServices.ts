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

export async function getReportById(id: string): Promise<AccidentReport> {
	try {
		return (await axios.get(`${baseUrl}/accident-reports/${id}`)).data;
	} catch (error) {
		console.error(`Erro ao buscar relatórios`, error);
		throw error;
	}
}

export async function createReport(
	report: AccidentReport
): Promise<AccidentReport[]> {
	try {
		return await axios.post(`${baseUrl}/accident-reports`, report);
	} catch (error) {
		console.error(`Erro ao criar relatório`, error);
		throw error;
	}
}

export async function updateReport(
	report: AccidentReport
): Promise<AccidentReport[]> {
	try {
		return await axios.put(`${baseUrl}/accident-reports/${report.id}`, report);
	} catch (error) {
		console.error(`Erro ao criar relatório`, error);
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
