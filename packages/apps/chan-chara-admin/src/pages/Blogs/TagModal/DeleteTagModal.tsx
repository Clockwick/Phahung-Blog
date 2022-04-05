import React, { useEffect, useState } from 'react';
import { Select, useToast } from '@chakra-ui/react';
import { Button, Modal } from '@chan-chala/uikit';
import tagApiCall from 'api/Tag/tag';
import { AxiosResponse } from 'axios';
import { ToastTrigger } from 'components/Toasts';
import { blogApiCall } from '../../../api';
import { ITags, NonStatusTag, Tag } from '../types';

type Props = {
  handleDismiss?: () => void | undefined;
};

const defaultProps = {
  handleDismiss: undefined,
};

const deleteTagModal: React.FC<Props> = ({
  handleDismiss = () => undefined,
}) => {
  /* eslint-disable */
  const toast = useToast();
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [didFetchTags, setDidFetchTags] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    'เกิดข้อผิดพลาดขึ้นโปรดลองใหม่อีกครั้ง',
  );

  const [selectedTag, setSelectedTag] = useState<NonStatusTag>();

  const handleDeleteTag = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (selectedTag === undefined) {
      setIsError(true);
      setErrorMsg('กรุณาเลือกหมวดหมู่ที่ต้องการลบ');
      return;
    }
    setIsError(false);
    tagApiCall
      .deleteTag(selectedTag._id)
      .then((res) => {
        if (res.status === 200) {
          handleDismiss();
          toast(
            ToastTrigger.deleteTagSuccess(`ลบหมวดหมู่ "${selectedTag.tag}"`),
          );
        }
      })
      .catch(() => {
        setIsError(true);
      });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const select = e.currentTarget;
    const id = select.children[select.selectedIndex].id;
    setSelectedTag({
      _id: id,
      tag: e.currentTarget.value,
    } as NonStatusTag);
  };

  useEffect(() => {
    if (!didFetchTags)
      blogApiCall
        .getAllTags()
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const responseData = res.data as ITags;
            setTags(responseData.tags);
            setDidFetchTags(true);
          }
        })
        .catch(() => setIsError(true));
  }, [didFetchTags]);

  return (
    <Modal title="กรุณาเลือกหมวดหมู่ที่ต้องการลบ" handleDismiss={handleDismiss}>
      <div className="flex flex-col justify-center items-center space-y-6">
        <Select placeholder="เลือกหมวดหมู่" onChange={handleOnChange}>
          {tags.map((tag) => (
            <option key={tag._id} value={tag.tag} id={tag._id}>
              {tag.tag}
            </option>
          ))}
        </Select>
        {isError ? <div className="text-red-600">{errorMsg}</div> : null}
        <Button
          size="md"
          color="red"
          type="button"
          border={false}
          onClick={handleDeleteTag}
        >
          ลบหมวดหมู่
        </Button>
      </div>
    </Modal>
  );
};

deleteTagModal.defaultProps = defaultProps;

export default deleteTagModal;
