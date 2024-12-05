/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import "./ReportForm.scss";
import { AccidentReport } from "../../interfaces";
import { dateMask } from "../../pipes/dateMask";

interface ReportFormProps {
	initialData: AccidentReport;
	onSubmit: (report: AccidentReport) => void;
	submitButtonText: string;
}

export default function ReportForm({
	initialData,
	onSubmit,
	submitButtonText,
}: ReportFormProps) {
	const [formData, setFormData] = useState<AccidentReport>(initialData);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index?: number
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => {
			const newData = { ...prevData };
			if (name.startsWith("suitors") && typeof index === "number") {
				const [, field] = name.split(".");
				newData.suitors = [...(newData.suitors || [])];
				newData.suitors[index] = { ...newData.suitors[index], [field]: value };
			} else {
				const keys = name.split(".");
				let current: any = newData;
				for (let i = 0; i < keys.length - 1; i++) {
					current = current[keys[i]];
				}
				current[keys[keys.length - 1]] = value;
			}
			return newData;
		});
	};

	const addSuitor = () => {
		setFormData((prevData) => ({
			...prevData,
			suitors: [
				...(prevData.suitors || []),
				{ name: "", email: "", phone: "", involvementType: "" },
			],
		}));
	};

	const removeSuitor = (index: number) => {
		setFormData((prevData) => ({
			...prevData,
			suitors: prevData.suitors?.filter((_, i) => i !== index) || [],
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form className="report-form" onSubmit={handleSubmit}>
			<div className="form-section">
				<h2>Envolvidos</h2>
				{formData.suitors?.map((suitor, index) => (
					<div key={index} className="suitor-row">
						<div className="form-group">
							<label htmlFor={`suitor-name-${index}`}>Nome</label>
							<input
								type="text"
								id={`suitor-name-${index}`}
								name={`suitors.name`}
								value={suitor.name}
								onChange={(e) => handleChange(e, index)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor={`suitor-email-${index}`}>Email</label>
							<input
								type="email"
								id={`suitor-email-${index}`}
								name={`suitors.email`}
								value={suitor.email}
								onChange={(e) => handleChange(e, index)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor={`suitor-phone-${index}`}>Telefone</label>
							<input
								type="tel"
								id={`suitor-phone-${index}`}
								name={`suitors.phone`}
								value={suitor.phone}
								onChange={(e) => handleChange(e, index)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor={`suitor-involvement-${index}`}>
								Tipo de Envolvimento
							</label>
							<select
								id={`suitor-involvement-${index}`}
								name={`suitors.involvementType`}
								value={suitor.involvementType}
								onChange={(e) => handleChange(e, index)}
							>
								<option value="">Selecione o tipo</option>
								<option value="Testemunha">Testemunha</option>
								<option value="Vítima">Vítima</option>
								<option value="Suspeito">Suspeito</option>
							</select>
						</div>
						<button
							type="button"
							className="remove-suitor"
							onClick={() => removeSuitor(index)}
						>
							<X size={20} />
						</button>
					</div>
				))}
				<button type="button" className="add-suitor" onClick={addSuitor}>
					<Plus size={20} /> Adicionar Envolvido
				</button>
			</div>
			<div className="form-section">
				<h2>Detalhes do Ocorrido</h2>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="incidentDate">Data</label>
						<input
							type="text"
							id="incidentDate"
							name="incidentDate"
							value={dateMask(formData.incidentDate)}
							maxLength={10}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="incidentPeriod">Periodo</label>
						<select
							id="incidentPeriod"
							name="incidentPeriod"
							value={formData.incidentPeriod}
							onChange={handleChange}
							required
						>
							<option value="">Selecione o período</option>
							<option value="Manhã">Manhã</option>
							<option value="Começo da Tarde">Começo da Tarde</option>
							<option value="Fim da tarde">Fim da tarde</option>
							<option value="Noite">Noite</option>
						</select>
					</div>
				</div>
			</div>
			<div className="form-section">
				<h2>Local do Ocorrido</h2>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="street">Rua</label>
						<input
							type="text"
							id="street"
							name="incidentLocal.street"
							value={formData.incidentLocal.street}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="number">Número</label>
						<input
							type="text"
							id="number"
							name="incidentLocal.number"
							value={formData.incidentLocal.number}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="neighborhood">Bairro</label>
						<input
							type="text"
							id="neighborhood"
							name="incidentLocal.neighborhood"
							value={formData.incidentLocal.neighborhood}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="city">Cidade</label>
						<input
							type="text"
							id="city"
							name="incidentLocal.city"
							value={formData.incidentLocal.city}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="state">Estado</label>
						<input
							type="text"
							id="state"
							name="incidentLocal.state"
							value={formData.incidentLocal.state}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
			</div>
			<div className="form-section">
				<h2>Detalhes do Veículo</h2>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="fabricationYear">Ano Fabricação</label>
						<input
							type="number"
							id="fabricationYear"
							name="stolenVechile.fabricationYear"
							value={formData.stolenVechile.fabricationYear}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="vehicleColor">Cor</label>
						<input
							type="text"
							id="vehicleColor"
							name="stolenVechile.vehicleColor"
							value={formData.stolenVechile.vehicleColor}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="vehicleBrand">Marca</label>
						<input
							type="text"
							id="vehicleBrand"
							name="stolenVechile.vehicleBrand"
							value={formData.stolenVechile.vehicleBrand}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="vehicleType">Tipo de Veículo</label>
						<input
							type="text"
							id="vehicleType"
							name="stolenVechile.vehicleType"
							value={formData.stolenVechile.vehicleType}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
			</div>
			<div className="form-section">
				<h2>Placa</h2>
				<div className="form-row">
					<div className="form-group">
						<label htmlFor="vehicleRegistration">Número da placa</label>
						<input
							type="text"
							id="vehicleRegistration"
							name="stolenVechile.vehicleRegistration.registration"
							value={formData.stolenVechile.vehicleRegistration.registration}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="vehicleState">Estado de registro</label>
						<input
							type="text"
							id="vehicleState"
							name="stolenVechile.vehicleRegistration.vehicleState"
							value={formData.stolenVechile.vehicleRegistration.vehicleState}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="vehicleCity">Cidade de registro</label>
						<input
							type="text"
							id="vehicleCity"
							name="stolenVechile.vehicleRegistration.vehicleCity"
							value={formData.stolenVechile.vehicleRegistration.vehicleCity}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
			</div>
			<div className="form-actions">
				<button type="submit" className="submit-button">
					{submitButtonText}
				</button>
			</div>
		</form>
	);
}
