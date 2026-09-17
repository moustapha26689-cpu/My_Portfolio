'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { EnvelopeIcon, ArrowDownIcon, PhoneIcon } from '@heroicons/react/24/outline';

function TypewriterText({ texts }: { texts: string[] }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 25 : 65;
    const pauseTime = 2200;
    let timeout: ReturnType<typeof setTimeout>;
    
    if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, charIndex + (isDeleting ? -1 : 1)));
        setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      }, typingSpeed);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <span className="text-[#f59e0b] font-extrabold whitespace-nowrap">
      {displayText}
      <span className="animate-pulse text-[#1a1145] dark:text-white">|</span>
    </span>
  );
}

// Geometric Constellation with Shaded Polygons matching frame_000s.jpg
function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animId: number;
    const mouse = { x: -2000, y: -2000 };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    const pts: Array<{ x: number; y: number; vx: number; vy: number; s: number }> = [];
    
    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Balanced density: nodes are distinct and prominent
    const pointCount = Math.max(45, Math.floor((canvas.width * canvas.height) / 14000));
    for (let i = 0; i < pointCount; i++) {
      pts.push({ 
        x: Math.random() * canvas.width, 
        y: Math.random() * canvas.height, 
        vx: (Math.random() - 0.5) * 0.45, 
        vy: (Math.random() - 0.5) * 0.45,
        s: Math.random() * 1.5 + 3.0, // Clearly visible 3.0px - 4.5px nodes
      });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      
      const nodeColor = isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(51, 65, 85, 0.85)'; // slate-700
      const lineRGB = isDark ? '255, 255, 255' : '71, 85, 105';
      const polyFillRGB = isDark ? '255, 255, 255' : '71, 85, 105';
      
      // Update points
      pts.forEach(p => {
        p.x += p.vx; 
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1; 
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1; 
      });

      // 1. Draw subtle shaded triangles (polygon mesh)
      const maxConnectDist = 170;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d1 = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d1 < maxConnectDist) {
            for (let k = j + 1; k < pts.length; k++) {
              const d2 = Math.hypot(pts[j].x - pts[k].x, pts[j].y - pts[k].y);
              const d3 = Math.hypot(pts[i].x - pts[k].x, pts[i].y - pts[k].y);
              if (d2 < maxConnectDist && d3 < maxConnectDist) {
                ctx.beginPath();
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.lineTo(pts[k].x, pts[k].y);
                ctx.closePath();
                ctx.fillStyle = `rgba(${polyFillRGB}, 0.045)`;
                ctx.fill();
              }
            }
          }
        }
      }

      // 2. Draw connecting lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.5;
            ctx.beginPath(); 
            ctx.moveTo(pts[i].x, pts[i].y); 
            ctx.lineTo(pts[j].x, pts[j].y); 
            ctx.strokeStyle = `rgba(${lineRGB}, ${alpha})`; 
            ctx.lineWidth = 1.1; 
            ctx.stroke(); 
          }
        }
        
        // 3. Mouse attraction and connection
        const dxMouse = mouse.x - pts[i].x;
        const dyMouse = mouse.y - pts[i].y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 220) {
          const alpha = (1 - distMouse / 220) * 0.75;
          ctx.beginPath(); 
          ctx.moveTo(pts[i].x, pts[i].y); 
          ctx.lineTo(mouse.x, mouse.y); 
          ctx.strokeStyle = `rgba(${lineRGB}, ${alpha})`; 
          ctx.lineWidth = 1.4; 
          ctx.stroke(); 
        }
      }

      // 4. Draw circular nodes on top
      pts.forEach(p => {
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); 
        ctx.fillStyle = nodeColor; 
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    
    return () => { 
      cancelAnimationFrame(animId); 
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto" 
      style={{ zIndex: 0 }} 
    />
  );
}

function TiltImage({ src, alt, onError }: { src: string; alt: string; onError: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 z-10 cursor-pointer"
    >
      <div 
        className="absolute inset-0 rounded-full border-[6px] border-white dark:border-[#1a1442] shadow-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden"
        style={{ transform: "translateZ(30px)" }}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover" 
          priority 
          unoptimized 
          onError={onError} 
        />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const t = useTranslations('hero');
  const tContact = useTranslations('contact');
  const [profileImage, setProfileImage] = useState('/images/profile/profile.jpg');
  const [imageError, setImageError] = useState(false);
  
  const email = tContact('email', { defaultValue: 'moustapha26689@gmail.com' });
  const linkedinUrl = tContact('linkedin', { defaultValue: 'https://www.linkedin.com/in/mouhamadou-moustapha-fall-65283a291/' });
  const rawPhone = tContact('phone', { defaultValue: '+212 710-928562' });
  const cleanPhone = rawPhone.replace(/[^0-9+]/g, '');
  const rawWhatsapp = tContact('whatsapp', { defaultValue: '+212710928562' });
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');
  
  const getSpecs = () => {
    const list: string[] = [];
    for (let i = 0; i < 6; i++) {
      try {
        const item = t(`typewriterItems.${i}`);
        if (!item || item.startsWith('typewriterItems.')) break;
        list.push(item);
      } catch {
        break;
      }
    }
    return list.length > 0 ? list : [
      'Tenue & Révision Comptable',
      'Déploiement Pennylane & OCR',
      'Fiscalité d\'entreprise (TVA, IS)',
      'Rapprochements bancaires & Trésorerie'
    ];
  };

  const specs = getSpecs();
  
  const scrollToAbout = () => { 
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); 
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-12 bg-white dark:bg-[#0c0827]">
      
      {/* Interactive Constellation Background with Shaded Polygons */}
      <div className="absolute inset-0 z-0">
        <ConstellationCanvas />
      </div>
      
      <div className="max-w-6xl w-full mx-auto px-6 relative z-10 pointer-events-none">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          {/* Left Text Block */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 pointer-events-auto"
          >
            <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              {t('hiThere', { defaultValue: 'Bonjour,' })}
            </p>
            
            {/* Full Name in Two Bold Impact Lines */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1145] dark:text-white mb-1 tracking-tight">
              {t('imName', { defaultValue: 'Je suis Mouhamadou Moustapha' })}
            </h1>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#f59e0b] mb-6 tracking-tight">
              {t('lastName', { defaultValue: 'Fall' })}
            </h1>
            
            <div className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 font-semibold mb-8 min-h-[4rem] md:min-h-[3rem] flex flex-wrap items-center justify-center md:justify-start">
              <span className="mr-2 mb-1">{t('iAmInto', { defaultValue: 'Expertise en :' })}</span>
              <div className="mb-1">
                <TypewriterText texts={specs} />
              </div>
            </div>
            
            {/* Action Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="flex items-center gap-2 bg-[#4a00e0] hover:bg-[#3b00b3] text-white rounded-full px-8 py-3.5 font-bold transition-all shadow-lg hover:shadow-indigo-500/25 mb-8"
            >
              {t('aboutMe', { defaultValue: 'À propos de moi' })}
              <ArrowDownIcon className="w-5 h-5 animate-bounce" />
            </motion.button>

            {/* Direct Clickable Contact Links (Phone, WhatsApp, Email, LinkedIn) */}
            <div className="flex items-center justify-center md:justify-start gap-3.5">
              
              {/* Phone Direct Call */}
              <a 
                href={`tel:${cleanPhone}`}
                className="w-12 h-12 flex items-center justify-center bg-[#111] dark:bg-[#1a1145] rounded-full hover:scale-110 hover:bg-blue-600 transition-all shadow-md text-white"
                title={`Appeler : ${rawPhone}`}
                aria-label="Téléphone"
              >
                <PhoneIcon className="w-5 h-5" />
              </a>

              {/* WhatsApp Direct Message */}
              <a 
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-[#111] dark:bg-[#1a1145] rounded-full hover:scale-110 hover:bg-[#25D366] transition-all shadow-md text-white"
                title={`WhatsApp : ${rawPhone}`}
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>

              {/* Email Direct Client */}
              <a 
                href={`mailto:${email}`} 
                className="w-12 h-12 flex items-center justify-center bg-[#111] dark:bg-[#1a1145] rounded-full hover:scale-110 hover:bg-[#4a00e0] transition-all shadow-md text-white"
                title={`Email : ${email}`}
                aria-label="Email"
              >
                <EnvelopeIcon className="w-5 h-5" />
              </a>

              {/* LinkedIn Direct Link */}
              <a 
                href={linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 flex items-center justify-center bg-[#111] dark:bg-[#1a1145] rounded-full hover:scale-110 hover:bg-[#0077B5] transition-all shadow-md text-white"
                title="Profil LinkedIn"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

            </div>
          </motion.div>
          
          {/* Right Image Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center items-center pointer-events-auto"
          >
            {!imageError && (
              <TiltImage 
                src={profileImage}
                alt="Mouhamadou Moustapha Fall"
                onError={() => {
                  if (profileImage.includes('.jpg')) { setProfileImage('/images/profile/profile.jpeg'); }
                  else if (profileImage.includes('.jpeg')) { setProfileImage('/images/profile/profile.png'); }
                  else setImageError(true);
                }}
              />
            )}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
