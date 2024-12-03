import { AccidentReport } from "../interfaces";

export const initialFormData: AccidentReport = {
	id: "",
	incidentDate: "",
	incidentPeriod: "",
	incidentLocal: {
		street: "",
		number: "",
		neighborhood: "",
		city: "",
		state: "",
	},
	stolenVechile: {
		fabricationYear: "",
		vehicleColor: "",
		vehicleBrand: "",
		vehicleType: "",
		vehicleRegistration: {
			registration: "",
			vehicleState: "",
			vehicleCity: "",
		},
	},
	suitors: [],
};
