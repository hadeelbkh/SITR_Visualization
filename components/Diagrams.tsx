
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanFace, Shield, UserCheck, EyeOff, BarChart2, CheckCircle, Smartphone, AlertTriangle } from 'lucide-react';

// --- PIPELINE SIMULATION DIAGRAM ---
export const PipelineDiagram: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<'safe' | 'blur'>('blur');

  const runSimulation = (simType: 'safe' | 'blur') => {
    if (isProcessing) return;
    setIsProcessing(true);
    setResult(simType);
    setStep(0);

    // Sequence timing: Upload -> Detect -> Verify -> Check Hijab -> Result
    const timings = [800, 1600, 2400, 3200];
    
    timings.forEach((time, index) => {
        setTimeout(() => {
            setStep(index + 1);
            if (index === 3) setIsProcessing(false);
        }, time);
    });
  };

  const steps = [
    { icon: Smartphone, label: "Upload Image" },
    { icon: ScanFace, label: "Face Detection (MTCNN)" },
    { icon: UserCheck, label: "Verification (FaceNet)" },
    { icon: Shield, label: "Hijab Check (DenseNet)" },
    { icon: result === 'safe' ? CheckCircle : EyeOff, label: result === 'safe' ? "Safe to Share" : "Auto-Blur" },
  ];

  return (
    <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-stone-200 w-full relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sitr-light rounded-full -mr-10 -mt-10 opacity-50 z-0"></div>

      <h3 className="font-serif text-2xl mb-2 text-stone-900 z-10 relative">Privacy Pipeline</h3>
      <p className="text-sm text-stone-500 mb-8 text-center max-w-md z-10 relative">
        Simulate how SITR processes a photo before sharing.
      </p>

      <div className="flex gap-4 mb-10 z-10 relative">
        <button 
            onClick={() => runSimulation('safe')}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${isProcessing ? 'opacity-50' : 'hover:scale-105'} bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm`}
        >
            SIMULATE: WITH HIJAB
        </button>
        <button 
            onClick={() => runSimulation('blur')}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${isProcessing ? 'opacity-50' : 'hover:scale-105'} bg-rose-50 text-rose-700 border border-rose-100 shadow-sm`}
        >
            SIMULATE: NO HIJAB
        </button>
      </div>
      
      <div className="w-full relative px-2 z-10">
         {/* Connector Line */}
         <div className="absolute top-7 left-8 right-8 h-0.5 bg-stone-100 z-0"></div>
         <motion.div 
            className="absolute top-7 left-8 h-0.5 bg-sitr-primary z-0 origin-left" 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: step / (steps.length - 1) }}
            transition={{ duration: 0.5 }}
         />

         <div className="flex justify-between relative w-full">
            {steps.map((s, i) => {
                const isActive = i <= step;
                const isCurrent = i === step;
                
                // Colors based on result in final step
                let activeColor = '#7C3AED'; // Default primary
                if (i === 4 && result === 'blur') activeColor = '#E11D48'; // Red for blur
                if (i === 4 && result === 'safe') activeColor = '#059669'; // Green for safe

                return (
                    <div key={i} className="flex flex-col items-center gap-3 w-1/5">
                        <motion.div 
                            initial={false}
                            animate={{ 
                                scale: isCurrent ? 1.15 : 1,
                                backgroundColor: isActive ? activeColor : '#F5F5F4',
                                borderColor: isActive ? activeColor : '#E7E5E4',
                                boxShadow: isCurrent ? `0 0 20px ${activeColor}40` : 'none'
                            }}
                            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors duration-300 z-10 bg-stone-100`}
                        >
                            <s.icon size={20} className={isActive ? 'text-white' : 'text-stone-400'} />
                        </motion.div>
                        <span className={`text-[10px] md:text-xs text-center font-medium leading-tight transition-colors duration-300 ${isActive ? 'text-stone-900' : 'text-stone-400'}`}>
                            {s.label}
                        </span>
                    </div>
                );
            })}
         </div>
      </div>

      <AnimatePresence mode="wait">
        {step > 0 && (
            <motion.div 
                key={step}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mt-8 p-4 bg-stone-50 border border-stone-100 rounded-lg text-center max-w-md w-full"
            >
                <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-sitr-primary animate-pulse"></span>
                    <span className="text-stone-900 font-bold text-xs uppercase tracking-wider">Processing Step {step}</span>
                </div>
                <p className="text-sm text-stone-600">
                    {step === 1 && "MTCNN is scanning the image for facial landmarks..."}
                    {step === 2 && "Extracting embeddings with FaceNet to match against family database..."}
                    {step === 3 && (result === 'safe' ? "DenseNet121 detecting hijab texture and shape..." : "DenseNet121 analyzing head/neck region for coverage...")}
                    {step === 4 && (result === 'safe' ? "Hijab detected. Image is safe to share." : "Privacy violation detected! Blurring face and neck region.")}
                </p>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- INTERACTIVE BLUR DEMO ---
export const BlurDemo: React.FC = () => {
    const [hijabOn, setHijabOn] = useState(true);

    return (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl border border-stone-200 shadow-sm h-full">
             <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-sitr-light text-sitr-primary text-[10px] font-bold tracking-widest uppercase rounded-full mb-3">
                    Live Demo
                </div>
                <h3 className="font-serif text-2xl mb-2 text-stone-900">Intelligent Blurring</h3>
                <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                    SITR enforces cultural privacy. Toggle the state below to see how the system reacts to a detected family member without a hijab.
                </p>
                
                <div className="flex w-full bg-stone-100 p-1 rounded-lg mb-6">
                    <button 
                        onClick={() => setHijabOn(true)}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${hijabOn ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                        Has Hijab
                    </button>
                    <button 
                        onClick={() => setHijabOn(false)}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!hijabOn ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                        No Hijab
                    </button>
                </div>
             </div>

             <div className="flex-1 flex items-center justify-center bg-stone-50 rounded-xl border border-stone-100 relative overflow-hidden min-h-[300px]">
                {/* Simplified Phone Frame */}
                <div className="w-56 h-[90%] bg-white rounded-[2rem] border-4 border-stone-200 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 inset-x-0 h-6 bg-stone-100 z-20 flex justify-center items-center">
                         <div className="w-16 h-4 bg-stone-800 rounded-b-xl"></div>
                    </div>

                    {/* Content */}
                    <div className="w-full h-full relative bg-stone-300">
                        {/* Background Photo */}
                         <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200"></div>

                         {/* Person Representation */}
                         <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                             {/* Head/Face - Using abstract shapes */}
                             <div className={`relative z-10 w-24 h-32 bg-[#e0ac69] rounded-[2.5rem] flex flex-col items-center justify-center transition-all duration-700 ${!hijabOn ? 'blur-md opacity-80' : ''}`}>
                                  {/* Eyes */}
                                  <div className="flex gap-4 mb-2">
                                     <div className="w-2 h-2 bg-black/50 rounded-full"></div>
                                     <div className="w-2 h-2 bg-black/50 rounded-full"></div>
                                  </div>
                                  {/* Smile */}
                                  <div className="w-8 h-4 border-b-2 border-black/30 rounded-full"></div>
                             </div>
                             
                             {/* Body */}
                             <div className="w-40 h-40 bg-stone-800 rounded-t-full -mt-4 z-0"></div>

                             {/* Hijab Overlay */}
                             <AnimatePresence>
                                {hijabOn && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute top-[85px] w-32 h-40 bg-sitr-primary rounded-full z-20 mix-blend-normal shadow-lg"
                                        style={{ borderRadius: '50% 50% 40% 40%' }}
                                    >
                                        {/* Face cutout */}
                                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[5.5rem] h-[7rem] bg-[#e0ac69] rounded-[2.2rem]">
                                            {/* Face Features Duplicate for overlay */}
                                            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4 mb-2">
                                                <div className="w-2 h-2 bg-black/50 rounded-full"></div>
                                                <div className="w-2 h-2 bg-black/50 rounded-full"></div>
                                            </div>
                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-4 border-b-2 border-black/30 rounded-full"></div>
                                        </div>
                                    </motion.div>
                                )}
                             </AnimatePresence>

                             {/* Blur UI Overlay */}
                             <AnimatePresence>
                                {!hijabOn && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex items-center justify-center z-30"
                                    >
                                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg flex flex-col items-center gap-2">
                                            <EyeOff className="text-rose-500" size={24}/>
                                            <span className="text-[10px] font-bold text-rose-600 uppercase">Privacy Blur Applied</span>
                                        </div>
                                    </motion.div>
                                )}
                             </AnimatePresence>
                         </div>
                    </div>

                    {/* App Bar Bottom */}
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-stone-100 flex items-center justify-around px-4">
                         <div className="w-8 h-8 rounded-full bg-stone-100"></div>
                         <div className="w-12 h-12 rounded-full bg-sitr-primary shadow-lg -mt-6 border-4 border-white flex items-center justify-center">
                             <div className="w-4 h-4 bg-white rounded-sm"></div>
                         </div>
                         <div className="w-8 h-8 rounded-full bg-stone-100"></div>
                    </div>
                </div>
             </div>
        </div>
    );
};

// --- RESULTS CHART ---
export const ModelComparisonChart: React.FC = () => {
    // Exact data from Table 4 & Table 5
    const data = [
        { name: "MobileNetV2", acc: 73.18, f1: 57.84, color: "#94a3b8" },
        { name: "ResNet50", acc: 75.63, f1: 66.52, color: "#94a3b8" },
        { name: "EfficientNet-B0", acc: 78.69, f1: 64.95, color: "#94a3b8" },
        { name: "DenseNet121", acc: 79.49, f1: 65.67, color: "#a78bfa" },
        { name: "SITR (Enhanced)", acc: 92.16, f1: 86.39, color: "#7c3aed" },
    ];

    return (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm w-full h-full flex flex-col justify-center">
            <h3 className="font-serif text-2xl mb-1 text-stone-900 flex items-center gap-2">
                <BarChart2 size={24} className="text-sitr-primary"/> Model Accuracy
            </h3>
            <p className="text-sm text-stone-500 mb-8">Comparing SITR's enhanced DenseNet121 against standard baselines.</p>
            
            <div className="space-y-5">
                {data.map((model, i) => (
                    <div key={model.name} className="relative group">
                        <div className="flex justify-between text-sm mb-1.5 align-bottom">
                            <span className={`font-medium ${model.name.includes("SITR") ? 'text-sitr-primary font-bold' : 'text-stone-600'}`}>
                                {model.name}
                            </span>
                            <div className="text-right">
                                <span className={`font-mono font-bold ${model.name.includes("SITR") ? 'text-sitr-primary' : 'text-stone-700'}`}>
                                    {model.acc}%
                                </span>
                            </div>
                        </div>
                        <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${model.acc}%` }}
                                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                className={`h-full rounded-full relative`}
                                style={{ backgroundColor: model.color }}
                            />
                        </div>
                        {/* F1 Tooltip/Subtext */}
                        <div className="text-[10px] text-stone-400 mt-1 pl-1">
                            F1-Score: {model.f1}%
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-stone-100 flex gap-6">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-sitr-light rounded-lg text-sitr-primary">
                        <CheckCircle size={16}/>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-stone-900 uppercase">Accuracy Boost</div>
                        <div className="text-[10px] text-stone-500 max-w-[120px]">ECA & Tuning improved accuracy by ~12.7% over base DenseNet.</div>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-sitr-light rounded-lg text-sitr-primary">
                        <AlertTriangle size={16}/>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-stone-900 uppercase">False Negatives</div>
                        <div className="text-[10px] text-stone-500 max-w-[120px]">Reduced by 12%, ensuring fewer privacy leaks.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
