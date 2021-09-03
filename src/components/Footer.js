import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import GithubIcon from '../resources/github.svg';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';

const styles = (theme) => ({
    ...theme.spread,
    root: {
        height: '50px',
        width: '100%',
		color: '#ffffff',
		textAlign: 'center',
		padding: '8px 0 8px 0',
        backgroundColor: theme.palette.primary.dark
	},
	link: {
		padding: '8px',
		fontWeight: 'bold',
		fontSize: '1.2rem'
	},
	button: {
		padding: '3px'
	},
	rights: {
		color: 'rgba(0,0,0,0.5)',
		fontSize: '0.7rem'
	}
});

class Footer extends Component {
	render () {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				{/* <Link color="inherit" className={classes.link} component={RouterLink} to="/about">
					About
				</Link>
				<Link color="inherit" className={classes.link} component={RouterLink} to="/contact">
					Contact
				</Link>
				<Link color="inherit" className={classes.link} component={RouterLink} to="/support">
					Support
				</Link> */}
				<a
					href='https://github.com/GreatGameDota'
					target='_blank'
					rel='noopener noreferrer'
					className={classes.button}
				>
					<IconButton className={classes.button} aria-label='github'>
						<img src={GithubIcon} alt='github' width='30px' height='30px' />
					</IconButton>
				</a>
				<br />
				<div className={classes.rights}>© 2021 GreatGameDota</div>
			</div>
		);
	}
}

export default withStyles(styles)(Footer);
