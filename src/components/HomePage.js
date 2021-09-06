import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Footer from './Footer';
import Calculator from './Calculator';
import Calculator2 from './Calculator2';
import GithubIcon from '../resources/github.svg';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
	...theme.spread,
	appBar: {
		width: '100%',
		backgroundColor: theme.palette.primary.main
	},
	content: {
		position: 'relative',
		minHeight: 'calc(100vh - 50px - 24px - 64px - 24px - 24px + 8px)',
		padding: theme.spacing(3),
		paddingTop: 64 + theme.spacing(3),
		paddingBottom: theme.spacing(3),
		backgroundColor: '#fafafa',
		zIndex: '1'
	},
	footer: {
		position: 'relative',
		zIndex: '0'
	},
	typography: {
		textAlign: 'center'
	},
	button: {
		padding: '6px',
		marginLeft: 'auto',
		marginRight: 0
	},
	img: {
		filter: 'invert(100%) sepia(0%) saturate(7488%) hue-rotate(127deg) brightness(105%) contrast(102%)'
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
						<a
							href='https://github.com/GreatGameDota/binary-converter-app'
							target='_blank'
							rel='noopener noreferrer'
							className={classes.button}
						>
							<Tooltip title='Github Source' placement='left' TransitionComponent={Zoom}>
								<IconButton className={classes.button} aria-label='github'>
									<img
										src={GithubIcon}
										alt='github'
										width='45px'
										height='45px'
										className={classes.img}
									/>
								</IconButton>
							</Tooltip>
						</a>
					</Toolbar>
				</AppBar>
				<Paper square elevation={4} className={classes.content}>
					<Typography variant='body1' className={classes.typography}>
						Welcome! This is a simple website used as a calculator for converting between binary, decimal,
						and hexadecimal numbers in a quick and easy way! This site and calculator were made by
						GreatGameDota (find my links below). Enjoy!
					</Typography>
					<hr />
					<Calculator />
					<br />
					<Calculator2 />
				</Paper>
				<div className={classes.footer}>
					<Footer />
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(HomePage);
