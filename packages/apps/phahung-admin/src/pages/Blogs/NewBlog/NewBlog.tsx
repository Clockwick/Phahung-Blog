/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Editor } from 'components/.';
import type EditorJS from '@editorjs/editorjs';
import { Chip, Input } from '@chan-chala/uikit';
import { HelpButton, UploadBlogButton } from 'components/Button';
import { v4 as uuidv4 } from 'uuid';

import { ToastTrigger } from 'components/Toasts';
import { useToast } from '@chakra-ui/react';
import { useUser } from 'store/hooks/userHook';
import { blogApiCall } from '../../../api';
import { ITags, NonStatusTag, Tag } from '../types';
import { INewBlogPayload } from './types';
import ImageGuideLine from '../EditBlog/config';

const NewBlog: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const { user } = useUser();
  const [content, setContent] = useState({} as EditorJS.OutputData);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [didFetchTags, setDidFetchTags] = useState(false as boolean);
  const imagePath = uuidv4();
  const [isTagsLoading, setIsTagsLoading] = useState(false);
  const [author, setAuthor] = useState(user ? user.firstName : '');

  const saveSessionImagePath = (newimagePath: string): void => {
    sessionStorage.setItem('imagePath', newimagePath);
  };

  const deleteSessionImagePath = (): void => {
    sessionStorage.removeItem('imagePath');
  };

  const convertToTagsWithStatus = (inputTags: Array<Tag>): Array<Tag> => {
    const result = inputTags.map((tag) => ({
      ...tag,
      status: false,
    }));
    return result;
  };

  const deleteStatusFromTags = (inputTags: Array<Tag>): Array<string> => {
    /* eslint no-underscore-dangle: 0 */
    return inputTags.map((tag) => {
      const { name } = tag;
      return name;
    });
  };
  useEffect(() => {
    if (!didFetchTags) {
      blogApiCall.getAllTags().then((res) => {
        if (res.status === 200) {
          const responseTags: Tag[] = res.data as Tag[];
          // const initialTagsWithStatus = convertToTagsWithStatus(
          //   responseData.tags,
          // );
          // saveSessionImagePath(imagePath);
          // setTags(initialTagsWithStatus);
          setTags(responseTags);
          setDidFetchTags(true);
        }
      });
    }
  }, [didFetchTags]);

  useEffect(() => {
    // Update Tag UI when tapping
    setIsTagsLoading(false);
  }, [tags, isTagsLoading]);

  const handleTagsChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    status: boolean,
  ): void => {
    setIsTagsLoading(true);
    /**
     *  Instead of iterate through tag arrays for checking updated status which is O(n),
     *  Change it at target index, so O(1)
     * */
    const key = parseInt(e.currentTarget.id, 10);
    tags[key].status = !status;
    setTags(tags);
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setAuthor(e.currentTarget.value);
  };

  const validateAuthorName = (authorName: string): boolean => {
    const re = /^([\u0E00-\u0E7Fa-zA-Z]+\s)*[\u0E00-\u0E7Fa-zA-Z]+$/;
    return re.test(String(authorName).toLowerCase());
  };

  const handleOnClick = (status: string): void => {
    /**
     * Create Blog
     * @param {keyword, titleImage, EditorJS.OutputData, tags, status}
     * @return {success, keyword, titleImage, EditorJS.OutputData, tags, status}
     */

    /* eslint-disable */
    try {
      /* Filter keyword from first seen header or paragraph and also convert to plain text. */
      const title = content.blocks
        .find((block) => block.type === 'header' || block.type === 'paragraph')
        ?.data.text.replace(/<[^>]+>/g, '')!;

      /* Remove status from active tag */
      const rawTags = deleteStatusFromTags(tags.filter((tag) => tag.status));

      /* Filter titleImage from first seen image */
      const image = content.blocks.find((block) => block.type === 'image')?.data
        .file.url!;

      if (!validateAuthorName(author)) {
        throw new Error('Author name is not valid');
      }

      const payload: INewBlogPayload = {
        title,
        image,
        content,
        tags: rawTags,
        status,
        // imagePath: uuidv4(),
        author,
      };
      console.log(payload);
      blogApiCall
        .createNewBlog(payload)
        .then((res) => {
          if (res.status === 201) {
            // deleteSessionImagePath();
            toast(
              ToastTrigger.createBlogSuccess(
                `บทความชื่อ "${title}" ได้ถูกสร้างขึ้น`,
              ),
            );
            history.push('/blogs');
          }
        })
        .catch(() => {
          toast(
            ToastTrigger.createBlogFail(
              `เกิดข้อผิดพลาดในการสร้างบทความชื่อ "${title}"`,
            ),
          );
        });
    } catch (error) {
      toast(ToastTrigger.createBlogEmpty());
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-center items-center">
          <span className="mt-8 mb-4 text-4xl font-bold">สร้างบทความ</span>
          <HelpButton
            id="img-instruction-new"
            className="mt-8 mb-4 ml-2"
            value={<ImageGuideLine />}
            place="right"
          />
        </div>
        <div className="flex flex-wrap justify-center items-center my-4 space-x-4 w-full">
          <div className="font-bold min-w-[70px] h-6">หมวดหมู่ :</div>
          {/* {didFetchTags &&
            tags.map((tag, index) => (
              <Chip
                id={index.toString()}
                status={tag.status}
                key={tag.id}
                onClick={(e) => handleTagsChange(e, tag.status)}
              >
                {tag.tag}
              </Chip>
            ))} */}
          {tags.map((tag, index) => (
            <Chip
              id={index.toString()}
              status={tag.status}
              key={tag.id}
              onClick={(e) => handleTagsChange(e, tag.status)}
            >
              {tag.name}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-center my-4 space-x-4 w-full">
          <div className="font-bold min-w-[70px] h-6">
            เขียนโดย (จำเป็น*) :{' '}
          </div>
          <Input
            placeholder="ชื่อผู้เขียน..."
            size="md"
            onChange={handleOnChange}
          />
        </div>
        <Editor placeholder="เขียนบทความ ..." callback={setContent} />
        <UploadBlogButton onClick={handleOnClick} />
      </div>
    </>
  );
};

export default NewBlog;
