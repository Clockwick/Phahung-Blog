import { Button } from '@chan-chala/uikit';
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

interface IUploadBlogButton {
  onClick: (status: string) => void;
}
const UploadBlogButton: React.FC<IUploadBlogButton> = ({ onClick }) => {
  const { blogId } = useParams<{ blogId: string }>();
  const { push } = useHistory();
  return (
    <div className="flex justify-center mt-8 mb-4 space-x-4 w-full text-4xl font-bold">
      {blogId && (
        <Button
          size="lg"
          color="gray"
          type="button"
          border={false}
          onClick={() => push(`/preview/${blogId}`)}
        >
          Preview
        </Button>
      )}
      <Button
        size="lg"
        color="gray"
        type="button"
        border={false}
        onClick={() => onClick('draft')}
      >
        บันทึกฉบับร่าง
      </Button>
      <Button
        size="lg"
        color="blue"
        type="button"
        border={false}
        onClick={() => onClick('publish')}
      >
        โพสบทความ
      </Button>
    </div>
  );
};

export default UploadBlogButton;
