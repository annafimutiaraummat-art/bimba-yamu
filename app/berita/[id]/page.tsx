'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, Calendar, PlayCircle, 
  Share2, ShieldCheck, FileText, Image as ImageIcon
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function DetailBeritaBimba() {
  const params = useParams();
  const id = params?.id as string;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticleDetail() {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('bimba_articles')
          .select('*')
          .eq('id', id)
          .single();
        
        if (!error && data) {
          setArticle(data);
        }
      } catch (err) {
        console.error("Gagal memuat detail artikel:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticleDetail();
  }, [id]);

  // Deteksi YouTube URL untuk Smart Embed Player
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link berita berhasil disalin!', {
      style: { borderRadius: '12px', background: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest animate-pulse">Memuat Publikasi...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-6">
        <FileText className="w-16 h-16 text-slate-300 mb-4" />
        <h1 className="text-2xl font-black text-slate-900 mb-2">Kabar Tidak Ditemukan</h1>
        <p className="text-slate-500 font-medium mb-6">Mungkin artikel ini telah dihapus atau tautan salah.</p>
        <Link href="/berita" className="px-6 py-3 bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider">Kembali ke Daftar Berita</Link>
      </div>
    );
  }

  const isVideo = !!article.video_url;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-900 selection:text-white pb-24">
      
      {/* BACKGROUND DEKORATIF CORPORATE */}
      <style dangerouslySetInnerHTML={{__html: `
        .bg-grid-soft {
          background-image: radial-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}} />
      <div className="fixed inset-0 bg-grid-soft pointer-events-none" />

      <main className="max-w-4xl mx-auto px-6 lg:px-8 pt-28 relative z-10">
        
        {/* NAVIGASI BACK */}
        <Link href="/berita" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-900 transition-colors uppercase tracking-wider mb-8">
          <ArrowLeft className="w-4 h-4" /> Daftar Publikasi
        </Link>

        {/* HEADER ARTIKEL */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-200">
              {article.category}
            </span>
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> 
              {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Humas Bimba YAMU
            </div>
            <button onClick={handleShare} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
              <Share2 className="w-3 h-3" /> Bagikan
            </button>
          </div>
        </header>

        {/* MEDIA PLAYER / COVER GAMBAR */}
        <div className="w-full bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl border border-slate-200/50 mb-12 relative aspect-video">
          {isVideo ? (
            article.video_url.includes('youtu') ? (
              <iframe 
                src={getYouTubeEmbedUrl(article.video_url)!} 
                title={article.title}
                className="w-full h-full absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            ) : (
              <video controls className="w-full h-full absolute inset-0 object-contain bg-black">
                <source src={article.video_url} type="video/mp4" />
                Browser Anda tidak mendukung tag video.
              </video>
            )
          ) : (
            article.image_url ? (
              <img src={article.image_url} alt={article.title} className="w-full h-full absolute inset-0 object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                <span className="text-xs font-bold uppercase tracking-widest">Tidak ada foto sampul</span>
              </div>
            )
          )}
          
          {/* Badge Tipe Media di Pojok Kanan Atas */}
          <div className="absolute top-4 right-4 z-10 pointer-events-none">
            {isVideo ? (
              <span className="bg-rose-600/90 backdrop-blur text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                <PlayCircle className="w-4 h-4" /> Video Dokumentasi
              </span>
            ) : (
              <span className="bg-blue-900/80 backdrop-blur text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                <FileText className="w-4 h-4" /> Artikel Berita
              </span>
            )}
          </div>
        </div>

        {/* ISI KONTEN TEKS / DESKRIPSI (Untuk Video atau Artikel) */}
        <article className="prose prose-slate prose-lg max-w-none">
          {/* Kita menggunakan whitespace-pre-wrap agar enter/baris baru dari database terbaca rapi sebagai paragraf */}
          <div className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap text-[15px] md:text-base">
            {article.snippet || "Tidak ada deskripsi tambahan untuk publikasi ini."}
          </div>
        </article>

        {/* FOOTER ARTIKEL */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © Hak Cipta Bimba YAMU Peduli
          </div>
          <Link href="/berita" className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl transition-all shadow-sm uppercase tracking-wider">
            Lihat Kabar Lainnya
          </Link>
        </div>

      </main>
    </div>
  );
}