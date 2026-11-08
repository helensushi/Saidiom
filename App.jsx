import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Award, Star, CheckCircle2, XCircle, RefreshCw, BookOpen, PenTool } from 'lucide-react';

// --- 成語數據庫 ---
const idiomsData = [
  { word: "大煞風景", category: "景色與環境", meaning: "損害美好的景致，比喻敗壞人的興致。煞，通「殺」，削弱、損傷。", examples: ["遊人在鳥語花香的公園裏留下滿地垃圾，真是大煞風景。", "你竟然在這個嚴肅的聚會中大聲播放搖滾樂曲，這不單是大煞風景，也是不尊重別人的舉動。"] },
  { word: "包羅萬象", category: "事物與狀態", meaning: "形容內容豐富，無所不包。包羅，包括、涵蓋；萬象，宇宙間的各種現象或事物。", examples: ["百科全書的內容包羅萬象，我們可從中找到各方面的資訊。", "浩瀚的宇宙中有無數星體、星系和神祕的能量，可以說是包羅萬象。"] },
  { word: "分崩離析", category: "事物與狀態", meaning: "形容國家、組織等分裂瓦解。崩，倒塌；析，分開。", examples: ["籃球隊隊友間的關係正在分崩離析，恐怕球隊將要解散了。", "我們要凝聚團結起來，才不致於走向分崩離析的命運。"] },
  { word: "門可羅雀", category: "景色與環境", meaning: "門前冷清，空曠得可以張網捕鳥，形容門庭冷落，很少人往來。羅，捕捉。", examples: ["自從他家道中落，家裏隨即變得門可羅雀，令他非常唏噓。", "這家餐廳的食物水準差劣，侍應生的態度敷衍，難怪一直門可羅雀。"] },
  { word: "如火如荼", category: "景色與環境", meaning: "原比喻軍隊陣容盛大，現形容事物興盛或氣氛熱烈。火，借指紅色；荼，茅草的白花，借指白色。", examples: ["小徑兩旁的木棉花開得如火如荼，令不少鼻子容易過敏的人都感到十分苦惱。", "明天就是學校的開放日了，同學們正如火如荼地佈置校園。"] },
  { word: "雨後春筍", category: "景色與環境", meaning: "竹筍在春雨後長得又多又快。比喻事物在某時期後大量湧現。", examples: ["電訊網絡普及後，不同品牌的手提電話便如雨後春筍迅速推出市場。", "近年長跑成為熱潮，不同的馬拉松比賽就像雨後春筍般一項一項地舉辦起來。"] },
  { word: "鬼斧神工", category: "景色與環境", meaning: "形容技藝非常高超、精巧，不是人力所能做到的。", examples: ["髮型師有着鬼斧神工的技術，讓他剪頭髮的顧客都變英俊了。", "華山峻拔雄偉，是大自然鬼斧神工的作品，難怪被譽為「奇險天下第一山」。"] },
  { word: "排山倒海", category: "景色與環境", meaning: "推開高山，翻倒大海。形容力量猛烈，聲勢浩大。排，推開。", examples: ["這支球隊在比賽初段便展開了排山倒海的攻勢，令對手疲於招架，連連失分。", "地震引發猛烈的海嘯，捲起的巨浪排山倒海地沖毀了沿岸的建築物。"] },
  { word: "張燈結綵", category: "景色與環境", meaning: "張掛燈籠，鋪結彩帶。形容有喜慶事情的景象。張，懸掛；綵，五彩的絲織品。", examples: ["每逢農曆新年，家家戶戶總是張燈結綵，充滿節日氣氛。", "這家商店張燈結綵，不知道正舉行甚麼喜慶活動呢？"] },
  { word: "絡繹不絕", category: "景色與環境", meaning: "形容人馬、車船等來來往往，連續不斷。絡繹，前後相連、不間斷。", examples: ["今天天氣炎熱，到游泳池或沙灘暢泳消暑的人絡繹不絕。", "這條公路是最繁忙的路段之一，總有絡繹不絕的車輛駛過。"] },
  { word: "滄海桑田", category: "景色與環境", meaning: "大海變成桑田，桑田變成大海。比喻世事變化很大。", examples: ["在短短幾年間，這片農地已經發展成住宅區，真是滄海桑田！", "爺爺眼見現今社會物質豐盛，回想自己小時候的簡樸生活，不禁感歎滄海桑田。"] },
  { word: "愁雲慘霧", category: "景色與環境", meaning: "比喻昏暗、淒涼，使人感到愁苦的景象。", examples: ["當同學們得知永聰遇上了交通意外後，班上氣氛一片愁雲慘霧。", "不要被眼前愁雲慘霧的景象嚇倒，只要堅持不懈，總能闖出一片新天。"] },
  { word: "熙來攘往", category: "景色與環境", meaning: "形容行人來來往往，環境擁擠而熱鬧。", examples: ["市場裏熙來攘往，人們都忙着買菜準備做晚飯。", "今天天朗氣清，我們決定遠離熙來攘往的鬧市，到郊外走走。"] },
  { word: "震耳欲聾", category: "景色與環境", meaning: "形容聲音極大，幾乎要把耳朵震聾了。", examples: ["窗外的雷聲震耳欲聾，把我從睡夢中驚醒過來。", "弟弟突然發出震耳欲聾的哭聲，原來他的積木城堡被弄倒了。"] },
  { word: "摩肩接踵", category: "景色與環境", meaning: "形容人多，非常擁擠。摩肩，肩膀互相摩擦；接踵，腳跟碰腳跟。", examples: ["巴士上的乘客摩肩接踵，我幾乎連站的位置都找不到了。", "廣場內正舉辦抽獎活動，摩肩接踵的人潮擠滿了整個廣場。"] },
  { word: "正襟危坐", category: "行為與態度", meaning: "整理服裝儀容，端正坐好。形容莊重、恭敬的樣子。襟，衣襟；危坐，端正地坐着。", examples: ["法官在法庭上正襟危坐，嚴肅地審理這宗案件。", "台下的畢業生全都正襟危坐，專心聽着校長致辭。"] },
  { word: "老生常談", category: "事物與狀態", meaning: "比喻時常聽到，沒有新意的說話。老生，老書生。", examples: ["他的演講內容全是老生常談，毫無新意，觀眾都不感興趣。", "你不要以為這是老生常談，這可是前人多年經歷得來的寶貴道理。"] },
  { word: "含沙射影", category: "事物與狀態", meaning: "傳說有一種水怪叫「蜮」，會把含着的沙粒射到人或影子上，使人生病。後用來比喻暗中誹謗和陷害人。", examples: ["你趁詠潼不在，就在朋友面前含沙射影地指摘她，實屬不當。", "班會主席不滿小明的處事態度，開班會時對他含沙射影，藉機發泄不滿。"] },
  { word: "忍俊不禁", category: "情緒與感受", meaning: "忍不住笑出來。忍俊，含笑。", examples: ["小丑的表演十分滑稽，讓人忍俊不禁。", "翻看舊照片，使我回憶起自己童年時令人忍俊不禁的趣事。"] },
  { word: "邯鄲學步", category: "行為與態度", meaning: "學習邯鄲人走路的姿勢。比喻模仿別人不成，反而失去自己的特色。邯鄲，戰國時期趙國的首都。", examples: ["她的歌喉不錯，卻只懂邯鄲學步，一味模仿某位歌手的唱腔，完全沒有自己的風格。", "曉明學習繪畫時，一會兒模仿畢卡索，一會兒模仿梵高，結果連基本的上色都做不好，實在是邯鄲學步。"] },
  { word: "東施效顰", category: "行為與態度", meaning: "春秋時期，越國醜女東施模仿美女西施捧心皺眉，反而讓人覺得更醜。比喻盲目、胡亂地模仿他人，結果適得其反。效，模仿；顰，皺眉。", examples: ["家明愛模仿李小龍，卻不知道自己只是東施效顰，惹人發笑。", "子琪剪了個跟潔儀一樣的髮型，但沒有變得更好看，只給人東施效顰的感覺。"] },
  { word: "拾人牙慧", category: "行為與態度", meaning: "拾取別人的話、抄襲別人，當作自己的言論和主張。牙慧，言談間流露出的智慧。", examples: ["一心寫作時往往只是拾人牙慧，沒有任何獨到的見解。", "這本書與著名學者的文章內容雷同，有拾人牙慧的嫌疑。"] },
  { word: "洗心革面", category: "行為與態度", meaning: "指除去邪惡的念頭，改變從前的面貌。比喻徹底醒悟，改過向善。洗心，洗去內心的惡念或雜念；革面，改變面目。", examples: ["如果你想改善與同學的關係，就要洗心革面，與人和睦相處。", "他出獄後已經洗心革面，決心找一份正當工作，養活家人。"] },
  { word: "神色自若", category: "行為與態度", meaning: "從容、鎮定的樣子。自若，像原來的樣子。", examples: ["就算病人情況有多危急，急症室的醫生都能神色自若地治療病人。", "考試時間剩下最後五分鐘，希琳已完成考卷，正神色自若地作最後檢查。"] },
  { word: "捲土重來", category: "行為與態度", meaning: "比喻失敗後，重新整頓，再次來過，或恢復原有的局面、局勢。捲土，人、馬奔跑時掀起塵土。", examples: ["今年流感病毒捲土重來，疫情比過去更加嚴重。", "子明沒有因為這次落敗而感到灰心，他相信自己會有捲土重來的機會。"] },
  { word: "趾高氣揚", category: "行為與態度", meaning: "走路時腳抬得很高，樣子顯得十分神氣。形容人驕傲自滿的樣子。", examples: ["天朗第一次在比賽中取得冠軍，便一副趾高氣揚的樣子，瞧不起其他對手。", "她恃着自己家境富裕，便經常趾高氣揚地向別人炫耀自己的名牌手錶和手袋。"] },
  { word: "無言以對", category: "行為與態度", meaning: "沒有話可以回答。", examples: ["辯論比賽中，正方隊員被反駁得無言以對，十分狼狽。", "小偷犯案時被當場查獲，他羞愧地低下頭，只能無言以對。"] },
  { word: "循循善誘", category: "行為與態度", meaning: "善於有步驟地教導、引導別人。循循，有步驟的樣子；誘，引導。", examples: ["在李老師的循循善誘下，同學們的中文成績有了很大進步。", "媽媽知道我犯錯後，沒有責罵我，而是循循善誘地讓我改過。"] },
  { word: "語重心長", category: "行為與態度", meaning: "說話真誠有力，情意深長。", examples: ["妹妹不耐煩地打斷了媽媽語重心長的告誡。", "開學日，老師語重心長地勸勉同學們要善用時間學習。"] },
  { word: "義正辭嚴", category: "行為與態度", meaning: "有義理，而且措辭嚴厲。", examples: ["心雯要求我替她完成功課，我義正辭嚴地拒絕了她的要求。", "法官在法庭上說了一番義正辭嚴的話，訓斥犯事的被告。"] },
  { word: "一笑置之", category: "行為與態度", meaning: "笑一笑就把它放在一旁。形容不值得理會或不把它當作一回事。", examples: ["陳先生言行正直，對於那些負面的批評總是一笑置之。", "對於別人不講理的舉動，有時寧可一笑置之，不必理會。"] },
  { word: "七竅生煙", category: "情緒與感受", meaning: "指眼、耳、鼻、口都冒出煙來。形容焦急或氣憤到了極點。七竅，兩隻眼睛、兩隻耳朵、兩個鼻孔和一個嘴巴。", examples: ["弟弟放學後和朋友去了遊戲機中心，卻沒有告訴媽媽，急得媽媽七竅生煙。", "大家知道他的所作所為後，都氣得七竅生煙。"] },
  { word: "不寒而慄", category: "情緒與感受", meaning: "天氣不寒冷，卻仍然發抖。形容恐懼到極點。慄，打顫、發抖。", examples: ["夜闌人靜的晚上，遠處的樹影顯得陰森恐怖，使我有種不寒而慄的感覺。", "校長的照片很嚴肅，起初同學看到他都感到不寒而慄，後來才發現校長很是友善呢！"] }
];

// --- 8 色主題配置 ---
const themes = [
  { bg: "from-pink-100 to-rose-200", border: "border-pink-400", text: "text-pink-700", btn: "bg-pink-500 hover:bg-pink-600", btnLight: "bg-pink-100 text-pink-700 hover:bg-pink-200", emoji: "🌸" },
  { bg: "from-yellow-100 to-amber-200", border: "border-amber-400", text: "text-amber-700", btn: "bg-amber-500 hover:bg-amber-600", btnLight: "bg-amber-100 text-amber-700 hover:bg-amber-200", emoji: "🌟" },
  { bg: "from-green-100 to-emerald-200", border: "border-emerald-400", text: "text-emerald-700", btn: "bg-emerald-500 hover:bg-emerald-600", btnLight: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200", emoji: "🌿" },
  { bg: "from-sky-100 to-blue-200", border: "border-sky-400", text: "text-sky-700", btn: "bg-sky-500 hover:bg-sky-600", btnLight: "bg-sky-100 text-sky-700 hover:bg-sky-200", emoji: "💎" },
  { bg: "from-purple-100 to-violet-200", border: "border-purple-400", text: "text-purple-700", btn: "bg-purple-500 hover:bg-purple-600", btnLight: "bg-purple-100 text-purple-700 hover:bg-purple-200", emoji: "🦄" },
  { bg: "from-orange-100 to-red-200", border: "border-orange-400", text: "text-orange-700", btn: "bg-orange-500 hover:bg-orange-600", btnLight: "bg-orange-100 text-orange-700 hover:bg-orange-200", emoji: "🍊" },
  { bg: "from-teal-100 to-cyan-200", border: "border-teal-400", text: "text-teal-700", btn: "bg-teal-500 hover:bg-teal-600", btnLight: "bg-teal-100 text-teal-700 hover:bg-teal-200", emoji: "🐬" },
  { bg: "from-fuchsia-100 to-pink-200", border: "border-fuchsia-400", text: "text-fuchsia-700", btn: "bg-fuchsia-500 hover:bg-fuchsia-600", btnLight: "bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200", emoji: "🎀" }
];

// --- 工具函數 ---
const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('cards');
  const [speakingId, setSpeakingId] = useState(null);
  
  // 測驗狀態
  const [quizState, setQuizState] = useState('idle'); // idle, playing, finished
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // 語音功能 (廣東話)
  const speak = (text, id) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const cantoneseVoice = voices.find(v => 
      v.lang.toLowerCase().includes('zh-hk') || 
      v.lang.toLowerCase().includes('yue') ||
      v.name.toLowerCase().includes('cantonese')
    );
    
    if (cantoneseVoice) {
      utterance.voice = cantoneseVoice;
      utterance.lang = cantoneseVoice.lang;
    } else {
      utterance.lang = 'zh-HK';
    }
    
    utterance.rate = 0.85;
    utterance.onstart = () => setSpeakingId(id);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    
    window.speechSynthesis.speak(utterance);
  };

  // 生成測驗
  const startQuiz = () => {
    const shuffledIdioms = shuffle(idiomsData).slice(0, 10);
    const generatedQuestions = shuffledIdioms.map(target => {
      const qTypes = ['meaningToWord', 'fillInBlank', 'wordToMeaning'];
      const type = qTypes[Math.floor(Math.random() * qTypes.length)];
      
      // 從同類別中抽取干擾項，如果不足則從全部抽取
      let sameCategory = idiomsData.filter(i => i.category === target.category && i.word !== target.word);
      if (sameCategory.length < 3) {
        const others = idiomsData.filter(i => i.category !== target.category && i.word !== target.word);
        sameCategory = [...sameCategory, ...shuffle(others)].slice(0, 3);
      }
      const distractors = shuffle(sameCategory).slice(0, 3);
      
      let questionText = "";
      let options = [];
      let correctAnswer = "";

      if (type === 'meaningToWord') {
        questionText = `根據解釋選出正確的成語：\n\n「${target.meaning}」`;
        options = shuffle([target.word, ...distractors.map(d => d.word)]);
        correctAnswer = target.word;
      } else if (type === 'fillInBlank') {
        const randomExample = target.examples[Math.floor(Math.random() * target.examples.length)];
        const blanked = randomExample.replace(target.word, "（　？　）");
        questionText = `請選擇最適合填入空格的成語：\n\n「${blanked}」`;
        options = shuffle([target.word, ...distractors.map(d => d.word)]);
        correctAnswer = target.word;
      } else {
        questionText = `下列哪一個是「${target.word}」的正確解釋？`;
        options = shuffle([target.meaning, ...distractors.map(d => d.meaning)]);
        correctAnswer = target.meaning;
      }

      return { type, questionText, options, correctAnswer, targetWord: target.word };
    });

    setQuestions(generatedQuestions);
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setQuizState('playing');
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;
    const correct = answer === questions[currentQ].correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
      speak(questions[currentQ].targetWord, 'quiz-correct');
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setQuizState('finished');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans pb-12">
      {/* 頂部標題 */}
      <div className="bg-white shadow-md relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500">
              🌈 趣味成語樂園 🌈
            </span>
          </h1>
          <p className="text-lg text-gray-600 font-bold">
            ✨ 廣東話語音 · 8色記憶卡片 · 智能隨機測驗 ✨
          </p>
        </div>
      </div>

      {/* 導航標籤 */}
      <div className="max-w-md mx-auto mt-8 px-4">
        <div className="flex bg-white rounded-full shadow-lg p-1 border-2 border-purple-100">
          <button
            onClick={() => setActiveTab('cards')}
            className={`flex-1 py-3 px-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'cards' ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <BookOpen className="w-5 h-5" /> 學習卡片
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-3 px-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${activeTab === 'quiz' ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <PenTool className="w-5 h-5" /> 智能測驗
          </button>
        </div>
      </div>

      {/* 內容區域 */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        
        {/* === 學習卡片視圖 === */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {idiomsData.map((item, idx) => {
              const theme = themes[idx % themes.length];
              const wordId = `word-${idx}`;
              const meaningId = `meaning-${idx}`;
              
              return (
                <div key={idx} className={`bg-gradient-to-br ${theme.bg} rounded-3xl shadow-lg border-4 ${theme.border} p-5 flex flex-col gap-4 transform transition-all hover:scale-105 hover:shadow-2xl`}>
                  
                  {/* 標題與大喇叭 */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-3 py-1 bg-white/60 rounded-full text-xs font-bold text-gray-700 mb-2 shadow-sm">
                        🏷️ {item.category}
                      </span>
                      <h3 className={`text-3xl font-extrabold ${theme.text} flex items-center gap-2 tracking-widest`}>
                        <span>{theme.emoji}</span> {item.word}
                      </h3>
                    </div>
                    <button 
                      onClick={() => speak(item.word, wordId)}
                      className={`${theme.btn} text-white p-4 rounded-full shadow-md flex-shrink-0 transition-all ${speakingId === wordId ? 'animate-pulse scale-110 ring-4 ring-yellow-300' : 'hover:scale-110'}`}
                      title="朗讀成語"
                    >
                      <Volume2 className="w-6 h-6" />
                    </button>
                  </div>

                  {/* 解釋 */}
                  <div className="bg-white/80 rounded-2xl p-4 shadow-inner relative group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-blue-800">📖 解釋</span>
                      <button 
                        onClick={() => speak(item.meaning, meaningId)}
                        className={`text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1 transition-all ${theme.btnLight} ${speakingId === meaningId ? 'animate-pulse ring-2 ring-yellow-300' : ''}`}
                      >
                        <Volume2 className="w-3 h-3" /> 讀解釋
                      </button>
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>

                  {/* 例句 */}
                  <div className="bg-white/90 rounded-2xl p-4 shadow-inner border-2 border-dashed border-gray-300 flex-1">
                    <span className="text-sm font-bold text-green-800 mb-2 block">✍️ 例句</span>
                    <div className="space-y-3">
                      {item.examples.map((ex, exIdx) => {
                        const exId = `ex-${idx}-${exIdx}`;
                        return (
                          <div key={exIdx} className="flex gap-2 items-start">
                            <button 
                              onClick={() => speak(ex, exId)}
                              className={`mt-1 flex-shrink-0 p-1.5 rounded-full transition-all ${theme.btnLight} ${speakingId === exId ? 'animate-pulse ring-2 ring-yellow-300' : ''}`}
                              title="朗讀例句"
                            >
                              <Volume2 className="w-3 h-3" />
                            </button>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {ex}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* === 智能測驗視圖 === */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto">
            
            {/* 測驗首頁 */}
            {quizState === 'idle' && (
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center border-t-8 border-emerald-400">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center mx-auto shadow-lg mb-6 animate-bounce">
                  <Award className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-4">準備好接受挑戰了嗎？</h2>
                <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left inline-block">
                  <p className="font-bold text-blue-800 mb-2">📋 測驗規則：</p>
                  <ul className="text-blue-700 space-y-2 font-medium">
                    <li>🎲 每次隨機抽出 10 條題目</li>
                    <li>🎨 三種題型（看解釋、填空、選解釋）隨機出現</li>
                    <li>🔊 答對會自動朗讀該成語加深印象</li>
                  </ul>
                </div>
                <br />
                <button 
                  onClick={startQuiz}
                  className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-xl transform hover:scale-105 transition-all flex items-center gap-3 mx-auto"
                >
                  <Play className="w-8 h-8 fill-current" /> 開始測驗
                </button>
              </div>
            )}

            {/* 測驗進行中 */}
            {quizState === 'playing' && questions.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border-t-8 border-blue-400">
                
                {/* 進度條 */}
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-bold">
                    第 {currentQ + 1} / {questions.length} 題
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full font-bold flex items-center gap-1">
                    <Star className="w-5 h-5 fill-current" /> {score} 分
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4 mb-8 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>

                {/* 題目 */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-4 border-indigo-100 mb-8 shadow-sm">
                  <p className="text-xl font-bold text-gray-800 whitespace-pre-line leading-relaxed">
                    {questions[currentQ].questionText}
                  </p>
                </div>

                {/* 選項 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentQ].options.map((opt, idx) => {
                    const borderColors = ['border-pink-400', 'border-blue-400', 'border-emerald-400', 'border-amber-400'];
                    const bgHoverColors = ['hover:bg-pink-50', 'hover:bg-blue-50', 'hover:bg-emerald-50', 'hover:bg-amber-50'];
                    
                    let btnClass = `bg-white border-4 ${borderColors[idx]} ${bgHoverColors[idx]} text-gray-700`;
                    
                    if (selectedAnswer) {
                      if (opt === questions[currentQ].correctAnswer) {
                        btnClass = "bg-green-100 border-4 border-green-500 text-green-800 shadow-md";
                      } else if (opt === selectedAnswer) {
                        btnClass = "bg-red-100 border-4 border-red-500 text-red-800";
                      } else {
                        btnClass = "bg-gray-50 border-4 border-gray-200 text-gray-400 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(opt)}
                        disabled={selectedAnswer !== null}
                        className={`p-4 rounded-2xl text-left text-lg font-bold transition-all transform ${selectedAnswer ? '' : 'hover:-translate-y-1 shadow-sm hover:shadow-md'} ${btnClass}`}
                      >
                        <span className="inline-block w-8 h-8 rounded-full bg-gray-800 text-white text-center leading-8 mr-3 shadow-sm">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* 結果提示 */}
                {selectedAnswer && (
                  <div className={`mt-8 p-5 rounded-2xl flex items-center gap-4 text-xl font-bold animate-bounce ${isCorrect ? 'bg-green-100 text-green-800 border-4 border-green-300' : 'bg-red-100 text-red-800 border-4 border-red-300'}`}>
                    {isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                    {isCorrect ? '🎉 答對了！好叻仔/叻女！' : `❌ 哎呀答錯了！正確答案是：${questions[currentQ].correctAnswer}`}
                  </div>
                )}
              </div>
            )}

            {/* 測驗完成 */}
            {quizState === 'finished' && (
              <div className="bg-white rounded-3xl shadow-xl p-10 text-center border-t-8 border-pink-400 animate-pulse">
                <div className="text-8xl mb-6">🏆</div>
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
                  測驗完成！
                </h2>
                <p className="text-2xl text-gray-700 font-bold mb-8">
                  你的總得分：
                  <span className="text-6xl text-emerald-500 mx-3">{score}</span>
                  / 10
                </p>
                
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={startQuiz}
                    className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-xl font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <RefreshCw className="w-6 h-6" /> 再玩一次
                  </button>
                  <button 
                    onClick={() => setQuizState('idle')}
                    className="bg-gray-200 text-gray-700 text-xl font-bold py-3 px-8 rounded-full shadow hover:bg-gray-300 transition-all"
                  >
                    返回
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}