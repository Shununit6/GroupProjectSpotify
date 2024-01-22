import { React } from 'react';
import './MainPageContent.css';
import SongIndex from '../../components/SongIndex';
import Albums from '../Albums';

function MainPageContent(){
    const num = 5;
	return (
        <nav>
            <div id="MainPageContentCss">
                <p>Spotify songs</p>
                <ul className='MainPageFiveSong'>
                        <SongIndex num={num}/>
                </ul>
                <p>Spotify albums</p>
                <ul className='MainPageFiveAlbum'>
                        <Albums />
                </ul>
            </div>
        </nav>
	);
}

export default MainPageContent;
