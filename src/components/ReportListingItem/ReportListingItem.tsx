import React from "react";
import { AccidentReport } from "../../interfaces";

type Props = {
	report: AccidentReport;
};

export default function ReportListingItem({ report }: Props) {
	return (
		<div className="item-container">
			<div>{report.id}</div>
		</div>
	);
}
