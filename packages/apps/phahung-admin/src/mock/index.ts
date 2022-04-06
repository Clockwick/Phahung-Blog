import type EditorJS from '@editorjs/editorjs';

export const MOCK_BLOG_DATA: EditorJS.OutputData = {
  time: 1631243528604,
  blocks: [
    {
      id: 'aEb-xdcaKt',
      type: 'header',
      data: {
        text: 'บทความทดสอบ',
        level: 1,
      },
      tunes: {
        alignmentBlockTune: {
          alignment: 'left',
        },
      },
    },
    {
      id: 'N1nVFj4CdY',
      type: 'paragraph',
      data: {
        text: 'เขียนโดย คนดี อีสปอร์ต',
      },
      tunes: {
        alignmentBlockTune: {
          alignment: 'right',
        },
      },
    },
    {
      id: 'hM3wubVGmB',
      type: 'paragraph',
      data: {
        text: '<b>ข้อความ</b>',
      },
      tunes: {
        alignmentBlockTune: {
          alignment: 'left',
        },
      },
    },
    {
      id: 'sfoCqN3Ebf',
      type: 'paragraph',
      data: {
        text: '<i>ข้อความ</i>',
      },
      tunes: {
        alignmentBlockTune: {
          alignment: 'left',
        },
      },
    },
    {
      id: 'yInQhcNjpa',
      type: 'paragraph',
      data: {
        text: '<u class="cdx-underline">ข้อความ</u>',
      },
      tunes: {
        alignmentBlockTune: {
          alignment: 'left',
        },
      },
    },
    {
      id: '2alggRvvyH',
      type: 'paragraph',
      data: {
        text: '<del class="cdx-strikethrough">ข้อความ</del>',
      },
      tunes: {
        alignmentBlockTune: {
          alignment: 'left',
        },
      },
    },
    {
      id: 'vDVW8MhzS1',
      type: 'paragraph',
      data: {
        text: '<code class="inline-code">ข้อความ</code>',
      },
      tunes: {
        alignmentBlockTune: {
          alignment: 'left',
        },
      },
    },
    {
      id: 'ufZoIxI164',
      type: 'paragraph',
      data: {
        text: '<a href="http://www.google.com">ข้อความ</a>',
      },
      tunes: {
        alignmentBlockTune: {
          alignment: 'left',
        },
      },
    },
    {
      id: 'cGtelMcd_F',
      type: 'quote',
      data: {
        text: 'ความพยายามอยู่ที่ไหน?<br>',
        caption: 'หยาง',
        alignment: 'left',
      },
    },
    {
      id: '348VqazbKA',
      type: 'code',
      data: {
        code: '#include<iostream>\n\nusing namespace std;\n\nint main(){\n  return 0;\n}',
      },
    },
    {
      id: 'vmXU6K8_gi',
      type: 'list',
      data: {
        style: 'ordered',
        items: [
          {
            content: 'รายการ 1',
            items: [
              {
                content: 'รายการ 1.1',
                items: [],
              },
              {
                content: 'รายการ 1.2',
                items: [
                  {
                    content: 'รายการ 1.3',
                    items: [],
                  },
                ],
              },
            ],
          },
          {
            content: 'รายการ 2',
            items: [
              {
                content: 'รายการ 2.1',
                items: [],
              },
            ],
          },
          {
            content: 'รายการ 3',
            items: [],
          },
        ],
      },
    },
    {
      id: 'sIbwP3ld4O',
      type: 'delimiter',
      data: {},
    },
    {
      id: 'LXBZ4fgQTo',
      type: 'embed',
      data: {
        service: 'youtube',
        source: 'https://www.youtube.com/watch?v=AdJ2Sy8xO6o',
        embed: 'https://www.youtube.com/embed/AdJ2Sy8xO6o',
        width: 580,
        height: 320,
        caption: '',
      },
    },
    {
      id: '_m6ad3S0x0',
      type: 'paragraph',
      data: {
        text: '',
      },
      tunes: {
        alignmentBlockTune: {
          alignment: 'left',
        },
      },
    },
  ],
  version: '2.22.2',
};
