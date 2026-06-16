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
      title: 'Bimba YAMU - Pusat Tumbuh Kembang Anak',
      text: 'Mari kenali program bimbingan belajar inklusif usia dini di Bimba YAMU.',
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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-slate-900 selection:text-white">
      
      {/* ======================================================== */}
      {/* ANIMATION ENGINE (ULTRA SMOOTH MICRO-INTERACTIONS)       */}
      {/* ======================================================== */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes entranceUp {
          from { opacity: 0; transform: translateY(24px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes gridFlow {
          0% { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.06); opacity: 0.3; }
        }

        .anim-entrance { opacity: 0; animation: entranceUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-grid { animation: gridFlow 25s linear infinite; }
        .anim-pulse-soft { animation: pulseSoft 7s ease-in-out infinite; }

        .delay-1 { animation-delay: 100ms; }
        .delay-2 { animation-delay: 200ms; }
        .delay-3 { animation-delay: 300ms; }

        .fine-grid {
          background-image: 
            linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}} />

      {/* ======================================================== */}
      {/* 1. HERO HEADER SECTION (ELEGANT INSTITUTIONAL)          */}
      {/* ======================================================== */}
      <section className="relative bg-white pt-40 pb-32 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 fine-grid anim-grid pointer-events-none" />
        <div className="absolute top-[-15%] right-[-5%] w-[550px] h-[550px] bg-blue-900/5 rounded-full blur-[100px] anim-pulse-soft pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="anim-entrance flex justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-500 text-[10px] font-bold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-900" /> Pusat Pengembangan Literasi Anak Usia Dini
            </div>
          </div>
          
          <h1 className="anim-entrance delay-1 text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Membentuk Fondasi, <br />
            <span className="bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">Mengantarkan Cita-Cita</span>
          </h1>
          
          <p className="anim-entrance delay-2 text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Program bimbingan belajar calistung dan penguatan karakter kognitif khusus anak usia 4-7 tahun. Menggunakan metode interaktif yang menyenangkan dan terukur.
          </p>
          
          <div className="anim-entrance delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#visi-misi" className="w-full sm:w-auto px-7 py-3.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider">
              Orientasi & Visi <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#kurikulum" className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm">
              Materi Pelajaran
            </a>
          </div>

          <div className="anim-entrance delay-3 pt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5 select-none">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Supported by YAMU Peduli Foundation
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. VISI, MISI & CORE VALUES (REFINED CARDS STRUCTURE)    */}
      {/* ======================================================== */}
      <section id="visi-misi" className="max-w-7xl mx-auto px-6 lg:px-8 py-24 scroll-mt-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Kiri: Blok Visi Struktural */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <span className="text-blue-900 font-black text-xs uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 inline-block">Hilirisasi Program</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">Visi Akademik</h2>
            <div className="w-12 h-1 bg-blue-900 rounded-full my-4" />
            <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm relative overflow-hidden group hover:border-slate-400 transition-all duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-900" />
              <p className="text-slate-800 font-bold text-lg md:text-xl leading-relaxed normal-case">
                "Menjadi pusat bimbingan belajar usia dini yang unggul dalam melatih kesiapan kognitif, kemandirian karakter, dan literasi dasar anak demi menyambut masa depan pendidikan yang cemerlang."
              </p>
            </div>
          </div>
          
          {/* Kanan: Rangkaian Misi & Values dengan Efek Hover Hidup */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-slate-400 font-black text-xs uppercase tracking-widest block mb-2">Langkah Strategis (Misi)</span>
            
            {/* Misi M1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex gap-5 items-start hover:border-slate-400 hover:shadow-md transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-black flex items-center justify-center shrink-0 group-hover:bg-blue-900 group-hover:text-white group-hover:border-transparent transition-all shadow-sm">01</div>
              <div>
                <h4 className="font-black text-slate-900 text-base uppercase tracking-tight">Akselerasi Literasi</h4>
                <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed mt-1 normal-case">Menyelenggarakan metode bimbingan membaca, menulis, dan berhitung (Calistung) yang adaptif, terukur, dan bebas dari tekanan psikologis pada anak.</p>
              </div>
            </div>

            {/* Misi M2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex gap-5 items-start hover:border-slate-400 hover:shadow-md transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-black flex items-center justify-center shrink-0 group-hover:bg-blue-900 group-hover:text-white group-hover:border-transparent transition-all shadow-sm">02</div>
              <div>
                <h4 className="font-black text-slate-900 text-base uppercase tracking-tight">Penyetaraan Inklusif</h4>
                <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed mt-1 normal-case">Membuka akses fasilitas pendidikan penunjang non-formal bermutu tinggi secara gratis guna memangkas kesenjangan sosial bagi anak yatim dan dhuafa.</p>
              </div>
            </div>

            {/* Misi M3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex gap-5 items-start hover:border-slate-400 hover:shadow-md transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-black flex items-center justify-center shrink-0 group-hover:bg-blue-900 group-hover:text-white group-hover:border-transparent transition-all shadow-sm">03</div>
              <div>
                <h4 className="font-black text-slate-900 text-base uppercase tracking-tight">Kemitraan Orang Tua</h4>
                <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed mt-1 normal-case">Membangun komunikasi dan pelaporan evaluasi portofolio siswa secara berkala demi memantau tumbuh kembang emosional serta bakat motorik anak.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. APA SAJA YANG DIPELAJARI                              */}
      {/* ======================================================== */}
      <section id="kurikulum" className="max-w-7xl mx-auto px-6 lg:px-8 py-12 scroll-mt-12">
        <div className="mb-12">
          <span className="text-blue-900 font-black text-xs uppercase tracking-widest block mb-1">Kurikulum Akademik</span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Materi Pokok Pembelajaran</h2>
          <div className="w-12 h-1 bg-slate-900 rounded-full mt-3" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-56 hover:border-slate-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div>
              <div className="w-10 h-10 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-900 group-hover:text-white transition-colors shadow-sm"><BookOpen className="w-5 h-5" /></div>
              <h3 className="font-black text-slate-900 text-base mb-2">Membaca & Menulis (Literasi)</h3>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">Pengenalan fonik suara huruf, perakitan suku kata aktif, hingga membaca kalimat pendek tanpa mengeja kaku.</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Metode Fonik Praktis</span>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-56 hover:border-slate-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div>
              <div className="w-10 h-10 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-900 group-hover:text-white transition-colors shadow-sm"><Calculator className="w-5 h-5" /></div>
              <h3 className="font-black text-slate-900 text-base mb-2">Berhitung Logika (Numerasi)</h3>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">Konsep kuantitas angka logika, penjumlahan dasar, serta pengurangan taktis memanfaatkan alat peraga visual.</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Numerasi Kognitif Anak</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-56 hover:border-slate-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div>
              <div className="w-10 h-10 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-900 group-hover:text-white transition-colors shadow-sm"><Palette className="w-5 h-5" /></div>
              <h3 className="font-black text-slate-900 text-base mb-2">Kreativitas & Motorik</h3>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">Melatih koordinasi syaraf motorik halus anak lewat seni melipat origami, komposisi warna gambar, dan melatih fokus pola.</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pengembangan Motorik</span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. JADWAL PENGAJARAN PER SESI                            */}
      {/* ======================================================== */}
      <section id="jadwal" className="max-w-7xl mx-auto px-6 lg:px-8 py-16 scroll-mt-12">
        <div className="mb-8">
          <span className="text-blue-900 font-black text-xs uppercase tracking-widest block mb-1">Manajemen Waktu</span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Pembagian Sesi Belajar Rutin</h2>
          <p className="text-slate-400 text-xs font-bold uppercase mt-1">Hari Operasional: Senin sampai Jumat</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all hover:border-slate-300">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b select-none">
              <tr>
                <th className="p-4 w-1/4">Nama Sesi Kelas</th>
                <th className="p-4 w-1/4">Alokasi Waktu (WIB)</th>
                <th className="p-4 w-1/2">Fokus Kelompok Belajar</th>
              </tr>
            </thead>
            <tbody className="divide-y font-medium text-slate-600">
              <tr className="hover:bg-slate-100/40 transition-colors">
                <td className="p-4 text-slate-900 font-black">Sesi I (Pagi)</td>
                <td className="p-4 font-bold text-blue-900 flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> 08.00 - 09.30</td>
                <td className="p-4">Khusus Anak Usia Dini (Belum Sekolah / Persiapan TK Besar)</td>
              </tr>
              <tr className="hover:bg-slate-100/40 transition-colors">
                <td className="p-4 text-slate-900 font-black">Sesi II (Siang)</td>
                <td className="p-4 font-bold text-blue-900 flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> 10.00 - 11.30</td>
                <td className="p-4">Kelas Pengayaan Literasi Aktif (Persiapan Masuk SD Kelas 1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. GURUNYA SIAPA AJA (PROFIL TIM DEWAN GURU)             */}
      {/* ======================================================== */}
      <section id="pengajar" className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-12">
          <span className="text-blue-900 font-black text-xs uppercase tracking-widest block mb-1">Sumber Daya Insani</span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Dewan Pengajar Bimba</h2>
          <div className="w-12 h-1 bg-slate-900 rounded-full mt-3" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm text-center space-y-3 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto"><GraduationCap className="w-7 h-7 text-slate-600" /></div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">Ibu Ustadzah Khadijah, S.Pd</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Kepala Sekolah / Pengajar Utama</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm text-center space-y-3 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto"><GraduationCap className="w-7 h-7 text-slate-600" /></div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">Kak Aisyah Rahmawati</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Mentor Kelas Calistung</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm text-center space-y-3 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto"><GraduationCap className="w-7 h-7 text-slate-600" /></div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">Kak Budi Santoso, S.Mat</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Mentor Logika & Berhitung</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm text-center space-y-3 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-16 h-16 bg-slate-50 border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto"><GraduationCap className="w-7 h-7 text-slate-600" /></div>
            <div>
              <h4 className="font-black text-slate-900 text-sm">Kak Siti Aminah</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Mentor Seni & Motorik</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. BERITA SEPUTAR BIMBA (FIXED SMART MEDIA CARDS DETECTOR) */}
      {/* ======================================================== */}
      <section id="berita" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 scroll-mt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-blue-900 font-black text-xs uppercase tracking-widest block mb-1">Informasi Publik</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Kabar & Kegiatan Bimba Terbaru</h2>
          </div>
          <Link href="/berita" className="inline-flex items-center gap-1 px-4 py-2 text-xs font-black uppercase text-slate-500 hover:text-blue-900 border border-slate-200 bg-white rounded-xl transition-colors">Lihat Semua Berita <ArrowUpRight className="w-4 h-4" /></Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {loadingNews ? (
            [1, 2, 3].map(n => (
              <div key={n} className="bg-white rounded-2xl border border-slate-200 h-80 animate-pulse flex flex-col overflow-hidden">
                <div className="h-40 bg-slate-200 w-full" />
                <div className="p-4 flex-grow space-y-3"><div className="h-4 bg-slate-200 rounded w-1/4" /><div className="h-6 bg-slate-200 rounded w-3/4" /><div className="h-4 bg-slate-200 rounded w-full" /></div>
              </div>
            ))
          ) : news.length > 0 ? (
            news.map(item => {
              const hasVideo = !!item.video_url; // Deteksi apakah post ini mengandung video
              
              return (
                <Link href={`/berita/${item.id}`} key={item.id} className="group bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-400 flex flex-col h-96 transition-all duration-300 relative">
                  
                  {/* Bagian Media Thumbnail */}
                  <div className="h-44 bg-slate-100 shrink-0 overflow-hidden relative">
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" />
                    
                    {/* PERBAIKAN: Jika ada Video, tampilkan Tombol Play Glassmorphism & Badge Video di Atas Gambar */}
                    {hasVideo && (
                      <>
                        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[0.5px] transition-opacity group-hover:opacity-40" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-md text-rose-600 flex items-center justify-center transition-transform group-hover:scale-110">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 bg-rose-600 text-white text-[8px] font-black uppercase tracking-wider px-2 py-1 rounded shadow-sm">
                          Video Dokumentasi
                        </div>
                      </>
                    )}
                  </div>

                  {/* Deskripsi Teks */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div className="space-y-2">
                      <span className="text-[9px] bg-slate-100 text-slate-600 font-black px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wider">
                        {item.category || (hasVideo ? 'Video' : 'Berita')}
                      </span>
                      <h3 className="font-black text-slate-900 text-base group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug normal-case">{item.title}</h3>
                      <p className="text-slate-500 text-xs font-medium line-clamp-3 leading-relaxed normal-case">{item.snippet}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold block pt-3 border-t border-slate-100">{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center border border-dashed rounded-2xl bg-white text-slate-400 text-xs font-bold uppercase tracking-wider"><Calendar className="w-6 h-6 mx-auto mb-2 text-slate-300" /> Belum ada rilis publikasi berita.</div>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. HUBUNGI KAMI & ALAMAT SEKRETARIAT                     */}
      {/* ======================================================== */}
      <section id="kontak" className="max-w-7xl mx-auto px-6 lg:px-8 py-12 scroll-mt-12">
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Sistem Administrasi</span>
              <h3 className="font-black text-slate-900 text-xl tracking-tight">Sekretariat Bimba</h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed normal-case">Hubungi kontak manajemen pengurus kelas untuk info pendaftaran siswa asuh baru atau regulasi kunjungan.</p>
            </div>
            <div className="space-y-4 border-t border-slate-100 pt-4 text-xs font-bold text-slate-600">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-slate-400" /> <span className="text-slate-900 normal-case">+62 813-8889-8967</span></div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-slate-400" /> <span className="text-slate-900 normal-case">annafimutiaraummat@gmail.com</span></div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-sm">
            <div className="flex gap-4 items-start max-w-xl">
              <div className="w-10 h-10 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center shrink-0 font-black"><MapPin className="w-5 h-5" /></div>
              <div>
                <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider">Alamat Gedung Belajar</h4>
                <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed mt-1 normal-case">
                  JL. Jombang Raya, Villa Jombang Baru Blok A3 No.26 RT 001/RW 014, Kelurahan Jombang, Kecamatan Ciputat, Kota Tangerang Selatan, Banten, Kode Pos 15224.
                </p>
              </div>
            </div>
            <a href="https://wa.me/6281388898967" target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 w-full sm:w-auto">Hubungi Pengurus</a>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. AUTHENTIC INDEPENDENT BIMBA FOOTER (NOT COPIED)       */}
      {/* ======================================================== */}
      <footer className="mt-28 bg-white border-t border-slate-200 pt-16 pb-8 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-xs">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="bg-slate-900 p-2 rounded-xl text-white shadow-sm"><Smile className="w-5 h-5 text-amber-400" /></div>
                <div>
                  <h3 className="text-base font-black text-slate-950 tracking-tight leading-none">Bimba Akademik</h3>
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-1 block">Pusat Belajar Anak</span>
                </div>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed pr-2 normal-case">
                Wadah pendampingan belajar inklusif usia dini guna mematangkan kesiapan mental dan literasi anak memasuki fase sekolah dasar.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Program Kelas</h4>
              <ul className="space-y-2.5 font-bold text-slate-500 uppercase tracking-wide text-[10px]">
                <li><a href="#kurikulum" className="hover:text-slate-950 transition-colors flex items-center gap-1"><ChevronRight className="w-3.5 h-3.5 text-slate-300" /> Sesi Calistung Dasar</a></li>
                <li><a href="#kurikulum" className="hover:text-slate-950 transition-colors flex items-center gap-1"><ChevronRight className="w-3.5 h-3.5 text-slate-300" /> Penalaran Angka</a></li>
                <li><a href="#kurikulum" className="hover:text-slate-950 transition-colors flex items-center gap-1"><ChevronRight className="w-3.5 h-3.5 text-slate-300" /> Kelas Motorik Origami</a></li>
                <li><a href="#jadwal" className="hover:text-slate-950 transition-colors flex items-center gap-1"><ChevronRight className="w-3.5 h-3.5 text-slate-300" /> Agenda Jam Belajar</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Informasi Wali</h4>
              <ul className="space-y-2 text-slate-500 font-medium normal-case">
                <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-slate-400 mt-0.5" /> <span>Senin – Jumat<br/><b className="text-slate-700 font-bold">08.00 - 11.30 WIB</b></span></li>
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-slate-400 mt-0.5" /> <span>Gedung Aula Bimba Lt.1, Ciputat, Tangerang Selatan.</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Saluran Komunikasi</h4>
              <div className="flex items-center gap-2">
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setShowSocials(!showSocials)}
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${showSocials ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900'}`}
                    title="Medsos Bimba"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                  {showSocials && (
                    <div className="absolute bottom-12 left-0 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
                      <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Medsos Resmi Bimba</span>
                        <button onClick={() => setShowSocials(false)} className="text-slate-400 hover:text-rose-500 p-1 bg-slate-50 rounded-full"><X className="w-3.5 h-3.5" /></button>
                      </div>
                      <div className="space-y-2 text-slate-700 font-bold text-xs">
                        <a href="https://www.youtube.com/@yamufoundation7691" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-colors">▶ YouTube Chanel</a>
                        <a href="https://www.facebook.com/p/annafi-mutiara-ummat-100066893095636/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-colors">👥 Facebook Page</a>
                        <a href="https://www.instagram.com/yamupeduli/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg transition-colors">📸 Instagram Profile</a>
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={handleShare} className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"><Share2 className="w-4 h-4" /></button>
                <Link href="/admin" className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center"><ExternalLink className="w-4 h-4" /></Link>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-200/80 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <p>© {new Date().getFullYear()} Bimba Akademik. Afiliasi Program Pendidikan Kemandirian YAMU Peduli.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}