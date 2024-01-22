import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MainPageContent.css';

function MainPageContent({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
        <nav>
            <div id="MainPageContentCss">
                <p>Spotify playlists</p>
            </div>
        </nav>
	);
}

export default MainPageContent;
