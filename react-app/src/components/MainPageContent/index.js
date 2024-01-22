import { React } from 'react';
import './MainPageContent.css';
import SongIndex from '../../components/SongIndex';
import Albums from '../Albums';

function MainPageContent(){
    const num = 5;
	return (
        <nav>
            <div id="MainPageContentCss">
                <p>Spotify Songs</p>
                <ul className='MainPageFiveSong'>
                        <SongIndex num={num}/>
                </ul>
                <ul className='MainPageFiveAlbum'>
                        <Albums />
                </ul>
            </div>
        </nav>
	);
}

export default MainPageContent;
