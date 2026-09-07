import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, Globe, MapPin, Activity, AlertTriangle, ArrowUpRight, ArrowDownRight, 
  BarChart3, RefreshCw, CheckCircle2, XCircle, Search, Bell, User, Lock, 
  Layers, Filter, Eye, ChevronRight, FileText, Download, PieChart, TrendingUp, 
  Sliders, ShieldAlert, Cpu, Database, Info, ExternalLink, Send, Zap, Clock, 
  FileCheck, DollarSign, Building, AlertCircle, ArrowRight, HelpCircle, Check, 
  Volume2, Maximize2, RefreshCcw, Navigation, Share2, CornerDownRight, LogIn, ChevronDown, Sparkles
} from 'lucide-react';

// --- DATA DEFINITIONS & CONSISTENT STATE DATA ---
const PROVINCE_DATA = [
  { id: 'KT', name: 'Kalimantan Timur', region: 'Kalimantan', code: '64', status: 'warning', quotaInit: 2.4, quotaUsed: 1.8, quotaRemaining: 0.6, deforestTrend: +8.2, trendProjectedMonths: 14, lat: -0.5022, lng: 117.1536, activePermits: 42, frozenPermits: 3 },
  { id: 'PA', name: 'Papua', region: 'Papua', code: '91', status: 'surplus', quotaInit: 4.8, quotaUsed: 1.2, quotaRemaining: 3.6, deforestTrend: -2.1, trendProjectedMonths: 48, lat: -4.2699, lng: 138.0804, activePermits: 18, frozenPermits: 0 },
  { id: 'KU', name: 'Kalimantan Utara', region: 'Kalimantan', code: '65', status: 'surplus', quotaInit: 1.9, quotaUsed: 0.6, quotaRemaining: 1.3, deforestTrend: -1.4, trendProjectedMonths: 36, lat: 3.0731, lng: 116.0413, activePermits: 12, frozenPermits: 0 },
  { id: 'RI', name: 'Riau', region: 'Sumatera', code: '14', status: 'deficit', quotaInit: 1.2, quotaUsed: 1.45, quotaRemaining: -0.25, deforestTrend: +12.4, trendProjectedMonths: 0, lat: 0.5104, lng: 101.4383, activePermits: 65, frozenPermits: 7 },
  { id: 'SU', name: 'Sumatera Utara', region: 'Sumatera', code: '12', status: 'deficit', quotaInit: 0.9, quotaUsed: 1.05, quotaRemaining: -0.15, deforestTrend: +9.8, trendProjectedMonths: 0, lat: 2.1154, lng: 99.5451, activePermits: 38, frozenPermits: 2 },
  { id: 'JB', name: 'Jawa Barat', region: 'Jawa', code: '32', status: 'deficit', quotaInit: 0.4, quotaUsed: 0.52, quotaRemaining: -0.12, deforestTrend: +4.2, trendProjectedMonths: 0, lat: -6.9175, lng: 107.6191, activePermits: 14, frozenPermits: 1 },
  { id: 'ST', name: 'Sulawesi Tengah', region: 'Sulawesi', code: '72', status: 'warning', quotaInit: 1.6, quotaUsed: 1.35, quotaRemaining: 0.25, deforestTrend: +5.7, trendProjectedMonths: 18, lat: -1.4300, lng: 121.4456, activePermits: 29, frozenPermits: 1 },
  { id: 'SS', name: 'Sumatera Selatan', region: 'Sumatera', code: '16', status: 'deficit', quotaInit: 1.1, quotaUsed: 1.28, quotaRemaining: -0.18, deforestTrend: +11.1, trendProjectedMonths: 0, lat: -3.3199, lng: 104.9147, activePermits: 44, frozenPermits: 4 },
  { id: 'KB', name: 'Kalimantan Barat', region: 'Kalimantan', code: '61', status: 'warning', quotaInit: 2.1, quotaUsed: 1.85, quotaRemaining: 0.25, deforestTrend: +6.3, trendProjectedMonths: 11, lat: -0.0863, lng: 109.3333, activePermits: 51, frozenPermits: 2 },
  { id: 'AC', name: 'Aceh', region: 'Sumatera', code: '11', status: 'surplus', quotaInit: 1.8, quotaUsed: 0.7, quotaRemaining: 1.1, deforestTrend: -0.8, trendProjectedMonths: 42, lat: 4.6951, lng: 96.7494, activePermits: 15, frozenPermits: 0 }
];

const TRANSACTIONS_DATA = [
  { id: 'TX-2026-001', seller: 'Kalimantan Timur', buyer: 'Jawa Barat', volume: 125000, price: 42000, date: '04 Sep 2026', status: 'verified', docHash: '0x8f2a...9c41' },
  { id: 'TX-2026-002', seller: 'Papua', buyer: 'Riau', volume: 80000, price: 38500, date: '03 Sep 2026', status: 'pending', docHash: '0x3e11...4b88' },
  { id: 'TX-2026-003', seller: 'Kalimantan Utara', buyer: 'Sumatera Utara', volume: 45000, price: 40200, date: '02 Sep 2026', status: 'verified', docHash: '0x71aa...22ef' },
  { id: 'TX-2026-004', seller: 'Aceh', buyer: 'Sumatera Selatan', volume: 60000, price: 41000, date: '28 Agu 2026', status: 'verified', docHash: '0x99bb...11dd' },
  { id: 'TX-2026-005', seller: 'Papua', buyer: 'Kalimantan Barat', volume: 110000, price: 39000, date: '24 Agu 2026', status: 'verified', docHash: '0x44cc...88ee' },
];

const PERMITS_DATA = [
  { id: 'IZ-001', company: 'PT Foresta Agro Lestari', province: 'Kalimantan Timur', detected: 185, threshold: 100, status: 'FROZEN', area: '45.000 ha', lastAudit: '01 Sep 2026', verifier: 'PT Verification Indonesia' },
  { id: 'IZ-002', company: 'PT Riau Rimba Jaya', province: 'Riau', detected: 72, threshold: 100, status: 'NORMAL', area: '32.000 ha', lastAudit: '15 Agu 2026', verifier: 'SGS Nusantara' },
  { id: 'IZ-003', company: 'PT Sumatera Sawit Sejahtera', province: 'Sumatera Selatan', detected: 142, threshold: 100, status: 'AUDIT', area: '28.500 ha', lastAudit: 'In Progress', verifier: 'EcoAudit Verifier' },
  { id: 'IZ-004', company: 'PT Borneo Kayu Utama', province: 'Kalimantan Barat', detected: 210, threshold: 100, status: 'FROZEN', area: '60.000 ha', lastAudit: '28 Agu 2026', verifier: 'PT Verification Indonesia' },
  { id: 'IZ-005', company: 'PT Papua Forest Reserve', province: 'Papua', detected: 12, threshold: 100, status: 'NORMAL', area: '120.000 ha', lastAudit: '10 Jul 2026', verifier: 'TUV Rheinland ID' },
];

const VERIFIERS_DATA = [
  { id: 'V-01', name: 'PT Verification Indonesia', cert: 'ISO 14065 Certified', audits: 48, findings: 14, successRate: '98.2%', status: 'Active', conflictRisk: 'LOW' },
  { id: 'V-02', name: 'SGS Forest Integrity', cert: 'KLHK Accredited', audits: 62, findings: 19, successRate: '99.1%', status: 'Active', conflictRisk: 'LOW' },
  { id: 'V-03', name: 'EcoAudit Verifier Mandiri', cert: 'ISO 14065 Certified', audits: 31, findings: 8, successRate: '96.5%', status: 'Active', conflictRisk: 'MEDIUM' },
  { id: 'V-04', name: 'TUV Green Integrity ID', cert: 'KLHK Accredited', audits: 27, findings: 5, successRate: '97.8%', status: 'Active', conflictRisk: 'LOW' },
];

export default function App() {
  // App States
  const [role, setRole] = useState('klhk'); // 'public', 'provincial', 'klhk'
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProvince, setSelectedProvince] = useState(PROVINCE_DATA[0]); // Kaltim default
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [circuitBreakerModal, setCircuitBreakerModal] = useState(null);
  const [sliderVal, setSliderVal] = useState(50); // Satellite comparison slider

  // Policy Simulation States
  const [simTradeVolume, setSimTradeVolume] = useState(150000);
  const [simAction, setSimAction] = useState('buy'); // 'buy' or 'sell'

  // Quota Calculator States
  const [calcBaseline, setCalcBaseline] = useState(2500000);
  const [calcTarget, setCalcTarget] = useState(1.5);
  const [calcHistorical, setCalcHistorical] = useState(2.2);

  // Whistleblower Form State
  const [wbSubmitted, setWbSubmitted] = useState(false);
  const [wbReportId, setWbReportId] = useState('');

  // Map Layers State
  const [mapLayers, setMapLayers] = useState({
    provinces: true,
    forestBoundaries: true,
    concessions: false,
    alerts: true,
    satellite: true
  });

  // Handle Role Change
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'provincial') {
      setActiveTab('provincial-dash');
    } else if (newRole === 'klhk') {
      setActiveTab('radar');
    } else {
      setActiveTab('overview');
    }
  };

  // Synchronize Tab views based on role constraints
  useEffect(() => {
    if (role === 'public') {
      const publicTabs = ['overview', 'peta', 'trading', 'kepatuhan', 'alur-dana', 'metodologi', 'whistleblower'];
      if (!publicTabs.includes(activeTab)) setActiveTab('overview');
    }
  }, [role]);

  // Derived Values for Quota Calculator
  const calculatedQuota = useMemo(() => {
    const raw = (calcBaseline * (1 - (calcTarget / 100))) / 1000000;
    return raw.toFixed(2);
  }, [calcBaseline, calcTarget]);

  // Whistleblower Submit Handler
  const handleWbSubmit = (e) => {
    e.preventDefault();
    const randomId = 'FG-WB-2026-' + Math.floor(10000 + Math.random() * 90000);
    setWbReportId(randomId);
    setWbSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      
      {/* GLOBAL TOP BAR */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-slate-950 text-lg shadow-lg shadow-emerald-900/30">
              F
            </div>
            <div>
              <span className="font-black tracking-wider text-white text-lg font-mono">FORESTERA</span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                v2.6 NATIONAL
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1 pl-6 border-l border-slate-800 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>All Systems Operational</span>
          </div>
        </div>

        {/* Global Controls & Role Selector */}
        <div className="flex items-center space-x-3">
          
          {/* Quick Search Button */}
          <button 
            onClick={() => setSearchOpen(true)}
            className="flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-md border border-slate-700 text-xs transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cari Izin / Provinsi / TX...</span>
            <kbd className="hidden sm:inline text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-500 font-mono">⌘K</kbd>
          </button>

          {/* Notifications Drawer Toggle */}
          <div className="relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Notification Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 p-4 text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800 font-bold">
                  <span className="text-slate-200 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-emerald-400" /> Notifikasi Sistem Real-time
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">3 Baru</span>
                </div>
                <div className="space-y-3 mt-3 max-h-72 overflow-y-auto">
                  <div className="p-2.5 rounded bg-red-950/40 border border-red-800/50 flex gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-red-300">Peringatan Deforestasi Kritis</div>
                      <div className="text-slate-400 text-[11px]">Deteksi satelit 185 ha di konsesi PT Foresta Agro (IZ-001) Kaltim.</div>
                      <div className="text-[10px] text-red-400/80 mt-1 font-mono">10 min lalu • Circuit Breaker Dipicu</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-amber-950/30 border border-amber-800/40 flex gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-amber-300">Verifikasi Transaksi Tertunda</div>
                      <div className="text-slate-400 text-[11px]">TX-2026-002 (Papua → Riau) membutuhkan audit verifikator independen.</div>
                      <div className="text-[10px] text-amber-400/80 mt-1 font-mono">35 min lalu</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-800/40 flex gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-emerald-300">Audit Verifikasi Selesai</div>
                      <div className="text-slate-400 text-[11px]">Izin IZ-004 telah dipulihkan setelah klarifikasi lapangan.</div>
                      <div className="text-[10px] text-emerald-400/80 mt-1 font-mono">2 jam lalu</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher Pill */}
          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex items-center text-xs font-medium">
            <button
              onClick={() => handleRoleChange('public')}
              className={`px-2.5 py-1 rounded-md transition-all ${role === 'public' ? 'bg-emerald-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Public
            </button>
            <button
              onClick={() => handleRoleChange('provincial')}
              className={`px-2.5 py-1 rounded-md transition-all ${role === 'provincial' ? 'bg-amber-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Provinsi
            </button>
            <button
              onClick={() => handleRoleChange('klhk')}
              className={`px-2.5 py-1 rounded-md transition-all ${role === 'klhk' ? 'bg-blue-600 text-white font-semibold shadow' : 'text-slate-400 hover:text-slate-200'}`}
            >
              KLHK / Admin
            </button>
          </div>

          {/* User Profile Badge */}
          <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-slate-800">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 text-xs font-bold">
              {role === 'klhk' ? 'K' : role === 'provincial' ? 'P' : 'U'}
            </div>
            <div className="text-xs leading-tight hidden xl:block">
              <div className="font-medium text-slate-200">
                {role === 'klhk' ? 'Admin KLHK Pusat' : role === 'provincial' ? 'Pemprov Kaltim' : 'Akses Publik'}
              </div>
              <div className="text-[10px] text-slate-500 uppercase font-mono">{role}</div>
            </div>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER (SIDEBAR + CONTENT) */}
      <div className="flex-1 flex overflow-hidden">

        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-slate-900/70 border-r border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="p-4 space-y-6 overflow-y-auto">
            
            {/* Nav Group: Utama / Publik */}
            <div>
              <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase px-3 mb-2">Navigasi Utama</div>
              <nav className="space-y-1">
                <SidebarItem 
                  icon={<Globe className="w-4 h-4" />} 
                  label="Overview Dashboard" 
                  active={activeTab === 'overview'} 
                  onClick={() => setActiveTab('overview')} 
                />
                <SidebarItem 
                  icon={<MapPin className="w-4 h-4" />} 
                  label="Peta Status Nasional" 
                  active={activeTab === 'peta'} 
                  onClick={() => setActiveTab('peta')} 
                />
                <SidebarItem 
                  icon={<BarChart3 className="w-4 h-4" />} 
                  label="Trading Ledger Kuota" 
                  active={activeTab === 'trading'} 
                  onClick={() => setActiveTab('trading')} 
                />
                <SidebarItem 
                  icon={<TrendingUp className="w-4 h-4" />} 
                  label="Kepatuhan Provinsi" 
                  active={activeTab === 'kepatuhan'} 
                  onClick={() => setActiveTab('kepatuhan')} 
                />
                <SidebarItem 
                  icon={<DollarSign className="w-4 h-4" />} 
                  label="Alur Dana & Transparansi" 
                  active={activeTab === 'alur-dana'} 
                  onClick={() => setActiveTab('alur-dana')} 
                />
              </nav>
            </div>

            {/* Nav Group: Pemprov Section */}
            {(role === 'provincial' || role === 'klhk') && (
              <div>
                <div className="text-[10px] font-mono tracking-wider text-amber-500/80 uppercase px-3 mb-2 flex items-center justify-between">
                  <span>Pemerintah Daerah</span>
                  <span className="text-[9px] bg-amber-950 text-amber-400 px-1.5 py-0.2 rounded">PROV</span>
                </div>
                <nav className="space-y-1">
                  <SidebarItem 
                    icon={<Building className="w-4 h-4" />} 
                    label="Dashboard Provinsi" 
                    active={activeTab === 'provincial-dash'} 
                    onClick={() => setActiveTab('provincial-dash')} 
                  />
                  <SidebarItem 
                    icon={<PieChart className="w-4 h-4" />} 
                    label="Simulasi Ekonomi" 
                    active={activeTab === 'prov-sim'} 
                    onClick={() => setActiveTab('prov-sim')} 
                  />
                </nav>
              </div>
            )}

            {/* Nav Group: KLHK Internal Monitoring & Action */}
            {role === 'klhk' && (
              <div>
                <div className="text-[10px] font-mono tracking-wider text-blue-400 uppercase px-3 mb-2 flex items-center justify-between">
                  <span>Pengawasan Internal</span>
                  <span className="text-[9px] bg-blue-950 text-blue-400 px-1.5 py-0.2 rounded">ADMIN</span>
                </div>
                <nav className="space-y-1">
                  <SidebarItem 
                    icon={<Activity className="w-4 h-4" />} 
                    label="Radar Deforestasi Real-Time" 
                    active={activeTab === 'radar'} 
                    onClick={() => setActiveTab('radar')} 
                    badge="LIVE"
                  />
                  <SidebarItem 
                    icon={<ShieldAlert className="w-4 h-4" />} 
                    label="Circuit Breaker (Audit)" 
                    active={activeTab === 'circuit'} 
                    onClick={() => setActiveTab('circuit')} 
                    badge="18 Frozen"
                    badgeColor="bg-red-900 text-red-300"
                  />
                  <SidebarItem 
                    icon={<Sliders className="w-4 h-4" />} 
                    label="Kalkulator & Simulasi Kuota" 
                    active={activeTab === 'kalkulator'} 
                    onClick={() => setActiveTab('kalkulator')} 
                  />
                  <SidebarItem 
                    icon={<FileCheck className="w-4 h-4" />} 
                    label="Manajemen Verifikator" 
                    active={activeTab === 'verifikator'} 
                    onClick={() => setActiveTab('verifikator')} 
                  />
                </nav>
              </div>
            )}

            {/* Public Transparency & Citizen Feedback */}
            <div>
              <div className="text-[10px] font-mono tracking-wider text-slate-500 uppercase px-3 mb-2">Transparansi & Metodologi</div>
              <nav className="space-y-1">
                <SidebarItem 
                  icon={<Database className="w-4 h-4" />} 
                  label="Data & Metodologi" 
                  active={activeTab === 'metodologi'} 
                  onClick={() => setActiveTab('metodologi')} 
                />
                <SidebarItem 
                  icon={<Lock className="w-4 h-4" />} 
                  label="Whistleblower Portal" 
                  active={activeTab === 'whistleblower'} 
                  onClick={() => setActiveTab('whistleblower')} 
                />
              </nav>
            </div>

          </div>

          {/* Sidebar Footer Info */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/50 text-[11px] text-slate-500 space-y-2">
            <div className="flex items-center justify-between">
              <span>Status Satelit:</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Sync Terakhir:</span>
              <span className="text-slate-300 font-mono">5 min lalu</span>
            </div>
            <div className="pt-2 text-[10px] text-slate-600 border-t border-slate-900">
              FORESTERA Prototype • Demonstration Data Only
            </div>
          </div>
        </aside>

        {/* MAIN DISPLAY CONTENT AREA */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-6 lg:p-8">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Globe className="w-6 h-6 text-emerald-400" /> Dashboard Tata Kelola Hutan Nasional
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Transparansi kuota, transaksi, kondisi tutupan hutan, dan pengawasan izin terpadu real-time.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-md font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" /> Periode Evaluasi: 2026 / Q3
                  </span>
                  <button onClick={() => setActiveTab('peta')} className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold px-3 py-1.5 rounded-md transition-all flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> Buka Peta Nasional
                  </button>
                </div>
              </div>

              {/* 5 Prominent KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <KPICard 
                  title="TOTAL KUOTA NASIONAL" 
                  value="18,4M" 
                  unit="ha-eq" 
                  subtext="+2,4% dari periode lalu" 
                  trend="up" 
                  color="blue"
                  icon={<Database className="w-4 h-4 text-blue-400" />}
                />
                <KPICard 
                  title="KUOTA TERSISA" 
                  value="11,2M" 
                  unit="ha-eq" 
                  subtext="61% Kuota Aman Tersedia" 
                  trend="stable" 
                  color="emerald"
                  icon={<Shield className="w-4 h-4 text-emerald-400" />}
                />
                <KPICard 
                  title="PROVINSI SURPLUS" 
                  value="12" 
                  unit="Provinsi" 
                  subtext="Siap Menjual Kuota" 
                  trend="up" 
                  color="emerald"
                  icon={<ArrowUpRight className="w-4 h-4 text-emerald-400" />}
                />
                <KPICard 
                  title="PROVINSI DEFISIT" 
                  value="8" 
                  unit="Provinsi" 
                  subtext="Membutuhkan Alokasi" 
                  trend="down" 
                  color="amber"
                  icon={<ArrowDownRight className="w-4 h-4 text-amber-400" />}
                />
                <KPICard 
                  title="ALERT DEFORESTASI" 
                  value="127" 
                  unit="Titik Alert" 
                  subtext="Real-time Monitoring Radar" 
                  trend="danger" 
                  color="red"
                  icon={<AlertTriangle className="w-4 h-4 text-red-400" />}
                />
              </div>

              {/* Quick Summary Grid: Map & Compliance Snapshot */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Simplified Interactive Preview Map */}
                <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400" /> Ringkasan Peta Status Kuota
                      </h2>
                      <p className="text-xs text-slate-400">Klik provinsi pada peta untuk melihat data detail tutupan hutan.</p>
                    </div>
                    <button onClick={() => setActiveTab('peta')} className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-mono">
                      Lihat Peta Penuh <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* SVG Indonesia Map Visual */}
                  <div className="relative h-64 bg-slate-950 rounded-lg border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden">
                    <IndonesiaSVGMap 
                      selectedId={selectedProvince.id} 
                      onSelect={(prov) => setSelectedProvince(prov)} 
                    />
                  </div>

                  {/* Selected Province Quick Strip */}
                  <div className="mt-4 p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between text-xs gap-3">
                    <div className="flex items-center space-x-3">
                      <span className={`w-3 h-3 rounded-full ${selectedProvince.status === 'surplus' ? 'bg-emerald-500' : selectedProvince.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                      <div>
                        <span className="font-bold text-slate-200">{selectedProvince.name}</span>
                        <span className="text-slate-500 ml-2 font-mono">({selectedProvince.region})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 font-mono">
                      <div>
                        <span className="text-slate-500">Kuota Terpakai: </span>
                        <span className="text-slate-200 font-semibold">{selectedProvince.quotaUsed}M ha</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Sisa Quota: </span>
                        <span className={selectedProvince.quotaRemaining >= 0 ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                          {selectedProvince.quotaRemaining}M ha
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance Sidebar Panel */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-100 mb-1 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" /> Kepatuhan Teratas & Terbawah
                    </h2>
                    <p className="text-xs text-slate-400 mb-4">Rasio deforestasi aktual terhadap batas kuota.</p>

                    <div className="space-y-3">
                      <ComplianceBar label="Papua (Surplus)" percentage={25} status="Patuh" color="bg-emerald-500" />
                      <ComplianceBar label="Kalimantan Utara" percentage={31} status="Patuh" color="bg-emerald-500" />
                      <ComplianceBar label="Kalimantan Timur" percentage={75} status="Mendekati Batas" color="bg-amber-500" />
                      <ComplianceBar label="Riau (Defisit)" percentage={121} status="Pelanggaran" color="bg-red-500" />
                      <ComplianceBar label="Sumatera Utara" percentage={116} status="Pelanggaran" color="bg-red-500" />
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Penyelesaian Sengketa:</span>
                    <button onClick={() => setActiveTab('trading')} className="text-emerald-400 font-semibold hover:underline">
                      Perdagangan Kuota &rarr;
                    </button>
                  </div>
                </div>

              </div>

              {/* Transactions Ledger & Circuit Breaker Teaser */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Transactions */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-400" /> Transaksi Kuota Terbaru
                    </h3>
                    <button onClick={() => setActiveTab('trading')} className="text-xs text-emerald-400 hover:underline">
                      Lihat Semua
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500 font-mono">
                          <th className="pb-2">ID</th>
                          <th className="pb-2">Penjual &rarr; Pembeli</th>
                          <th className="pb-2">Volume</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                        {TRANSACTIONS_DATA.slice(0, 3).map((tx) => (
                          <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-2.5 font-bold text-slate-200">{tx.id}</td>
                            <td className="py-2.5 font-sans">{tx.seller} &rarr; {tx.buyer}</td>
                            <td className="py-2.5 text-emerald-400">{tx.volume.toLocaleString()} ha-eq</td>
                            <td className="py-2.5">
                              {tx.status === 'verified' ? (
                                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded font-sans">
                                  Terverifikasi
                                </span>
                              ) : (
                                <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] px-2 py-0.5 rounded font-sans">
                                  Proses Audit
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Circuit Breaker Status Block */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-400" /> Status Circuit Breaker Izin Hutan
                      </h3>
                      <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded font-mono">
                        AUTOMATED ENFORCEMENT
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-4">
                      Sistem membekukan izin secara otomatis jika tutupan hutan yang hilang melampaui batas ambang toleransi satelit.
                    </p>
                    <div className="grid grid-cols-3 gap-3 text-center mb-4">
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                        <div className="text-xs text-slate-500">Izin Dipantau</div>
                        <div className="text-base font-bold text-slate-200 font-mono">2.841</div>
                      </div>
                      <div className="bg-red-950/30 p-2.5 rounded border border-red-900/50">
                        <div className="text-xs text-red-400">Sedang Dibekukan</div>
                        <div className="text-base font-bold text-red-400 font-mono">18</div>
                      </div>
                      <div className="bg-amber-950/30 p-2.5 rounded border border-amber-900/50">
                        <div className="text-xs text-amber-400">Proses Audit</div>
                        <div className="text-base font-bold text-amber-400 font-mono">31</div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (role !== 'klhk') setRole('klhk');
                      setActiveTab('circuit');
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded border border-slate-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-400" /> Kelola Pembekuan Izin (KLHK)
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: NATIONAL MAP (PETA NASIONAL) */}
          {activeTab === 'peta' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-emerald-400" /> Peta Status Kuota Deforestasi Nasional
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Visualisasi batas status kuota provinsi berdasarkan integrasi radar satelit real-time.
                  </p>
                </div>

                {/* Layer Control Pills */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500 font-mono">Layers:</span>
                  <button 
                    onClick={() => setMapLayers({...mapLayers, forestBoundaries: !mapLayers.forestBoundaries})}
                    className={`px-2.5 py-1 rounded border text-[11px] ${mapLayers.forestBoundaries ? 'bg-emerald-950 border-emerald-700 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                  >
                    Batas Hutan
                  </button>
                  <button 
                    onClick={() => setMapLayers({...mapLayers, alerts: !mapLayers.alerts})}
                    className={`px-2.5 py-1 rounded border text-[11px] ${mapLayers.alerts ? 'bg-red-950 border-red-700 text-red-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                  >
                    Titik Alert
                  </button>
                  <button 
                    onClick={() => setMapLayers({...mapLayers, concessions: !mapLayers.concessions})}
                    className={`px-2.5 py-1 rounded border text-[11px] ${mapLayers.concessions ? 'bg-blue-950 border-blue-700 text-blue-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                  >
                    Konsesi Izin
                  </button>
                </div>
              </div>

              {/* Main Map + Side Detail Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* SVG Map Display */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 relative flex flex-col justify-between min-h-[480px]">
                  
                  {/* Legend Overlay */}
                  <div className="absolute top-4 left-4 bg-slate-950/90 border border-slate-800 p-3 rounded-lg text-xs space-y-1.5 z-10 font-mono backdrop-blur-sm shadow-xl">
                    <div className="font-bold text-slate-300 mb-1">Status Kuota:</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Surplus / Penjual</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Mendekati Batas</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Defisit / Pembeli</div>
                  </div>

                  <div className="flex-1 flex items-center justify-center pt-8">
                    <IndonesiaSVGMap 
                      selectedId={selectedProvince.id} 
                      onSelect={(prov) => setSelectedProvince(prov)} 
                      showAlerts={mapLayers.alerts}
                    />
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Sumber Data: Satelit Sentinel-2 / Landsat-9</span>
                    <span>Proyeksi: WGS 84 / UTM Zone 48N</span>
                  </div>
                </div>

                {/* Selected Province Detail Drawer Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Detail Provinsi</span>
                        <h2 className="text-xl font-bold text-white">{selectedProvince.name}</h2>
                      </div>
                      <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
                        selectedProvince.status === 'surplus' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        selectedProvince.status === 'warning' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-red-950 text-red-400 border border-red-800'
                      }`}>
                        {selectedProvince.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60 font-mono">
                        <span className="text-slate-400">Kuota Awal Ditentukan:</span>
                        <span className="text-slate-200 font-bold">{selectedProvince.quotaInit} Juta ha-eq</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60 font-mono">
                        <span className="text-slate-400">Kuota Terpakai Aktual:</span>
                        <span className="text-amber-400 font-bold">{selectedProvince.quotaUsed} Juta ha-eq</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60 font-mono">
                        <span className="text-slate-400">Kuota Tersisa:</span>
                        <span className={selectedProvince.quotaRemaining >= 0 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                          {selectedProvince.quotaRemaining} Juta ha-eq
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60 font-mono">
                        <span className="text-slate-400">Laju Tren Deforestasi:</span>
                        <span className={selectedProvince.deforestTrend > 0 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                          {selectedProvince.deforestTrend > 0 ? `+${selectedProvince.deforestTrend}%` : `${selectedProvince.deforestTrend}%`}
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-slate-800/60 font-mono">
                        <span className="text-slate-400">Proyeksi Kuota Habis:</span>
                        <span className="text-slate-200 font-bold">
                          {selectedProvince.trendProjectedMonths === 0 ? 'SUDAH DEFISIT' : `± ${selectedProvince.trendProjectedMonths} Bulan`}
                        </span>
                      </div>
                    </div>

                    {/* Forest Cover Graph Placeholder */}
                    <div className="mt-5 p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <div className="text-[11px] font-semibold text-slate-300 mb-2 flex justify-between items-center">
                        <span>Perbandingan Data Tutupan Hutan</span>
                        <span className="text-[9px] text-slate-500">2021 - 2026</span>
                      </div>
                      <div className="h-24 flex items-end justify-between gap-2 px-2 pt-4">
                        <div className="flex-1 bg-emerald-900/50 rounded-t h-[80%] relative group">
                          <span className="hidden group-hover:block absolute -top-6 left-0 text-[9px] bg-slate-900 p-1 border rounded font-mono">KLHK: 82%</span>
                        </div>
                        <div className="flex-1 bg-blue-900/50 rounded-t h-[75%] relative group">
                          <span className="hidden group-hover:block absolute -top-6 left-0 text-[9px] bg-slate-900 p-1 border rounded font-mono">Indep: 75%</span>
                        </div>
                        <div className="flex-1 bg-teal-600 rounded-t h-[72%] relative group">
                          <span className="hidden group-hover:block absolute -top-6 left-0 text-[9px] bg-slate-900 p-1 border rounded font-mono">Satelit: 72%</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-2">
                        <span>Laporan KLHK</span>
                        <span>Lembaga Indep.</span>
                        <span>Radar Satelit</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {role === 'provincial' && (
                      <button 
                        onClick={() => setActiveTab('prov-sim')}
                        className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded transition-colors"
                      >
                        Buka Simulasi Transaksi Kuota
                      </button>
                    )}
                    <button 
                      onClick={() => setActiveTab('trading')}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded border border-slate-700 transition-colors"
                    >
                      Lihat Transaksi Terkait ({selectedProvince.name})
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: TRADING LEDGER */}
          {activeTab === 'trading' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-emerald-400" /> Trading Ledger Kuota Antarprovinsi
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Catatan transaksi hak alokasi kuota deforestasi yang terverifikasi dan transparan.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-slate-900 border border-slate-800 text-emerald-400 px-3 py-1.5 rounded font-mono">
                    Harga Rata-rata: Rp 40.230 / ha-eq
                  </span>
                </div>
              </div>

              {/* Transaction Charts Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Volume Perdagangan Bulanan (ha-eq)</h3>
                  <div className="h-36 flex items-end gap-3 pt-4 border-b border-slate-800 font-mono text-[10px]">
                    <div className="flex-1 bg-slate-800 hover:bg-emerald-600 transition-colors rounded-t h-[40%] text-center text-slate-400 flex items-center justify-center">Mei</div>
                    <div className="flex-1 bg-slate-800 hover:bg-emerald-600 transition-colors rounded-t h-[65%] text-center text-slate-400 flex items-center justify-center">Jun</div>
                    <div className="flex-1 bg-slate-800 hover:bg-emerald-600 transition-colors rounded-t h-[50%] text-center text-slate-400 flex items-center justify-center">Jul</div>
                    <div className="flex-1 bg-emerald-600 rounded-t h-[85%] text-center font-bold text-slate-950 flex items-center justify-center">Agu</div>
                    <div className="flex-1 bg-emerald-500 rounded-t h-[95%] text-center font-bold text-slate-950 flex items-center justify-center">Sep</div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Tren Harga Per Kuota (Rp / ha-eq)</h3>
                  <div className="h-36 flex items-end justify-between px-2 pt-4 border-b border-slate-800 font-mono text-[10px] text-slate-400">
                    <div className="flex flex-col items-center gap-1">
                      <span>Rp 36.000</span>
                      <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span>Rp 38.500</span>
                      <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span>Rp 40.200</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span>Rp 42.000</span>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions Table with Filters */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-base font-bold text-slate-100">Riwayat Ledger Transaksi</h2>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      placeholder="Filter transaksi..." 
                      className="bg-slate-950 border border-slate-800 rounded px-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                    <button className="bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1 rounded text-slate-300 border border-slate-700">
                      Export CSV
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono bg-slate-950/50">
                        <th className="p-3">ID Transaksi</th>
                        <th className="p-3">Penjual (Surplus)</th>
                        <th className="p-3">Pembeli (Defisit)</th>
                        <th className="p-3">Volume (ha-eq)</th>
                        <th className="p-3">Harga / Unit</th>
                        <th className="p-3">Tanggal</th>
                        <th className="p-3">Status Verifikasi</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {TRANSACTIONS_DATA.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3 font-bold text-slate-200">{tx.id}</td>
                          <td className="p-3 text-emerald-400 font-sans">{tx.seller}</td>
                          <td className="p-3 text-amber-400 font-sans">{tx.buyer}</td>
                          <td className="p-3 font-bold text-slate-100">{tx.volume.toLocaleString()}</td>
                          <td className="p-3 text-slate-300">Rp {tx.price.toLocaleString()}</td>
                          <td className="p-3 text-slate-400 text-[11px]">{tx.date}</td>
                          <td className="p-3">
                            {tx.status === 'verified' ? (
                              <span className="inline-flex items-center gap-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded font-sans">
                                <Check className="w-3 h-3" /> Terverifikasi
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-amber-950 text-amber-400 border border-amber-800 text-[10px] px-2 py-0.5 rounded font-sans">
                                <Clock className="w-3 h-3" /> Dalam Audit
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right font-sans">
                            <button 
                              onClick={() => setSelectedTx(tx)}
                              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PROVINCIAL COMPLIANCE (RAPOR KEPATUHAN) */}
          {activeTab === 'kepatuhan' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-emerald-400" /> Rapor Kepatuhan Provinsi
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Peringkat kepatuhan daerah berdasarkan rasio deforestasi aktual terhadap alokasi kuota legal.
                </p>
              </div>

              {/* Ranking Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono">
                        <th className="p-3">Ranking</th>
                        <th className="p-3">Provinsi</th>
                        <th className="p-3">Kuota Dimiliki</th>
                        <th className="p-3">Deforestasi Aktual</th>
                        <th className="p-3">Rasio Kepatuhan</th>
                        <th className="p-3">Tren</th>
                        <th className="p-3">Status Governance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {PROVINCE_DATA.map((prov, index) => {
                        const ratio = Math.round((prov.quotaUsed / prov.quotaInit) * 100);
                        return (
                          <tr key={prov.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-3 font-bold text-slate-500">#{index + 1}</td>
                            <td className="p-3 font-sans font-bold text-slate-200">{prov.name}</td>
                            <td className="p-3 text-slate-300">{prov.quotaInit}M ha</td>
                            <td className="p-3 text-slate-300">{prov.quotaUsed}M ha</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className="font-bold">{ratio}%</span>
                                <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${ratio > 100 ? 'bg-red-500' : ratio > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                    style={{ width: `${Math.min(ratio, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              {prov.deforestTrend > 0 ? (
                                <span className="text-red-400 flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" /> +{prov.deforestTrend}%</span>
                              ) : (
                                <span className="text-emerald-400 flex items-center gap-0.5"><ArrowDownRight className="w-3 h-3" /> {prov.deforestTrend}%</span>
                              )}
                            </td>
                            <td className="p-3 font-sans">
                              {ratio <= 80 && <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded">PATUH</span>}
                              {ratio > 80 && ratio <= 100 && <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] px-2 py-0.5 rounded">DALAM PENGAWASAN</span>}
                              {ratio > 100 && <span className="bg-red-950 text-red-400 border border-red-800 text-[10px] px-2 py-0.5 rounded">PELANGGARAN</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FINANCIAL FLOW (ALUR DANA) */}
          {activeTab === 'alur-dana' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-emerald-400" /> Alur Dana & Akuntabilitas Finansial
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Transparansi alokasi penerimaan perdagangan kuota deforestasi hingga tingkat masyarakat adat.
                </p>
              </div>

              {/* Financial Summary KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <div className="text-xs text-slate-400 font-sans">Total Nilai Transaksi Kuota</div>
                  <div className="text-2xl font-bold text-white mt-1">Rp 4,8 Triliun</div>
                  <div className="text-[10px] text-emerald-400 mt-1">Akumulatif 2026</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <div className="text-xs text-slate-400 font-sans">Masuk Dana Bagi Hasil (DBH)</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">Rp 3,9 Triliun</div>
                  <div className="text-[10px] text-slate-500 mt-1">81.2% dari Total Transaksi</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <div className="text-xs text-slate-400 font-sans">Disalurkan ke Pemda</div>
                  <div className="text-2xl font-bold text-blue-400 mt-1">Rp 3,2 Triliun</div>
                  <div className="text-[10px] text-slate-500 mt-1">Transfer Daerah Selesai</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                  <div className="text-xs text-slate-400 font-sans">Sampai ke Desa / Adat</div>
                  <div className="text-2xl font-bold text-amber-400 mt-1">Rp 1,4 Triliun</div>
                  <div className="text-[10px] text-amber-400 mt-1">Tingkat Hilirisasi: 72%</div>
                </div>
              </div>

              {/* Visual Pipeline Flow */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Pipeline Pembagian Hasil Hasil Penjualan Kuota</h2>
                
                <div className="space-y-4">
                  <FlowStep title="1. Transaksi Kuota Perdagangan" value="Rp 4,8 T" desc="Pendapatan bruto dari jual-beli kuota antarprovinsi" pct={100} color="bg-slate-600" />
                  <div className="pl-6 border-l-2 border-dashed border-slate-800 py-1"><ArrowRight className="w-4 h-4 text-slate-600 rotate-90" /></div>
                  <FlowStep title="2. Kas Negara & Alokasi DBH Kehutanan" value="Rp 3,9 T" desc="Dipotong retribusi pengelolaan nasional (18.8%)" pct={81} color="bg-emerald-600" />
                  <div className="pl-6 border-l-2 border-dashed border-slate-800 py-1"><ArrowRight className="w-4 h-4 text-slate-600 rotate-90" /></div>
                  <FlowStep title="3. Transfer Kas Daerah (Provinsi / Kab)" value="Rp 3,2 T" desc="Penyaluran sesuai proporsi tutupan hutan terlindungi" pct={66} color="bg-blue-600" />
                  <div className="pl-6 border-l-2 border-dashed border-slate-800 py-1"><ArrowRight className="w-4 h-4 text-slate-600 rotate-90" /></div>
                  <FlowStep title="4. Program Reboisasi & Masyarakat Adat" value="Rp 1,4 T" desc="Insentif langsung penjagaan kawasan dan konservasi desa" pct={29} color="bg-amber-500" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: REAL-TIME SATELLITE RADAR (KLHK / COMMAND CENTER) */}
          {activeTab === 'radar' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Activity className="w-6 h-6 text-red-500 animate-pulse" /> Radar Monitoring Satelit Deforestasi
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Command Center Pengawasan Penggundulan Hutan Real-time Berbasis Satelit Radar Sentinel-1 SAR & Optical.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="bg-red-950 border border-red-800 text-red-400 px-3 py-1.5 rounded flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> 127 ALERT AKTIF
                  </span>
                </div>
              </div>

              {/* Main Command Center Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Radar View Center */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 relative min-h-[460px] flex flex-col justify-between">
                  <div className="absolute top-4 right-4 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded text-[11px] font-mono text-slate-400 z-10">
                    Mode: Radar SAR Penetrator Awan
                  </div>

                  <div className="flex-1 flex items-center justify-center relative">
                    {/* Simulated Radar Visual Container */}
                    <div className="w-full h-80 bg-slate-950 rounded-lg border border-slate-800 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                      
                      {/* Radar sweep animation visual */}
                      <div className="absolute w-96 h-96 rounded-full border border-emerald-900/40 flex items-center justify-center">
                        <div className="w-64 h-64 rounded-full border border-emerald-800/30"></div>
                      </div>

                      {/* Hotspot Alert Markers */}
                      <div className="absolute top-1/3 left-1/3 cursor-pointer group" onClick={() => setSelectedPermit(PERMITS_DATA[0])}>
                        <span className="w-4 h-4 rounded-full bg-red-500/40 animate-ping absolute"></span>
                        <span className="w-3 h-3 rounded-full bg-red-500 block border-2 border-slate-950 shadow-lg"></span>
                        <div className="hidden group-hover:block absolute left-5 top-0 bg-slate-900 border border-slate-700 text-[10px] p-2 rounded w-32 z-20 font-mono shadow-xl">
                          <div className="font-bold text-red-400">#FG-9281 (Kaltim)</div>
                          <div>Luas: 185 ha</div>
                          <div className="text-amber-400">Status: Freeze</div>
                        </div>
                      </div>

                      <div className="absolute bottom-1/3 right-1/4 cursor-pointer group">
                        <span className="w-3 h-3 rounded-full bg-amber-500 block border-2 border-slate-950"></span>
                      </div>

                      <div className="text-center font-mono text-xs text-slate-600 z-0">
                        [ TAMPILAN RADAR INTERAKTIF SATELIT DEFORESTASI ]
                      </div>
                    </div>
                  </div>

                  {/* Satellite Image Comparison Drawer / Slider Trigger */}
                  <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200">Perbandingan Citra Satelit Sebelum vs Sesudah:</span>
                      <span className="font-mono text-slate-400">Lokasi: Kaltim (IZ-001)</span>
                    </div>

                    {/* Image Comparison Slider Mock */}
                    <div className="relative h-32 rounded bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center">
                      <div className="absolute inset-0 flex">
                        <div className="h-full bg-emerald-950/60 border-r-2 border-emerald-400 flex items-center justify-center text-xs font-mono text-emerald-300" style={{ width: `${sliderVal}%` }}>
                          [ SEBELUM - Tutupan Hutan Utuh ]
                        </div>
                        <div className="h-full bg-red-950/60 flex-1 flex items-center justify-center text-xs font-mono text-red-300">
                          [ SESUDAH - Pembukaan 185 ha ]
                        </div>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="90" 
                        value={sliderVal} 
                        onChange={(e) => setSliderVal(e.target.value)} 
                        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Alert Action Sidebar */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3">Daftar Alert Real-time Terbaru</h3>

                  <div className="space-y-3">
                    <AlertCard 
                      id="#FG-9281"
                      location="Kalimantan Timur (IZ-001)"
                      area="185 ha"
                      risk="CRITICAL"
                      time="10:42 WIB"
                      onClick={() => setSelectedPermit(PERMITS_DATA[0])}
                    />
                    <AlertCard 
                      id="#FG-9282"
                      location="Sumatera Selatan (IZ-003)"
                      area="142 ha"
                      risk="HIGH"
                      time="09:15 WIB"
                      onClick={() => setSelectedPermit(PERMITS_DATA[2])}
                    />
                    <AlertCard 
                      id="#FG-9280"
                      location="Riau (IZ-002)"
                      area="72 ha"
                      risk="MEDIUM"
                      time="Kemarin"
                      onClick={() => setSelectedPermit(PERMITS_DATA[1])}
                    />
                  </div>

                  <button 
                    onClick={() => setActiveTab('circuit')}
                    className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1 mt-4"
                  >
                    <ShieldAlert className="w-4 h-4" /> Buka Panel Circuit Breaker
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 7: CIRCUIT BREAKER (FREEZE-AND-AUDIT) */}
          {activeTab === 'circuit' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-red-500" /> Circuit Breaker Pembekuan Izin Otomatis
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Mekanisme pembekuan izin usaha kehutanan secara otomatis saat deteksi satelit melampaui ambang batas.
                </p>
              </div>

              {/* Visual Workflow Diagram */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 overflow-x-auto">
                <div className="min-w-[700px] flex items-center justify-between font-mono text-xs text-center">
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 w-36">
                    <div className="text-emerald-400 font-bold">1. Satelit</div>
                    <div className="text-[10px] text-slate-500 mt-1">Deteksi Radar</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 w-36">
                    <div className="text-amber-400 font-bold">2. Threshold</div>
                    <div className="text-[10px] text-slate-500 mt-1">Breach &gt; 100 ha</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div className="bg-red-950/80 border border-red-800 p-3 rounded w-36">
                    <div className="text-red-400 font-bold">3. AUTO-FREEZE</div>
                    <div className="text-[10px] text-red-300 mt-1">Pembekuan Izin</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 w-36">
                    <div className="text-blue-400 font-bold">4. Audit</div>
                    <div className="text-[10px] text-slate-500 mt-1">Verifikator Indep.</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 w-36">
                    <div className="text-emerald-400 font-bold">5. Keputusan</div>
                    <div className="text-[10px] text-slate-500 mt-1">Release / Sanksi</div>
                  </div>
                </div>
              </div>

              {/* Permit Monitoring Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <h2 className="text-base font-bold text-slate-100">Daftar Pengawasan Izin Berisiko Tinggi</h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono">
                        <th className="p-3">ID Izin</th>
                        <th className="p-3">Nama Perusahaan</th>
                        <th className="p-3">Provinsi</th>
                        <th className="p-3">Deforestasi Terdeteksi</th>
                        <th className="p-3">Threshold</th>
                        <th className="p-3">Status Izin</th>
                        <th className="p-3 text-right">Aksi Audit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {PERMITS_DATA.map((permit) => (
                        <tr key={permit.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-3 font-bold text-slate-200">{permit.id}</td>
                          <td className="p-3 font-sans font-medium text-slate-200">{permit.company}</td>
                          <td className="p-3 text-slate-400 font-sans">{permit.province}</td>
                          <td className="p-3 font-bold text-red-400">{permit.detected} ha</td>
                          <td className="p-3 text-slate-500">{permit.threshold} ha</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                              permit.status === 'FROZEN' ? 'bg-red-950 text-red-400 border border-red-800' :
                              permit.status === 'AUDIT' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                              'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            }`}>
                              {permit.status}
                            </span>
                          </td>
                          <td className="p-3 text-right font-sans">
                            <button 
                              onClick={() => setSelectedPermit(permit)}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded text-xs border border-slate-700"
                            >
                              Kelola & Investigasi
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 8: QUOTA CALCULATOR & POLICY SIMULATION */}
          {activeTab === 'kalkulator' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Sliders className="w-6 h-6 text-blue-400" /> Kalkulator Kuota & Simulasi Kebijakan
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Model proyeksi alokasi kuota berbasis parameter FOLU Net Sink 2030 dan historis tutupan hutan.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Calculator Inputs */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Input Parameter Model</h2>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Baseline Tutupan Hutan (ha):</label>
                      <input 
                        type="number" 
                        value={calcBaseline} 
                        onChange={(e) => setCalcBaseline(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Target Penurunan Deforestasi (% / Thn):</label>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="5.0" 
                        step="0.1" 
                        value={calcTarget} 
                        onChange={(e) => setCalcTarget(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="text-right font-mono text-emerald-400 font-bold">{calcTarget}%</div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2 mt-4 font-mono">
                    <div className="text-xs text-slate-400">Rekomendasi Kuota Dihasilkan:</div>
                    <div className="text-3xl font-bold text-emerald-400">{calculatedQuota} Juta ha-eq</div>
                    <div className="text-[10px] text-slate-500">Sesuai dengan Ambang Batas Net Sink Target 2030</div>
                  </div>
                </div>

                {/* Policy Simulation Outputs */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Proyeksi Risiko & Kepatuhan</h2>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
                      <span>Tingkat Risiko Alokasi:</span>
                      <span className="font-bold text-emerald-400 font-mono">RENDAH (AMMAN)</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
                      <span>Proyeksi Penyerapan Kuota:</span>
                      <span className="font-bold text-slate-200 font-mono">14.2 Bulan</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 9: THIRD-PARTY VERIFIERS */}
          {activeTab === 'verifikator' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <FileCheck className="w-6 h-6 text-emerald-400" /> Manajemen Verifikator Independen
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Lembaga audit pihak ketiga yang terakreditasi untuk verifikasi transaksi kuota dan verifikasi lapangan.
                </p>
              </div>

              {/* Red Flag Warning Box */}
              <div className="bg-red-950/40 border border-red-800 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-red-300">AUTOMATED RED FLAG DETECTED</div>
                  <div className="text-slate-300">
                    Laporan mandiri provinsi menunjukkan 0 ha deforestasi, tetapi satelit mendeteksi pembukaan lahan 214 ha di sektor konsesi terdekat.
                  </div>
                  <button className="bg-red-900 hover:bg-red-800 text-white font-bold px-3 py-1 rounded text-[11px] mt-2">
                    Tugaskan Verifikator Segera
                  </button>
                </div>
              </div>

              {/* Verifier Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {VERIFIERS_DATA.map((v) => (
                  <div key={v.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-slate-200 text-xs">{v.name}</div>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded font-mono">
                        {v.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">{v.cert}</div>
                    <div className="pt-2 border-t border-slate-800 text-xs space-y-1 font-mono">
                      <div className="flex justify-between"><span>Audit Selesai:</span><span className="text-slate-300">{v.audits}</span></div>
                      <div className="flex justify-between"><span>Success Rate:</span><span className="text-emerald-400">{v.successRate}</span></div>
                      <div className="flex justify-between"><span>Risiko Konflik:</span><span className="text-slate-400">{v.conflictRisk}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: PROVINCIAL DASHBOARD (ROLE: PROVINSI) */}
          {activeTab === 'provincial-dash' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="pb-4 border-b border-slate-800 flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Building className="w-6 h-6 text-amber-400" /> Dashboard Tata Kelola — Provinsi Kalimantan Timur
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Portal operasional alokasi kuota, neraca deforestasi, dan perencanaan insentif ekonomi daerah.
                  </p>
                </div>
                <span className="px-3 py-1 bg-amber-950 border border-amber-800 text-amber-400 rounded text-xs font-mono font-bold">
                  STATUS: MENDEKATI BATAS KUOTA
                </span>
              </div>

              {/* Provincial Quota Status Strip */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">Penggunaan Kuota Deforestasi Provinsi:</span>
                  <span className="text-amber-400 font-bold">1.8M / 2.4M ha-eq (75%)</span>
                </div>
                <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="p-3 bg-amber-950/30 border border-amber-900/50 rounded text-xs text-amber-300 flex items-center justify-between">
                  <span>Sistem merekomendasikan pembelian alokasi kuota sebesar ±150.000 ha-eq untuk menghindari risiko penalti.</span>
                  <button onClick={() => setActiveTab('prov-sim')} className="bg-amber-600 text-slate-950 font-bold px-3 py-1 rounded hover:bg-amber-500 text-xs shrink-0">
                    Buka Simulasi Transaksi
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: PROVINCIAL ECONOMIC SIMULATION */}
          {activeTab === 'prov-sim' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <PieChart className="w-6 h-6 text-amber-400" /> Simulasi Ekonomi: Menjual Kuota vs Membuka Lahan
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Perbandingan estimasi Pendapatan Asli Daerah (PAD) antara perdagangan kuota dan izin konversi lahan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Option A: Sell Quota */}
                <div className="bg-slate-900 border border-emerald-800/60 rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h2 className="font-bold text-emerald-400 text-base">OPSI A: MENJUAL KUOTA SURPLUS</h2>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">RISIKO RENDAH</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-slate-800"><span>Estimasi Revenue Direct:</span><span className="text-emerald-400 font-bold">Rp 620 Miliar</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-800"><span>Dampak Lingkungan:</span><span className="text-emerald-400">Minimal / Reboisasi</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-800"><span>Risiko Circuit Breaker:</span><span className="text-emerald-400">0%</span></div>
                  </div>
                </div>

                {/* Option B: Open Land */}
                <div className="bg-slate-900 border border-red-800/60 rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h2 className="font-bold text-red-400 text-base">OPSI B: MEMBUKA LAHAN BARU</h2>
                    <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded">RISIKO TINGGI</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-slate-800"><span>Estimasi Potensi PAD:</span><span className="text-slate-200 font-bold">Rp 710 Miliar</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-800"><span>Dampak Lingkungan:</span><span className="text-red-400">Tinggi (Hilang 150k ha)</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-800"><span>Risiko Pembekuan Izin:</span><span className="text-red-400">Sangat Tinggi</span></div>
                  </div>
                </div>

              </div>

              {/* Recommendation Engine Box */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2">
                <div className="font-bold text-slate-200">REKOMENDASI SISTEM FORESTERA:</div>
                <p className="text-slate-400">
                  Berdasarkan penyesuaian risiko (risk-adjusted value), Opsi A memberikan stabilitas penerimaan daerah yang lebih tinggi tanpa ancaman sanksi otomatis Circuit Breaker.
                </p>
              </div>
            </div>
          )}

          {/* TAB 12: DATA & METHODOLOGY */}
          {activeTab === 'metodologi' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Database className="w-6 h-6 text-emerald-400" /> Data & Metodologi Transparansi
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Penjelasan terbuka mengenai sumber data, frekuensi pembaruan, dan metodologi rekonsiliasi selisih data.
                </p>
              </div>

              {/* Comparison Matrix */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <h2 className="text-sm font-bold text-slate-200">Matriks Perbandingan Sumber Data Utama</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="p-3">Parameter Metrik</th>
                        <th className="p-3 text-emerald-400">Data Resmi KLHK</th>
                        <th className="p-3 text-blue-400">Monitoring Satelit SAR</th>
                        <th className="p-3 text-amber-400">Lembaga Independen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="p-3 font-sans font-bold">Frekuensi Sync</td>
                        <td className="p-3">Tahunan / Resmi</td>
                        <td className="p-3">Near Real-time (Daily)</td>
                        <td className="p-3">Periodik (Bulanan)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-bold">Resolusi Spasial</td>
                        <td className="p-3">1:250.000 / Peta Tematik</td>
                        <td className="p-3">10 Metres (Sentinel)</td>
                        <td className="p-3">30 Metres (Global Forest)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-bold">Margin Deviasi</td>
                        <td className="p-3">Baseline Resmi</td>
                        <td className="p-3">± 2.1% Margins</td>
                        <td className="p-3">± 4.5% Margins</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: WHISTLEBLOWER PORTAL */}
          {activeTab === 'whistleblower' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="pb-4 border-b border-slate-800 text-center">
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
                  <Lock className="w-6 h-6 text-emerald-400" /> Portal Whistleblower Rahasia
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Laporkan dugaan Pelanggaran Deforestasi Illegal dan Manipulasi Kuota secara aman dan anonim.
                </p>
              </div>

              {!wbSubmitted ? (
                <form onSubmit={handleWbSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Jenis Pelanggaran:</label>
                    <select className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-200">
                      <option>Penebangan Liar Tanpa Kuota (Illegal Logging)</option>
                      <option>Manipulasi Laporan Tutupan Hutan</option>
                      <option>Suap / Gratifikasi Perizinan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Lokasi / Provinsi Terkait:</label>
                    <input required type="text" placeholder="Contoh: Kabupaten Kutai Timur, Kaltim" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200" />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Deskripsi Detail Kejadian:</label>
                    <textarea required rows={4} placeholder="Jelaskan kronologi dan indikasi bukti..." className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200"></textarea>
                  </div>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400">
                    🔒 Identitas dan IP Address Anda tidak disimpan atau ditampilkan kepada publik.
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded transition-colors text-xs">
                    Kirim Laporan Anonim
                  </button>
                </form>
              ) : (
                <div className="bg-slate-900 border border-emerald-800 p-6 rounded-xl text-center space-y-4 font-mono">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <div className="text-lg font-bold text-slate-100">Laporan Berhasil Diterima</div>
                  <div className="text-xs text-slate-400">Simpan ID Laporan Anonim Anda untuk melacak investigasi:</div>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 text-emerald-400 font-bold text-lg select-all">
                    {wbReportId}
                  </div>
                  <button onClick={() => setWbSubmitted(false)} className="text-xs text-slate-400 underline hover:text-white">
                    Kirim Laporan Lain
                  </button>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* TRANSACTION DETAIL MODAL */}
      {selectedTx && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4 text-xs font-mono">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 font-sans">
              <h3 className="font-bold text-slate-100 text-sm">Detail Transaksi Kuota</h3>
              <button onClick={() => setSelectedTx(null)} className="text-slate-400 hover:text-white"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><span>ID Transaksi:</span><span className="text-slate-200 font-bold">{selectedTx.id}</span></div>
              <div className="flex justify-between"><span>Penjual:</span><span className="text-emerald-400">{selectedTx.seller}</span></div>
              <div className="flex justify-between"><span>Pembeli:</span><span className="text-amber-400">{selectedTx.buyer}</span></div>
              <div className="flex justify-between"><span>Volume:</span><span className="text-slate-100 font-bold">{selectedTx.volume.toLocaleString()} ha-eq</span></div>
              <div className="flex justify-between"><span>Harga / Unit:</span><span>Rp {selectedTx.price.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Hash Audit Blockchain:</span><span className="text-slate-500">{selectedTx.docHash}</span></div>
            </div>
            <button onClick={() => setSelectedTx(null)} className="w-full py-2 bg-slate-800 text-slate-200 rounded font-sans font-semibold">Tutup</button>
          </div>
        </div>
      )}

      {/* PERMIT INVESTIGATION MODAL */}
      {selectedPermit && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-6 space-y-4 text-xs font-mono">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 font-sans">
              <h3 className="font-bold text-slate-100 text-sm">Panel Investigasi & Pembekuan Izin</h3>
              <button onClick={() => setSelectedPermit(null)} className="text-slate-400 hover:text-white"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-slate-300">
              <div><span className="text-slate-500">Izin ID:</span> {selectedPermit.id}</div>
              <div><span className="text-slate-500">Perusahaan:</span> <span className="font-bold text-white">{selectedPermit.company}</span></div>
              <div><span className="text-slate-500">Provinsi:</span> {selectedPermit.province}</div>
              <div><span className="text-slate-500">Deforestasi Terdeteksi:</span> <span className="text-red-400 font-bold">{selectedPermit.detected} ha</span> (Limit: {selectedPermit.threshold} ha)</div>
            </div>

            <div className="p-3 bg-red-950/40 border border-red-800 rounded font-sans text-red-300 text-[11px]">
              Status Izin saat ini: <strong className="uppercase">{selectedPermit.status}</strong>. Tindakan penegakan dapat dilakukan langsung oleh Administrator KLHK.
            </div>

            <div className="flex gap-2 font-sans pt-2">
              <button onClick={() => { alert('Instruksi Audit Lapangan Dikirim ke Verifikator'); setSelectedPermit(null); }} className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded">
                Tugaskan Verifikator
              </button>
              <button onClick={() => { alert('Sanksi Pembekuan Izin Diberlakukan'); setSelectedPermit(null); }} className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded">
                Bekukan Izin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-4 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-300 font-mono">FORESTERA</span>
          <span>— Platform Tata Kelola Hutan Berbasis Data Nasional</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Data Update: 5 min lalu</span>
          <span>🟢 Operational</span>
          <span className="text-slate-600">Prototype Demo</span>
        </div>
      </footer>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function SidebarItem({ icon, label, active, onClick, badge, badgeColor = "bg-emerald-950 text-emerald-400" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
        active 
          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/80 font-semibold shadow-sm' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
      }`}
    >
      <div className="flex items-center space-x-2.5">
        <span className={active ? 'text-emerald-400' : 'text-slate-400'}>{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      {badge && (
        <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${badgeColor}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function KPICard({ title, value, unit, subtext, trend, color, icon }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-2">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">{title}</span>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-black text-white font-mono tracking-tight flex items-baseline gap-1">
          {value} <span className="text-xs font-normal text-slate-400 font-sans">{unit}</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
          {subtext}
        </div>
      </div>
    </div>
  );
}

function ComplianceBar({ label, percentage, status, color }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-mono">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-400">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
        <div className={`h-full ${color}`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
      </div>
    </div>
  );
}

function FlowStep({ title, value, desc, pct, color }) {
  return (
    <div className="space-y-1 text-xs">
      <div className="flex justify-between items-center">
        <span className="font-bold text-slate-200">{title}</span>
        <span className="font-mono text-emerald-400 font-bold">{value}</span>
      </div>
      <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }}></div>
      </div>
      <p className="text-[10px] text-slate-500">{desc}</p>
    </div>
  );
}

function AlertCard({ id, location, area, risk, time, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-1 font-mono text-xs"
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-red-400">{id}</span>
        <span className="text-[9px] bg-red-950 text-red-400 px-1.5 rounded border border-red-800">{risk}</span>
      </div>
      <div className="text-slate-300 font-sans text-[11px]">{location}</div>
      <div className="flex justify-between text-[10px] text-slate-500 pt-1">
        <span>Luas: {area}</span>
        <span>{time}</span>
      </div>
    </div>
  );
}

// SVG Map Representation of Indonesia Provinces
function IndonesiaSVGMap({ selectedId, onSelect, showAlerts }) {
  return (
    <svg viewBox="0 0 1000 420" className="w-full h-full max-h-80 drop-shadow-2xl select-none">
      <g stroke="#0f172a" strokeWidth="1.5" strokeLinejoin="round">
        
        {/* SUMATERA */}
        <path 
          d="M150,110 L220,160 L280,210 L250,230 L180,180 L130,130 Z" 
          className={`cursor-pointer transition-colors ${selectedId === 'RI' ? 'fill-red-500' : 'fill-red-600/80 hover:fill-red-500'}`}
          onClick={() => onSelect(PROVINCE_DATA.find(p => p.id === 'RI'))}
        />
        <text x="180" y="155" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">Riau</text>

        <path 
          d="M110,70 L150,110 L130,130 L90,80 Z" 
          className={`cursor-pointer transition-colors ${selectedId === 'AC' ? 'fill-emerald-500' : 'fill-emerald-600/80 hover:fill-emerald-500'}`}
          onClick={() => onSelect(PROVINCE_DATA.find(p => p.id === 'AC'))}
        />
        <text x="110" y="95" fill="#ffffff" fontSize="9" fontFamily="monospace">Aceh</text>

        {/* KALIMANTAN */}
        <path 
          d="M380,120 L480,110 L520,150 L460,210 L390,190 Z" 
          className={`cursor-pointer transition-colors ${selectedId === 'KT' ? 'fill-amber-500' : 'fill-amber-500/80 hover:fill-amber-400'}`}
          onClick={() => onSelect(PROVINCE_DATA.find(p => p.id === 'KT'))}
        />
        <text x="430" y="155" fill="#0f172a" fontSize="11" fontFamily="sans-serif" fontWeight="bold">Kaltim</text>

        <path 
          d="M450,70 L510,70 L520,110 L460,110 Z" 
          className={`cursor-pointer transition-colors ${selectedId === 'KU' ? 'fill-emerald-500' : 'fill-emerald-600/80 hover:fill-emerald-500'}`}
          onClick={() => onSelect(PROVINCE_DATA.find(p => p.id === 'KU'))}
        />
        <text x="470" y="92" fill="#ffffff" fontSize="9" fontFamily="monospace">Kaltara</text>

        {/* SULAWESI */}
        <path 
          d="M560,140 L600,140 L620,180 L580,210 L560,180 Z" 
          className={`cursor-pointer transition-colors ${selectedId === 'ST' ? 'fill-amber-500' : 'fill-amber-600/80 hover:fill-amber-500'}`}
          onClick={() => onSelect(PROVINCE_DATA.find(p => p.id === 'ST'))}
        />
        <text x="575" y="175" fill="#ffffff" fontSize="9" fontFamily="monospace">Sulteng</text>

        {/* PAPUA */}
        <path 
          d="M760,180 L880,170 L920,240 L840,280 L760,230 Z" 
          className={`cursor-pointer transition-colors ${selectedId === 'PA' ? 'fill-emerald-500' : 'fill-emerald-600/80 hover:fill-emerald-500'}`}
          onClick={() => onSelect(PROVINCE_DATA.find(p => p.id === 'PA'))}
        />
        <text x="820" y="225" fill="#ffffff" fontSize="13" fontFamily="sans-serif" fontWeight="bold">PAPUA</text>

        {/* JAWA */}
        <path 
          d="M280,280 L360,280 L350,300 L280,300 Z" 
          className={`cursor-pointer transition-colors ${selectedId === 'JB' ? 'fill-red-500' : 'fill-red-600/80 hover:fill-red-500'}`}
          onClick={() => onSelect(PROVINCE_DATA.find(p => p.id === 'JB'))}
        />
        <text x="300" y="293" fill="#ffffff" fontSize="8" fontFamily="monospace">Jabar</text>

      </g>

      {/* Optional Hotspot Alert Overlays */}
      {showAlerts && (
        <g>
          <circle cx="450" cy="160" r="5" className="fill-red-500 animate-ping" />
          <circle cx="450" cy="160" r="3" className="fill-red-400" />

          <circle cx="210" cy="170" r="5" className="fill-red-500 animate-ping" />
          <circle cx="210" cy="170" r="3" className="fill-red-400" />
        </g>
      )}
    </svg>
  );
}