import { Address, Suitor, Vehicle } from "./index";

export interface AccidentReport {
	id: string;
	incidentDate: string;
	incidentPeriod: string;
	incidentLocal: Address;
	stolenVechile: Vehicle;
	suitors?: Suitor[];
}
