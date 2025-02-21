interface ProfilePictureProps {
    src: string;
    alt?: string;
  }
  
  const ProfilePicture = ({ src, alt = "Profile Picture" }: ProfilePictureProps) => {
    return (
      <div className="flex items-center">
        <img
          src={src}
          alt={alt}
          className="w-40 h-40 rounded-full object-cover"
        />
      </div>
    );
  };
  
  export default ProfilePicture;
  