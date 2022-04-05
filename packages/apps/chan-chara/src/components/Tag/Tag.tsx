import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box } from '@chan-chala/uikit';
import { SearchContext } from 'src/contexts/SearchContext';
import { tag } from '../../../types/tag';

interface ITag {
  tagsData: Array<tag>;
}
interface ITagParams {
  name: string;
}
const Tag: React.FC<ITag> = ({ tagsData }: ITag) => {
  const history = useHistory();
  const { setInputSearch, setValueSearch } = useContext(SearchContext);
  const tagName = useParams<ITagParams>();
  const handleTagClick = (name: string): void => {
    setInputSearch('');
    setValueSearch('');
    history.push(`/tag/${name}`);
  };

  /* eslint no-underscore-dangle: 0 */
  return (
    <div className="flex flex-wrap gap-4 justify-start p-3 ml-6  lg:justify-start break-all">
      {tagsData &&
        tagsData.map((tagData) => {
          return (
            <Box
              key={tagData.tag}
              className={`py-1 px-3 text-2xl sm:text-3xl lg:text-4xl  rounded-xl shadow-sm ${
                tagData.tag === tagName.name &&
                ' from-green-500 bg-gradient-to-bl'
              }`}
            >
              <button
                type="button"
                key={tagData.tag}
                onClick={() => handleTagClick(tagData.tag)}
              >
                {tagData.tag}
              </button>
            </Box>
          );
        })}
    </div>
  );
};
export default Tag;
