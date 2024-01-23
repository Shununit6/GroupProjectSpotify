import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import './Home.css';
import MenuLibrary from '../MenuLibrary';
import MainPageContent from '../MainPageContent';

function Home(){

	return (
		<nav>
			<div class="homewrapper">
                <div class="homeitem-1">
                    <MenuLibrary />
                </div>
                <div class="homeitem-2">
                    <MainPageContent />
                </div>
			</div>
		</nav>
	);
}

export default Home;
