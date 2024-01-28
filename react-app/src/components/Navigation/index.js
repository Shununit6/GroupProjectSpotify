import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav>
			{/* <div id="LibraryMenu">
					<MenuLibrary />
			</div> */}
			<div id="loginsignupnavbar">
				{isLoaded && (
					<ProfileButton user={sessionUser} />
				)}
				{/* {isLoaded && (
				<div id="viewallthree">
					<MainPageContent />
				</div>)} */}
			</div>
		</nav>
	);
}

export default Navigation;
