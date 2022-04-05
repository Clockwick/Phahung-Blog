/* eslint-disable*/
import React from 'react';
import {
  CodeBlock,
  DelimiterBlock,
  EmbedBlock,
  HeaderBlock,
  ImageBlock,
  ParagraphBlock,
  QuoteBlock,
  TableBlock,
  ListBlock,
} from 'editorjs-blocks-react-renderer';

export interface ConfigProp {
  [s: string]: {
    [s: string]: any;
  };
}

export interface RenderersProp {
  [s: string]: any;
}

export interface Block {
  type: string;
  data: {
    [s: string]: any;
  };
  tunes?: {
    [s: string]: any;
  };
}

export interface DataProp {
  time: number;
  version: string;
  blocks: Block[];
}

const Blocks = ({
  data,
  config = {},
  renderers = {},
}: {
  data: DataProp;
  config?: ConfigProp;
  renderers?: RenderersProp;
}) => {
  const defaultRenderers = {
    code: CodeBlock,
    delimiter: DelimiterBlock,
    embed: EmbedBlock,
    header: HeaderBlock,
    image: ImageBlock,
    list: ListBlock,
    paragraph: ParagraphBlock,
    quote: QuoteBlock,
    table: TableBlock,
  };

  const availableRenderers = {
    ...defaultRenderers,
    ...renderers,
  };

  return (
    <>
      {data?.blocks?.map((block, i) => {
        if (block.type.toString() in availableRenderers) {
          let className: string = '';
          switch (block?.tunes?.alignmentBlockTune?.alignment) {
            case 'left':
              className += 'text-left';
              break;
            case 'right':
              className += 'text-right';
              break;
            case 'center':
              className += 'text-center';
              break;
          }
          if (config[block.type]?.className) {
            className += ' ' + config[block.type].className;
          }

          if (block.data.text === '') {
            block.data.text = 'ㅤ'; // Invisible character, Do not touch it!!!
          }

          if (block.data.level === 1) {
            className += ' text-5xl font-bold mt-10 mb-3';
          } else if (block.data.level === 2) {
            className += ' text-4xl font-bold mt-10 mb-3';
          } else if (block.data.level === 3) {
            className += ' text-3xl font-bold mt-10 mb-3';
          }
          // @ts-ignore Todo: find a fix
          const Tag = availableRenderers[block.type];
          return (
            <Tag
              key={i}
              data={block.data}
              {...config[block.type]}
              className={className}
            />
          );
        }
      })}
    </>
  );
};
export default Blocks;
