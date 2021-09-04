import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import validate from '../scripts/validate';
import calc from '../scripts/calculate';

const styles = (theme) => ({
	...theme.spread,
	content: {
		width: '50%',
		maxWidth: '800px',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: theme.spacing(3),
		padding: theme.spacing(2)
	},
	button: {
		margin: theme.spacing(3)
	},
	titles: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	}
});

class Calculator extends Component {
	state = {
		type: 0,
		input: 0,
		bits: 4,
		error: false,
		errorMsg: '',
		error2: false,
		error2Msg: '',
		outputs: [ 0, 0, 0, 0 ]
	};

	render () {
		const classes = this.props.classes;

		const clearErrors = () => {
			this.setState({ error: false, errorMsg: '' });
		};
		const clearErrors2 = () => {
			this.setState({ error2: false, error2Msg: '' });
		};
		const handleChange = (event) => {
			this.setState({ type: event.target.value });
			clearErrors();
			clearErrors2();
			this.forceUpdate();
		};
		const onChange = (event) => {
			this.setState({ input: event.target.value });
			clearErrors();
		};
		const onChange2 = (event) => {
			this.setState({ bits: event.target.value });
			clearErrors2();
		};
		const handleSubmit = () => {
			const ret = validate(this.state.type, String(this.state.input).trim(), this.state.bits);
			this.setState({ error: ret[0][0], errorMsg: ret[0][1], error2: ret[1][0], error2Msg: ret[1][1] });
			if (!ret[0][0] && !ret[1][0])
				this.setState({ outputs: calc(this.state.type, String(this.state.input).trim(), this.state.bits) });
			this.forceUpdate();
		};

		const types = [ 'Binary', 'Decimal', 'Hexadecimal' ];
		const type = types[this.state.type];
		let outputTypes = types.filter((t, i) => i !== this.state.type);
		outputTypes = [ outputTypes[0] ].concat(outputTypes);
		outputTypes = outputTypes.concat(outputTypes[outputTypes.length - 1]);

		return (
			<Box className={classes.content} borderRadius={4} boxShadow={3}>
				<Typography variant='h6'>Input</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							id={type.toLowerCase()}
							name={type.toLowerCase()}
							label={type}
							fullWidth
							value={this.state.input}
							onChange={onChange}
							error={this.state.error}
							helperText={this.state.errorMsg}
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<FormControl fullWidth>
							<InputLabel shrink id='select-type-label'>
								Type
							</InputLabel>
							<Select
								labelId='select-type-label'
								id='select-type'
								value={this.state.type}
								onChange={handleChange}
								fullWidth
							>
								{types.map((type, i) => (
									<MenuItem value={i} key={i}>
										{type}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={3}>
						<TextField
							id='bits'
							name='bits'
							label='Output Bits'
							fullWidth
							value={this.state.bits}
							onChange={onChange2}
							error={this.state.error2}
							helperText={this.state.error2Msg}
						/>
					</Grid>
				</Grid>
				<Button
					variant='outlined'
					color='primary'
					className={classes.button}
					size='large'
					onClick={handleSubmit}
				>
					Convert
				</Button>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} className={classes.titles}>
						<Typography variant='h6'>Output</Typography>
					</Grid>
					<Grid item xs={12} sm={6} className={classes.titles}>
						<Typography variant='body1'>Two's Complement</Typography>
					</Grid>
					{outputTypes.map((t, i) => (
						<Grid item xs={12} sm={6} key={i}>
							<TextField
								id={t.toLowerCase() + i}
								name={t.toLowerCase()}
								label={t}
								fullWidth
								variant='filled'
								value={this.state.outputs[i]}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		);
	}
}

export default withStyles(styles)(Calculator);
