export type MysterySuspect = {
  id: string;
  name: string;
  title: string;
  note: string;
  clue: {
    prompt: string;
    answerHint: string;
    answer: string;
  };
};

export type Mystery = {
  title: string;
  subtitle: string;
  intro: string;
  suspects: MysterySuspect[];
  finalQuestion: string;
  finalOptions: { id: string; text: string }[];
  correctOptionId: string;
  successTitle: string;
  successText: string;
};

export const mystery: Mystery = {
  title: '案件档案：《消失的情人节》',
  subtitle: '像明星大侦探一样，翻线索、做推理、找到真相。',
  intro:
    '侦探你好。这里没有血腥，也没有坏人。只有一些被忙碌偷走的浪漫。\n\n你要做的，是从三个“场景嫌疑人”里，找回情人节真正消失的原因。',
  suspects: [
    {
      id: 's1',
      name: '嫌疑人 A',
      title: '家：日常的风',
      note: '最常出现，也最容易被忽略。',
      clue: {
        prompt: '线索问题：在照片墙里，“孩子的房间”那张照片的序号是多少？（从 1 开始数）',
        answerHint: '提示：去“照片墙”数一下。',
        answer: '4'
      }
    },
    {
      id: 's2',
      name: '嫌疑人 B',
      title: '孩子：最甜的吵闹',
      note: '让家更热闹，也让两个人更容易分心。',
      clue: {
        prompt: '线索问题：我们一家一共几个人？（两个大人 + 两个小孩）',
        answerHint: '提示：就是一个数字。',
        answer: '4'
      }
    },
    {
      id: 's3',
      name: '嫌疑人 C',
      title: '未来：计划的空白',
      note: '不是不爱了，而是忘了把爱写进日程表。',
      clue: {
        prompt: '线索问题：情书模板里“今年我想做三件事”一共有几条？',
        answerHint: '提示：去“情书”看编号。',
        answer: '3'
      }
    }
  ],
  finalQuestion: '最后推理：情人节“消失”的真相是？',
  finalOptions: [
    { id: 'o1', text: '有人把浪漫藏起来了' },
    { id: 'o2', text: '我们太忙，把爱放在了最后' },
    { id: 'o3', text: '情人节根本不重要' }
  ],
  correctOptionId: 'o2',
  successTitle: '推理成立',
  successText:
    '真相不是“忘记”，而是“太忙”。\n\n但忙不是借口。\n\n我们可以把爱重新放回第一位。'
};
