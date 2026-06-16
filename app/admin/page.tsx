'use client';

import { useState, useEffect } from 'react';
import {
  LayoutDashboard, FileText, Upload, PlusCircle,
  ShieldCheck, LogIn, LogOut, Loader2,
  Trash2, Eye, Video, Image as ImageIcon, BookOpen
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function BimbaAdminPanel() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'dashboard' | 'program' | 'berita'>('dashboard');
  const [loading, setLoading] = useState(false);

  // States: Data Database
  const [programs, setPrograms] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  // States: Form Program
  const [progTitle, setProgTitle] = useState('');
  const [progDesc, setProgDesc] = useState('');
  const [progFile, setProgFile] = useState<File | null>(null);

  // States: Form Berita & Video
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('');
  const [newsSnippet, setNewsSnippet] = useState('');
  const [newsVideoUrl, setNewsVideoUrl] = useState('');
  const [newsFile, setNewsFile] = useState<File | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => setSession(currentSession));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchPrograms();
      fetchArticles();
    }
  }, [session]);

  const fetchPrograms = async () => {
    const { data } = await supabase.from('bimba_programs').select('*').order('created_at', { ascending: false });
    if (data) setPrograms(data);
  };

  const fetchArticles = async () => {
    const { data } = await supabase.from('bimba_articles').select('*').order('created_at', { ascending: false });
    if (data) setArticles(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(`Akses Ditolak: Pastikan email/password Bimba benar.`);
    else if (data?.session) { setSession(data.session); toast.success('Otorisasi Bimba berhasil!'); }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    toast.success('Sesi ditutup.');
  };

  // Fungsi Upload Foto ke Bucket 'yamu-assets'
  const uploadImage = async (file: File, folder: string) => {
    const filePath = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('yamu-assets').upload(filePath, file);
    if (error) throw error;
    return supabase.storage.from('yamu-assets').getPublicUrl(filePath).data.publicUrl;
  };

  // Simpan Program Akademik
  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!progFile) return toast.error('Wajib unggah foto ilustrasi!');
    setLoading(true);
    try {
      const imgUrl = await uploadImage(progFile, 'bimba_programs');
      const { error } = await supabase.from('bimba_programs').insert([{ 
        title: progTitle, description: progDesc, image_url: imgUrl 
      }]);
      if (error) throw error;
      toast.success('Program akademik ditambahkan!');
      setProgTitle(''); setProgDesc(''); setProgFile(null);
      fetchPrograms();
    } catch (err: any) { toast.error(err.message); } finally { setLoading(false); }
  };

  // Simpan Berita / Video
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imgUrl = null;
      // Foto opsional jika upload video YouTube
      if (newsFile) {
        imgUrl = await uploadImage(newsFile, 'bimba_articles');
      }
      
      const { error } = await supabase.from('bimba_articles').insert([{ 
        title: newsTitle, category: newsCategory, snippet: newsSnippet, 
        image_url: imgUrl, video_url: newsVideoUrl || null 
      }]);
      if (error) throw error;
      toast.success('Publikasi berhasil ditayangkan!');
      setNewsTitle(''); setNewsCategory(''); setNewsSnippet(''); setNewsVideoUrl(''); setNewsFile(null);
      fetchArticles();
    } catch (err: any) { toast.error(err.message); } finally { setLoading(false); }
  };

  const handleDelete = async (table: string, id: string, refreshFn: () => void) => {
    if (!confirm('Yakin ingin menghapus data ini secara permanen?')) return;
    setLoading(true);
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) { toast.success('Data dihapus!'); refreshFn(); }
    else toast.error(`Gagal menghapus: ${error.message}`);
    setLoading(false);
  };

  if (!session) {
    return (
      <div className="fixed inset-0 z-[999999] bg-slate-50 flex items-center justify-center px-6 font-sans text-slate-800 w-screen h-screen">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto"><ShieldCheck className="w-7 h-7 text-blue-600" /></div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Portal Admin Bimba</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Otorisasi YAMU Peduli</p>
          </div>
          <div className="space-y-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Akses" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-blue-500 transition-colors" />
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Kata Sandi" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-4 pr-12 text-xs font-bold focus:outline-none focus:border-blue-500 transition-colors" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"><Eye className="w-4 h-4" /></button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 bg-blue-900 hover:bg-blue-950 font-black rounded-xl text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 shadow-md transition-all">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><LogIn className="w-4 h-4" /> Masuk Sistem</>}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99998] bg-slate-50 font-sans flex text-slate-800 antialiased w-screen h-screen overflow-hidden">
      
      {/* SIDEBAR CLEAN CORPORATE */}
      <div className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-6 shrink-0 h-full shadow-sm select-none">
        <div className="pb-4 border-b border-slate-100">
          <h1 className="text-slate-900 font-black text-lg tracking-tight flex items-center gap-2">Bimba YAMU</h1>
          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1 mt-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Admin Area</span>
        </div>
        <div className="flex flex-col gap-1.5 flex-grow text-xs font-bold text-slate-500">
          <button onClick={() => setActiveMenu('dashboard')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'dashboard' ? 'bg-blue-50 text-blue-900 border border-blue-100' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}><LayoutDashboard className="w-4 h-4" /> Dashboard Ringkas</button>
          <button onClick={() => setActiveMenu('program')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'program' ? 'bg-blue-50 text-blue-900 border border-blue-100' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}><PlusCircle className="w-4 h-4" /> Kelola Program Kelas</button>
          <button onClick={() => setActiveMenu('berita')} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeMenu === 'berita' ? 'bg-blue-50 text-blue-900 border border-blue-100' : 'hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}><FileText className="w-4 h-4" /> Rilis Berita & Video</button>
        </div>
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-black text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-colors uppercase tracking-wider"><LogOut className="w-4 h-4" /> Keluar</button>
      </div>

      <div className="flex-grow p-8 md:p-10 overflow-y-auto h-full max-w-5xl">
        
        {/* ======================= DASHBOARD ======================= */}
        {activeMenu === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-blue-900 rounded-3xl p-8 md:p-10 shadow-lg text-white border border-blue-800 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-blue-800 rounded-full blur-[80px] opacity-40"></div>
              <div className="relative z-10 space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-blue-200 font-bold text-[9px] rounded-lg uppercase tracking-widest border border-white/20 mb-2">Pusat Kendali Bimba</span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Selamat Datang, Admin Edukasi</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-36">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-600" /> Total Program Kelas</span>
                <span className="text-3xl font-black text-slate-900">{programs.length} <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Modul</span></span>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-36">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2"><Video className="w-4 h-4 text-rose-500" /> Total Publikasi & Video</span>
                <span className="text-3xl font-black text-slate-900">{articles.length} <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tayang</span></span>
              </div>
            </div>
          </div>
        )}

        {/* ======================= PROGRAM AKADEMIK ======================= */}
        {activeMenu === 'program' && (
          <div className="space-y-8">
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wider mb-6">Tambah Program Belajar Baru</h2>
              <form onSubmit={handleSaveProgram} className="space-y-5 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <div className="space-y-1.5"><label>Nama Program *</label><input type="text" required value={progTitle} onChange={(e) => setProgTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 font-bold normal-case" /></div>
                <div className="space-y-1.5">
                  <label>Foto Dokumentasi Kelas *</label>
                  <div className="border-2 border-dashed border-slate-300 p-6 rounded-xl bg-slate-50 relative cursor-pointer hover:border-blue-500 flex flex-col items-center justify-center">
                    <input type="file" accept="image/*" required onChange={(e) => setProgFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="w-5 h-5 text-slate-400 mb-2" />
                    <span className="text-slate-500 block text-center normal-case">{progFile ? <span className="text-blue-600 font-black">✓ Berkas Siap: {progFile.name}</span> : 'Klik atau tarik foto di sini'}</span>
                  </div>
                </div>
                <div className="space-y-1.5"><label>Deskripsi Silabus *</label><textarea rows={5} required value={progDesc} onChange={(e) => setProgDesc(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 font-medium normal-case" /></div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-blue-900 hover:bg-blue-950 text-white rounded-xl shadow-md flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider transition-colors">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Program'}
                </button>
              </form>
            </div>
            
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
              <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-4">Arsip Program Bimba</h3>
              <div className="space-y-3">
                {programs.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-sm text-slate-800">{p.title}</div>
                    <button onClick={() => handleDelete('bimba_programs', p.id, fetchPrograms)} className="p-2 text-rose-600 bg-rose-100 hover:bg-rose-200 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================= BERITA & VIDEO ======================= */}
        {activeMenu === 'berita' && (
          <div className="space-y-8">
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wider mb-6">Tayangkan Berita atau Video Kegiatan</h2>
              <form onSubmit={handleSaveArticle} className="space-y-5 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><label>Judul Publikasi *</label><input type="text" required value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 font-bold normal-case" /></div>
                  <div className="space-y-1.5"><label>Kategori (Misal: Kegiatan) *</label><input type="text" required value={newsCategory} onChange={(e) => setNewsCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 font-bold normal-case" /></div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Foto Cover (Wajib jika artikel)</label>
                    <div className="border-2 border-dashed border-slate-300 p-4 rounded-xl bg-slate-50 relative cursor-pointer hover:border-blue-500 text-center">
                      <input type="file" accept="image/*" onChange={(e) => setNewsFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <span className="text-slate-500 normal-case">{newsFile ? <span className="text-blue-600 font-black text-[10px]">{newsFile.name}</span> : 'Pilih Foto Cover'}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2"><Video className="w-4 h-4" /> Tautan Video (Opsional)</label>
                    <input type="text" value={newsVideoUrl} onChange={(e) => setNewsVideoUrl(e.target.value)} placeholder="Link YouTube atau URL .mp4" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 font-bold normal-case" />
                    <p className="text-[9px] text-slate-400 normal-case">Isi link jika ingin menampilkan video, kosongkan jika hanya artikel teks.</p>
                  </div>
                </div>

                <div className="space-y-1.5"><label>Isi Konten / Deskripsi *</label><textarea rows={5} required value={newsSnippet} onChange={(e) => setNewsSnippet(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 font-medium normal-case" /></div>
                
                <button type="submit" disabled={loading} className="w-full py-4 bg-blue-900 hover:bg-blue-950 text-white rounded-xl shadow-md flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider transition-colors">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Tayangkan Publikasi'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
              <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-4">Arsip Berita & Video</h3>
              <div className="space-y-3">
                {articles.map(a => (
                  <div key={a.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-3">
                      {a.video_url ? <Video className="w-5 h-5 text-rose-500" /> : <FileText className="w-5 h-5 text-blue-600" />}
                      <div className="font-bold text-sm text-slate-800">{a.title}</div>
                    </div>
                    <button onClick={() => handleDelete('bimba_articles', a.id, fetchArticles)} className="p-2 text-rose-600 bg-rose-100 hover:bg-rose-200 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}