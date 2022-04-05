import React, { useCallback, useMemo } from 'react';

interface IHelmetContext {
  title: string;
  description: string;
  image: string;
  embedVideo: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setEmbedVideo: React.Dispatch<React.SetStateAction<string>>;
  resetHelmet: () => void;
}

export const HelmetContext = React.createContext({} as IHelmetContext);

export const HelmetProvider: React.FC = ({ children }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [embedVideo, setEmbedVideo] = React.useState('');

  const resetHelmet = useCallback(() => {
    setTitle('');
    setDescription('');
    setImage('');
    setEmbedVideo('');
  }, [setTitle, setDescription, setImage, setEmbedVideo]);

  const value = useMemo(() => {
    return {
      title,
      description,
      image,
      embedVideo,
      setTitle,
      setImage,
      setDescription,
      setEmbedVideo,
      resetHelmet,
    };
  }, [title, description, image, embedVideo, resetHelmet]);

  return (
    <HelmetContext.Provider value={value}>{children}</HelmetContext.Provider>
  );
};
