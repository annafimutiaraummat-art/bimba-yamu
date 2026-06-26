'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Palette, Calculator, Users, 
  ShieldCheck, ArrowRight, MapPin, Phone, 
  Clock, Mail, Award, Calendar, ChevronRight,
  Newspaper, GraduationCap, ArrowUpRight, Sparkles, X, Globe, Share2, ExternalLink, Heart, Smile, Play
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function BimbaLandingPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [showSocials, setShowSocials] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchBimbaNews() {
      try {
        const { data, error } = await supabase
          .from('bimba_articles')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        if (!error && data) setNews(data);
      } catch (err) {
        console.error("Gagal memuat berita Bimba:", err);
      } finally {
        setLoadingNews(false);
      }
    }
    fetchBimbaNews();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSocials(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Bimba Bintang Junior - Unit Mitra YAMU',
      text: 'Mari kenali program bimbingan belajar inklusif usia dini di Bimba YAMU Jombang.',
      url: window.location.origin
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.log('Batal share'); }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast.success('Tautan berhasil disalin!', {
        style: { borderRadius: '12px', background: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: '600' }
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-blue-900 selection:text-white relative">
      
      {/* ======================================================== */}
      {/* 🔮 ADVANCED ANIMATION ENGINE                             */}
      {/* ======================================================== */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes entranceUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.98); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes gridFlow {
          0% { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.15; }
          50% { transform: scale(1.05) translate(2%, 2%); opacity: 0.3; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }

        .anim-entrance { opacity: 0; animation: entranceUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .anim-grid { animation: gridFlow 30s linear infinite; }
        .anim-pulse-soft { animation: pulseSoft 10s ease-in-out infinite; }
        
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0));
          animation: shimmer 3s infinite;
          pointer-events: none;
        }

        .delay-1 { animation-delay: 150ms; }
        .delay-2 { animation-delay: 300ms; }
        .delay-3 { animation-delay: 450ms; }

        .fine-grid {
          background-image: 
            linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}} />

      {/* ======================================================== */}
      {/* 1. HERO HEADER SECTION (FULLY RESPONSIVE)                */}
      {/* ======================================================== */}
      <section className="relative bg-white pt-32 pb-24 md:pt-40 md:pb-32 border-b border-slate-200 overflow-hidden w-full">
        <div className="absolute inset-0 fine-grid anim-grid pointer-events-none" />
        <div className="absolute top-[-10%] left-[-20%] md:left-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-500/10 rounded-full blur-[100px] anim-pulse-soft pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-20%] md:right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-500/5 rounded-full blur-[80px] anim-pulse-soft pointer-events-none" style={{ animationDelay: '-5s' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 md:space-y-7 relative z-10">
          
          {/* Badge Sinergi (Wrapped for Mobile) */}
          <div className="anim-entrance flex justify-center hover:-translate-y-1 transition-transform duration-300">
            <div className="inline-flex flex-wrap justify-center items-center gap-2 sm:gap-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-3xl sm:rounded-full border border-slate-200/80 bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] select-none max-w-full">
              <img src="/bimba.png" alt="Bimba Bintang Junior" className="h-5 sm:h-7 w-auto object-contain drop-shadow-sm" />
              <div className="w-px h-4 sm:h-5 bg-slate-200 hidden sm:block"></div>
              <img src="/yamu.png" alt="YAMU Peduli" className="h-4 sm:h-6 w-auto object-contain drop-shadow-sm" />
              <div className="w-full sm:w-px h-px sm:h-5 bg-slate-200 block sm:hidden my-1"></div>
              <div className="w-px h-5 bg-slate-200 hidden sm:block"></div>
              <span className="text-[9px] sm:text-[10px] font-black text-blue-900 uppercase tracking-widest flex items-center gap-1.5 w-full sm:w-auto justify-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Kemitraan Resmi
              </span>
            </div>
          </div>

          {/* Judul Utama (Responsive Font Size) */}
          <h1 className="anim-entrance delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Bimba Bintang Junior <br className="hidden sm:block" />
            <span className="relative inline-block mt-1 sm:mt-2">
              <span className="relative z-10 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700 bg-clip-text text-transparent break-words">Unit Mitra YAMU Jombang</span>
              <div className="absolute bottom-1 sm:bottom-2 left-0 w-full h-3 sm:h-4 bg-blue-100/50 -z-10 -rotate-1 skew-x-12"></div>
            </span>
          </h1>

          {/* Deskripsi */}
          <p className="anim-entrance delay-2 text-slate-500 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium px-2">
            Membawa standardisasi metode baca, tulis, dan hitung nasional dari Bimba Bintang Junior langsung ke lingkungan Anda. Hadir di Villa Jombang Baru, <strong className="text-slate-700">100% bersubsidi penuh</strong> khusus anak yatim & dhuafa.
          </p>
          
          {/* Tombol Aksi */}
          <div className="anim-entrance delay-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 w-full sm:w-auto">
            <a href="#visi-misi" className="relative overflow-hidden group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-black rounded-2xl shadow-[0_10px_40px_-10px_rgba(30,58,138,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(30,58,138,0.6)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-xs uppercase tracking-wider">
              <span className="shimmer-effect"></span>
              Orientasi & Visi <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
            <a href="#kurikulum" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-black rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              Materi Pelajaran
            </a>
          </div>

          <div className="anim-entrance delay-3 pt-6 sm:pt-8 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5 select-none opacity-80">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" /> Diselenggarakan oleh YAMU Peduli Foundation
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. VISI, MISI & CORE VALUES                              */}
      {/* ======================================================== */}
      <section id="visi-misi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28 scroll-mt-12 relative w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Kiri: Blok Visi */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            <span className="text-blue-600 font-black text-[10px] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg uppercase tracking-widest inline-block shadow-sm">Sinergi Pendidikan</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">Standardisasi Kurikulum Nasional</h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-900 to-indigo-500 rounded-full my-4 lg:my-6" />
            
            <div className="p-6 sm:p-8 bg-white border border-slate-200/60 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-blue-300/50 hover:shadow-[0_20px_50px_-15px_rgba(30,58,138,0.15)] transition-all duration-500">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-900 to-indigo-500" />
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium mb-4">
                Unit belajar ini merupakan cabang mitra resmi yang mengadopsi penuh sistem serta metode pengajaran profesional dari <strong className="text-slate-900">Bimba Bintang Junior</strong>. 
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                Didukung oleh infrastruktur dari <strong className="text-slate-900">Yayasan An-Nafi Mutiara Ummat</strong>, kami memastikan putra-putri Anda mendapatkan pendampingan belajar terbaik yang ramah anak di wilayah Jombang.
              </p>
            </div>
          </div>
          
          {/* Kanan: Misi */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 mt-2 lg:mt-0">
            <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest block mb-2 sm:mb-4 ml-1 sm:ml-2">Langkah Strategis (Misi)</span>
            
            {[
              { id: '01', title: 'Akselerasi Literasi', desc: 'Menyelenggarakan metode bimbingan membaca, menulis, dan berhitung (Calistung) yang adaptif, terukur, dan bebas dari tekanan psikologis.' },
              { id: '02', title: 'Penyetaraan Inklusif', desc: 'Membuka akses fasilitas pendidikan penunjang non-formal bermutu tinggi secara gratis guna memangkas kesenjangan sosial.' },
              { id: '03', title: 'Kemitraan Orang Tua', desc: 'Membangun komunikasi dan pelaporan evaluasi portofolio siswa secara berkala demi memantau tumbuh kembang anak.' }
            ].map((misi, idx) => (
              <div key={misi.id} className="bg-white p-5 sm:p-6 rounded-[1.5rem] border border-slate-200/60 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-5 items-start hover:border-blue-300/50 hover:shadow-[0_15px_40px_-10px_rgba(30,58,138,0.1)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-black flex items-center justify-center shrink-0 group-hover:bg-blue-900 group-hover:text-white group-hover:border-transparent transition-colors duration-300 shadow-sm">
                  {misi.id}
                </div>
                <div className="pt-0 sm:pt-1">
                  <h4 className="font-black text-slate-900 text-sm sm:text-base uppercase tracking-tight group-hover:text-blue-900 transition-colors">{misi.title}</h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed mt-1.5">{misi.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. MATERI PELAJARAN                                      */}
      {/* ======================================================== */}
      <section id="kurikulum" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 scroll-mt-12 w-full">
        <div className="mb-10 lg:mb-14 text-center md:text-left">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest block mb-2">Kurikulum Akademik</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Materi Pokok Pembelajaran</h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-blue-900 to-indigo-500 rounded-full mt-4 mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            { icon: BookOpen, title: 'Membaca & Menulis', desc: 'Pengenalan fonik suara huruf, perakitan suku kata aktif, hingga membaca kalimat pendek tanpa mengeja kaku.', label: 'Fonik Praktis' },
            { icon: Calculator, title: 'Berhitung Logika', desc: 'Konsep kuantitas angka logika, penjumlahan dasar, serta pengurangan taktis memanfaatkan alat peraga visual.', label: 'Numerasi Kognitif' },
            { icon: Palette, title: 'Kreativitas & Motorik', desc: 'Melatih koordinasi syaraf motorik halus anak lewat seni melipat origami, komposisi warna, dan melatih fokus pola.', label: 'Pengembangan Motorik' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200/60 shadow-sm flex flex-col justify-between h-auto min-h-[260px] sm:h-[280px] hover:border-blue-300 hover:shadow-[0_20px_50px_-15px_rgba(30,58,138,0.15)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 mb-6">
                <div className="w-12 h-12 bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-blue-900 group-hover:to-indigo-800 group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm group-hover:shadow-blue-900/30">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-slate-900 text-base sm:text-lg mb-2 sm:mb-3 group-hover:text-blue-900 transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
              <span className="relative z-10 text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-wider bg-slate-50 self-start px-3 py-1.5 rounded-lg border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-100 transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. JADWAL PENGAJARAN (MOBILE SCROLLABLE TABLE)           */}
      {/* ======================================================== */}
      <section id="jadwal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 scroll-mt-12 w-full">
        <div className="mb-8 lg:mb-10 text-center md:text-left">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest block mb-2">Manajemen Waktu</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Pembagian Sesi Rutin</h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-2 sm:mt-3">Hari Operasional: <strong className="text-slate-800">Senin sampai Jum'at</strong></p>
        </div>

        {/* Tabel Terbungkus overflow-x-auto agar aman di HP */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200/80 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_-10px_rgba(30,58,138,0.1)] transition-shadow duration-300 w-full overflow-x-auto">
          <table className="min-w-[600px] w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/80 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200/80 select-none">
              <tr>
                <th className="p-4 sm:p-6 w-1/4">Nama Sesi Kelas</th>
                <th className="p-4 sm:p-6 w-1/4">Alokasi Waktu (WIB)</th>
                <th className="p-4 sm:p-6 w-1/2">Fokus Kelompok Belajar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
              <tr className="hover:bg-blue-50/30 transition-colors duration-300 group">
                <td className="p-4 sm:p-6 text-slate-900 font-black flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600 group-hover:scale-150 transition-transform shrink-0"></div> Pagi-Siang
                </td>
                <td className="p-4 sm:p-6 font-bold text-blue-700">
                  <span className="flex items-center gap-1.5 sm:gap-2 bg-blue-50 w-max px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg border border-blue-100"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 shrink-0" /> 08.00 - 12.00</span>
                </td>
                <td className="p-4 sm:p-6 leading-relaxed">Usia dini 3-6 tahun dan yang belum lancar baca</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. GURU (FIXED RESPONSIVE GRID)                          */}
      {/* ======================================================== */}
      <section id="pengajar" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative overflow-hidden w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[800px] h-[300px] sm:h-[800px] bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none select-none anim-pulse-soft" />

        <div className="mb-12 sm:mb-16 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-slate-200/80 text-blue-900 font-black text-[9px] sm:text-[10px] uppercase tracking-widest mb-3 sm:mb-4 shadow-sm">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-600 animate-pulse" /> Sumber Daya Insani
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Pilar Pengajar <br className="block sm:hidden"/> <span className="bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-600 bg-clip-text text-transparent">Bimba Berkualitas</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm md:text-base max-w-xl mt-3 sm:mt-4 font-medium leading-relaxed mx-auto md:mx-0 px-2 sm:px-0">
            Didukung oleh para praktisi pendidikan dedikatif yang tersertifikasi, ramah, dan berjiwa inklusif.
          </p>
        </div>

        {/* Perbaikan Grid Guru biar mulus di HP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10 w-full">
          {[
            { name: 'Bapak Lahuri, S.Pd', role: 'Kepala Sekolah / Pengajar Utama' },
            { name: 'Ibu Neng Indah', role: 'Kepala Unit' },
            { name: 'Ibu Nanda Khairunnisa', role: 'Tutor Pengajar' }
          ].map((guru, idx) => (
            <div key={idx} className={`group relative bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-200/70 p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_24px_48px_-12px_rgba(30,58,138,0.15)] hover:border-blue-400/40 hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.02] to-transparent opacity-0 group-hover:opacity-100 rounded-[1.5rem] sm:rounded-[2.5rem] transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center shadow-inner group-hover:bg-gradient-to-br group-hover:from-blue-900 group-hover:to-indigo-800 group-hover:border-transparent group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-blue-900/30 transition-all duration-500">
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover:text-white group-hover:scale-110 transition-all duration-500" />
                </div>
                <div className="space-y-2 sm:space-y-3 w-full">
                  <h4 className="font-black text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-blue-900 transition-colors duration-300">{guru.name}</h4>
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100/50 transition-colors duration-300 inline-block w-full">
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-500 group-hover:text-blue-700 uppercase tracking-widest transition-colors duration-300">
                      {guru.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. BERITA                                                */}
      {/* ======================================================== */}
      <section id="berita" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 scroll-mt-12 bg-white/50 border-t border-slate-200/60 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div className="text-center sm:text-left">
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest block mb-1 sm:mb-2">Informasi Publik</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Kabar & Dokumentasi</h2>
          </div>
          <Link href="/berita" className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 text-xs font-black uppercase text-slate-600 hover:text-white hover:bg-slate-900 border border-slate-200 bg-white rounded-xl transition-all shadow-sm active:scale-95 w-full sm:w-auto">
            Lihat Semua <ArrowUpRight className="w-4 h-4 shrink-0" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loadingNews ? (
            [1, 2, 3].map(n => (
              <div key={n} className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200/80 h-80 sm:h-96 animate-pulse flex flex-col overflow-hidden">
                <div className="h-40 sm:h-48 bg-slate-100 w-full" />
                <div className="p-5 sm:p-6 flex-grow space-y-4"><div className="h-4 bg-slate-200 rounded w-1/3" /><div className="h-6 bg-slate-200 rounded w-5/6" /><div className="h-4 bg-slate-200 rounded w-full" /></div>
              </div>
            ))
          ) : news.length > 0 ? (
            news.map(item => {
              const hasVideo = !!item.video_url;
              const getYouTubeId = (url: string) => {
                if (!url) return null;
                const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i);
                return match ? match[1] : null;
              };
              const ytId = hasVideo ? getYouTubeId(item.video_url) : null;
              const thumbnailSrc = item.image_url ? item.image_url : (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '');

              return (
                <Link href={`/berita/${item.id}`} key={item.id} className="group bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-200/60 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_-15px_rgba(30,58,138,0.2)] hover:border-blue-300 hover:-translate-y-2 flex flex-col h-auto min-h-[350px] sm:h-[400px] transition-all duration-500 relative">
                  <div className="h-40 sm:h-48 bg-slate-100 shrink-0 overflow-hidden relative flex items-center justify-center">
                    {thumbnailSrc ? (
                      <img src={thumbnailSrc} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="text-slate-400 flex flex-col items-center justify-center opacity-50">
                        <Play className="w-8 h-8 mb-1" />
                      </div>
                    )}
                    {hasVideo && (
                      <>
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-md shadow-xl text-rose-600 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white">
                            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5 sm:ml-1 shrink-0" />
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-rose-600/90 backdrop-blur-sm text-white text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg shadow-md">
                          Video
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-5 sm:p-7 flex flex-col flex-grow justify-between bg-white relative z-10">
                    <div className="space-y-2 sm:space-y-3">
                      <span className="text-[9px] sm:text-[10px] bg-slate-50 text-slate-500 font-black px-2.5 sm:px-3 py-1 rounded-md sm:rounded-lg border border-slate-100 uppercase tracking-widest group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors inline-block">
                        {item.category || (hasVideo ? 'Dokumentasi' : 'Berita')}
                      </span>
                      <h3 className="font-black text-slate-900 text-base sm:text-lg group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug">{item.title}</h3>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold flex items-center gap-1.5 pt-3 sm:pt-4 mt-3 border-t border-slate-100/80">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full py-16 sm:py-20 text-center border-2 border-dashed border-slate-200 rounded-[1.5rem] sm:rounded-[2rem] bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-xs px-4"><Calendar className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-slate-300" /> Belum ada dokumentasi publikasi.</div>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. HUBUNGI KAMI & ALAMAT                                 */}
      {/* ======================================================== */}
      <section id="kontak" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 scroll-mt-12 w-full">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 sm:space-y-8 shadow-xl text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 sm:w-40 h-32 sm:h-40 bg-white/5 rounded-full blur-2xl"></div>
            <div className="space-y-2 sm:space-y-3 relative z-10">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 block">Sistem Administrasi</span>
              <h3 className="font-black text-xl sm:text-2xl tracking-tight">Sekretariat Bimba</h3>
              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">Hubungi kontak manajemen pengurus kelas untuk info pendaftaran siswa asuh baru atau regulasi kunjungan.</p>
            </div>
            <div className="space-y-4 sm:space-y-5 pt-5 sm:pt-6 border-t border-white/10 text-xs sm:text-sm font-bold relative z-10">
              <div className="flex items-center gap-3 sm:gap-4"><div className="p-2 sm:p-2.5 bg-white/10 rounded-lg sm:rounded-xl shrink-0"><Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" /></div> <span className="break-all">+62 813-8889-8967</span></div>
              <div className="flex items-center gap-3 sm:gap-4"><div className="p-2 sm:p-2.5 bg-white/10 rounded-lg sm:rounded-xl shrink-0"><Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" /></div> <span className="break-all">annafimutiaraummat@gmail.com</span></div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex gap-4 sm:gap-5 items-start max-w-xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-sm"><MapPin className="w-5 h-5 sm:w-6 sm:h-6" /></div>
              <div>
                <h4 className="font-black text-slate-900 text-sm sm:text-base uppercase tracking-wider mb-1 sm:mb-2">Alamat Gedung Belajar</h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                  JL. Jombang Raya, Villa Jombang Baru Blok A3 No.26 RT 001/RW 014, Kelurahan Jombang, Kecamatan Ciputat, Kota Tangerang Selatan, Banten, Kode Pos 15224.
                </p>
              </div>
            </div>
            <a href="https://wa.me/6281388898967" target="_blank" rel="noopener noreferrer" className="px-6 sm:px-8 py-3.5 sm:py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] sm:text-xs uppercase tracking-wider rounded-xl sm:rounded-2xl transition-all shadow-lg shadow-emerald-600/20 active:scale-95 flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto text-center">
              Hubungi Pengurus <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </a>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. FOOTER                                                */}
      {/* ======================================================== */}
      <footer className="mt-12 sm:mt-20 bg-white border-t border-slate-200 pt-16 sm:pt-20 pb-8 sm:pb-10 relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16 text-xs sm:text-sm">
            
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-3">
                <div className="bg-blue-900 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-white shadow-lg shadow-blue-900/20 shrink-0"><Smile className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" /></div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">Bimba Akademik</h3>
                  <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 sm:mt-1.5 block">Pusat Belajar Anak</span>
                </div>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed">
                Wadah pendampingan belajar inklusif usia dini guna mematangkan kesiapan mental dan literasi anak memasuki fase sekolah dasar.
              </p>
            </div>

            <div>
              <h4 className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-widest mb-4 sm:mb-6 border-b border-slate-100 pb-2 sm:pb-3">Program Kelas</h4>
              <ul className="space-y-3 sm:space-y-3.5 font-bold text-slate-500 uppercase tracking-wider text-[9px] sm:text-[10px]">
                <li><a href="#kurikulum" className="hover:text-blue-600 hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-300 shrink-0" /> Sesi Calistung Dasar</a></li>
                <li><a href="#kurikulum" className="hover:text-blue-600 hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-300 shrink-0" /> Penalaran Angka</a></li>
                <li><a href="#kurikulum" className="hover:text-blue-600 hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-300 shrink-0" /> Kelas Motorik</a></li>
                <li><a href="#jadwal" className="hover:text-blue-600 hover:translate-x-1 transition-all flex items-center gap-2"><ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-300 shrink-0" /> Agenda Jam Belajar</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] sm:text-xs font-black text-slate-900 uppercase tracking-widest mb-4 sm:mb-6 border-b border-slate-100 pb-2 sm:pb-3">Informasi Wali</h4>
              <ul className="space-y-3 sm:space-y-4 text-slate-500 font-medium text-[11px] sm:text-xs">
                <li className="flex items-start gap-2 sm:gap-3"><Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0 mt-0.5 sm:mt-0" /> <span>Senin – Jum'at<br/><b className="text-slate-700 font-black mt-1 inline-block">08.00 - 12.00 WIB</b></span></li>
                <li className="flex items-start gap-2 sm:gap-3"><MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0 mt-0.5 sm:mt-0" /> <span className="leading-relaxed">Gedung Aula Bimba Lt.1, Ciputat, Tangerang Selatan.</span></li>
              </ul>
            </div>

            <div>
              <div className="mb-4 sm:mb-6 border-b border-slate-100 pb-2 sm:pb-3">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-none mb-1.5">Bintang Junior</h3>
                <span className="text-[8px] sm:text-[9px] font-black text-blue-600 uppercase tracking-widest block">Mitra Program YAMU Jombang</span>              
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setShowSocials(!showSocials)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all shadow-sm active:scale-95 shrink-0 ${showSocials ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900'}`}
                    title="Medsos Bimba"
                  >
                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  {showSocials && (
                    <div className="absolute bottom-12 sm:bottom-14 left-0 sm:right-0 sm:left-auto w-56 sm:w-64 bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] border border-slate-200 p-4 sm:p-5 z-50 origin-bottom-left sm:origin-bottom-right animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-slate-100">
                        <span className="text-[9px] sm:text-[10px] font-black text-slate-800 uppercase tracking-widest">Medsos Resmi YAMU</span>
                        <button onClick={() => setShowSocials(false)} className="text-slate-400 hover:text-rose-500 p-1 sm:p-1.5 bg-slate-50 rounded-lg sm:rounded-xl hover:bg-rose-50 transition-colors"><X className="w-3 h-3 sm:w-3.5 sm:h-3.5" /></button>
                      </div>
                      <div className="space-y-2 sm:space-y-2.5 text-slate-600 font-bold text-[11px] sm:text-xs">
                        <a href="https://www.youtube.com/@yamufoundation7691" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 hover:bg-blue-50 hover:text-blue-700 rounded-lg sm:rounded-xl transition-colors">▶ YouTube Chanel</a>
                        <a href="https://www.facebook.com/p/annafi-mutiara-ummat-100066893095636/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 hover:bg-blue-50 hover:text-blue-700 rounded-lg sm:rounded-xl transition-colors">👥 Facebook Page</a>
                        <a href="https://www.instagram.com/yamupeduli/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 hover:bg-blue-50 hover:text-blue-700 rounded-lg sm:rounded-xl transition-colors">📸 Instagram Profile</a>
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={handleShare} className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95 flex items-center justify-center shrink-0"><Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
                <Link href="/admin" className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm active:scale-95 flex items-center justify-center shrink-0"><ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></Link>
              </div>
            </div>

          </div>

          <div className="pt-6 sm:pt-8 border-t border-slate-200/80 text-center text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
            <p>© {new Date().getFullYear()} Bimba Bintang Junior. Diselenggarakan oleh Yayasan An-Nafi Mutiara Ummat Cabang Jombang.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}