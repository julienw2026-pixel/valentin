export type QuizQuestion = {
  id: string;
  title: string;
  options: { id: string; text: string; correct?: boolean }[];
  explain?: string;
};

export type Quiz = {
  title: string;
  intro: string;
  questions: QuizQuestion[];
  result: {
    title: string;
    byScore: { min: number; title: string; text: string }[];
  };
};

export const quiz: Quiz = {
  title: '轻量推理问答：记忆测验',
  intro:
    '10 题以内的小测验。每题都是“我们”的线索。\n\n你可以当作狼人杀的“验人环节”——答案不重要，重要的是笑一下。',
  questions: [
    {
      id: 'q1',
      title: '我们这个家里，一共有几个人？',
      options: [
        { id: 'a', text: '2', correct: false },
        { id: 'b', text: '3', correct: false },
        { id: 'c', text: '4', correct: true },
        { id: 'd', text: '5', correct: false }
      ],
      explain: '两个大人 + 两个小孩。'
    },
    {
      id: 'q2',
      title: '照片墙里，“孩子的房间”是第几张？',
      options: [
        { id: 'a', text: '3', correct: false },
        { id: 'b', text: '4', correct: true },
        { id: 'c', text: '5', correct: false },
        { id: 'd', text: '7', correct: false }
      ],
      explain: '现在版本里是第 4 张（你换照片顺序后我也能一起更新题目）。'
    },
    {
      id: 'q3',
      title: '情书模板里“今年我想做三件事”一共有几条？',
      options: [
        { id: 'a', text: '2', correct: false },
        { id: 'b', text: '3', correct: true },
        { id: 'c', text: '4', correct: false },
        { id: 'd', text: '5', correct: false }
      ],
      explain: '三件事，刚好够我们今年认真做。'
    }
  ],
  result: {
    title: '结案报告',
    byScore: [
      {
        min: 0,
        title: '线索不足，但你很可爱',
        text: '没关系，侦探也需要休息。去照片墙看看，我在那儿藏了很多“证据”。'
      },
      {
        min: 2,
        title: '推理在线',
        text: '你很会抓重点。下一步建议：去“情书”页，收下我今天的认真。'
      },
      {
        min: 3,
        title: '神探上线',
        text: '你连细节都记得。那我也要记得：每一年都要把你放在第一位。'
      }
    ]
  }
};
