import axios from "axios";
import { AccidentReport } from "../interfaces";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getAllReports(): Promise<AccidentReport[]> {
	return (await axios.get(`${baseUrl}/accident-reports`)).data;
}
