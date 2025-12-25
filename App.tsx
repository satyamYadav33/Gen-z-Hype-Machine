import React, { useState } from 'react';
import InputGroup from './components/InputGroup';
import ResultCard from './components/ResultCard';
import { generateCaptions } from './services/geminiService';
import { LoadingState, Tone } from './types';

const TONE_OPTIONS: Tone[] = ['Sassy', 'Chill', 'Extra', 'Witty'];

const App: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [features, setFeatures] = useState('');
  const [selectedTone, setSelectedTone] = useState<Tone>('Extra');
  const [captions, setCaptions] = useState<string[]>([]);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Validation state
  const [errors, setErrors] = useState({ name: false, features: false });
  const [twitterCopied, setTwitterCopied] = useState(false);

  const handleGenerate = async () => {
    // Validation Logic
    const nameInvalid = !productName.trim();
    const featuresInvalid = !features.trim();
    
    if (nameInvalid || featuresInvalid) {
      setErrors({ name: nameInvalid, features: featuresInvalid });
      setErrorMsg("Bestie, don't leave me hanging! Fill in the deets. 💅");
      return;
    }

    // Clear errors if valid
    setErrors({ name: false, features: false });
    setStatus(LoadingState.LOADING);
    setErrorMsg(null);
    setCaptions([]);
    setTwitterCopied(false);

    try {
      const results = await generateCaptions(productName, features, selectedTone);
      setCaptions(results);
      setStatus(LoadingState.SUCCESS);
    } catch (err) {
      setErrorMsg("Oops! The vibe check failed. Try again later. 💀");
      setStatus(LoadingState.ERROR);
    }
  };

  const handleTwitterCopy = () => {
    if (captions.length === 0) return;
    
    // Format for Twitter Thread: Truncate slightly if massive, add thread separators
    const threadText = captions
      .map((c, i) => `${i + 1}/${captions.length} ${c}`)
      .join('\n\n👇\n\n');
      
    navigator.clipboard.writeText(threadText);
    setTwitterCopied(true);
    setTimeout(() => setTwitterCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-12 px-4 selection:bg-yellow-300 selection:text-black">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <header className="mb-12 text-center text-white">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-7xl drop-shadow-lg">
            Gen-Z <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Hype</span> Machine
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-indigo-100 md:text-xl font-light">
            Turn your boring product specs into viral, main-character-energy captions instantly. No cap. 🧢
          </p>
        </header>

        <div className="grid gap-10 md:grid-cols-12">
          
          {/* Left Column: Input Form */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-6 rounded-3xl bg-white/10 p-6 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
              
              <div className="space-y-6">
                <InputGroup
                  id="productName"
                  label="Product Name"
                  value={productName}
                  onChange={(val) => {
                    setProductName(val);
                    if (val.trim()) setErrors(prev => ({ ...prev, name: false }));
                  }}
                  placeholder="e.g., Spicy Cheetos Lip Balm"
                  hasError={errors.name}
                />

                <InputGroup
                  id="features"
                  label="3 Key Features"
                  value={features}
                  onChange={(val) => {
                    setFeatures(val);
                    if (val.trim()) setErrors(prev => ({ ...prev, features: false }));
                  }}
                  placeholder="e.g., Tastes fiery, moisturizes for 24h, bright neon orange tint"
                  isTextArea={true}
                  hasError={errors.features}
                />

                {/* Tone Selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-indigo-100">
                    Choose Your Vibe
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TONE_OPTIONS.map((tone) => (
                      <button
                        key={tone}
                        onClick={() => setSelectedTone(tone)}
                        className={`rounded-lg py-2 px-3 text-sm font-bold transition-all duration-200 
                          ${selectedTone === tone
                            ? 'bg-yellow-400 text-purple-900 shadow-lg scale-105'
                            : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>

                {errorMsg && (
                   <div className="rounded-xl bg-red-500/20 p-3 text-sm font-medium text-red-100 border border-red-500/30 animate-pulse">
                     {errorMsg}
                   </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={status === LoadingState.LOADING}
                  className={`group relative w-full overflow-hidden rounded-xl py-4 px-6 text-lg font-bold uppercase tracking-widest text-white transition-all 
                    ${status === LoadingState.LOADING
                      ? 'cursor-wait bg-gray-500/50 opacity-80'
                      : 'bg-gradient-to-r from-yellow-400 to-pink-500 hover:scale-[1.02] hover:shadow-lg active:scale-95' 
                    }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === LoadingState.LOADING ? 'Cooking...' : 'Hype It Up 🚀'}
                  </span>
                  {status !== LoadingState.LOADING && (
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500 to-yellow-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  )}
                </button>

                {/* Twitter Copy Button */}
                {captions.length > 0 && status === LoadingState.SUCCESS && (
                  <button
                    onClick={handleTwitterCopy}
                    className={`mt-2 w-full rounded-xl py-3 px-4 text-sm font-bold uppercase tracking-wide text-white transition-all border-2
                       ${twitterCopied 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-sky-400 bg-sky-500/20 hover:bg-sky-500 hover:border-sky-500'
                       }`}
                  >
                    {twitterCopied ? 'Copied Thread! ✅' : 'Copy Thread for Twitter 🐦'}
                  </button>
                )}
              </div>

              <div className="mt-6 text-center text-xs text-indigo-200/60">
                Powered by Gemini 3 Flash • Strictly Vibes Only
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="md:col-span-7 lg:col-span-8 min-h-[500px]">
            {status === LoadingState.IDLE && (
              <div className="flex h-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/20 p-12 text-center text-indigo-200/50">
                <span className="text-6xl mb-4">✨</span>
                <p className="text-xl">Waiting for your input...</p>
                <p className="text-sm mt-2">Enter details to generate captions.</p>
              </div>
            )}

            {status === LoadingState.LOADING && (
              <div className="flex h-full flex-col items-center justify-center rounded-3xl border-2 border-white/10 bg-white/5 p-12 text-center">
                <div className="relative mb-6 h-20 w-20">
                   <div className="absolute inset-0 animate-ping rounded-full bg-pink-400 opacity-20"></div>
                   <div className="relative flex h-full w-full animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-yellow-400 border-l-pink-500"></div>
                </div>
                <p className="text-xl font-bold text-white animate-pulse">Generating the Hype...</p>
                <p className="text-sm text-indigo-200 mt-2">Consulting the Gen-Z hive mind</p>
              </div>
            )}

            {status === LoadingState.SUCCESS && (
              <div className="space-y-6 animate-fade-in-up pb-12">
                <div className="flex justify-between items-end mb-2 px-2">
                   <h3 className="text-2xl font-bold text-white">Your Captions</h3>
                   <span className="text-sm text-indigo-200 opacity-70 italic">Vibe: {selectedTone}</span>
                </div>
                {captions.map((caption, idx) => (
                  <ResultCard key={idx} index={idx} caption={caption} />
                ))}
              </div>
            )}

            {status === LoadingState.ERROR && (
               <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-white/5 p-12 text-center">
                 <span className="text-6xl mb-4">🫠</span>
                 <p className="text-xl text-white font-bold">Total Flop</p>
                 <p className="text-indigo-200 mt-2">Something went wrong. Don't ghost us, try again!</p>
               </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;