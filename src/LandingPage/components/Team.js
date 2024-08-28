// components/Team.js
import React from 'react';
import './Team.css';

// Import team member images
import member1 from '../../assets/member1.jpg';
import member2 from '../../assets/member2.jpg';
import member3 from '../../assets/member3.jpg';

const Team = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      position: 'Lead Photographer',
      image: member1,
      description: 'John has over 10 years of experience in capturing the most beautiful moments.',
    },
    {
      name: 'Jane Smith',
      position: 'Videographer',
      image: member2,
      description: 'Jane specializes in creating stunning wedding videos that tell a unique story.',
    },
    {
      name: 'Michael Brown',
      position: 'Photo Editor',
      image: member3,
      description: 'Michael is a master in post-processing, ensuring each photo is a work of art.',
    },
  ];

  return (
    <section id="team" className="team">
      <div className="team-container">
        <h2 className="team-title">Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <img src={member.image} alt={member.name} className="team-image" />
              <h3 className="team-name">{member.name}</h3>
              <p className="team-position">{member.position}</p>
              <p className="team-description">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
