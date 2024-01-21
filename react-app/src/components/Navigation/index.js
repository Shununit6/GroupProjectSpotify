import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import MenuLibrary from '../MenuLibrary';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		// <ul>
		// 	<li>
		// 		<NavLink exact to="/">Home</NavLink>
		// 	</li>
		// 	{isLoaded && (
		// 		<li>
		// 			<ProfileButton user={sessionUser} />
		// 		</li>
		// 	)}
		// </ul>
		<nav>
			{/* <NavLink exact to="/" src="../../../public/images/navlogo.png">
			<img id="logoImage" src={navlogo} alt="logoimage"/>
			</NavLink> */}
			<div id="LibraryMenu">
					<MenuLibrary />
			</div>
			<div id="navusergroup">
				{/* {sessionUser &&
					<Link to="/groups/new" id="greennavstartnew"> Start a new group </Link>
				} */}
				{isLoaded && (
					<ProfileButton user={sessionUser} />
				)}
			</div>
		</nav>
	);
}

export default Navigation;
