import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import MenuLibrary from '../MenuLibrary';
import MainPageContent from '../MainPageContent';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav>
			<div id="LibraryMenu">
					<MenuLibrary />
			</div>
			<div id="navusergroup">
				{isLoaded && (
					<ProfileButton user={sessionUser} />
				)}
				<div id="viewallthree">
					<MainPageContent />
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
