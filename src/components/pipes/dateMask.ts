export function dateMask(date: string) {
	// Remove all non-digit characters
	const digits = date.replace(/\D/g, "");

	// Apply the mask
	let maskedValue = "";
	if (digits.length > 0) {
		maskedValue += digits.substring(0, 2);
		if (digits.length > 2) {
			maskedValue += "/" + digits.substring(2, 4);
			if (digits.length > 4) {
				maskedValue += "/" + digits.substring(4, 8);
			}
		}
	}

	return maskedValue;
}
