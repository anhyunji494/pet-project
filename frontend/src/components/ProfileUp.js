import * as React from "react";
import "./ProfileUp.css"

function ProfileImage({ src, alt }) {
  return <img src={src} alt={alt} className="profile-image" />;
}

function ProfileInfo({ name, title }) {
  return (
    <div className="profile-info">
      <h2 className="name">{name}</h2>
      <p className="title">{title}</p>
    </div>
  );
}

function Profile({ imageSrc, imageAlt, name, title }) {
  return (
    <div className="profile">
      <ProfileImage src={imageSrc} alt={imageAlt} />
      <ProfileInfo name={name} title={title} />
    </div>
  );
}

function ProfileUp() {
  const profileData = [
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/00c716e809c8130e425f5854de23d09ab4e21893ea664222d23dc1b581a62640?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&",
      imageAlt: "Profile picture of Jane Cooper",
      name: "Jane Cooper",
      title: "Medical Assistant",
    },
  ];

  return (
    <>
      <div className="profile-container">
        {profileData.map((profile, index) => (
          <Profile
            key={index}
            imageSrc={profile.imageSrc}
            imageAlt={profile.imageAlt}
            name={profile.name}
            title={profile.title}
          />
        ))}
      </div>
      </>
      );
      }

export default ProfileUp