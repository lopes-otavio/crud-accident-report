import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import ReportListing from "./components/ReportListing/ReportListing";
import CreateReport from "./components/CreateReport/CreateReport";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Navigate to="/reports" replace />} />
				<Route path="/reports" element={<ReportListing />} />
				<Route path="/create-report" element={<CreateReport />} />
			</Routes>
		</Router>
	);
}

export default App;