import { useToast } from '@chakra-ui/react';
import { Button, Modal, Input } from '@chan-chala/uikit';
import tagApiCall from 'api/Tag/tag';
import { ToastTrigger } from 'components/Toasts';
import React, { useState } from 'react';

type Props = {
  handleDismiss?: () => void | undefined;
};

const defaultProps = {
  handleDismiss: undefined,
};

const AddTagModal: React.FC<Props> = ({ handleDismiss = () => undefined }) => {
  /* eslint-disable */
  const [tagName, setTagName] = useState('' as string);
  const toast = useToast();

  const [errorMsg, setErrorMsg] = useState(
    'อนุญาตเฉพาะตัวอักษรอังกฤษหรือไทยเท่านั้น',
  );
  const [isError, setIsError] = useState(false as boolean);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTagName(e.currentTarget.value);
  };

  const handleCreateTag = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (!validateTagName(tagName)) {
      setErrorMsg('อนุญาตเฉพาะตัวอักษรอังกฤษหรือไทยเท่านั้น');
      setIsError(true);
      return;
    }
    setIsError(false);
    tagApiCall
      .createNewTag(tagName)
      .then((res) => {
        if (res.status === 201) {
          handleDismiss();
          toast(ToastTrigger.createTagSuccess(`สร้างหมวดหมู่ "${tagName}"`));
        }
      })
      .catch(() => {
        setErrorMsg('เกิดปัญหาขึ้นกับค่าที่กรอกเข้ามา กรุณาลองใหม่อีกครั้ง');
        setIsError(true);
      });
  };

  const validateTagName = (newTag: string): boolean => {
    const re = /^([\u0E00-\u0E7Fa-zA-Z]+\s)*[\u0E00-\u0E7Fa-zA-Z]+$/;
    return re.test(String(newTag).toLowerCase());
  };
  return (
    <Modal title="กรุณากรอกหมวดหมู่" handleDismiss={handleDismiss}>
      <div className="flex flex-col justify-center items-center space-y-6">
        <Input placeholder="หมวดหมู่..." size="lg" onChange={handleOnChange} />
        {isError ? <div className="text-red-600">{errorMsg}</div> : null}
        <Button
          size="md"
          color="green"
          type="button"
          border={false}
          onClick={handleCreateTag}
        >
          เพิ่มหมวดหมู่
        </Button>
      </div>
    </Modal>
  );
};

AddTagModal.defaultProps = defaultProps;

export default AddTagModal;
