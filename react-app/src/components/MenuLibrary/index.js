import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
				<i class="fa-brands fa-spotify"></i>
				{" "} Spotify
            </div>
            <div>
                <Link exact to="/">
					<i id="fa-house" class="fa-solid fa-house"></i>
					{" "} Home
				</Link>
            </div>
            <div>
				<i class="fa-solid fa-magnifying-glass"></i>
				{" "} Search
            </div>
		</div>
		<div class="leftmenulibrary">
			<div>
				<i class="fa-solid fa-headphones-simple"></i>
				{" "}Your Library
			</div>
			<div class="leftmenulibrarycreate">
				<div class="leftmenulibrarycreate-1">
					<h2>Brower playlist</h2>
					<NavLink exact to="/"><button>View all the playlist</button></NavLink>
				</div>
				{/* {sessionUser && */}
				<div class="leftmenulibrarycreate-1">
					<h2>Create your album</h2>
					<NavLink exact to="/"><button>Create Album</button></NavLink>
				</div>
				{/* }
				{sessionUser && */}
				<div class="leftmenulibrarycreate-1">
					<h2>Create your song</h2>
					<NavLink exact to="/"><button>Create Song</button></NavLink>
				</div>
				{/* } */}
			</div>
		</div>
        </nav>
	);
}

export default MenuLibrary;
