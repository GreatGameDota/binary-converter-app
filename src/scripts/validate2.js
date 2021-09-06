const validate = (type, input, bits1, bits2) => {
	input = String(input);
	let errors = [];

	if (input === '') return errors.push([ true, "Input can't be empty" ]);
	if (type === 0) {
		// Binary
		if (input.substring(0, 2) === '0b') input = input.substring(2, input.length);
		if (input === '') errors.push([ true, "Input can't be empty" ]);
		else if (/^[01.]+$/.test(input)) {
			if (input.replace(/[^.]/g, '').length <= 1) {
				errors.push([ false, '' ]);
			} else {
				errors.push([ true, 'Invalid binary input' ]);
			}
		} else errors.push([ true, 'Invalid binary input' ]);
	} else if (type === 1) {
		// Decimal
		if (/^[-0123456789.]+$/.test(input)) {
			if (input.replace(/[^-]/g, '').length <= 1 && input.replace(/[^.]/g, '').length <= 1) {
				if (input.replace(/[^-]/g, '').length === 1) {
					if (input[0] === '-') errors.push([ false, '' ]);
					else errors.push([ true, 'Invalid decimal input' ]);
				} else {
					errors.push([ false, '' ]);
				}
			} else {
				errors.push([ true, 'Invalid decimal input' ]);
			}
		} else errors.push([ true, 'Invalid decimal input' ]);
	} else if (type === 2) {
		// Hexadecimal
		if (input.substring(0, 2) === '0x') input = input.substring(2, input.length);
		input = input.toUpperCase();
		if (input === '') errors.push([ true, "Input can't be empty" ]);
		else if (/^[0123456789ABCDEF.]+$/.test(input)) {
			if (input.replace(/[^.]/g, '').length <= 1) {
				errors.push([ false, '' ]);
			} else {
				errors.push([ true, 'Invalid hexadecimal input' ]);
			}
		} else errors.push([ true, 'Invalid hexadecimal input' ]);
	}

	if (bits1 <= 0) errors.push([ true, 'Invalid amount of exponent bits' ]);
	else if (!/^[0123456789]+$/.test(bits1)) errors.push([ true, 'Invalid exponent bits input' ]);
	else errors.push([ false, '' ]);

	if (bits2 <= 0) errors.push([ true, 'Invalid amount of fraction bits' ]);
	else if (!/^[0123456789]+$/.test(bits2)) errors.push([ true, 'Invalid fraction bits input' ]);
	else errors.push([ false, '' ]);

	return errors;
};

export default validate;
