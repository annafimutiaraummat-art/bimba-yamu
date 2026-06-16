'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Calendar, Newspaper, 
  PlayCircle, FileText, Sparkles, Video
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function BimbaBeritaPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'ARTICLE' | 'VIDEO'>('ALL');

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error } = await supabase
          .from('bimba_articles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data) setNews(data);
      } catch (err) {
        console.error("Gagal memuat data kegiatan:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  // Filter data berdasarkan tombol yang diklik
  const filteredNews = news.filter(item => {
    if (filter === 'ARTICLE') return !item.video_url;
    if (filter === 'VIDEO') return item.video_url;
    return true;
  });

  // Fungsi pintar untuk mendeteksi ID YouTube agar bisa di-embed
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-900 selection:text-white pb-24">
      
      {/* SUNTIKAN ANIMASI HALUS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up { opacity: 0; animation: fadeUp 0.8s ease-out forwards; }
        .delay-1 { animation-delay: 100ms; }
        .delay-2 { animation-delay: 200ms; }
        
        .bg-grid {
          background-image: radial-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}} />

      {/* ======================================================== */}
      {/* 1. HEADER HALAMAN (CLEAN & MINIMALIST)                   */}
      {/* ======================================================== */}
      <div className="bg-white border-b border-slate-200 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-wider mb-8">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
          
          <div className="max-w-2xl">
            <div className="anim-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 text-[10px] font-black tracking-widest uppercase shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-900" /> Publikasi Resmi
            </div>
            <h1 className="anim-fade-up delay-1 text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Galeri Kegiatan & <br /> Kabar Bimba YAMU
            </h1>
            <p className="anim-fade-up delay-2 text-slate-500 font-medium leading-relaxed">
              Pantau terus perkembangan, keceriaan, dan aktivitas edukatif putra-putri asuh kami melalui arsip dokumentasi visual dan rilis berita terbaru.
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TAB FILTER (SEMUA | ARTIKEL | VIDEO)                  */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${filter === 'ALL' ? 'bg-slate-900 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'}`}
          >
            Semua Kabar
          </button>
          <button 
            onClick={() => setFilter('ARTICLE')}
            className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${filter === 'ARTICLE' ? 'bg-slate-900 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'}`}
          >
            <FileText className="w-3.5 h-3.5" /> Artikel Teks
          </button>
          <button 
            onClick={() => setFilter('VIDEO')}
            className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${filter === 'VIDEO' ? 'bg-rose-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'}`}
          >
            <Video className="w-3.5 h-3.5" /> Galeri Video
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. GRID KONTEN (SMART RENDER ARTIKEL VS VIDEO)           */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="bg-white rounded-3xl border border-slate-200 h-96 animate-pulse flex flex-col overflow-hidden">
                <div className="h-48 bg-slate-100 w-full" />
                <div className="p-6 flex-grow space-y-4">
                  <div className="h-4 bg-slate-100 rounded w-1/4" />
                  <div className="h-6 bg-slate-100 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(item => {
              const isVideo = !!item.video_url;
              
              return (
                <Link href={`/berita/${item.id}`} key={item.id} className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col">
                  
                  {/* MEDIA CONTAINER (GAMBAR / VIDEO) */}
                  <div className="relative h-56 bg-slate-100 shrink-0 overflow-hidden">
                    {isVideo ? (
                      // RENDER VIDEO YOUTUBE ATAU MP4
                      item.video_url.includes('youtu') ? (
                        <iframe 
                          src={getYouTubeEmbedUrl(item.video_url)!} 
                          title={item.title}
                          className="w-full h-full object-cover"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        />
                      ) : (
                        <video controls className="w-full h-full object-cover bg-black">
                          <source src={item.video_url} type="video/mp4" />
                          Video tidak didukung.
                        </video>
                      )
                    ) : (
                      // RENDER GAMBAR ARTIKEL BIASA
                      <>
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    )}
                    
                    {/* Badge Tipe Konten */}
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      {isVideo ? (
                        <span className="bg-rose-600/90 backdrop-blur text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                          <PlayCircle className="w-3.5 h-3.5" /> Video Dokumentasi
                        </span>
                      ) : (
                        <span className="bg-slate-900/80 backdrop-blur text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                          <FileText className="w-3.5 h-3.5" /> Artikel
                        </span>
                      )}
                    </div>
                  </div>

                  {/* KONTEN TEKS */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-md border border-slate-200 uppercase tracking-wider inline-block">
                        {item.category || 'Kabar Bimba'}
                      </span>
                      
                      {isVideo ? (
                        // Kalau video, judul gak perlu di-link ke halaman detail (karena udah nonton langsung di card)
                        <h3 className="font-black text-slate-900 text-lg leading-snug normal-case">{item.title}</h3>
                      ) : (
                        // Kalau artikel, judul bisa diklik buat baca full
                        <Link href={`/berita/${item.id}`} className="block">
                          <h3 className="font-black text-slate-900 text-lg leading-snug normal-case group-hover:text-blue-900 transition-colors">{item.title}</h3>
                        </Link>
                      )}
                      
                      <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed normal-case">
                        {item.snippet}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-100">
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> 
                        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      {!isVideo && (
                        <Link href={`/berita/${item.id}`} className="text-[10px] font-black text-blue-900 uppercase tracking-wider hover:text-amber-500 transition-colors">
                          Baca Lengkap &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-slate-300 rounded-[2.5rem] bg-slate-50">
            <Newspaper className="w-12 h-12 mx-auto mb-4 text-slate-300" /> 
            <h3 className="text-lg font-black text-slate-900 mb-1">Belum Ada Publikasi</h3>
            <p className="text-slate-500 text-sm font-medium">Berita atau video kegiatan Bimba akan segera hadir di sini.</p>
          </div>
        )}
      </div>

    </div>
  );
}