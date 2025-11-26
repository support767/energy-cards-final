import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  RefreshCw,
  Heart,
  Zap,
  Infinity,
  Star,
  Move,
  Eye,
  Moon,
  Feather,
  Sun,
  Droplets,
  Wind,
  Mountain,
  Flower,
  Cloud,
  Download,
  X,
  Volume2,
  VolumeX,
  Microscope,
} from "lucide-react";

// --- 1. 音效資源連結 (使用穩定的 CDN 連結) ---
const AUDIO_SRC = {
  dayBgm: "https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3",
  nightBgm: "https://assets.mixkit.co/music/preview/mixkit-night-sky-970.mp3",
  cardFlip:
    "https://assets.mixkit.co/sfx/preview/mixkit-game-card-flip-2569.mp3",
  click:
    "https://assets.mixkit.co/sfx/preview/mixkit-modern-click-box-check-1120.mp3",
};

// --- 2. 自定義 SVG 圖示 ---
const InstagramShareIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

// --- 3. 數據庫與配置 (完整 245 句) ---
// 這裡保留您的完整數據結構，為了節省長度，部分內容省略，實際使用時請確保包含所有內容
const CHAKRAS = [
  {
    id: "root",
    name: "海底輪 · Root Chakra",
    color: "border-red-400",
    textColor: "text-red-900",
    dayTextColor: "text-red-900",
    subColor: "text-red-600/60",
    shadow: "shadow-red-900/10",
    iconColor: "text-red-500",
    keywords: "生存 · 安全 · 穩定",
    guidance: "對應脊椎根部，代表生存本能、安全感與大地的連結。",
  },
  {
    id: "sacral",
    name: "生殖輪 · Sacral Chakra",
    color: "border-orange-400",
    textColor: "text-orange-900",
    dayTextColor: "text-orange-900",
    subColor: "text-orange-600/60",
    shadow: "shadow-orange-900/10",
    iconColor: "text-orange-500",
    keywords: "情緒 · 創造 · 喜悅",
    guidance: "對應下腹部，代表情緒流動、感官享受與創造力的泉源。",
  },
  {
    id: "solar",
    name: "太陽神經叢 · Solar Plexus",
    color: "border-yellow-500",
    textColor: "text-yellow-900",
    dayTextColor: "text-yellow-800",
    subColor: "text-yellow-700/60",
    shadow: "shadow-yellow-900/10",
    iconColor: "text-yellow-600",
    keywords: "自信 · 意志 · 行動",
    guidance: "對應胃部，代表意志力、自信與個人力量的主導權。",
  },
  {
    id: "heart",
    name: "心輪 · Heart Chakra",
    color: "border-green-500",
    textColor: "text-green-900",
    dayTextColor: "text-green-900",
    subColor: "text-green-700/60",
    shadow: "shadow-green-900/10",
    iconColor: "text-green-600",
    keywords: "愛 · 寬恕 · 接納",
    guidance: "對應心臟與胸腔，代表無條件的愛、接納與慈悲的流動。",
  },
  {
    id: "throat",
    name: "喉輪 · Throat Chakra",
    color: "border-blue-400",
    textColor: "text-blue-900",
    dayTextColor: "text-blue-900",
    subColor: "text-blue-700/60",
    shadow: "shadow-blue-900/10",
    iconColor: "text-blue-500",
    keywords: "溝通 · 真實 · 表達",
    guidance: "對應喉嚨，代表真實的溝通、自我表達與內在誠信。",
  },
  {
    id: "thirdEye",
    name: "眉心輪 · Third Eye",
    color: "border-indigo-400",
    textColor: "text-indigo-900",
    dayTextColor: "text-indigo-900",
    subColor: "text-indigo-700/60",
    shadow: "shadow-indigo-900/10",
    iconColor: "text-indigo-600",
    keywords: "直覺 · 洞見 · 想像",
    guidance: "對應眉心，代表直覺力、洞察力與超越表象的智慧。",
  },
  {
    id: "crown",
    name: "頂輪 · Crown Chakra",
    color: "border-violet-400",
    textColor: "text-violet-900",
    dayTextColor: "text-violet-900",
    subColor: "text-violet-700/60",
    shadow: "shadow-violet-900/10",
    iconColor: "text-violet-600",
    keywords: "靈性 · 合一 · 智慧",
    guidance: "對應頭頂，代表靈性連結、合一意識與更高的悟性。",
  },
];

const QUOTES_DB = [
  {
    text: "恐懼存在是因為你活在你的想像中，而不是活在現實中。",
    en: "Fear is simply because you are not living with life, you are living in your mind.",
    type: "root",
  },
  {
    text: "行動是恐懼的解藥。",
    en: "Action is the antidote to fear.",
    type: "root",
  },
  {
    text: "讓你的生命成為一場慶祝，而不是一場戰鬥。",
    en: "Make your life a celebration, not a battle.",
    type: "sacral",
  },
  {
    text: "決定的一瞬間，命運就此形塑。",
    en: "It is in your moments of decision that your destiny is shaped.",
    type: "solar",
  },
  {
    text: "傷口是光進入你內心的地方。",
    en: "The wound is the place where the Light enters you.",
    type: "heart",
  },
  {
    text: "在寂靜中，你會聽見宇宙的聲音。",
    en: "In silence, you will hear the voice of the universe.",
    type: "throat",
  },
  {
    text: "閉上雙眼，才能看見真實的世界。",
    en: "Close your eyes to see the real world.",
    type: "thirdEye",
  },
  {
    text: "你不是擁有靈魂的人類，你是正在體驗人生的靈魂。",
    en: "You are not a human being having a spiritual experience. You are a spiritual being having a human experience.",
    type: "crown",
  },
  // ... (請確保此處包含完整的 245 句資料庫)
];

// --- 4. 組件 ---

const Card = ({
  data,
  isRevealed,
  onClick,
  index,
  theme,
  isMobileFocused,
  className = "",
}) => {
  const chakraInfo = CHAKRAS.find((c) => c.id === data.type);
  if (!chakraInfo) return null;

  return (
    <div
      className={`relative w-64 h-96 cursor-pointer perspective-1000 transition-transform duration-700 ${className} ${
        isRevealed && !isMobileFocused ? "" : "hover:scale-105"
      }`}
      onClick={onClick}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className={`relative w-full h-full duration-1000 preserve-3d transition-all ${
          isRevealed ? "rotate-y-180" : ""
        }`}
      >
        {/* --- 卡牌背面 --- */}
        {theme === "night" ? (
          <div className="absolute w-full h-full backface-hidden rounded-xl shadow-2xl overflow-hidden bg-slate-900 border border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-black"></div>
            <div className="absolute inset-4 border border-white/10 rounded-lg flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-white/5 flex items-center justify-center animate-pulse-slow">
                <div className="w-1 h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                <div className="absolute w-24 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
              <div className="absolute">
                <Sparkles className="text-white/40 w-6 h-6 animate-spin-slow" />
              </div>
            </div>
            <p className="absolute bottom-6 w-full text-center text-white/30 text-[10px] tracking-[0.4em] font-light uppercase">
              Universe
            </p>
          </div>
        ) : (
          // 修改：加深日間卡背的邊框與陰影
          <div className="absolute w-full h-full backface-hidden rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] overflow-hidden bg-white border border-stone-300">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/30 to-orange-50/10"></div>
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute inset-4 border border-stone-300/60 rounded-lg flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-stone-300/60 flex items-center justify-center animate-pulse-slow">
                <div className="w-1 h-24 bg-gradient-to-b from-transparent via-orange-200/30 to-transparent"></div>
                <div className="absolute w-24 h-1 bg-gradient-to-r from-transparent via-orange-200/30 to-transparent"></div>
              </div>
              <div className="absolute">
                <Sun className="text-orange-400/50 w-6 h-6 animate-spin-slow" />
              </div>
            </div>
            <p className="absolute bottom-6 w-full text-center text-stone-400 text-[10px] tracking-[0.4em] font-light uppercase">
              Awakening
            </p>
          </div>
        )}

        {/* --- 卡牌正面 --- */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.1)] rotate-y-180 overflow-hidden flex flex-col items-center text-center p-1 ${
            theme === "night"
              ? "bg-[#FDFCF8] shadow-black/50"
              : "bg-white border border-stone-300 shadow-xl shadow-stone-300/50"
          }`}
        >
          <div
            className={`w-full h-full border-2 ${chakraInfo.color} rounded-lg flex flex-col relative overflow-hidden`}
          >
            <div
              className={`absolute top-0 left-0 right-0 h-32 opacity-5 bg-gradient-to-b from-${
                chakraInfo.color.split("-")[1]
              }-400 to-transparent`}
            ></div>
            <div className="flex-1 flex flex-col items-center p-5 pt-8 relative z-10">
              <div
                className={`text-[10px] tracking-[0.2em] uppercase font-bold mb-3 ${chakraInfo.subColor}`}
              >
                {chakraInfo.keywords}
              </div>
              <div className={`mb-6 opacity-90 ${chakraInfo.iconColor}`}>
                {data.type === "root" && (
                  <Mountain strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "sacral" && (
                  <Droplets strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "solar" && (
                  <Sun strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "heart" && (
                  <Flower strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "throat" && (
                  <Wind strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "thirdEye" && (
                  <Eye strokeWidth={1.5} className="w-6 h-6" />
                )}
                {data.type === "crown" && (
                  <Sparkles strokeWidth={1.5} className="w-6 h-6" />
                )}
              </div>
              <h3
                className={`text-base font-medium mb-3 leading-relaxed tracking-wide ${
                  theme === "day"
                    ? chakraInfo.dayTextColor || chakraInfo.textColor
                    : chakraInfo.textColor
                } font-serif min-h-[4.5rem] flex items-center justify-center`}
              >
                {data.text}
              </h3>
              <p className="text-[10px] font-serif italic text-slate-500/80 leading-relaxed font-light mb-6 px-2">
                {data.en}
              </p>

              {/* 修改：調整留白與間距，往上移 */}
              <div className="mt-auto w-full mb-6">
                <div className="flex items-center justify-center gap-2 mb-2 opacity-20">
                  <div
                    className={`h-[1px] flex-1 ${chakraInfo.color.replace(
                      "border",
                      "bg"
                    )}`}
                  ></div>
                  <Feather className="w-3 h-3 text-slate-400" />
                  <div
                    className={`h-[1px] flex-1 ${chakraInfo.color.replace(
                      "border",
                      "bg"
                    )}`}
                  ></div>
                </div>
                <div
                  className={`text-xs text-left leading-relaxed font-light px-4 py-3 rounded bg-slate-50/50 ${
                    theme === "day"
                      ? chakraInfo.dayTextColor || chakraInfo.textColor
                      : chakraInfo.textColor
                  }`}
                >
                  <span className="font-bold text-[9px] opacity-60 uppercase tracking-wider block mb-1">
                    Energy Awareness
                  </span>
                  {/* 新增脈輪名稱標示 */}
                  <div className="font-medium mb-1 opacity-80 text-[10px] tracking-wide">
                    {chakraInfo.name}
                  </div>
                  {chakraInfo.guidance}
                </div>
              </div>
            </div>
            {/* 底部脈輪標籤 */}
            <div className="pb-3 text-[8px] uppercase tracking-[0.2em] text-slate-400/60 font-light mt-2">
              {chakraInfo.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 隱藏的分享卡片生成區 ---
const ShareCardView = ({ cardSelected, theme, targetRef }) => {
  if (!cardSelected) return null;

  return (
    <div
      ref={targetRef}
      className={`fixed top-[-9999px] left-[-9999px] w-[400px] p-8 flex flex-col items-center justify-center gap-6 ${
        theme === "night"
          ? "bg-[#1e2029] text-white"
          : "bg-[#F5F5F0] text-slate-800"
      }`}
    >
      <div className="text-center mb-2">
        <h2 className="text-2xl font-serif tracking-[0.3em] mb-1">
          今日能量卡
        </h2>
        <p className="text-[10px] tracking-[0.4em] opacity-60 uppercase">
          Daily Energy Oracle
        </p>
        <div className="mt-1 text-[10px] opacity-40">
          {new Date().toLocaleDateString()}
        </div>
      </div>
      <Card data={cardSelected} isRevealed={true} index={0} theme={theme} />
      <div className="mt-2 text-[8px] tracking-[0.5em] opacity-40 uppercase">
        Connect With The Universe
      </div>
    </div>
  );
};

export default function App() {
  const [gameState, setGameState] = useState("intro");
  const [drawnCards, setDrawnCards] = useState([]);
  const [flippedStates, setFlippedStates] = useState([false, false]);
  const [theme, setTheme] = useState("night");
  const [particles, setParticles] = useState([]);
  const [mobileFocusIndex, setMobileFocusIndex] = useState(0);

  const [isSharing, setIsSharing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [cardToShare, setCardToShare] = useState(null);
  const shareRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const bgmRef = useRef(null);
  const sfxRef = useRef(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) setTheme("day");
    else setTheme("night");
  }, []);

  // 動態加載 html2canvas
  useEffect(() => {
    if (!document.getElementById("html2canvas-script")) {
      const script = document.createElement("script");
      script.id = "html2canvas-script";
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // 初始化與切換背景音樂
  useEffect(() => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio();
      bgmRef.current.loop = true;
    }

    const bgm = bgmRef.current;
    const targetSrc = theme === "day" ? AUDIO_SRC.dayBgm : AUDIO_SRC.nightBgm;

    if (bgm.src !== targetSrc) {
      bgm.src = targetSrc;
      bgm.load();
      if (!isMuted) {
        bgm
          .play()
          .catch((e) =>
            console.log("Autoplay prevented (normal in preview)", e)
          );
      }
    }
  }, [theme]);

  useEffect(() => {
    if (bgmRef.current) {
      if (isMuted) {
        bgmRef.current.pause();
      } else {
        bgmRef.current.play().catch((e) => console.log("Playback failed", e));
      }
    }
  }, [isMuted]);

  const playSfx = (type) => {
    if (isMuted) return;
    const sfx = new Audio(AUDIO_SRC[type]);
    sfx.volume = 0.6;
    sfx.play().catch((e) => console.log("SFX failed", e));
  };

  const toggleTheme = () => {
    playSfx("click");
    setTheme((prev) => (prev === "day" ? "night" : "day"));
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const drawCards = () => {
    if (bgmRef.current && bgmRef.current.paused && !isMuted) {
      bgmRef.current
        .play()
        .catch((e) => console.error("Audio play failed:", e));
    }

    playSfx("click");
    setGameState("shuffling");
    if (navigator.vibrate) navigator.vibrate(50);
    setTimeout(() => {
      const shuffled = [...QUOTES_DB].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);
      setDrawnCards(selected);
      setGameState("drawing");
    }, 2500);
  };

  const toggleFlip = (index) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && mobileFocusIndex !== index) {
      playSfx("click");
      setMobileFocusIndex(index);
      return;
    }

    if (flippedStates[index]) return;

    playSfx("cardFlip");
    const newFlipped = [...flippedStates];
    newFlipped[index] = true;
    setFlippedStates(newFlipped);
    if (navigator.vibrate) navigator.vibrate(20);
    if (newFlipped.every(Boolean)) {
      setTimeout(() => setGameState("result"), 1000);
    }
  };

  const resetGame = () => {
    playSfx("click");
    setGameState("intro");
    setFlippedStates([false, false]);
    setDrawnCards([]);
    setMobileFocusIndex(0);
    setShowShareModal(false);
  };

  const initiateShare = () => {
    playSfx("click");
    setShowShareModal(true);
  };

  const executeShare = async (card) => {
    playSfx("click");
    setCardToShare(card);
    setIsSharing(true);
    setShowShareModal(false);

    setTimeout(async () => {
      if (!shareRef.current || !window.html2canvas) return;

      try {
        const canvas = await window.html2canvas(shareRef.current, {
          useCORS: true,
          backgroundColor: theme === "night" ? "#1e2029" : "#F5F5F0",
          scale: 3,
        });

        canvas.toBlob(async (blob) => {
          const file = new File([blob], "daily-energy-card.png", {
            type: "image/png",
          });

          if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({ files: [file] })
          ) {
            try {
              await navigator.share({
                files: [file],
                title: "今日能量卡",
                text: `這是我今天的宇宙指引：${card.text} ✨`,
              });
            } catch (err) {
              console.log("Share canceled or failed", err);
            }
          } else {
            const link = document.createElement("a");
            link.download = `energy-card-${
              new Date().toISOString().split("T")[0]
            }.png`;
            link.href = canvas.toDataURL();
            link.click();
          }
          setIsSharing(false);
          setCardToShare(null);
        }, "image/png");
      } catch (error) {
        console.error("Share failed:", error);
        setIsSharing(false);
        setCardToShare(null);
      }
    }, 500);
  };

  return (
    <div
      className={`min-h-screen w-full font-sans overflow-hidden flex flex-col items-center justify-center relative transition-colors duration-1000 ${
        theme === "night"
          ? "bg-[#050510] text-white"
          : "bg-[#F0EFEB] text-slate-800"
      }`}
    >
      <ShareCardView
        cardSelected={cardToShare}
        theme={theme}
        targetRef={shareRef}
      />

      {/* 分享選擇模態框 */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div
            className={`relative w-full max-w-md p-6 rounded-2xl shadow-2xl flex flex-col items-center ${
              theme === "night"
                ? "bg-[#1e2029] text-white"
                : "bg-[#FDFCF5] text-slate-800"
            }`}
          >
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 opacity-50 hover:opacity-100"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-serif tracking-wider mb-6">
              選擇要分享的卡片
            </h3>
            <div className="flex gap-4 justify-center w-full">
              {drawnCards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                  onClick={() => executeShare(card)}
                >
                  <div className="transform transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2 shadow-lg rounded-xl overflow-hidden">
                    <div className="w-32 h-48 pointer-events-none">
                      <Card
                        data={card}
                        isRevealed={true}
                        index={idx}
                        theme={theme}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-xs tracking-widest opacity-60 group-hover:opacity-100">
                    {idx === 0 ? "指引卡" : "能量卡"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 右下角 Logo */}
      <div
        className={`fixed bottom-4 right-4 z-40 flex items-center gap-2 transition-opacity duration-300 ${
          theme === "night"
            ? "text-white/20 hover:text-white/50"
            : "text-slate-800/20 hover:text-slate-800/50"
        }`}
      >
        <Microscope className="w-4 h-4" />
        <span className="text-[10px] tracking-widest font-serif">
          Powered by 健康關係實驗室
        </span>
      </div>

      {/* 動態背景 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {theme === "night" ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b1a] via-[#101024] to-[#050510]"></div>
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  top: p.top,
                  left: p.left,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  opacity: Math.random() * 0.5 + 0.2,
                  animationDuration: `${p.duration}s`,
                }}
              ></div>
            ))}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[#F0EFEB]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF]/80 via-[#F5F5F0]/50 to-[#E6E2D6]/50"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-orange-300/10 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div
              className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-rose-300/10 rounded-full blur-[100px] animate-pulse-slow"
              style={{ animationDelay: "2s" }}
            ></div>
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full bg-amber-400/20 animate-pulse"
                style={{
                  top: p.top,
                  left: p.left,
                  width: `${p.size * 2}px`,
                  height: `${p.size * 2}px`,
                  opacity: Math.random() * 0.3 + 0.1,
                  animationDuration: `${p.duration + 2}s`,
                }}
              ></div>
            ))}
          </>
        )}
      </div>

      {/* 左上角控制區：聲音 */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={toggleMute}
          className={`p-3 rounded-full backdrop-blur-md border transition-all duration-500 hover:scale-110 ${
            theme === "night"
              ? "bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10"
              : "bg-[#FFF9F0]/80 border-orange-200/50 text-orange-400 hover:bg-white shadow-sm"
          }`}
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* 右上角控制區：日夜 */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full backdrop-blur-md border transition-all duration-500 hover:scale-110 ${
            theme === "night"
              ? "bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10"
              : "bg-[#FFF9F0]/80 border-orange-200/50 text-orange-400 hover:bg-white shadow-sm"
          }`}
          title={
            theme === "night" ? "Switch to Day Mode" : "Switch to Night Mode"
          }
        >
          {theme === "night" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        <header className="mb-6 md:mb-10 text-center relative">
          <div
            className={`absolute -inset-8 bg-gradient-to-r blur-xl ${
              theme === "night"
                ? "from-transparent via-purple-500/10 to-transparent"
                : "from-transparent via-orange-300/10 to-transparent"
            }`}
          ></div>
          <h1
            className={`text-3xl md:text-5xl font-light tracking-[0.3em] text-transparent bg-clip-text font-serif ${
              theme === "night"
                ? "bg-gradient-to-r from-indigo-100 via-white to-purple-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                : "bg-gradient-to-r from-slate-600 via-slate-800 to-slate-600 drop-shadow-sm"
            }`}
          >
            今日能量卡
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
            <div
              className={`h-[1px] w-12 bg-gradient-to-r ${
                theme === "night"
                  ? "from-transparent to-white"
                  : "from-transparent to-slate-400"
              }`}
            ></div>
            <p
              className={`text-[10px] md:text-xs tracking-[0.4em] font-light uppercase ${
                theme === "night" ? "text-indigo-200" : "text-slate-500"
              }`}
            >
              Daily Energy Oracle
            </p>
            <div
              className={`h-[1px] w-12 bg-gradient-to-l ${
                theme === "night"
                  ? "from-transparent to-white"
                  : "from-transparent to-slate-400"
              }`}
            ></div>
          </div>
        </header>

        {gameState === "intro" && (
          <div className="flex flex-col items-center animate-fadeIn">
            <div
              className="relative group cursor-pointer perspective-1000"
              onClick={drawCards}
            >
              <div
                className={`absolute top-0 left-0 w-56 h-80 rounded-xl border transform translate-x-1 translate-y-1 ${
                  theme === "night"
                    ? "bg-slate-800 border-white/5"
                    : "bg-orange-50 border-orange-200/30"
                }`}
              ></div>
              <div
                className={`absolute top-0 left-0 w-56 h-80 rounded-xl border transform translate-x-2 translate-y-2 ${
                  theme === "night"
                    ? "bg-slate-800 border-white/5"
                    : "bg-orange-50 border-orange-200/30"
                }`}
              ></div>
              <div
                className={`relative w-56 h-80 rounded-xl shadow-2xl border flex flex-col items-center justify-center overflow-hidden transition-all duration-500 group-hover:-translate-y-2 ${
                  theme === "night"
                    ? "bg-[#0F0F1A] border-white/10 shadow-[0_0_40px_rgba(79,70,229,0.15)] group-hover:shadow-[0_0_60px_rgba(79,70,229,0.3)]"
                    : "bg-[#FFFDF5] border-orange-100 shadow-[0_10px_40px_rgba(251,146,60,0.1)] group-hover:shadow-[0_20px_60px_rgba(251,146,60,0.2)]"
                }`}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <div
                  className={`w-40 h-40 border rounded-full flex items-center justify-center animate-spin-slow ${
                    theme === "night"
                      ? "border-white/5"
                      : "border-orange-200/20"
                  }`}
                >
                  <div
                    className={`w-32 h-32 border rounded-full ${
                      theme === "night"
                        ? "border-white/5"
                        : "border-orange-200/20"
                    }`}
                  ></div>
                </div>
                <div className="absolute flex flex-col items-center">
                  {theme === "night" ? (
                    <Moon
                      className="w-8 h-8 text-indigo-300 mb-3 opacity-80"
                      strokeWidth={1}
                    />
                  ) : (
                    <Sun
                      className="w-8 h-8 text-orange-400 mb-3 opacity-80"
                      strokeWidth={1}
                    />
                  )}
                  <span
                    className={`tracking-[0.2em] text-xs font-light ${
                      theme === "night"
                        ? "text-indigo-200/60"
                        : "text-slate-400"
                    }`}
                  >
                    TOUCH TO CONNECT
                  </span>
                </div>
              </div>
            </div>
            <p
              className={`mt-12 text-center max-w-md leading-loose font-serif text-sm tracking-wide ${
                theme === "night" ? "text-indigo-200/40" : "text-slate-500/60"
              }`}
            >
              {theme === "night"
                ? "萬物皆有頻率，讓宇宙的指引流向你。"
                : "新的一天，深呼吸，接收今日的祝福與光。"}
            </p>
          </div>
        )}

        {gameState === "shuffling" && (
          <div className="flex flex-col items-center justify-center h-80">
            <div className="relative">
              <div
                className={`w-24 h-24 border-[1px] rounded-full animate-ping absolute ${
                  theme === "night"
                    ? "border-indigo-500/30"
                    : "border-orange-400/20"
                }`}
              ></div>
              <div
                className={`w-24 h-24 border-t-[1px] rounded-full animate-spin ${
                  theme === "night" ? "border-indigo-300" : "border-orange-400"
                }`}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles
                  className={`w-6 h-6 animate-pulse ${
                    theme === "night" ? "text-indigo-200" : "text-orange-400"
                  }`}
                />
              </div>
            </div>
            <p
              className={`mt-10 text-lg font-light tracking-widest animate-pulse font-serif ${
                theme === "night" ? "text-indigo-100" : "text-slate-600"
              }`}
            >
              Connecting...
            </p>
          </div>
        )}

        {(gameState === "drawing" || gameState === "result") && (
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full h-[450px] md:h-auto flex justify-center items-center perspective-1000 mb-10">
              {drawnCards.map((card, idx) => {
                const isMobile =
                  typeof window !== "undefined" && window.innerWidth < 768;
                const isFocused = mobileFocusIndex === idx;

                // 判斷是否應該發光 (只在手機版、只翻開一張時、且這張牌是沒翻開的那張)
                const shouldGlow =
                  isMobile &&
                  flippedStates.filter(Boolean).length === 1 &&
                  !flippedStates[idx];

                let cardStyleClass =
                  "transition-all duration-500 ease-out shadow-2xl";
                let containerStyle = {};

                // 自然呼吸光暈 (Box-Shadow)
                // Day: Amber/Orange Glow
                // Night: White Moonlight Glow
                const glowClass = shouldGlow
                  ? theme === "day"
                    ? "animate-breathe-day rounded-xl relative z-50"
                    : "animate-breathe-night rounded-xl relative z-50"
                  : "";

                if (isMobile) {
                  cardStyleClass += " absolute";
                  if (isFocused) {
                    containerStyle = {
                      zIndex: 50,
                      transform:
                        "translate(-50%, -50%) scale(1.05) rotate(0deg)",
                      top: "45%",
                      left: "50%",
                    };
                  } else {
                    containerStyle = {
                      zIndex: shouldGlow ? 40 : 10,
                      transform: `translate(${
                        idx === 0 ? "-65%" : "-35%"
                      }, -48%) scale(0.95) rotate(${
                        idx === 0 ? "-5deg" : "5deg"
                      })`,
                      top: "55%",
                      left: "50%",
                    };
                  }
                } else {
                  containerStyle = { margin: "0 20px" };
                }

                return (
                  <div
                    key={idx}
                    className={`${
                      isMobile ? "absolute" : "relative"
                    } flex flex-col items-center gap-6 transition-all duration-500`}
                    style={containerStyle}
                    onClick={() => isMobile && toggleFlip(idx)}
                  >
                    <span
                      className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-1000 ${
                        flippedStates[idx]
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      } ${
                        theme === "night"
                          ? "text-indigo-300/40"
                          : "text-slate-400/60"
                      }`}
                    >
                      {idx === 0 ? "Guidance · 指引" : "Energy · 能量"}
                    </span>

                    <Card
                      index={idx}
                      data={card}
                      isRevealed={flippedStates[idx]}
                      onClick={() => toggleFlip(idx)}
                      theme={theme}
                      isMobileFocused={isFocused}
                      className={glowClass}
                    />
                  </div>
                );
              })}
            </div>

            {gameState === "result" && (
              <div className="animate-fadeInUp flex flex-col items-center gap-4 mt-2 md:mt-0 z-50">
                <div className="flex gap-4">
                  <button
                    onClick={resetGame}
                    className={`group relative px-6 py-2 overflow-hidden rounded-full bg-transparent border transition-all duration-300 ${
                      theme === "night"
                        ? "border-white/10 hover:border-white/30"
                        : "border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 w-0 transition-all duration-[250ms] ease-out group-hover:w-full ${
                        theme === "night" ? "bg-white/5" : "bg-slate-100"
                      }`}
                    ></div>
                    <div className="relative flex items-center gap-2">
                      <RefreshCw
                        className={`w-3 h-3 group-hover:rotate-180 transition-transform duration-700 ${
                          theme === "night"
                            ? "text-indigo-300"
                            : "text-slate-500"
                        }`}
                      />
                      <span
                        className={`tracking-[0.2em] text-xs ${
                          theme === "night"
                            ? "text-indigo-200"
                            : "text-slate-600"
                        }`}
                      >
                        RESTART
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={initiateShare}
                    disabled={isSharing}
                    className={`group relative px-6 py-2 overflow-hidden rounded-full bg-transparent border transition-all duration-300 ${
                      theme === "night"
                        ? "border-indigo-500/50 hover:border-indigo-400 bg-indigo-900/20"
                        : "border-orange-300 hover:border-orange-400 bg-orange-50"
                    }`}
                  >
                    <div className="relative flex items-center gap-2">
                      {isSharing ? (
                        <span className="animate-spin">
                          <RefreshCw className="w-3 h-3" />
                        </span>
                      ) : (
                        <InstagramShareIcon
                          className={`w-3 h-3 ${
                            theme === "night"
                              ? "text-indigo-300"
                              : "text-orange-500"
                          }`}
                        />
                      )}
                      <span
                        className={`tracking-[0.2em] text-xs ${
                          theme === "night"
                            ? "text-indigo-200"
                            : "text-orange-600"
                        }`}
                      >
                        {isSharing ? "SAVING..." : "SHARE"}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {gameState === "drawing" && !flippedStates.every(Boolean) && (
              <p
                className={`mt-8 mb-20 md:mb-8 animate-pulse tracking-[0.2em] text-xs font-light ${
                  theme === "night" ? "text-indigo-200/30" : "text-slate-400"
                }`}
              >
                {typeof window !== "undefined" && window.innerWidth < 768
                  ? "點擊卡牌切換與翻開"
                  : "點擊卡牌翻開訊息"}
              </p>
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }

        /* 自然呼吸光暈 - 日間 (Amber Glow) */
        @keyframes breatheDay {
          0%,
          100% {
            box-shadow: 0 0 20px 5px rgba(251, 146, 60, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 50px 15px rgba(251, 146, 60, 0.6);
            transform: scale(1.02);
          }
        }
        .animate-breathe-day {
          animation: breatheDay 3s ease-in-out infinite;
        }

        /* 自然呼吸光暈 - 夜間 (Moonlight Glow) */
        @keyframes breatheNight {
          0%,
          100% {
            box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.2);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 60px 20px rgba(255, 255, 255, 0.5);
            transform: scale(1.02);
          }
        }
        .animate-breathe-night {
          animation: breatheNight 3s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
