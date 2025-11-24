
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, NetworkScene } from './components/PrivacyScene';
import { PipelineDiagram, ModelComparisonChart, BlurDemo } from './components/Diagrams';
import { ArrowDown, Menu, X, Shield, Lock, Smartphone, Users, ChevronRight, Eye } from 'lucide-react';

const AuthorCard = ({ name, institution, corresponding }: { name: string, institution: string, corresponding?: boolean }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 w-full md:w-56 group">
      <div className="w-12 h-12 bg-sitr-light rounded-full flex items-center justify-center mb-4 text-sitr-primary font-serif font-bold text-xl group-hover:scale-110 transition-transform">
        {name.charAt(0)}
      </div>
      <h3 className="font-serif text-lg text-stone-900 text-center mb-1 leading-tight">{name}</h3>
      <p className="text-xs text-stone-500 text-center leading-relaxed px-2">{institution}</p>
      {corresponding && (
        <span className="mt-3 px-2 py-0.5 bg-stone-100 text-stone-600 text-[10px] uppercase tracking-wider rounded-full font-bold">Corresponding</span>
      )}
    </div>
  );
};

const FeatureItem = ({ title, desc, icon: Icon }: { title: string, desc: string, icon: any }) => (
    <div className="flex gap-4 items-start p-6 rounded-xl bg-white border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="p-3 bg-sitr-light rounded-lg text-sitr-primary shrink-0">
            <Icon size={24} />
        </div>
        <div>
            <h4 className="font-serif text-xl mb-2 text-stone-900">{title}</h4>
            <p className="text-sm text-stone-600 leading-relaxed">{desc}</p>
        </div>
    </div>
)

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBFF] text-stone-800 selection:bg-sitr-secondary selection:text-white font-sans">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-to-br from-sitr-primary to-sitr-dark rounded-xl flex items-center justify-center text-white shadow-lg relative overflow-hidden group">
                <Shield size={20} fill="currentColor" className="text-white/20 absolute group-hover:scale-125 transition-transform duration-500" />
                <span className="font-serif font-bold relative z-10">S</span>
            </div>
            <span className={`font-serif font-bold text-xl tracking-tight ${scrolled ? 'text-stone-900' : 'text-stone-900'}`}>
              SITR
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-sitr-primary transition-colors">About</a>
            <a href="#pipeline" onClick={scrollToSection('pipeline')} className="hover:text-sitr-primary transition-colors">Pipeline</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-sitr-primary transition-colors">Model</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-sitr-primary transition-colors">Results</a>
            <a href="#team" onClick={scrollToSection('team')} className="hover:text-sitr-primary transition-colors">Team</a>
            <div className="px-3 py-1 bg-stone-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
              JASE Submission
            </div>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-sitr-primary">About</a>
            <a href="#pipeline" onClick={scrollToSection('pipeline')} className="hover:text-sitr-primary">Pipeline</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-sitr-primary">Methodology</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-sitr-primary">Results</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <HeroScene />
        
        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-sitr-secondary/30 bg-white/60 text-sitr-primary text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-sitr-primary animate-pulse"></span>
                    Privacy-Aware Mobile AI
                </div>
                <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.1] text-stone-900">
                    SITR: Intelligent <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sitr-primary to-sitr-accent">Hijab Detection</span> &<br/>
                    Privacy Blurring
                </h1>
                <p className="max-w-xl text-lg text-stone-600 leading-relaxed">
                    A privacy-aware mobile application that automatically detects hijab presence in female photos, using <strong>MTCNN</strong>, <strong>FaceNet</strong>, and an enhanced <strong>DenseNet121</strong> to prevent accidental exposure before sharing.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                    <button onClick={scrollToSection('pipeline')} className="group px-8 py-3 bg-sitr-primary text-white rounded-full font-medium hover:bg-sitr-dark transition-all shadow-lg shadow-sitr-primary/30 flex items-center gap-2">
                        View Pipeline <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                    <button onClick={scrollToSection('about')} className="px-8 py-3 bg-white text-stone-600 border border-stone-200 rounded-full font-medium hover:border-sitr-primary hover:text-sitr-primary transition-colors">
                        Read Abstract
                    </button>
                </div>
            </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-stone-400">
            <ArrowDown size={20} />
        </div>
      </header>

      <main>
        {/* Problem & Solution */}
        <section id="about" className="py-24 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
                <div>
                     <h2 className="font-serif text-4xl mb-6 text-stone-900 leading-tight">Accidental Exposure in the Digital Age</h2>
                     <p className="text-lg text-stone-600 leading-relaxed mb-6">
                        Sharing photos has become effortless, but unintentional privacy violations are rising—particularly in societies where modesty is culturally significant. Once an image is shared, control is lost.
                     </p>
                     <p className="text-lg text-stone-600 leading-relaxed">
                        Existing tools focus on content moderation or face ID, ignoring <strong>cultural sensitivity</strong>. SITR fills this gap by ensuring female family members are wearing their hijab before a photo is shared.
                     </p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <FeatureItem 
                        icon={Shield}
                        title="Automated Privacy"
                        desc="Automatically blurs head/neck regions if a registered family member is detected without a hijab."
                    />
                    <FeatureItem 
                        icon={Lock}
                        title="Deep Learning Integration"
                        desc="Seamlessly combines Face Detection (MTCNN), Verification (FaceNet), and Classification (DenseNet121)."
                    />
                </div>
            </div>
          </div>
        </section>

        {/* Pipeline Architecture */}
        <section id="pipeline" className="py-24 bg-[#F8FAFC]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-sitr-primary uppercase">System Architecture</div>
                    <h2 className="font-serif text-4xl mb-4 text-stone-900">The SITR Privacy Pipeline</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">
                        A sequential deep learning workflow designed for mobile efficiency and high accuracy.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <PipelineDiagram />
                    </div>
                    <div className="space-y-8">
                        <div className="p-6 bg-white rounded-xl border border-stone-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                            <h3 className="font-serif text-xl mb-2 flex items-center gap-2"><ScanFaceIcon className="text-blue-500"/> 1. Face Detection</h3>
                            <p className="text-sm text-stone-600">
                                <strong>MTCNN</strong> detects faces and localizes landmarks under varied lighting and poses.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-xl border border-stone-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                            <h3 className="font-serif text-xl mb-2 flex items-center gap-2"><Users className="text-purple-500"/> 2. Identity Verification</h3>
                            <p className="text-sm text-stone-600">
                                <strong>FaceNet</strong> generates 512-dimensional embeddings. <strong>ChromaDB</strong> performs cosine similarity search to verify if the face belongs to a registered family member.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-xl border border-stone-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-pink-500"></div>
                            <h3 className="font-serif text-xl mb-2 flex items-center gap-2"><Eye className="text-pink-500"/> 3. Hijab Classification</h3>
                            <p className="text-sm text-stone-600">
                                The <strong>Enhanced DenseNet121</strong> model checks for hijab presence. If missing, the face is blurred automatically.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Methodology / Model Details */}
        <section id="methodology" className="py-24 bg-stone-900 text-white relative overflow-hidden">
             <div className="absolute inset-0 opacity-20">
                 <NetworkScene />
             </div>
             
             <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-sitr-secondary uppercase">Technical Contribution</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-8">Enhanced DenseNet121</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-300 leading-relaxed mb-12">
                        <div>
                            <p className="mb-4">
                                Standard CNNs often struggle with subtle fabric textures or occlusion. We enhanced DenseNet121 by integrating an <strong>Efficient Channel Attention (ECA)</strong> module after each dense block.
                            </p>
                            <p>
                                The ECA module uses 1D convolution to enable local cross-channel interaction, helping the model focus on informative features (hijab texture/shape) while ignoring background noise.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span>Dataset Size</span>
                                <span className="text-white font-mono">3,082 Images</span>
                            </div>
                             <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span>Optimizer</span>
                                <span className="text-white font-mono">Adam (LR: 1e-5)</span>
                            </div>
                             <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span>Optimization</span>
                                <span className="text-white font-mono">Dynamic Quantization</span>
                            </div>
                             <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span>Model Size Reduction</span>
                                <span className="text-sitr-secondary font-mono">82MB → 27MB</span>
                            </div>
                        </div>
                    </div>

                    {/* Results Highlight */}
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg text-center border border-white/5">
                            <div className="text-2xl font-serif text-white">92.16%</div>
                            <div className="text-[10px] text-stone-400 uppercase tracking-wider">Test Accuracy</div>
                        </div>
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg text-center border border-white/5">
                            <div className="text-2xl font-serif text-white">86.39%</div>
                            <div className="text-[10px] text-stone-400 uppercase tracking-wider">F1-Score</div>
                        </div>
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg text-center border border-white/5">
                            <div className="text-2xl font-serif text-white">0.369</div>
                            <div className="text-[10px] text-stone-400 uppercase tracking-wider">Test Loss</div>
                        </div>
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg text-center border border-white/5">
                            <div className="text-2xl font-serif text-white">19s</div>
                            <div className="text-[10px] text-stone-400 uppercase tracking-wider">Avg Inference</div>
                        </div>
                    </div>
                </div>
             </div>
        </section>

        {/* Results & Interactive Demo */}
        <section id="results" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                     <h2 className="font-serif text-4xl mb-4 text-stone-900">Experimental Results & Validation</h2>
                     <p className="text-stone-500 max-w-2xl mx-auto">
                        We compared our enhanced model against ResNet50, MobileNetV2, and EfficientNet-B0.
                     </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
                    <ModelComparisonChart />
                    <BlurDemo />
                </div>
            </div>
        </section>

        {/* Team */}
        <section id="team" className="py-24 bg-[#FDFBFF] border-t border-stone-200">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl mb-4 text-stone-900">Research Team</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">
                        Department of Computer Systems Engineering<br/>
                        Arab American University, Jenin, Palestine
                    </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6">
                    <AuthorCard name="Hadeel Bkhaitan" institution="Arab American University" />
                    <AuthorCard name="Duha Maali" institution="Arab American University" />
                    <AuthorCard name="Saja Hammad" institution="Arab American University" />
                    <AuthorCard name="Mahmoud Obaid" institution="Arab American University" corresponding />
                    <AuthorCard name="Thaer Thaher" institution="Arab American University" corresponding />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2 flex items-center gap-2 justify-center md:justify-start">
                    <Shield size={24} className="text-sitr-primary" /> SITR
                </div>
                <p className="text-sm max-w-md text-stone-500">
                    A Privacy-Aware Mobile Application for Hijab Detection with Enhanced Deep Learning Integration.
                </p>
            </div>
            <div className="text-xs text-stone-600 text-center md:text-right">
                <p>© 2025 Arab American University.</p>
                <p className="mt-1">Based on submission for JASE.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Icon for layout
const ScanFaceIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
)

export default App;
