import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MenuLibrary.css';

function MenuLibrary({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
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
					<div id="leftmenulibrarytext1">Let's dive into music</div>
					<NavLink exact to="/songs"><button>View all the songs</button></NavLink>
					<NavLink exact to="/playlists"><button>View all the playlists</button></NavLink>
					<NavLink exact to="/albums"><button>View all the albums</button></NavLink>
				</div>
				{sessionUser &&
				<div class="leftmenulibrarycreate-2">
					<div id="leftmenulibrarytext2">Create a new album here. It's easy, we'll help you</div>
					<NavLink exact to="/"><button>Create Album</button></NavLink>
				</div>
				}
				{sessionUser &&
				<div class="leftmenulibrarycreate-3">
					<div id="leftmenulibrarytext3">Create a new song here. It's easy, we'll help you</div>
					<NavLink exact to="/songs/new"><button>Create Song</button></NavLink>
				</div>
				}
			</div>
		</div>
        </nav>
	);
}

export default MenuLibrary;
