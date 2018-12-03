import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import lodashMap from 'lodash/map';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

import * as routes from '../../../app/routes';
import {authActions, authSelectors} from '../../../redux/auth';
import FA from '../../../lib/font_awesome';

import image from '../../../images/logo.png';

import Avatar from '../avatar';

import './MainMenu.css';

const CLASS = 'sb-MainMenu';

const SIGNED_OUT_MENU_ITEMS = {
	link_1: {
		name: 'Link 1',
		icon: FA.home,
		href: routes.HOME,
	},
	link_2: {
		name: 'Link 2',
		icon: FA.sign_in,
		href: routes.AUTH_SIGN_IN,
	},
};

const SIGNED_IN_MENU_ITEMS = {
	link_1: {
		name: 'Link 1',
		icon: FA.home,
		href: routes.HOME,
	},
	link_2: {
		name: 'Link 2',
		icon: FA.sign_in,
		href: routes.AUTH_SIGN_IN,
	},
};

const USER_DROPDOWN_ITEMS = {
	link_1_user: {
		name: 'Link 1 | User',
		icon: FA.home,
		href: routes.HOME,
	},
	link_2_user: {
		name: 'Link 2 | User',
		icon: FA.sign_in,
		href: routes.AUTH_SIGN_IN,
	},
};

class MainMenu extends Component {
	static propTypes = {
		user: PropTypes.object,
		signOut: PropTypes.func.isRequired,
		location: PropTypes.object.isRequired,
	};

	renderMenuItems = () => {
		const {location, user} = this.props;
		const items = user ? SIGNED_IN_MENU_ITEMS : SIGNED_OUT_MENU_ITEMS;

		return lodashMap(items, (value, key) => {
			const activeClass = location.pathname === value.href ? CLASS + '-link-active' : '';

			return (
				<Link to={value.href} key={key} className={CLASS + '-link ' + activeClass}>
					<FontAwesome name={value.icon} />
					{value.name}
				</Link>
			);
		});
	};

	renderUserDropdown = () => {
		const {user, signOut} = this.props;

		if (!user) {
			return null;
		}

		const userInfo = authSelectors.getUserInfo(user);

		const dropdownItems = lodashMap(USER_DROPDOWN_ITEMS, (value, key) => {
			return (
				<Link to={value.href} key={key} className={CLASS + '-dropdownItem'}>
					<FontAwesome name={value.icon} />
					{value.name}
				</Link>
			);
		});

		const signOutButton = (
			<div className={CLASS + '-dropdownItem'} onClick={signOut}>
				<FontAwesome name={FA.power_off} />
				Sign Out
			</div>
		);

		return (
			<div className={CLASS + '-dropdown'}>
				<div className={CLASS + '-dropdownTrigger'}>
					<span className={CLASS + '-dropdownTriggerName'}>{userInfo.displayName}</span>
					<Avatar imgUrl={userInfo.photoURL} />
				</div>
				<div className={CLASS + '-dropdownMenu'}>
					{dropdownItems}
					{signOutButton}
				</div>
			</div>
		);
	};

	render() {
		return (
			<div className={CLASS}>
				<div className={CLASS + '-wrapper'}>
					<div className={CLASS + '-logo'}>
						<Link to={routes.HOME}>
							<img src={image} alt="Speech Bubble Logo" />
						</Link>
					</div>
					<div className={CLASS + '-content'}>
						{this.renderMenuItems()}
						{this.renderUserDropdown()}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: authSelectors.getUser(state),
});

const mapDispatchToProps = {
	signOut: authActions.signOut,
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(MainMenu)
);
