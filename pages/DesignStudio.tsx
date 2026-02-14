
import React, { useState } from 'react';
import { generateFashionDesign } from '../services/geminiService';
import { STYLE_CATEGORIES } from '../constants';

const DesignStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState(STYLE_CATEGORIES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const design = await generateFashionDesign(prompt, category);
      if (design) {
        setResults(prev => [design, ...prev]);
      }
    } catch (error) {
      console.error(error);
      alert("Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">AI Design Studio</h1>
        <p className="text-gray-600">Create unique African-inspired fashion in seconds.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {STYLE_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border ${
                    category === cat ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">Occasion & Style Details</label>
            <textarea
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent mb-4 text-sm h-32"
              placeholder="E.g., A modern wedding gown with traditional Yoruba Gele motifs, deep blue and gold embroidery..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full py-4 bg-blue-900 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 disabled:bg-gray-300 transition-all flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin text-xl">⏳</span>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Generate Designs</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
            <h4 className="text-amber-800 font-bold text-sm mb-1">Maker Perk</h4>
            <p className="text-amber-700 text-xs">Remember: You earn 30% lifetime royalties on every design you commercialize! (PRD 3.2)</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Creations</h2>
          {results.length === 0 && !isGenerating ? (
            <div className="bg-gray-100 border-2 border-dashed border-gray-200 rounded-2xl h-96 flex flex-col items-center justify-center text-gray-400">
              <span className="text-6xl mb-4">👗</span>
              <p>Your AI-generated designs will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {isGenerating && (
                <div className="bg-gray-50 border-2 border-dashed border-blue-200 rounded-2xl aspect-[3/4] animate-pulse flex items-center justify-center">
                  <span className="text-blue-200 font-medium">Drafting magic...</span>
                </div>
              )}
              {results.map((res, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden group">
                  <img src={res} alt="Generated fashion" className="w-full aspect-[3/4] object-cover" />
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-xs font-semibold text-blue-900 px-2 py-1 bg-blue-50 rounded-full">{category}</span>
                    <button className="text-xs font-bold text-blue-900 hover:underline">Create Recipe →</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;
