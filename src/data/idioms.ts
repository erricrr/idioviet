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
    phrase: 'Càng đông, càng vui',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Càng đông,' },
      { text: 'càng vui' },
    ],
    literalTranslation: 'More people, more happiness.',
    actualMeaning: 'The more, the merrier.',
    history: 'Em nhớ rủ bạn trai em đến sinh nhật của anh nhé! Càng đông, càng vui! Bạn bè của anh thân thiện và dễ gần lắm! Anh tin các bạn ấy sẽ rất vui khi gặp em và bạn trai em. (Remember to invite your boyfriend to my birthday too! The more the merrier! My friends are friendly and easy to get along with! I believe they will be very happy to meet you and your boyfriend.)',
  },
  {
    id: 2,
    phrase: 'Cha nào con nấy',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Cha nào' },
      { text: 'con nấy' },
    ],
    literalTranslation: 'Same dad, same child.',
    actualMeaning: 'Like father, like son.',
    history: 'Mẹ nói với con bao nhiêu lần rồi nhưng tại sao con vẫn không dọn dẹp phòng thế? Đúng là cha nào con nấy. Ngày xưa, mẹ đòi li dị bố con mấy lần vì bố con lười dọn phòng đấy! (How many times have I told you but why didn\'t you clean your room? Like father like son. In the past, I asked for a divorce from your father several times because he was lazy to clean the room!)',
  },
  {
    id: 3,
    phrase: 'Chó chê mèo lắm lông',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Chó chê' },
      { text: 'mèo lắm lông' },
    ],
    literalTranslation: 'Dogs belittle cats because cats have a lot of hair.',
    actualMeaning: 'The pot calling the kettle black.',
    history: 'Chị luôn luôn nói em lười và phòng em bừa bộn nhưng chị nhìn lại phòng của chị đi! Chó chê mèo lắm lông! Chị dọn phòng của chị đi, rồi chê em sau! (You always say I\'m lazy and my room is messy but look at your room again! The pot calling the kettle black! Clean your room, then criticize me later!)',
  },
];
