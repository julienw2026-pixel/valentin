export type TimelineMoment = {
  id: string;
  yearLabel: string;
  title: string;
  place?: string;
  text: string;
  quote?: string;
  accent?: 'warm' | 'green';
};

export const moments: TimelineMoment[] = [
  {
    id: 'm1',
    yearLabel: 'Year 0',
    title: '我们结婚了',
    place: '（填地点）',
    text: '从那天起，生活不再只是我一个人的冒险。它有了“我们”的名字。',
    quote: '谢谢你愿意把一生的日常，交给我一起完成。',
    accent: 'warm'
  },
  {
    id: 'm2',
    yearLabel: 'Year 2',
    title: '第一次带娃手忙脚乱',
    place: '（填一个夜晚/医院/家里）',
    text: '我们学会了在疲惫里互相接住：一句“我来”，就能把世界稳住。',
    quote: '你不是“很会当妈妈”，你是把爱做成了本能。',
    accent: 'green'
  },
  {
    id: 'm3',
    yearLabel: 'Year 5',
    title: '我们也吵过，但没放开过手',
    text: '争执不是裂缝，反而是我们一起把家修得更牢的方式。',
    quote: '我想要的不是完美，而是永远愿意回到同一张桌子前。',
    accent: 'warm'
  },
  {
    id: 'm4',
    yearLabel: 'Year 8',
    title: '两个小孩，一个家',
    place: '一男一女',
    text: '你把家变成了一个会发光的地方：孩子笑、我也安心。',
    quote: '情人节快乐。今天，我还是想认真地对你说：我爱你。',
    accent: 'green'
  }
];

export const defaultLetter = `亲爱的：\n\n八年了。\n\n谢谢你在最累的时候也没有忘记温柔；谢谢你在我笨拙的时候仍愿意相信我。\n\n我们有了两个孩子，一男一女。你像一棵树，给他们阴凉，也给我方向。\n\n今年我想做三件事：\n1) 多听你说，少急着解释。\n2) 把“我来”变成习惯。\n3) 认真计划一次只属于我们的旅行。\n\n情人节快乐。\n\n永远爱你的人\nJ\n`;
