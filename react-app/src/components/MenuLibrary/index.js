import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MenuLibrary.css';

function MenuLibrary({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
        <nav className="leftmenu">
        <div className="leftmenufirst">
            {/* <div>
				<i className="fa-brands fa-spotify"></i>
				{" "} Spotify
            </div> */}
            <div>
                <Link exact to="/">
					<i id="fa-house" className="fa-solid fa-house"></i>
					{" "} Home
				</Link>
            </div>
            {/* <div>
				<i className="fa-solid fa-magnifying-glass"></i>
				{" "} Search
            </div> */}
			{sessionUser &&
			<div >
				<NavLink exact to="/songs/current"><button>View my songs</button></NavLink>
			</div>}
			{sessionUser &&
			<div>
				<NavLink exact to="/playlists/current"><button>View my playlists</button></NavLink>
			</div>}
			{sessionUser &&
			<div>
				<NavLink exact to="/albums/current"><button>View my albums</button></NavLink>
			</div>}

		</div>
		<div className="leftmenulibrary">
			<div>
				<i className="fa-solid fa-headphones-simple"></i>
				{" "}Your Library
			</div>
			<div className="leftmenulibrarycreate">
				<div className="leftmenulibrarycreate-1">
					<div id="leftmenulibrarytext1">Let's dive into music</div>
					<NavLink exact to="/songs"><button>View all the songs</button></NavLink>
					<NavLink exact to="/playlists"><button>View all the playlists</button></NavLink>
					<NavLink exact to="/albums"><button>View all the albums</button></NavLink>
				</div>
				{sessionUser &&
				<div className="leftmenulibrarycreate-2">
					<div id="leftmenulibrarytext2">Create a new album here. It's easy, we'll help you</div>
					<NavLink exact to="/albums/new"><button>Create Album</button></NavLink>
				</div>
				}
				{sessionUser &&
				<div className="leftmenulibrarycreate-4">
					<div id="leftmenulibrarytext4">Create a new playlist here. It's easy, we'll help you</div>
					<NavLink exact to="/playlists/new"><button>Create Playlist</button></NavLink>
				</div>
				}
				{sessionUser &&
				<div className="leftmenulibrarycreate-3">
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
