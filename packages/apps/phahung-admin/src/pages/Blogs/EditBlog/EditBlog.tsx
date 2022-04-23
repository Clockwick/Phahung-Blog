import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useUser } from 'store/hooks/userHook';
import type EditorJS from '@editorjs/editorjs';
import { Chip } from '@chan-chala/uikit';
import { Editor } from 'components/.';
import { HelpButton, UploadBlogButton } from 'components/Button';
import { useToast } from '@chakra-ui/react';

import { ToastTrigger } from 'components/Toasts';
import { blogApiCall } from '../../../api';
import { IBlogResponse, IEditBlogPayload } from './types';
import { ITags, NonStatusTag, Tag } from '../types';
import ImageGuideLine from './config';

interface Params {
  blogId: string;
}

const EditBlog: React.FC = () => {
  const toast = useToast();
  const { blogId } = useParams<Params>();
  const { user } = useUser();
  const [didFetchContent, setDidFetchContent] = useState<boolean>(false);
  const [content, setContent] = useState<EditorJS.OutputData>(
    {} as EditorJS.OutputData,
  );
  const [imagePath, setImagePath] = useState<string>('');
  const history = useHistory();
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [didFetchTags, setDidFetchTags] = useState(true);
  const [tagsWithStatus, setTagsWithStatus] = useState<string[]>([]);
  const [isTagsLoading, setIsTagsLoading] = useState(false);

  // const updateTagsStatus = useCallback(() => {
  //   tags.forEach((tag) => {
  //     tagsWithStatus.forEach((tagWithStatus) => {
  //       if (tagWithStatus.name === tag.name) {
  //         const targetTag = tags.filter((cTag) => cTag.id === tag.id)[0] as Tag;
  //         targetTag.status = true;
  //         const leftedTags = tags.filter((cTag) => cTag.id !== tag.id) as Tag[];
  //         setTags([targetTag, ...leftedTags]);
  //       }
  //     });
  //   });
  // }, [tags, tagsWithStatus]);

  const saveSessionImagePath = (newImagePath: string): void => {
    sessionStorage.setItem('imagePath', newImagePath);
  };

  const deleteSessionImagePath = (): void => {
    sessionStorage.removeItem('imagePath');
  };

  useEffect(() => {
    if (!didFetchContent) {
      blogApiCall.getBlogById(blogId).then((res) => {
        if (res.status === 200) {
          const responseData = res.data;
          // setImagePath(responseData.blog.imagePath);
          // saveSessionImagePath(responseData.blog.imagePath);
          setTagsWithStatus(responseData.tags);
          setContent(responseData.content);
          setDidFetchContent(true);
          setDidFetchTags(false);
        }
      });
    }
  }, [didFetchContent, blogId]);

  /* eslint-disable */
  // useEffect(() => {
  //   if (didFetchContent && didFetchTags) {
  //     updateTagsStatus();
  //   }
  // }, [didFetchContent, didFetchTags]);
  /* eslint-enable */

  /* Update Tag UI when tapping */
  useEffect(() => {
    setIsTagsLoading(false);
  }, [tags, isTagsLoading]);

  const convertToTagsWithStatus = (inputTags: Array<Tag>): Array<Tag> => {
    return inputTags.map((tag) => {
      if (tagsWithStatus.includes(tag.name)) {
        return {
          ...tag,
          status: true,
        };
      }
      return {
        ...tag,
        status: false,
      };
    });
  };

  const deleteStatusFromTags = (inputTags: Array<Tag>): Array<string> => {
    /* eslint no-underscore-dangle: 0 */
    return inputTags.map((tag) => tag.name);
  };

  useEffect(() => {
    if (!didFetchTags)
      blogApiCall.getAllTags().then((res) => {
        if (res.status === 200) {
          const responseTags = res.data;
          const initialTagsWithStatus = convertToTagsWithStatus(responseTags);
          setTags(initialTagsWithStatus);
          setDidFetchTags(true);
        }
      });
  }, [setTagsWithStatus, tagsWithStatus, didFetchTags]);

  const handleOnClick = (status: string): void => {
    /**
     * Create Blog
     * @param {keyword, titleImage, EditorJS.OutputData, tags, status}
     * @return {success, keyword, titleImage, EditorJS.OutputData, tags, status}
     */

    /* eslint-disable */
    try {
      /* Filter keyword from first seen header or paragraph and also convert to plain text. */
      const keyword = content.blocks
        .find((block) => block.type === 'header' || block.type === 'paragraph')
        ?.data.text.replace(/<[^>]+>/g, '')!;

      /* Remove status from active tag */
      const rawTags = deleteStatusFromTags(tags.filter((tag) => tag.status));

      /* Filter titleImage from first seen image */
      const titleImage = content.blocks.find((block) => block.type === 'image')
        ?.data.file.url!;

      const payload: IEditBlogPayload = {
        keyword,
        titleImage,
        content,
        tags: rawTags,
        status,
        _id: blogId,
        author: user!.firstName,
        __v: 0,
        imagePath,
      };

      blogApiCall
        .editBlog(payload, blogId)
        .then((res) => {
          if (res.status === 200) {
            history.push(`/blogs`);
          }
          // deleteSessionImagePath();
          // history.push('/blogs');
          toast(
            ToastTrigger.editBlogSuccess(`แก้ไขบทความชื่อ "${keyword}" สำเร็จ`),
          );
          // if (res.status === 201) history.push('/blogs');
        })
        .catch(() => {
          toast(
            ToastTrigger.editBlogFail(
              `เกิดข้อผิดพลาดในการแก้ไขบทความชื่อ "${keyword}"`,
            ),
          );
        });
    } catch (error) {
      toast(ToastTrigger.editBlogEmpty());
    }
  };

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

  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center">
        <span className="mt-8 mb-4 text-4xl font-bold">เเก้ไขบทความ</span>
        <HelpButton
          id="img-instruction-edit"
          className="mt-8 mb-4 ml-2"
          value={<ImageGuideLine />}
          place="right"
        />
      </div>

      <div className="flex flex-wrap justify-center items-center mt-4 mb-4 space-x-4 w-full">
        <div className="font-bold min-w-[70px] h-6">หมวดหมู่ :</div>
        {didFetchTags &&
          tags.map((tag, index) => (
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
      {didFetchContent && (
        <Editor
          placeholder="เขียนบทความ ..."
          initialData={content}
          callback={setContent}
        />
      )}
      <UploadBlogButton onClick={handleOnClick} />
    </div>
  );
};

export default EditBlog;
