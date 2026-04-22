/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  Coffee, 
  Mic2, 
  Presentation, 
  MessageSquare, 
  Network,
  ChevronRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Gift,
  Rocket
} from "lucide-react";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

const partners = [
  { name: "Thalès Informatique", logo: "https://res.cloudinary.com/dmutnjgp8/image/upload/v1772030743/logo_thal%C3%A8s_1_tkhzkc.png" },
  { name: "Factorial", logo: "https://res.cloudinary.com/dmutnjgp8/image/upload/v1771409242/Factorial_logo_couleur_xywdb2.png" },
  { name: "Sage", logo: "https://res.cloudinary.com/dmutnjgp8/image/upload/v1776701410/logo_event_grp_2_mzjosn.png" },
  { name: "Heliolys", logo: "https://res.cloudinary.com/dmutnjgp8/image/upload/v1776701411/logo_event_grp_1_etedmr.png" }
];

const heroImages = [
  "https://res.cloudinary.com/dmutnjgp8/image/upload/v1776844664/image00054_ufe5kr.jpg",
  "https://res.cloudinary.com/dmutnjgp8/image/upload/v1776848850/image00052_q4qb19.jpg",
  "https://res.cloudinary.com/dmutnjgp8/image/upload/v1776848849/image00051_gwqgjr.jpg",
  "https://res.cloudinary.com/dmutnjgp8/image/upload/v1776864591/image00009_vcuuhk.jpg"
];

const speakers = [
  {
    name: "Sanaâ BENAHMED",
    role: "CEO",
    company: "Héliolys consulting",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Ayoub EL ABD",
    role: "Strategic Partner Lead",
    company: "Factorial",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    name: "Yassine REDA",
    role: "SALES DIRECTOR",
    company: "Thalès Informatique",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400"
  }
];

const program = [
  { title: "Accueil & Coffee Break", desc: "Check-in, rafraîchissements et networking informel.", icon: <Coffee className="w-4 h-4" /> },
  { title: "Thématique : L’entreprise agile", desc: <span>Comment les RH soutiennent la croissance. Animée par <b>Mme Sanaâ BENAHMED</b>.</span>, icon: <Presentation className="w-4 h-4" /> },
  { title: "Découverte de la solution en live", desc: "Cas d’usage concrets et mise en situation réelle.", icon: <Zap className="w-4 h-4" /> },
  { title: "Tombola & Animation", desc: "Tirage au sort et remise de prix exclusifs.", icon: <Gift className="w-4 h-4" /> },
  { title: "Cocktail de Clôture", desc: "Networking et opportunités business.", icon: <Network className="w-4 h-4" /> }
];

const targetAudience = [
  "Directeurs des Ressources Humaines (DRH)",
  "Directeurs Administratifs et Financiers (DAF)",
  "Responsables RH & Talent Acquisition",
  "Dirigeants d'entreprise & Décideurs",
  "Responsables Transformation Digitale"
];

function SectionTitle({ title, subtitle, centered = true, dark = false }: { title: string; subtitle?: string; centered?: boolean; dark?: boolean }) {
  return (
    <div className={`mb-12 motion-gpu ${centered ? "text-center" : "text-left"}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`text-2xl md:text-3xl font-extrabold mb-3 ${dark ? "text-[#1DB2E9]" : "text-slate-900"}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`text-sm md:text-base max-w-2xl leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"} ${centered ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export default function App() {
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    entreprise: "",
    fonction: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Lien App Script à remplacer
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwTRGPi8B22dxUgBwAt0FJs2rDwKmc28td5ISejQqhovdOLGFYrjn9NT-6WOCnLIfuQ7A/exec";
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toLocaleString('fr-FR'),
        }),
      });

      setIsSuccess(true);
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        tel: "",
        entreprise: "",
        fonction: ""
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200 px-8 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <img src={partners[0].logo} alt="Thalès Informatique" className="h-10 object-contain" referrerPolicy="no-referrer" />
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <div className="hidden md:flex items-center space-x-4 grayscale opacity-70 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              <span>Factorial</span>
              <span>Sage</span>
              <span>Heliolys</span>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <span className="text-[10px] text-slate-500 hidden md:block uppercase tracking-widest font-medium">Event 2026</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <span>13 Mai 2026</span>
              <span className="text-slate-300">|</span>
              <span>Casablanca - Hôtel Onomo</span>
            </div>
            <a href="#register" className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-md shadow-primary/20">
              Inscription Prioritaire
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 overflow-hidden bg-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-10 pointer-events-none motion-gpu">
          <img 
            src="https://picsum.photos/seed/business-event/1920/1080" 
            alt="Event Background" 
            className="w-full h-full object-cover opacity-[0.08]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="motion-gpu"
          >
            <div className="inline-block px-3 py-1 bg-blue-100/50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full mb-6">
              Thématique de l'événement
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.15] mb-6 uppercase tracking-tight">
              L’entreprise agile : comment les RH soutiennent la croissance
            </h1>
            <p className="text-sm md:text-base text-slate-600 mb-8 max-w-xl leading-relaxed">
              Explorez l'avenir de la gestion RH : digitalisation, performance et expérience collaborateur. Une demi-journée stratégique pour transformer vos processus et libérer le potentiel de vos équipes.
            </p>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-slate-700">13 Mai 2026</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-slate-700">14:00 - 17:00</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-slate-700">Hôtel Onomo, Casablanca</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="#register" className="btn-primary flex items-center gap-2 group text-sm">
                Confirmer ma participation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100&h=100",
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100",
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100"
                  ].map((url, i) => (
                    <img key={i} src={url} alt="Participant" className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-slate-100 object-cover" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PLACES LIMITÉES</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image with Tape Effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative justify-self-center lg:justify-self-end w-full max-w-[400px] motion-gpu"
          >
            {/* The Scotch / Tape */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-primary/20 backdrop-blur-md border border-primary/20 -rotate-3 z-20 shadow-sm"></div>
            
            <div className="bg-white p-4 rounded-lg shadow-2xl relative z-10 transition-all duration-500 overflow-hidden">
              <div className="relative aspect-square overflow-hidden rounded-sm">
                {heroImages.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt="Digital Transformation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: heroImageIndex === idx ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between relative z-20">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Des événements qui ont marqué les professionnels RH</div>
                <div className="w-2 h-2 rounded-full bg-primary shrink-0 ml-4"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Partners Section */}
      <section className="bg-slate-50 py-10 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">En partenariat avec</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 px-4">
            {[
              partners.find(p => p.name === "Sage"),
              partners.find(p => p.name === "Factorial"),
              partners.find(p => p.name === "Heliolys")
            ].map((p, i) => (
              p && (
                <img 
                  key={i} 
                  src={p.logo} 
                  alt={p.name} 
                  className={`${p.name === "Factorial" ? "h-7 md:h-10" : p.name === "Heliolys" ? "h-14 md:h-20" : "h-11 md:h-14"} object-contain`} 
                  referrerPolicy="no-referrer" 
                />
              )
            ))}
          </div>
        </div>
      </section>

      {/* Why Participate Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Pourquoi participer à cet événement ?" 
            subtitle="Une expertise partagée pour optimiser votre stratégie et vos processus RH."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Des interventions orientées terrain", 
                desc: "Des experts partageront des retours d’expérience concrets sur les enjeux RH actuels.",
                icon: "⚡",
                color: "bg-amber-50 text-amber-600"
              },
              { 
                title: "Des cas d’usage réels", 
                desc: "Découvrez comment des entreprises optimisent déjà leur gestion RH avec des solutions comme Factorial HR.",
                icon: "📊",
                color: "bg-blue-50 text-blue-600"
              },
              { 
                title: "Des temps forts à forte valeur ajoutée", 
                desc: "Démonstrations, échanges et bonnes pratiques pour vous aider à gagner en efficacité.",
                icon: "🚀",
                color: "bg-purple-50 text-purple-600"
              },
              { 
                title: "Un espace d’échanges entre décideurs RH", 
                desc: "Rencontrez d’autres professionnels confrontés aux mêmes défis que vous.",
                icon: "🤝",
                color: "bg-emerald-50 text-emerald-600"
              }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-start motion-gpu transition-shadow duration-300 hover:shadow-xl"
              >
                <div className={`w-12 h-12 rounded-2xl ${v.color} flex items-center justify-center mb-6 text-xl shadow-inner`}>
                  {v.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-3 leading-tight">{v.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="section-padding bg-slate-900 rounded-[2.5rem] mx-6 md:mx-12 lg:mx-24 text-white relative overflow-hidden my-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionTitle 
            title="Agenda de l'après-midi" 
            subtitle="Des temps forts animés par des experts du secteur"
            centered={true}
            dark={true}
          />
          <div className="flex flex-col items-center gap-y-6 mt-12 max-w-2xl mx-auto">
            {program.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group motion-gpu transition-colors duration-200"
              >
                {/* Step Number Background */}
                <div className="absolute -right-2 -bottom-4 text-7xl font-extrabold text-white/5 select-none transition-transform group-hover:scale-110">
                  {String(i + 1).padStart(2, '0')}
                </div>
                
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#1DB2E9]/15 border border-[#1DB2E9]/20 flex items-center justify-center text-[#1DB2E9] relative z-10 transition-colors group-hover:bg-[#1DB2E9]/25">
                  {item.icon}
                </div>
                <div className="relative z-10 text-center sm:text-left">
                  <div className="mb-2">
                    <h3 className="text-base md:text-lg font-bold text-white tracking-tight">{item.title}</h3>
                  </div>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-md">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Experts Intervenants" 
            subtitle="Rencontrez les décideurs et consultants qui façonnent le futur du Digital RH."
          />
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {speakers.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col items-center text-center group motion-gpu"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-110 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img 
                    src={s.image} 
                    alt={s.name} 
                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full bg-slate-50 border-4 border-white shadow-lg relative z-10"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{s.name}</h3>
                  <div className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{s.role}</div>
                  <div className="text-slate-500 text-xs font-medium">{s.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="section-padding bg-slate-100 rounded-[3rem] mx-6 md:mx-12 lg:mx-24 my-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle 
              title="À qui s'adresse l'événement ?" 
              subtitle="Une audience executive pour des échanges stratégiques."
              centered={false}
            />
            <div className="grid gap-3">
              {targetAudience.map((t, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/50 p-3 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-3 shadow-2xl rotate-2">
              <img 
                src="https://res.cloudinary.com/dmutnjgp8/image/upload/v1776844943/BostonDeviceRobotics_CR5_4019-scaled_ih54p9.jpg" 
                alt="Event Audience" 
                className="rounded-xl opacity-90 object-cover aspect-[3/2]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Practical Info Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Informations Pratiques" 
            subtitle="Tout ce qu'il faut savoir pour préparer votre venue à Casablanca."
          />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-polish p-8 flex flex-col items-center text-center">
              <MapPin className="text-primary w-8 h-8 mb-4" />
              <h4 className="text-sm font-bold mb-2 uppercase tracking-widest">Lieu & Accès</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Hôtel Onomo, Bd Al Massira Al Khadra, Casablanca.</p>
            </div>
            <div className="card-polish p-8 flex flex-col items-center text-center">
              <Calendar className="text-primary w-8 h-8 mb-4" />
              <h4 className="text-sm font-bold mb-2 uppercase tracking-widest">Date & Horaires</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Mercredi 13 Mai 2026. Accueil à partir de 14:00.</p>
            </div>
            <div className="card-polish p-8 flex flex-col items-center text-center">
              <Mic2 className="text-primary w-8 h-8 mb-4" />
              <h4 className="text-sm font-bold mb-2 uppercase tracking-widest">Expertise</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Conférences suivies d'un cocktail networking exclusif.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="section-padding bg-white relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
             <span className="bg-red-50 text-red-600 text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest inline-flex items-center mb-4">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1.5"></span>
              Places Limitées
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Réservez votre place</h2>
            <p className="text-sm text-slate-500">Compte tenu de l'exclusivité de l'événement, les places sont limitées aux décideurs RH et DAF.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-slate-100">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Inscription confirmée !</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                  Merci pour votre inscription. Vous recevrez une confirmation par email très prochainement.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-sm font-bold text-primary uppercase tracking-widest hover:underline"
                >
                  Faire une autre inscription
                </button>
              </motion.div>
            ) : (
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label-polish">Prénom</label>
                    <input type="text" name="prenom" required placeholder="Mohamed" className="input-polish" value={formData.prenom} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="label-polish">Nom</label>
                    <input type="text" name="nom" required placeholder="Berrada" className="input-polish" value={formData.nom} onChange={handleInputChange} />
                  </div>
                </div>
                <div>
                  <label className="label-polish">Email Professionnel</label>
                  <input type="email" name="email" required placeholder="mohamed.berrada@entreprise.com" className="input-polish" value={formData.email} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="label-polish">Téléphone</label>
                  <input type="tel" name="tel" required placeholder="06 00 00 00 00" className="input-polish" value={formData.tel} onChange={handleInputChange} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label-polish">Entreprise</label>
                    <input type="text" name="entreprise" required placeholder="Société S.A.S." className="input-polish" value={formData.entreprise} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="label-polish">Fonction</label>
                    <input type="text" name="fonction" required placeholder="DRH, DAF, etc." className="input-polish" value={formData.fonction} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full btn-primary text-sm py-4 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Envoi en cours...
                      </>
                    ) : (
                      "Confirmer ma participation"
                    )}
                  </button>
                  <p className="text-center text-slate-400 text-[9px] mt-6 uppercase tracking-widest font-bold">
                    Accès gratuit sur inscription – Validation envoyée par email
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center">
          {/* Main Logo Thales */}
          <div className="flex flex-col items-center mb-16">
            <img src={partners[0].logo} alt="Thalès Informatique" className="h-14 md:h-20 object-contain mb-4" referrerPolicy="no-referrer" />
            <span className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase">THALÈS INFORMATIQUE © {currentYear}</span>
          </div>

          {/* Partners Section in Footer */}
          <div className="flex flex-col items-center w-full">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">En partenariat avec</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
              {partners.slice(1).map((p, i) => (
                <img 
                  key={i} 
                  src={p.logo} 
                  alt={p.name} 
                  className={`${p.name === "Factorial" ? "h-6 md:h-8" : p.name === "Heliolys" ? "h-10 md:h-12" : "h-9 md:h-11"} object-contain`} 
                  referrerPolicy="no-referrer" 
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
