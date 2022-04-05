import React, { useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import getRandomString from 'utils/randomString';
import { CardObj } from './types';
import 'moment/dist/locale/th';

moment.locale('th');

const Card: React.FC<CardObj> = ({
  title,
  description,
  image,
  time,
  id,
  alt = 'ไม่สามารถโหลดรูปภาพได้ในขณะนี้',
}) => {
  const [landScape, setLandScape] = useState(true);
  const history = useHistory();
  const parseHTML = (s: string): string => {
    return s?.replaceAll(/<.+?>/g, '').replaceAll(/&.*;/g, ' ');
  };

  const plainTitle = parseHTML(title);
  const plainDescription = parseHTML(description);

  function getMeta(url: string): void {
    const img = new Image();
    img.onload = function checkSize() {
      if (img.height > img.width) setLandScape(false);
    };
    img.src = url;
  }

  getMeta(image);

  const handleNavigation = (): void => {
    const titleForURL = title.replace(new RegExp(' ', 'g'), '-');
    history.push(`/blog/${parseHTML(titleForURL)}-${id}-${getRandomString(5)}`);
  };

  const isDefaultImage = image.split('/').pop() === 'Default.jpg';
  return (
    <div className="bg-white rounded-lg shadow-lg transition duration-300 ease-in-out lg:max-h-[450px] transform md:w-full lg:w-4/5 hover:bg-gray-400 hover:scale-105 hover:translate-y-4">
      <div
        onClick={handleNavigation}
        onKeyDown={handleNavigation}
        role="button"
        tabIndex={0}
      >
        <div className="lg:flex lg:flex-row">
          <div>
            <img
              alt={alt}
              src={image}
              className={` ${
                isDefaultImage && 'object-contain bg-white'
              }  object-contain w-full h-[200px] md:h-[300px] lg:max-h-[450px]  lg:min-w-[300px] lg:max-w-[300px]  xl:min-w-[450px]  xl:max-w-[450px] 2xl:min-w-[550px] 2xl:max-w-[550px]  ${
                !landScape &&
                'lg:h-[300px] lg:min-w-[300px] lg:max-w-[300px] xl:min-w-[450px] xl:max-w-[450px] 2xl:min-w-[550px] 2xl:max-w-[550px]'
              } `}
            />
          </div>
          <div className="overflow-hidden break-words lg:text-2xl">
            <div className="flex items-center px-2 mt-2 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline mr-1 w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>{' '}
              <span>{moment(time).add(543, 'year').format('ll')}</span>
            </div>
            <div className="px-3 pb-4">
              <div className="text-xl font-medium md:mt-2 md:text-2xl lg:text-3xl line-clamp-4">
                {plainTitle}
              </div>
              <div className="lg:text-2xl line-clamp-3">{plainDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
