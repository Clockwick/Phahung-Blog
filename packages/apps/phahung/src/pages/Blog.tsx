import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import Comment from 'components/Comment';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button, Container, Stack, Typography } from '@mui/material';
import Blocks from 'editorjs-blocks-react-renderer';
import { makeStyles } from '@mui/styles';

interface IComment {
  id: string;
  content: string;
  likes: number;
}
const useStyles = makeStyles(() => ({
  header: {
    color: 'red',
  },
  image: {
    width: '100px',
  },
  paragraph: {
    color: 'blue',
  },
  figure: {
    width: '100px',
  },
}));
const Blog = () => {
  const classes = useStyles();
  const mockComments = [
    {
      id: '1',
      content: 'สวัสดีฉันคิอ ความคิดเห็นที่ 1 ',
      likes: 5,
    },
    {
      id: '2',
      content: 'สวัสดีฉันคิอ ความคิดเห็นที่ 2 ',
      likes: 5,
    },
    {
      id: '3',
      content: 'สวัสดีฉันคิอ ความคิดเห็นที่ 3 ',
      likes: 5,
    },
    {
      id: '4',
      content: 'สวัสดีฉันคิอ ความคิดเห็นที่ 4 ',
      likes: 5,
    },
  ];
  const mockBlog = {
    time: 1643377728757,
    blocks: [
      {
        id: 'fBlh7pq2kc',
        type: 'header',
        data: {
          text: '“ช่องว่างเงินบำนาญระหว่างเพศ” ความเหลี่ยมล้ำชาย-หญิง ที่สะสมมาถึงบั้นปลายชีวิต',
          level: 1,
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'Mnvyjo3chO',
        type: 'image',
        data: {
          file: {
            url: 'https://firebasestorage.googleapis.com/v0/b/chanchara-7cc75.appspot.com/o/9cffa6e0-f745-4d40-8f39-2f9663377dbe%2Fe6324b86-8553-4e2d-adeb-1b7cf7d5e499.png?alt=media',
          },
          caption: '',
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
      },
      {
        id: '6zELOkXjco',
        type: 'paragraph',
        data: {
          text: '&nbsp;<b>บทความโดย สมานฉันท์ พุทธจักร</b>',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'H7m0pGvOqd',
        type: 'paragraph',
        data: {
          text: 'หลังจากเกษียณจากการทำงานเข้าสู่วัยสูงอายุอย่างเต็มตัว เงินบำนาญเป็นสิ่งสำคัญ ที่เป็นหลักประกันว่าเราจะสามารถใช้ชีวิตวัยชราได้อย่างมีความสุขเพียงใด คนชราจำนวนหนึ่งวางแผนการเงินตั้งแต่เป็นหนุ่มเป็นสาว เพื่อจะได้ใช้ชีวิตหลังวัยทำงานอย่างสุขสบาย ที่มาของเงินบำนาญนั้นมาจากหลายแหล่งด้วยกัน ทั้งเก็บหอมรอมริบส่วนตัว ซื้อบริการทางการเงินอย่างประกันชีวิต สะสมผ่านกองทุนบำนาญของรัฐ ประกันสังคม หรือบำนาญที่ได้จากการทำงานของทั้งผู้ประกอบการเอกชนและส่วนราชการ ไปจนถึงบำนาญที่เป็นสวัสดิการของรัฐแบบถ้วนหน้าที่ให้กับประชาชนทุกคน',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'bWQs_ynA5a',
        type: 'paragraph',
        data: {
          text: 'ผลสำรวจจากหลายแหล่งให้ข้อค้นพบที่ใกล้เคียงกันว่า เมื่อเข้าสู่วัยเกษียณผู้หญิงจะได้รับเงินบำนาญรวมแล้วน้อยกว่าผู้ชายถึง 30-40% จากรายงานการจัดอันดับระบบบำนาญโลก (Global Pension Systems Rankings) ประจำปี 2564 โดยสถาบันวิจัยทางการเงินเมอร์เซอร์ (MERCER) เปิดเผยว่า ผู้สูงวัยเพศหญิงในประเทศพัฒนาแล้ว (กลุ่มประเทศ OECD) ได้รับเงินบำนาญน้อยกว่าผู้สูงวัยเพศชายถึงร้อยละ 26',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'T2ndhNee7H',
        type: 'paragraph',
        data: {
          text: 'การที่ชีวิตบั้นปลายของผู้หญิงได้รับเงินน้อยกว่าผู้ชาย ปรากฏการณ์นี้ถูกเรียกว่า&nbsp;<b>ความเหลื่อมล้ำทางเพศที่ส่งผลต่อเงินบำนาญ (Gender pension gap)</b>&nbsp;ซึ่งเป็นปัญหาที่เกิดขึ้นทั่วโลก แม้แต่ในประเทศที่เจริญแล้วหลายประเทศก็ยังมีช่องว่างที่สูง ปัญหานี้เป็นผลมาจากหลายปัจจัยด้วยกัน แต่<b>โดยผลรวมแล้วมาจากความไม่เท่าเทียมทางเพศ ที่ผู้หญิงต้องเผชิญมาตลอดทั้งชีวิต และยังส่งผลรวบยอดมาถึงช่วงวัยชรา</b>',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'FjzjlMwCNr',
        type: 'header',
        data: {
          text: 'ค่าจ้างที่เหลื่อมล้ำในวัยทำงาน ส่งผลต่อชีวิตหลังเกษียณ',
          level: 1,
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'zp73jhHqeJ',
        type: 'paragraph',
        data: {
          text: 'เงินบำนาญในวัยเกษียณ เปรียบเหมือนดอกผลของความก้าวหน้าของการทำงานในช่วงวัยทำงาน ผู้มีรายได้จากการทำงานที่สูง ก็มีความสามารถในการออม ซื้อประกันชั้นดี จ่ายเบี้ยกองทุนบำนาญได้มาก หรือหากมีเงินเดือนที่สูง ทางหน่วยงานหรือบริษัทต้นสังกัดก็จ่ายเงินบำนาญในอัตราที่สูงตามไปด้วย ความเหลื่อมล้ำของการได้รับเงินบำนาญจากความเหลื่อมล้ำที่เกิดจากเพศ มาจากความเหลื่อมล้ำของค่าตอบแทนระหว่างเพศ ซึ่งแรงงานเพศหญิงได้รับค่าแรงที่ต่ำกว่าผู้ชาย แม้ในตำแหน่ง หรือ ลักษณะงานและความรับผิดชอบที่คล้ายคลึงกัน',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'KuQNjUmWDq',
        type: 'paragraph',
        data: {
          text: 'ประเด็นนี้เป็นปัญหาที่ทั่วโลกหยิบยกขึ้นมาถกเถียงและหาทางแก้ไข แม้กระทั่งในปี 2021 ผู้หญิงยังคงได้รับค่าแรงเฉลี่ยน้อยว่าผู้ชายอยู่ที่ราว 18 % ในตำแหน่งและลักษณะงานที่คล้ายคลึงกัน ความเหลื่อมล้ำทางเพศที่ส่งผลต่อการได้รับค่าแรงที่ไม่เท่าเทียมกันนี้ มีสาเหตุมาจากหลายปัจจัยตามแต่บริบทของพื้นที่ซึ่งโดยมากเป็นเรื่องของทางวัฒนธรรม สภาพสังคมที่ให้การยอมรับเพศชายว่ามีสถานะที่สูงกว่าผู้หญิง นำไปสู่การเลือกปฏิบัติทางเพศในที่ทำงาน เช่น การที่ผู้ชายมักจะมีโอกาสถูกเลือกให้เลื่อนตำแหน่งได้มากกว่า หรือ ผู้หญิงได้รับมอบหมายตำแหน่งงานที่มีความสำคัญน้อยกว่าผู้ชาย ไปจนถึงทัศนคติที่มองว่าผู้หญิงจะมีประสิทธิภาพการทำงานที่ต่ำกว่าผู้ชาย&nbsp;',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'N8DHk6X_C8',
        type: 'paragraph',
        data: {
          text: 'ญี่ปุ่น เป็นประเทศที่มีปัญหาด้านความเท่าเทียมทางเพศในหลายด้าน มีความเหลื่อมล้ำทางเพศที่ส่งผลต่อค่าแรงที่สูงมากเมื่อเทียบกับประเทศพัฒนาแล้ว ส่งผลให้ในบั้นปลายชีวิตของผู้หญิงเหลือเงินบำนาญน้อยกว่าผู้ชายถึงเกือบ 50% (สูงที่สุดในกลุ่มประเทศ OECD) และสุ่มเสี่ยงที่จะไม่สามารถพึ่งพาตัวเองได้ในบั้นปลายชีวิต',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'bzWm_4-JCZ',
        type: 'paragraph',
        data: {
          text: 'อีกมุมมองหนึ่งที่เป็นข้อถกเถียงถึงสาเหตุที่นำไปสู่ความเหลื่อมล้ำทางเพศที่ส่งผลต่อค่าแรง คือ “ภาระการเป็นแม่” (Motherhood) มีงานศึกษาหลายชิ้นที่ได้ข้อค้นพบว่า เมื่อชาย-หญิง 2 คนเริ่มเข้ามาทำงานพร้อมกันในตำแหน่งเดียวกัน ช่วงแรกช่องว่างค่าแรงระหว่าง 2 คนจะไม่ต่างกันมาก จนเมื่อผู้หญิงมีบุตรจะพบว่า ช่องว่างนี้จะเริ่มห่างออกจากกัน ผู้หญิงจะเริ่มได้ค่าแรงงานที่น้อยกว่าผู้ชายอย่างชัดเจนขึ้นเรื่อย ๆ&nbsp; เรียกว่า ‘ช่องว่างค่าแรงหลังการมีลูก’ เนื่องจากเมื่อผู้หญิงมีลูก จะมีช่วงเวลาของการลาคลอดและลาเลี้ยงลูก ในหลายวัฒนธรรม ภาระเลี้ยงดูและความรับผิดชอบตกอยู่กับผู้หญิงในฐานะแม่มากกว่าผู้ชายในฐานะพ่อ ข้อจำกัดในการทำงานมีมากขึ้น อาทิ ไม่สามารถทำงานที่ต้องเดินทางหรือการย้ายสถานที่ทำงานไปรับตำแหน่งที่สูงขึ้น อาจส่งผลต่อการต้องย้ายที่อยู่ซึ่งส่งผลต่อการต้องปรับตัวใหม่ของลูก ขณะที่ผู้ชายจะไม่มีข้อจำกัดเหล่านี้ โอกาสในความก้าวหน้าทางอาชีพและค่าตอบแทนจึงมีมากกว่า&nbsp;&nbsp;',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'gPqZqJcFMU',
        type: 'image',
        data: {
          file: {
            url: 'https://firebasestorage.googleapis.com/v0/b/chanchara-7cc75.appspot.com/o/9cffa6e0-f745-4d40-8f39-2f9663377dbe%2F5632f467-3027-4875-8d24-2b29cb60389a.png?alt=media',
          },
          caption: '',
          withBorder: false,
          stretched: false,
          withBackground: false,
        },
      },
      {
        id: 'WDwPvbPkpn',
        type: 'paragraph',
        data: {
          text: 'ภาระของการเป็นแม่ จะถูกจำกัดโอกาสในความก้าวหน้าทางอาชีพและค่าตอบแทนมากกว่าเพศชาย&nbsp;ทำให้เมื่อผู้หญิงมีบุตร ผู้หญิงจะเริ่มได้ค่าแรงงานที่น้อยกว่าผู้ชายอย่างชัดเจนขึ้นเรื่อย ๆ เรียกว่า ‘ช่องว่างค่าแรงหลังการมีลูก’',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'XTq03hOocd',
        type: 'header',
        data: {
          text: 'เงื่อนไขและทัศนคติทางสังคม',
          level: 1,
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'U-TvhOXsAc',
        type: 'paragraph',
        data: {
          text: '<b>“ความไม่ครอบคลุม”&nbsp;</b>นี้เป็นประเด็นหลักที่ทำให้ระบบบำนาญของไทยถูกประเมินให้คะแนนที่ต่ำ เพราะนอกจากระบบบำนาญพื้นฐานที่ให้กับประชาชนทุกคน อย่างเบี้ยยังชีพผู้สูงอายุ ในอัตราเดือนละ 600 บาทต่อคน ซึ่งไม่เพียงพอแล้ว ระบบบำนาญไทยส่วนใหญ่ครอบคุลมถึงแค่กลุ่มข้าราชการและพนักงานในหน่วยงานเอกชน แต่กลุ่มที่มีความเปราะบางทางเศรฐกิจ อย่างแรงงานนอกระบบ ผู้ค้าขาย หรือ แรงงานที่ถูกจ้างแบบไม่เป็นทางการ แทบจะไม่สามารถเข้าถึงระบบบำนาญของรัฐได้',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'PLkQP7ovB2',
        type: 'paragraph',
        data: {
          text: 'ส่งผลให้ตัวเลขประชากรยากจนมีจำนวนสูงขึ้นในกลุ่มผู้สูงอายุ โดยเฉพาะในผู้หญิงซึ่งมีความเสี่ยงสูงที่จะตกสภาวะความเปราะบางทางเศรษฐกิจ&nbsp;',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'F9Erlq1Haf',
        type: 'paragraph',
        data: {
          text: '<b>ดูอ้างอิงและอ่านเพิ่มเติมได้ที่</b>',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 's7lrYg7WAM',
        type: 'paragraph',
        data: {
          text: '<a href="https://www.mercer.com/content/dam/mercer/attachments/private/gl-2021-global-pension-special-chapter-gender-differences-in-pension-outcomes-mercer.pdf">https://www.mercer.com/content/dam/mercer/attachments/private/gl-2021-global-pension-special-chapter-gender-differences-in-pension-outcomes-mercer.pdf</a>',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'Gcxtu5IrNW',
        type: 'paragraph',
        data: {
          text: '<a href="https://www.mercer.com/content/dam/mercer/attachments/private/gl-2021-global-pension-index-mercer.pdf">https://www.mercer.com/content/dam/mercer/attachments/private/gl-2021-global-pension-index-mercer.pdf</a>',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'BlaTfm-KoZ',
        type: 'paragraph',
        data: {
          text: '<a href="https://www.weforum.org/agenda/2018/03/retired-women-less-money-pensions-than-men/">https://www.weforum.org/agenda/2018/03/retired-women-less-money-pensions-than-men/</a>',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'zDywgGT863',
        type: 'paragraph',
        data: {
          text: '<a href="https://www.vox.com/2018/2/19/17018380/gender-wage-gap-childcare-penalty">https://www.vox.com/2018/2/19/17018380/gender-wage-gap-childcare-penalty</a>',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'aVhIF5UcrD',
        type: 'paragraph',
        data: {
          text: '<a href="https://cphpost.dk/news/danish-fathers-take-far-less-paternity-leave-than-nordic-brethren.html">https://cphpost.dk/news/danish-fathers-take-far-less-paternity-leave-than-nordic-brethren.html</a>',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'DzBtoZVLef',
        type: 'paragraph',
        data: {
          text: '<a href="https://www.oecd-ilibrary.org/sites/f7b48808-en/index.html?itemId=/content/publication/f7b48808-en&amp;_csp_=4c6990cb7cb9191a176361e0f07511b4&amp;itemIGO=oecd&amp;itemContentType=book">https://www.oecd-ilibrary.org/sites/f7b48808-en/index.html?itemId=/content/publication/f7b48808-</a><a href="https://www.oecd-ilibrary.org/sites/f7b48808-en/index.html?itemId=/content/publication/f7b48808-en&amp;_csp_=4c6990cb7cb9191a176361e0f07511b4&amp;itemIGO=oecd&amp;itemContentType=book">en&amp;_csp_=4c6990cb7cb9191a176361e0f07511b4&amp;itemIGO=oecd&amp;itemContentType=book</a>',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: '2O2xqJ6bSo',
        type: 'paragraph',
        data: {
          text: '<a href="https://www.payscale.com/research-and-insights/gender-pay-gap/">https://www.payscale.com/research-and-insights/gender-pay-gap/</a>',
        },
        tunes: {
          alignmentBlockTune: {
            alignment: 'left',
          },
        },
      },
      {
        id: 'GTmfsWRGYz',
        type: 'paragraph',
        data: {
          text: '<a href="https://thaitgri.org/?p=39566">https://thaitgri.org/?p=39566</a>',
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

  // const [comments, setComments] = useState<IComment[]>([]);
  const [comments, setComments] = useState<IComment[]>(mockComments);
  const [newComment, setNewComment] = useState<string>('');
  // const [state, setState] = useState<boolean>(false);
  // const [didFetchComment, setDidFetchComment] = useState(false);
  const handleOnClick = () => {
    // setDidFetchComment(true);
    // await axios.post
    setComments([...comments, { id: '3', content: newComment, likes: 0 }]);
    setNewComment('');
    // setComments(comments.filter((comment) => comment.id !== '4'));
  };

  const handleDelete = (id: string) => {
    const newDataComments = comments.filter((comment) => comment.id !== id);
    setComments(newDataComments);
  };
  const incrementLikes = (id: string) => {
    console.log('incrementLikes');
    const newDataComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, likes: comment.likes + 1 };
      }
      console.log('comment.id', comment.likes);
      return comment;
    });
    setComments(newDataComments);
  };
  const decrementLikes = (id: string) => {
    console.log('decrementLikes');
    const newDataComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, likes: comment.likes - 1 };
      }
      return comment;
    });
    setComments(newDataComments);
  };

  // useEffect(() => {
  //   if (!didFetchComment) {
  //     //  await axios.get('/blog')
  //     setDidFetchComment(true);
  //     //first
  //     const data = 'frombackedn';
  //     setComments(data);
  //   }
  // }, [didFetchComment]);

  return (
    <Container>
      <Stack spacing={3}>
        <Typography sx={{ maxWidth: '100%' }}>
          <Blocks
            data={mockBlog}
            config={{
              header: { className: classes.header },
              image: { className: classes.image },
              paragraph: { className: classes.paragraph },
            }}
          />
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          แสดงความคิดเห็น
        </Typography>
        <Stack alignItems="end" spacing={3}>
          <TextareaAutosize
            maxRows={10}
            minRows={10}
            aria-label="maximum height"
            placeholder="ใส่ความคิดเห็นที่นี่"
            style={{ width: '100%', resize: 'none' }}
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <Button
            variant="contained"
            sx={{ float: 'right' }}
            onClick={handleOnClick}
          >
            เพิ่มความคิดเห็น
          </Button>
        </Stack>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          รีวิวจากผู้อ่าน
        </Typography>
        {comments &&
          comments.map((comment) => {
            return (
              <Comment
                handleDelete={handleDelete}
                key={comment.id}
                id={comment.id}
                content={comment.content}
                likes={comment.likes}
                decrementLikes={decrementLikes}
                incrementLikes={incrementLikes}
              />
            );
          })}
      </Stack>
    </Container>
  );
};

export default Blog;
