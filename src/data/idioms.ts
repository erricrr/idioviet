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
    literalTranslation: 'dogs belittle cats because cats have a lot of hair.',
    actualMeaning: 'the pot calling the kettle black.',
    history: 'Chị luôn luôn nói em lười và phòng em bừa bộn nhưng chị nhìn lại phòng của chị đi! Chó chê mèo lắm lông! Chị dọn phòng của chị đi, rồi chê em sau! (You always say I\'m lazy and my room is messy but look at your room again! The pot calling the kettle black! Clean your room, then criticize me later!)',
  },
  {
    id: 4,
    phrase: 'Chuyện bé xé ra to',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Chuyện bé' },
      { text: 'xé ra to' },
    ],
    literalTranslation: 'It is a small stuff but you make it become a big problem.',
    actualMeaning: 'make a mountain out of a molehill.',
    history: 'Mọi việc không phức tạp như em nghĩ. Em luôn nghĩ rất nhiều và luôn làm chuyện bé xé ra to! (Things are not as complicated as you thought. You always think a lot and always make a mountain out of a molehill.)',
  },
  {
    id: 5,
    phrase: 'Có công mài sắt, có ngày nên kim',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Có công mài sắt,' },
      { text: 'có ngày nên kim' },
    ],
    literalTranslation: 'if you take the time to sharpen a piece of metal, one day it\'d become a needle.',
    actualMeaning: 'hard work and patience will pay off.',
    history: 'Anh mong em luôn cố gắng hết sức để đạt được ước mơ của mình dù anh biết là con đường phía trước rất khó khăn. Có công mài sắt, có ngày nên kim. Anh tin em sẽ làm được. (I hope you always try your best to achieve your dreams no matter how difficult it is. Hard work and patience will pay off. I believe you can do it.)',
  },
  {
    id: 6,
    phrase: 'Có tiền mua tiên cũng được',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Có tiền' },
      { text: 'mua tiên cũng được' },
    ],
    literalTranslation: 'if you have money, you can even buy "a fairy" (emphasize that you can buy even something very expensive or impossible to buy).',
    actualMeaning: 'Money talks',
    history: 'Nhiều người làm việc vất vả để kiếm thật nhiều tiền vì họ tin có tiền mua tiên cũng được, nhưng tiền thực sự không thể mua được hạnh phúc. (Many people work hard to earn a lot of money because they believe money can buy everything, but money can\'t really buy happiness.)',
  },
  {
    id: 7,
    phrase: 'Còn nước còn tát',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Còn nước' },
      { text: 'còn tát' },
    ],
    literalTranslation: 'Vietnamese farmers often have to use a buck to get water into their field. Sometimes water is scarce but if there is still water, they still try their best to take water into the field (See the photo - the literal translation is if there is any water left, still try to take it into the field)',
    actualMeaning: 'When there\'s life, there is hope. (Try your best if there is still a small chance to do something).',
    history: 'Mẹ của anh ấy ốm rất nặng. Bác sĩ ở thị trấn đã từ chối nhưng anh ấy cố gắng đưa mẹ lên thành phố chữa bệnh với hi vọng còn nước còn tát. (His mother was very ill. The doctor in the town refused, but he tried to take his mother to the city for treatment in the hope that there would be a small chance to help her.)',
  },
  {
    id: 8,
    phrase: 'Cười người hôm trước, hôm sau người cười',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Cười người hôm trước,' },
      { text: 'hôm sau người cười' },
    ],
    literalTranslation: 'Laugh at others today, (and) tomorrow others will laugh at you.',
    actualMeaning: 'Everyone has strengths and weaknesses. It advises people: Do not subjectively think that you are good and perfect, then become sarcastic or look down on others. If you look down on others, then there will be times when you will fall into their current situation, and will be laughed at by others.',
    history: 'Dù thành công, anh cũng không được cho phép bản thân kiêu căng và coi thường người khác. Không ai có thể biết trước điều gì sẽ xảy ra trong tương lai. Cười người hôm trước, hôm sau người cười. (Even if you succeed, you must not allow yourself to be arrogant and look down on others. No one can predict what will happen in the future. Laughs at others today, (and) tomorrow others will laugh at you.)',
  },
  {
    id: 9,
    phrase: 'Đầu bạc răng long',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Đầu bạc' },
      { text: 'răng long' },
    ],
    literalTranslation: 'having grey hair and loosing teeth.',
    actualMeaning: 'Very old (often used as one of the most common wishes in a wedding for a couple, wishing them to be together until they are very old (till they day they die).',
    history: 'Chúc mừng đám cưới của hai bạn. Chúc hai bạn luôn hạnh phúc và sống với nhau tới đầu bạc răng long! (Congratulations on your wedding. Wish you both always happy and live together until your old age. (The most common wish on a wedding day you should remember))',
  },
  {
    id: 10,
    phrase: 'Đổ thêm dầu vào lửa',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Đổ thêm dầu' },
      { text: 'vào lửa' },
    ],
    literalTranslation: 'add fuel into the fire/flames.',
    actualMeaning: 'add insult to injury, say/do something to add more into a not-good conversation, situation and make it worse.',
    history: 'Chị ấy rất tức giận khi biết chồng của chị ấy ngoại tình nhưng người hàng xóm còn đổ thêm dầu vào lửa khi cho chị ấy xem ảnh chụp trộm lúc chồng chị ấy và bồ hôn nhau. Chị ấy đập vỡ tất cả bát đĩa trong nhà. (She was furious when she found out that her husband was having an affair but the neighbor added fuel to the fire by showing her a stolen photo of her husband and his lover kissing. She broke all the dishes in the house.)',
  },
  {
    id: 11,
    phrase: 'Đứng núi này trông núi nọ',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Đứng núi này' },
      { text: 'trông núi nọ' },
    ],
    literalTranslation: 'Stand on this mountain and look at another mountain.',
    actualMeaning: 'Thinking that "the grass is always greener on the other side".',
    history: 'Ai cũng có những khó khăn riêng mà họ không thể nói với ai được. Vì thế, anh đừng đứng núi này trông núi nọ nữa. Điều quan trọng nhất là bằng lòng với những gì anh đang có. (Everyone has their own problems that they can\'t talk to anyone about. So, don\'t think that the grass is always greener on the other side. The most important thing is to be content with what you have.)',
  },
  {
    id: 12,
    phrase: 'Đừng trông mặt mà bắt hình dong',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Đừng trông mặt' },
      { text: 'mà bắt hình dong' },
    ],
    literalTranslation: 'Don\'t look at a person\'s face and tell their fate (as a fortune teller).',
    actualMeaning: 'Don’t judge a book by its cover. (one should not judge the worth or value of something by its outward appearance alone)',
    history: 'Chị ấy nhìn nghiêm túc và khó gần nhưng thực ra chị ấy là người thân thiện và cởi mở nhất trong lớp. Vì thế, đừng trông mặt mà bắt hình dong. (She looks serious and unapproachable but she is actually the friendliest and most outgoing person in the class. Therefore, do not judge a book by its cover.)',
  },
  {
    id: 13,
    phrase: 'Giọt nước tràn ly',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Giọt nước' },
      { text: 'tràn ly' },
    ],
    literalTranslation: 'a drop of water overflows the glass.',
    actualMeaning: 'The straw that broke the camel\'s back.',
    history: 'Sau khi cưới, anh ấy suốt ngày đi bar và đánh bạc nên vợ anh ấy rất thất vọng. Hôm nay, giọt nước tràn ly khi vợ anh ấy biết tin anh ấy ngoại tình. Chị ấy đã viết đơn li dị ngay lập tức. (After the wedding, he went to bars and gambled all day, so his wife was very disappointed. Today was the last straw when his wife found out that he was having an affair. She filed for divorce immediately.)',
  },
  {
    id: 14,
    phrase: 'Gừng càng già càng cay',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Gừng càng già' },
      { text: 'càng cay' },
    ],
    literalTranslation: 'the older a ginger gets, the stronger it tastes.',
    actualMeaning: 'the older you are, the more knowledge/life experience you have (with age comes wisdom).',
    history: 'Khi làm bất cứ việc gì, tất cả mọi người trong gia đình em luôn hỏi lời khuyên của ông em. Gừng càng già càng cay, những kinh nghiệm và lời khuyên của ông đã giúp tất cả chúng em trưởng thành. (When doing anything, everyone in my family always asks for advice from my grandfather. The older the ginger, the stronger it tastes, his experiences and advice have helped us all grow.)',
  },
  {
    id: 15,
    phrase: 'Khỉ ho cò gáy',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Khỉ ho' },
      { text: 'cò gáy' },
    ],
    literalTranslation: 'a monkey coughs and a stork snores.',
    actualMeaning: 'the middle of nowhere. (a remote area, few people pass by)',
    history: 'Không ai tin được anh ấy có thể phát triển kinh doanh và trở nên giàu có ở một nơi khỉ ho cò gáy như vậy. (No one believes he can grow his business and become rich in such a remote and faraway place.)',
  },
  {
    id: 16,
    phrase: 'Mỗi cây mỗi hoa, mỗi nhà mỗi cảnh',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Mỗi cây mỗi hoa,' },
      { text: 'mỗi nhà mỗi cảnh' },
    ],
    literalTranslation: 'Each tree, each flower, each house, each scene (Different trees have different flowers; different families have different situations).',
    actualMeaning: 'Every family goes through its own problems.',
    history: 'Khi mình nói chuyện về gia đình của mình, bạn nghĩ mình có một gia đình hạnh phúc hơn bạn và bố mẹ mình luôn ủng hộ mình. Nhưng thực ra đằng sau đó là rất nhiều khó khăn. Mỗi cây mỗi hoa, mỗi nhà mỗi cảnh. (When I talk about my family, you think I have a happier family than you and my parents always support me. But actually there are many difficulties behind that. Each tree, each flower, each house, each scene.)',
  },
  {
    id: 17,
    phrase: 'Nhân vô thập toàn',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Nhân vô' },
      { text: 'thập toàn' },
    ],
    literalTranslation: '(Sino-Vietnamese): as a human being, you can\'t be perfect in everything.',
    actualMeaning: 'no one is perfect. Everyone can make mistakes sometimes (to err is human)',
    history: 'Mỗi người đều có thứ họ làm tốt và thứ họ không làm tốt. Nhân vô thập toàn. Điều quan trọng là nhận ra những khuyết điểm và thay đổi. (Everyone has things they do well and things they don\'t do well. No one is perfect. It is important to recognize the flaws and make changes.)',
  },
  {
    id: 18,
    phrase: 'Nhập gia tùy tục',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Nhập gia' },
      { text: 'tùy tục' },
    ],
    literalTranslation: 'when you enter a house, follow the custom of that family.',
    actualMeaning: 'When in Rome, do as the Romans do.',
    history: 'Khi anh bắt đầu sống ở Việt Nam, anh sẽ thấy rất sốc vì người Việt hỏi nhiều câu hỏi cá nhân. Nhưng em hi vọng anh sẽ "nhập gia tùy tục" và quen dần với cách người Việt Nam nói chuyện và ứng xử. Khi quen rồi, anh sẽ yêu Việt Nam hơn. (When you start living in Vietnam, you will be shocked because Vietnamese people ask many personal questions. But I hope "when you are in Rome, do as the Romans do" and get used to the way Vietnamese people talk and behave. Once you get used to it, you will love Vietnam more.)',
  },
  {
    id: 19,
    phrase: 'Nước đổ đầu vịt',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Nước đổ' },
      { text: 'đầu vịt' },
    ],
    literalTranslation: 'water off a duck\'s head.',
    actualMeaning: 'complain that you try to explain, advise somebody, but that person doesn\'t listen to/understand you (Water off a duck\'s back)',
    history: 'Đừng cố gắng giải thích cho một người ương như anh ấy. Như nước đổ đầu vịt thôi! (Don\'t try to explain to a stubborn person like him. It\'s like water off a duck\'s head!)',
  },
  {
    id: 20,
    phrase: 'Ruột để ngoài da',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Ruột để' },
      { text: 'ngoài da' },
    ],
    literalTranslation: 'Intestines outside the skin.',
    actualMeaning: 'behave in a way that makes their feelings very obvious - wear your heart on your sleeve. (does not hide any emotion).',
    history: 'Đừng lo lắng vì chị ấy sẽ không giận em lâu đâu. Chị ấy là người ruột để ngoài da, dễ bộc lộ cảm xúc nhưng rất tốt bụng. (Don\'t worry because she won\'t be mad at you for long. She wears her heart on her sleeve, easily expresses her emotion but she is very kind.)',
  },
  {
    id: 21,
    phrase: 'Sau cơn mưa trời lại sáng',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Sau cơn mưa' },
      { text: 'trời lại sáng' },
    ],
    literalTranslation: 'after rain, the sky will be bright.',
    actualMeaning: 'After rain comes fair weather (After rain comes sunshine).',
    history: 'Mạnh mẽ lên! Sau cơn mưa trời lại sáng! Anh tin là sau mỗi thất bại, em sẽ tìm được nhiều cơ hội mới. (Be strong! After rain comes sunshine! I believe that after every failure, you will find many new opportunities.)',
  },
  {
    id: 22,
    phrase: 'Thất bại là mẹ (của) thành công',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Thất bại là mẹ' },
      { text: '(của) thành công' },
    ],
    literalTranslation: 'Failure is the mother of success.',
    actualMeaning: 'Failure is the mother of success (Advise people to be calm when they fail and learn from the lessons/mistakes they had)',
    history: 'Từ thất bại của dự án này, chúng ta đã nhận được nhiều bài học lớn về cách làm việc nhóm. Tôi tin thất bại là mẹ của thành công. Mọi người hãy tích cực và mạnh mẽ lên! Chúng ta sẽ làm tốt hơn ở dự án tiếp theo. (From the failure of this project, we have learned many great lessons about teamwork. I believe failure is the mother of success. Everyone, stay positive and stay strong! We will do better in the next project.)',
  },
  {
    id: 23,
    phrase: 'Trong cái rủi có cái may',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Trong cái rủi' },
      { text: 'có cái may' },
    ],
    literalTranslation: 'Inside the bad luck, you can see some luck.',
    actualMeaning: 'Every cloud has a silver lining.',
    history: 'Anh ấy bị ngã xe máy lúc 2 giờ đêm nhưng trong cái rủi có cái may, anh ấy ngã xe gần một quán ăn bán qua đêm nên có nhiều người chạy đến giúp anh ấy. (He fell off his motorbike at 2 o\'clock at night, but every cloud has a silver lining, he fell off his bike near an overnight restaurant, so many people ran to help him.)',
  },
  {
    id: 24,
    phrase: 'Uống nước nhớ nguồn',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Uống nước' },
      { text: 'nhớ nguồn' },
    ],
    literalTranslation: 'Remember the source when you drink water.',
    actualMeaning: 'Be grateful in life and appreciate people who helped you or brought values to your life. (Gratitude is the sign of noble souls)',
    history: 'Ở Việt Nam, ngày nhà giáo Việt Nam 20/11 là một ngày rất quan trọng vì đây là dịp để học sinh bày tỏ sự biết ơn với giáo viên của họ. Người Việt Nam luôn nhấn mạnh truyền thống "Uống nước nhớ nguồn". (In Vietnam, Vietnamese Teachers\' Day November 20 is a very important day because it is an occasion for students to express their gratitude to their teachers. Vietnamese people always emphasize the tradition of being grateful "When drinking water, remember the source".)',
  },
  {
    id: 25,
    phrase: 'Xa mặt cách lòng',
    dialect: 'Northern Vietnam',
    chunks: [
      { text: 'Xa mặt' },
      { text: 'cách lòng' },
    ],
    literalTranslation: 'When you don\'t see each other often, you might forget each other.',
    actualMeaning: 'Out of sight, out of mind.',
    history: 'Em chia tay anh ấy rồi. Em không tin vào yêu xa vì xa mặt cách lòng. Có rất ít cặp đôi giữ được hạnh phúc khi yêu xa. (I broke up with him already. I didn\'t believe in long distance relationship because out of sight, out of mind. There are very few couples who can stay happy when they are in a long distance relationship.)',
  }
];
