import React from 'react';
import './Home.css';
import MenuLibrary from '../MenuLibrary';
import MainPageContent from '../MainPageContent';

function Home(){

	return (
		<nav>
			<div className="homewrapper">
                <div className="homeitem-1">
                    <MenuLibrary />
                </div>
                <div className="homeitem-2">
                    <MainPageContent />
                </div>
			</div>
		</nav>
	);
}

export default Home;
