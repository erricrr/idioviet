export interface IdiomChunk {
  text: string;
}

export interface Idiom {
  id: number;
  phrase: string;
  dialect: 'Northern Vietnam' | 'Central Vietnam' | 'Southern Vietnam';
  chunks: IdiomChunk[];
  literalTranslation: string;
  actualMeaning: string;
  history: string;
}

export const idioms: Idiom[] = [
  {
    id: 1,
    phrase: 'Uống nước nhớ nguồn',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Uống nước' },
      { text: 'nhớ nguồn' },
    ],
    literalTranslation: 'Drink water, remember the source',
    actualMeaning: 'Be grateful for the people who have helped you.',
    history: 'This proverb is derived from a Chinese idiom, which emphasizes the importance of showing gratitude to those who have contributed to one\'s success.',
  },
  {
    id: 2,
    phrase: 'Ăn một quả nhớ mãi',
    dialect: 'Central Vietnam',
    chunks: [
      { text: 'Ăn một quả' },
      { text: 'nhớ mãi' },
    ],
    literalTranslation: 'Eat one fruit, remember forever',
    actualMeaning: 'A painful lesson is often remembered for a long time.',
    history: 'This proverb is often used to caution people against making the same mistake twice. Its origin is unclear, but it is commonly used in central Vietnam.',
  },
  {
    id: 3,
    phrase: 'Lời nói không mất tiền mua, lựa lời mà nói cho vừa lòng nhau',
    dialect: 'Southern Vietnam',
    chunks: [
      { text: 'Lời nói không mất tiền mua' },
      { text: 'lựa lời' },
      { text: 'mà nói cho vừa lòng nhau' },
    ],
    literalTranslation: 'Words don\'t cost money to buy, choose words to please each other',
    actualMeaning: 'Speak kindly and thoughtfully to avoid hurting others.',
    history: 'This proverb highlights the importance of being considerate in one\'s speech. Its origin is unknown, but it is widely used in southern Vietnam.',
  },
];
