import React from 'react';
import MenuLibrary from '../MenuLibrary';
import './AboutUsPage.css';


const programmers = [
  {
    id: 1,
    name: 'Shun Xu',
    bio: 'Shun is a Software Engineer',
    linkedin: 'https://www.linkedin.com/in/shun-xu-a0895918b/',
    imageUrl: 'https://media.licdn.com/dms/image/D5603AQF7GKevJBFihA/profile-displayphoto-shrink_200_200/0/1668450099793?e=1717027200&v=beta&t=iSfZVSEEYr-_vZiz6J1IVBPGnjPIDXvzg3bQBSzSTBk' // Add path to the image file
  },
  {
    id: 2,
    name: 'Devin Richards',
    bio: 'Devin is a Full Stack Developer',
    linkedin: 'https://www.linkedin.com/in/devin-richards-74ba3222a/',
    imageUrl: 'https://media.licdn.com/dms/image/D4E35AQHcwj3hMNsaVA/profile-framedphoto-shrink_200_200/0/1676350517008?e=1712430000&v=beta&t=ej5L6d4RrLOv4BNz3EUvc8atBuiLj4r69zEVDNZ2Yjg'
  },
  {
    id: 3,
    name: 'Tiffany Liu',
    bio: 'Tiffany is a Senior Electrical Engineer (PE) at HDR',
    linkedin: 'https://www.linkedin.com/in/tiffanyliu2008/',
    imageUrl: 'https://media.licdn.com/dms/image/C5603AQGnd_VL01tBLQ/profile-displayphoto-shrink_200_200/0/1642576210337?e=1717027200&v=beta&t=cHhZCNmWhukoTAB5ckhfx0Ieh209Wiqr7nQQUmwat4o'
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
