const validate = (type, input, bits) => {
	input = String(input);
	let errors = [];

	if (input === '') return errors.push([ true, "Input can't be empty" ]);
	if (type === 0) {
		// Binary
		if (input.substring(0, 2) === '0b') input = input.substring(2, input.length);
		if (input === '') errors.push([ true, "Input can't be empty" ]);
		else if (/^[01.]+$/.test(input)) errors.push([ false, '' ]);
		else errors.push([ true, 'Invalid binary input' ]);
	} else if (type === 1) {
		// Decimal
		if (/^[-0123456789.]+$/.test(input)) errors.push([ false, '' ]);
		else errors.push([ true, 'Invalid decimal input' ]);
	} else if (type === 2) {
		// Hexadecimal
		if (input.substring(0, 2) === '0x') input = input.substring(2, input.length);
		if (input === '') errors.push([ true, "Input can't be empty" ]);
		else if (/^[0123456789abcdef.]+$/.test(input)) errors.push([ false, '' ]);
		else errors.push([ true, 'Invalid hexadecimal input' ]);
	}

    if (bits <= 0) errors.push([true, 'Invalid amount of bits']);
    else if (!/^[0123456789]+$/.test(bits)) errors.push([true, 'Invalid bits input']);
	else errors.push([ false, '' ]);

	return errors;
};

export default validate;
