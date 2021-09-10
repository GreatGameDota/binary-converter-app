function bin2int (num) {
	let count = 0;
	for (let i = 0; i < num.length; i++) {
		if (num[i] === '0') {
			count *= 2;
		} else if (num[i] === '1') {
			count *= 2;
			count++;
		}
	}
	return String(count);
}

function int2bin (num) {
	if (num === '0') return '0';

	let output1 = '';
	num = Number(num);
	while (num !== 0) {
		let re = num % 2;
		num = Math.floor(num / 2);
		output1 = re + output1;
	}
	return output1;
}

function bin2intFrac (num) {
	let count = 0;
	let frac = 1;
	for (let i = 0; i < num.length; i++) {
		if (num[i] === '0') {
			frac /= 2;
		} else if (num[i] === '1') {
			frac /= 2;
			count += frac;
		}
	}
	return String(count);
}

function frac2bin (num) {
	num = Number('.' + num);
	num *= Math.pow(2, 16);
	num = Math.round(num);
	let bin = '';
	while (num > 0) {
		let re = num % 2;
		num = Math.floor(num / 2);
		bin = re + bin;
	}
	while (bin.length < 16) bin = '0' + bin;
	return bin;
}

function bin2hex (num, bits) {
	let input1 = num.split('.')[0];
	let input2 = num.split('.')[1];

	while (input1.length < bits) {
		input1 = '0' + input1;
	}
	if (input2 && input2 !== '') {
		while (input2.length < bits) {
			input2 = input2 + '0';
		}
	}

	while (input1.length % 4 !== 0) {
		input1 = '0' + input1;
	}
	if (input2 && input2 !== '') {
		while (input2.length % 4 !== 0) {
			input2 = input2 + '0';
		}
	}

	let dict = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' };

	let output3 = '';
	for (let i = 0; i < input1.length; i += 4) {
		let val = bin2int(input1.substring(i, i + 4));
		if (val > 9) output3 += dict[val];
		else output3 += val;
	}
	if (input2 && input2 !== '') {
		let frac = '';
		for (let i = 0; i < input2.length; i += 4) {
			let val = bin2int(input2.substring(i, i + 4));
			if (val > 9) frac += dict[val];
			else frac += val;
		}
		output3 += '.' + frac;
	}

	return output3;
}

function hex2bin (num) {
	let dict = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };
	let bin = '';
	for (let i = 0; i < num.length; i++) {
		let val;
		if (num[i] < 10) {
			val = String(int2bin(num[i]));
		} else {
			val = String(int2bin(dict[num[i]]));
		}
		while (val.length < 4) val = '0' + val;
		bin += val;
	}
	return bin;
}

const calc = (type, input, bits1, bits2) => {
	input = String(input);
	bits1 = Number(bits1);
	bits2 = Number(bits2);
	let output1 = 0,
		output2 = 0,
		output3 = 0,
		output4 = 0;

	if (type === 0) {
		// Binary
		if (input.substring(0, 2) === '0b') input = input.substring(2, input.length);

		let input1 = input.split('.')[0];

		let sign = input1[0];

		let exponent = Number(bin2int(input1.substring(1, bits1 + 1)));
		exponent -= Math.pow(2, bits1 - 1) - 1;

		let fraction = '1' + input1.substring(bits1 + 1);
		let i = fraction.length - 1;
		while (fraction[i] === '0') i--;
		fraction = fraction.substring(0, i + 1);

		let num;
		if (exponent >= 0) {
			if (exponent > fraction.length) {
				let size = fraction.length;
				for (let i = 0; i <= exponent - size; i++) {
					fraction += '0';
				}
				num = fraction + '.';
			} else {
				num = fraction.substring(0, exponent + 1) + '.' + fraction.substring(exponent + 1);
			}
		} else {
			for (let i = 0; i < Math.abs(exponent) - 1; i++) {
				fraction = '0' + fraction;
			}
			fraction = '.' + fraction;
			num = fraction;
		}

		input1 = num.split('.')[0];
		let input2 = num.split('.')[1];

		output1 = bin2int(input1);

		let frac;
		if (input2 && input2 !== '') {
			frac = bin2intFrac(input2);
			output1 = String(Number(output1) + Number(frac));
		}

		output1 *= sign === '1' ? -1 : 1;

		output2 = bin2hex(input);
	} else if (type === 1) {
		// Decimal
		let input1 = input.split('.')[0];
		if (input1 === '-') input1 = '';
		let input2 = input.split('.')[1];

		output1 = int2bin(Math.abs(input1));

		let expo = output1.length;

		if (input2 && input2 !== '') {
			let frac = frac2bin(input2);
			output1 += frac;
		}

		let frac;
		for (let i = 0; i < output1.length; i++) {
			if (output1[i] === '1') {
				expo -= i + 1;
				frac = i + 1;
				break;
			}
		}

		let sign = Number(input) < 0 ? 1 : 0;

		let exponent = int2bin(expo + Math.pow(2, bits1 - 1) - 1);
		while (exponent.length < bits1) exponent = '0' + exponent;

		let fraction = output1.substring(frac);
		while (fraction.length < bits2) fraction += '0';

		if (fraction.length > bits2) {
			let cutoff = fraction.substring(bits2);
			let round = false;
			fraction = fraction.substring(0, bits2);
			
			for (let i = 0; i < cutoff.length; i++) {
				if (cutoff[i] === '1') round = true;
			}

			if (round) {
				let newFrac = '';
				let i;
				for (i = fraction.length - 1; i >= 0; i--) {
					if (fraction[i] === '0') {
						newFrac = '1' + newFrac;
						break;
					} else if (fraction[i] === '1') {
						newFrac = '0' + newFrac;
					} else {
						newFrac = fraction[i] + newFrac;
					}
				}
				for (i = i - 1; i >= 0; i--) {
					newFrac = fraction[i] + newFrac;
				}
				fraction = newFrac;
			}
		}

		output1 = sign + exponent + fraction;

		output2 = bin2hex(output1);
	} else if (type === 2) {
		// Hexadecimal
		if (input.substring(0, 2) === '0x') input = input.substring(2, input.length);
		input = input.toUpperCase();

		let input1 = input.split('.')[0];

		output1 = hex2bin(input1);

		input1 = output1.split('.')[0];

		let sign = input1[0];

		let exponent = Number(bin2int(input1.substring(1, bits1 + 1)));
		exponent -= Math.pow(2, bits1 - 1) - 1;

		let fraction = '1' + input1.substring(bits1 + 1);
		let i = fraction.length - 1;
		while (fraction[i] === '0') i--;
		fraction = fraction.substring(0, i + 1);

		let num;
		if (exponent >= 0) {
			if (exponent > fraction.length) {
				let size = fraction.length;
				for (let i = 0; i <= exponent - size; i++) {
					fraction += '0';
				}
				num = fraction + '.';
			} else {
				num = fraction.substring(0, exponent + 1) + '.' + fraction.substring(exponent + 1);
			}
		} else {
			for (let i = 0; i < Math.abs(exponent) - 1; i++) {
				fraction = '0' + fraction;
			}
			fraction = '.' + fraction;
			num = fraction;
		}

		input1 = num.split('.')[0];
		let input2 = num.split('.')[1];

		output2 = bin2int(input1);

		let frac;
		if (input2 && input2 !== '') {
			frac = bin2intFrac(input2);
			output2 = String(Number(output2) + Number(frac));
		}

		output2 *= sign === '1' ? -1 : 1;
	}

	return [ output1, output2, output3, output4 ];
};

export default calc;
