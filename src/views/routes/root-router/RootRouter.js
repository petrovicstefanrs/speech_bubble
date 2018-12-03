import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';
import {withRouter} from 'react-router';

import Home from '../../pages/home';
import NotFound from '../../pages/not-found';

import AuthRoute from '../../components/auth-route';
import Spinner from '../../components/spinner';
import MainMenu from '../../components/main-menu';
import Toaster from '../../components/toaster';

import * as routes from '../../../app/routes';
import {authActions, authSelectors} from '../../../redux/auth';

class RootRouter extends Component {
	static propTypes = {
		initApp: PropTypes.func.isRequired,
		isInitialized: PropTypes.bool.isRequired,
		isLoggedIn: PropTypes.bool.isRequired,
		isLoading: PropTypes.bool,
	};

	componentDidMount() {
		this.initializeApp();
	}

	initializeApp = () => {
		const {isInitialized, initApp} = this.props;

		!isInitialized && initApp();
	};

	renderAppOrSpinner() {
		const {isInitialized, isLoading} = this.props;

		if (!isInitialized || isLoading) {
			return <Spinner />;
		}

		return (
			<Switch>
				<AuthRoute exact name="Home" path={routes.HOME} component={Home} />
				{/*<AuthRoute
					exact
					name="Some Exclusively Public Route"
					isPublic={true}
					path={routes.PUBLIC}
					component={PublicPage}
				/>
				<AuthRoute
					exact
					name="Some Exclusively Private Route"
					isPrivate={true}
					path={routes.PRIVATE}
					component={PrivatePage}
				/>*/}
				<AuthRoute name="Not found" path="*" component={NotFound} />
			</Switch>
		);
	}

	renderMainMenu() {
		return this.props.isInitialized ? <MainMenu /> : null;
	}

	render() {
		return (
			<React.Fragment>
				<Toaster />
				{this.renderMainMenu()}
				{this.renderAppOrSpinner()}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	isInitialized: authSelectors.isInitialized(state),
	isLoggedIn: authSelectors.isAuthenticated(state),
	isLoading: authSelectors.isAuthInProgress(state),
});

const mapDispatchToProps = {
	initApp: authActions.initAuth,
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(RootRouter)
);
