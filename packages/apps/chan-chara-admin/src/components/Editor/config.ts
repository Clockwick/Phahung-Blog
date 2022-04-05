import AlignmentBlockTune from 'editorjs-text-alignment-blocktune';

import Underline from '@editorjs/underline';
import InlineCode from '@editorjs/inline-code';
import Strikethrough from 'editorjs-strikethrough';

import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Code from '@editorjs/code';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';

import type EditorJS from '@editorjs/editorjs';
import blogApiCall from 'api/Blog/blog';
import { IUploadResponse } from './types';

export const EDITOR_JS_TOOLS: EditorJS.ToolConfig = {
  alignmentBlockTune: {
    class: AlignmentBlockTune,
    config: {
      default: 'left',
    },
  },

  paragraph: {
    class: Paragraph,
    inlineToolbar: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'inlineCode',
      'link',
    ],
    config: {
      preserveBlank: true,
    },
    tunes: ['alignmentBlockTune'],
  },
  header: {
    class: Header,
    inlineToolbar: ['bold', 'italic', 'underline'],
    config: {
      levels: [1, 2, 3],
      defaultLevel: 1,
    },
    tunes: ['alignmentBlockTune'],
  },
  quote: {
    class: Quote,
    inlineToolbar: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'inlineCode',
      'link',
    ],
    config: {
      quotePlaceholder: 'คำกล่าว',
      captionPlaceholder: 'ผู้เเต่ง',
    },
  },
  code: {
    class: Code,
    config: {
      placeholder: 'โค้ด',
    },
  },
  list: {
    class: List,
    inlineToolbar: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'inlineCode',
      'link',
    ],
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file: File) {
          return blogApiCall.uploadByFile(file).then((res) => {
            const responseData: IUploadResponse = res.data as IUploadResponse;
            return {
              success: responseData.success,
              file: {
                url: responseData.file.url,
              },
            };
          });
        },
        async uploadByUrl(url: URL) {
          return blogApiCall.uploadByURL(url).then((res) => {
            const responseData: IUploadResponse = res.data as IUploadResponse;
            return {
              success: responseData.success,
              file: {
                url: responseData.file.url,
              },
            };
          });
        },
      },

      // endpoints: {
      //   byFile: `${import.meta.env.VITE_API_URL}/image/upload/byFile`, // the endpoint that provides image uploading by file
      //   byUrl: `${import.meta.env.VITE_API_URL}/image/upload/byUrl`, // the endpoint that provides image uploading by Url
      // },
      buttonContent: 'เพิ่มรูปภาพ',
      captionPlaceholder: 'เเคปชั่น',
    },
  },
  delimiter: {
    class: Delimiter,
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        twitter: true,
        instagram: true,
        facebook: true,
        pinterest: true,
      },
    },
  },

  underline: {
    class: Underline,
    shortcut: 'CMD+U',
  },
  inlineCode: {
    class: InlineCode,
    shortcut: 'CMD+SHIFT+M',
  },
  strikethrough: {
    class: Strikethrough,
    shortcut: 'CMD+SHIFT+X',
  },
};
