import React from 'react';
import MenuLibrary from '../MenuLibrary';
import './AboutUsPage.css';


const programmers = [
  {
    id: 1,
    name: 'Shun Xu',
    bio: 'Shun is a Software Engineer',
    linkedin: 'https://www.linkedin.com/in/shun-xu-a0895918b/',
    imageUrl: 'https://avatars.githubusercontent.com/u/29720392?v=4' // Add path to the image file
  },
  {
    id: 2,
    name: 'Devin Richards',
    bio: 'Devin is a Full Stack Developer',
    linkedin: 'https://www.linkedin.com/in/devin-richards-74ba3222a/',
    imageUrl: 'https://avatars.githubusercontent.com/u/116513656?v=4'
  },
  {
    id: 3,
    name: 'Tiffany Liu',
    bio: 'Tiffany is a Software Engineer',
    linkedin: 'https://www.linkedin.com/in/tiffanyliu2008/',
    imageUrl: 'https://avatars.githubusercontent.com/u/126553760?v=4'
  }
];

// AboutUsPage component
function AboutUsPage() {
  return (
    <>
    <div className="homeitem-1">
      <MenuLibrary />
    </div>
    <div className="about-us">
      <h1>Meet Our Programmers</h1>
      <div className="programmers">
        {programmers.map(programmer => (
          <div className="programmer" key={programmer.id}>
            <img src={programmer.imageUrl} alt={programmer.name} />
            <div className="bio">
              <h2>{programmer.name}</h2>
              <p className="hidden-bio">{programmer.bio}</p>
              <a href={programmer.linkedin} target="_blank" rel="noopener noreferrer">Contact {programmer.name.split(' ')[0]}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default AboutUsPage;
