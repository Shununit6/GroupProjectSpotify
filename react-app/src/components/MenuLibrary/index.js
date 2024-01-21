import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MenuLibrary.css';

function MenuLibrary({ isLoaded }){
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
        <nav class="leftmenu">
        <div class="leftmenufirst">
            <div>
                <p>Spotify</p>
            </div>
            <div>
                <NavLink exact to="/">Home</NavLink>
            </div>
            <div>
                <p>Search</p>
            </div>
		</div>
		<div class="leftmenulibrary">
			<div>
			    <p>Your Library</p>
			</div>
            <div>
				<h1>Brower playlist</h1>
				<NavLink exact to="/">View all the playlist</NavLink>
			</div>
            {sessionUser &&
			<div>
				<h1>Create your album</h1>
				<NavLink exact to="/">Create Album</NavLink>
			</div>}
            {sessionUser &&
			<div>
				<h1>Create your song</h1>
				<NavLink exact to="/">Create Song</NavLink>
			</div>}
		</div>
        </nav>
	);
}

export default MenuLibrary;
