import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Footer from './Footer';
import Calculator from './Calculator';

const styles = (theme) => ({
	...theme.spread,
	appBar: {
		width: '100%',
		backgroundColor: theme.palette.primary.dark
	},
	content: {
		minHeight: 'calc(100vh - 50px - 24px - 64px - 24px - 24px + 8px)',
		padding: theme.spacing(3),
		paddingTop: 64 + theme.spacing(3),
		paddingBottom: theme.spacing(3)
    },
    typography: {
        textAlign: 'center'
    }
});

class HomePage extends Component {
	render () {
		const classes = this.props.classes;

		return (
			<div>
				<AppBar position='fixed' className={classes.appBar}>
					<Toolbar>
						<Typography variant='h6' noWrap>
							Binary Converter App
						</Typography>
					</Toolbar>
				</AppBar>
				<main className={classes.content}>
					<Typography variant='body1' className={classes.typography}>
						Welcome! This is a simple website used as a calculator for converting between binary, decimal,
						and hexadecimal numbers in a quick and easy way! This site and calculator were made by
						GreatGameDota (find my links below). Enjoy!
					</Typography>
                    <hr />
                    <Calculator />
				</main>
				<Footer />
			</div>
		);
	}
}

export default withStyles(styles)(HomePage);
