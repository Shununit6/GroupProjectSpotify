import { React } from 'react';
import './MainPageContent.css';
import SongIndex from '../../components/SongIndex';
import Albums from '../Albums';

function MainPageContent(){
    const num = 5;
	return (
        <nav>
            <div id="MainPageContentCss">
                <div>
                <p>Spotify Songs</p>
                <ul className='MainPageFiveSong'>
                        <SongIndex num={num}/>
                </ul>
                </div>
                <div>
                    <p>Spotify Albums</p>
                    <ul className='MainPageFiveAlbum'>
                            <Albums num={num}/>
                    </ul>
                </div>
            </div>
        </nav>
	);
}

export default MainPageContent;
