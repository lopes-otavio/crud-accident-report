import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReportListing from "./components/ReportListing/ReportListing";
import "./main.scss";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<div className="container">
			<ReportListing />
		</div>
	</StrictMode>
);
