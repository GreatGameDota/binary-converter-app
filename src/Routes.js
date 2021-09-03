import React, { Component } from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HomePage from './components/HomePage';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import themeObject from './styles/GlobalStyles';

const theme = createTheme(themeObject);

export default class Routes extends Component {
	history = createBrowserHistory(this.props);

	render () {
		this.history.listen((location, action) => {
			setTimeout(() => {
				if (action === 'POP') {
					return;
				}
				window.scrollTo(0, 0);
			});
		});

		return (
			<MuiThemeProvider theme={theme}>
				<Router history={this.history}>
					<Switch>
						<Route exact path='/binary-converter' render={(routeProps) => <HomePage {...routeProps} />} />
						<Redirect to='/binary-converter' />
					</Switch>
				</Router>
			</MuiThemeProvider>
		);
	}
}
