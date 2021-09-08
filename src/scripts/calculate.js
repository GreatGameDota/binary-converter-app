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
	let frac = 0.5;
	let bin = '';
	while (num > 1e-8) {
		if (num >= frac) {
			bin += '1';
			num -= frac;
		} else {
			bin += '0';
		}
		frac /= 2;
	}
	return bin;
}

function twosComplement (num) {
	let input1 = num.split('.')[0];
	let input2 = num.split('.')[1];
	let temp1 = '';
	let temp2 = '';
	for (let i = 0; i < input1.length; i++) {
		temp1 += input1[i] === '1' ? '0' : '1';
	}
	if (input2 && input2 !== '') {
		for (let i = 0; i < input2.length; i++) {
			temp2 += input2[i] === '1' ? '0' : '1';
		}
	}

	temp2 = temp1 + '.' + temp2;
	input2 = '';
	let i;
	for (i = temp2.length - 1; i >= 0; i--) {
		if (temp2[i] === '0') {
			input2 = '1' + input2;
			break;
		} else if (temp2[i] === '1') {
			input2 = '0' + input2;
		} else {
			input2 = temp2[i] + input2;
		}
	}
	for (let j = i - 1; j >= 0; j--) {
		input2 = temp2[j] + input2;
	}

	let bin = input2;

	input1 = input2.split('.')[0];
	input2 = input2.split('.')[1];

	let output2 = bin2int(input1);

	let frac;
	if (input2 && input2 !== '') {
		frac = bin2intFrac(input2);
		output2 = String(Number(output2) + Number(frac));
	}

	return [ -output2, bin ];
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

const calc = (type, input, bits) => {
	input = String(input);
	bits = Number(bits);
	let output1 = 0,
		output2 = 0,
		output3 = 0,
		output4 = 0;

	if (type === 0) {
		// Binary
		if (input.substring(0, 2) === '0b') input = input.substring(2, input.length);

		let input1 = input.split('.')[0];
		let input2 = input.split('.')[1];

		output1 = bin2int(input1);

		let frac;
		if (input2 && input2 !== '') {
			frac = bin2intFrac(input2);
			output1 = String(Number(output1) + Number(frac));
		}

		if (input1[0] === '1' || (input1 === '' && input2[0] === '1')) {
			if (input1 && input1 !== '') {
				while (input1.length < bits) {
					input = '0' + input;
					input1 = '0' + input1;
				}
			}
			if (input2 && input2 !== '') {
				while (input2.length < bits) {
					input += '0';
					input2 += '0';
				}
			}
			let ret = twosComplement(input);
			output2 = ret[0];
		}

		output3 = bin2hex(input, bits);
	} else if (type === 1) {
		// Decimal
		let input1 = input.split('.')[0];
		if (input1 === '-') input1 = '';
		let input2 = input.split('.')[1];

		output1 = int2bin(Math.abs(input1));

		while (output1.length < bits) output1 = '0' + output1;

		if (input2 && input2 !== '') {
			let frac = frac2bin(input2);
			while (frac.length < bits) frac += '0';
			output1 += '.' + frac;
		}

		if (Number(input) < 0) {
			let ret = twosComplement(output1);
			if (input2 && input2 !== '') output2 = ret[1];
			else output2 = ret[1].substring(0, ret[1].length - 1);

			if (output2[0] === '0') output2 = '1' + output2;
			while (output2.length < bits) output2 = '1' + output2;
		} else {
			while (output1.length < bits) {
				output1 = '0' + output1;
			}
		}

		output3 = bin2hex(String(output1), bits);
		if (Number(input) < 0) {
			output4 = bin2hex(String(output2), bits);
		}
	} else if (type === 2) {
		// Hexadecimal
		if (input.substring(0, 2) === '0x') input = input.substring(2, input.length);
		input = input.toUpperCase();

		let input1 = input.split('.')[0];
		let input2 = input.split('.')[1];

		output1 = hex2bin(input1);
		output3 = bin2int(output1);
		if (input1 && input1 !== '') {
			while (output1.length < bits) output1 = '0' + output1;
		}

		if (input2 && input2 !== '') {
			let frac = hex2bin(input2);
			let frac2 = bin2intFrac(frac);
			while (frac.length < bits) frac += '0';
			output1 += '.' + frac;
			output3 = String(Number(output3) + Number(frac2));
		}

		if (output1[0] === '1' || (output1.split('.')[0] === '' && output1.split('.')[1][0] === '1')) {
			let ret = twosComplement(output1);
			if (input2 && input2 !== '') output2 = ret[1];
			else output2 = ret[1].substring(0, ret[1].length - 1);

			output4 = ret[0];
		}
	}

	return [ output1, output2, output3, output4 ];
};

export default calc;
