export type PuzzleClue = {
  id: string;
  title: string;
  hint: string;
  reveal: string;
};

export type Puzzle = {
  title: string;
  intro: string;
  goal: string;
  slots: number;
  clues: PuzzleClue[];
  solution: string;
  successTitle: string;
  successText: string;
};

// Difficulty B: 5-10 minutes, light reasoning, no external knowledge.
// You can customize the reveal texts to be more personal later.
export const puzzle: Puzzle = {
  title: '小型密室：四位数的门锁',
  intro:
    '侦探你好。这个页面里藏着四个数字。把它们按顺序拼起来，打开最后的门。',
  goal: '找出 4 个数字（按 1 → 2 → 3 → 4 的顺序）',
  slots: 4,
  clues: [
    {
      id: 'c1',
      title: '线索 1：时间线里的“年份”',
      hint: '回到「时间线」第一页，注意左上角的 Year 标记。把它当作第 1 位数字。',
      reveal: '第 1 位数字 = 时间线第 1 张卡的 Year 里那个数字。'
    },
    {
      id: 'c2',
      title: '线索 2：照片墙里的“房间编号”',
      hint: '在「照片墙」里找到“孩子的房间”。它是第几张？把序号当作第 2 位数字。',
      reveal: '第 2 位数字 = “孩子的房间”那张照片的序号（从 1 开始数）。'
    },
    {
      id: 'c3',
      title: '线索 3：我们的小队伍',
      hint: '我们这个家的“人数”是多少？（两个大人 + 两个小孩）把答案当作第 3 位。',
      reveal: '第 3 位数字 = 我们一家人的人数。'
    },
    {
      id: 'c4',
      title: '线索 4：最后一封信',
      hint: '打开「情书」模板，找到那段“三件事”的编号。把这个编号当作第 4 位。',
      reveal: '第 4 位数字 = 情书模板里“三件事”的总条数。'
    }
  ],
  // Current solution based on existing content:
  // c1: Year 0 -> 0
  // c2: '孩子的房间' caption is p04 -> 4
  // c3: family size -> 4
  // c4: letter has 3 items -> 3
  solution: '0443',
  successTitle: '门开了',
  successText:
    '你解开了门锁。恭喜你，侦探。\n\n答案不重要，重要的是：你愿意把这些细碎的线索都认真看完。\n\n去「情书」页吧。'
};
