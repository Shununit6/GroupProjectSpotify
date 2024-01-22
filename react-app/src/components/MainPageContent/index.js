import { React } from 'react';
import './MainPageContent.css';
import SongIndex from '../../components/SongIndex';

function MainPageContent(){
    const num = 5;
	return (
        <nav>
            <div id="MainPageContentCss">
                <p>Spotify songs</p>
                <ul className='landingSongIndex'>
                        <SongIndex num={num}/>
                </ul>
            </div>
        </nav>
	);
}

export default MainPageContent;
