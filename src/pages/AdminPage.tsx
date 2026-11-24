import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Download,
  Lock,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { BRAND, MEDIA } from '../data/brand.ts';
import type {
  AdminPackage,
  ArticleRecord,
  EnquiryRecord,
  FaqRecord,
  TestimonialRecord,
  VehicleRecord,
} from '../types/models.ts';
import { usePageSeo } from '../lib/seo.ts';

type AdminTab = 'enquiries' | 'packages' | 'vehicles' | 'content' | 'settings';

export function AdminPage() {
  const { user, adminProfile, loading, authError, signInWithGoogle, logout, getAuthHeaders } =
    useAuth();
  const { refreshData } = useSiteData();

  const [tab, setTab] = useState<AdminTab>('enquiries');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([]);
  const [faqs, setFaqs] = useState<FaqRecord[]>([]);
  const [articles, setArticles] = useState<ArticleRecord[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  // Filters
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadSearch, setLeadSearch] = useState('');

  // Inline editors
  const [pkgEdits, setPkgEdits] = useState<
    Record<
      number,
      {
        publishedPrice: string;
        pricingStatus: 'pending-approval' | 'approved' | 'request-only';
        publishingStatus: 'published' | 'draft' | 'archived';
        isFeatured: boolean;
      }
    >
  >({});

  const [enquiryNotes, setEnquiryNotes] = useState<Record<number, string>>({});

  // Create forms
  const [newFaq, setNewFaq] = useState({ category: 'General', question: '', answer: '' });
  const [newReview, setNewReview] = useState({
    guestName: '',
    originCity: '',
    journeyTitle: 'Ujjain Darshan',
    quote: '',
    verifiedSource: 'Direct WhatsApp Confirmation',
    isApproved: true,
  });
  const [newArticle, setNewArticle] = useState({
    slug: '',
    title: '',
    category: 'Pilgrimage Planning',
    readTime: '5 min read',
    excerpt: '',
    bodyText: '',
  });
  const [showNewPkg, setShowNewPkg] = useState(false);
  const [newPkg, setNewPkg] = useState({
    slug: '',
    name: '',
    subtitle: '',
    summary: '',
    fullDescription: '',
    category: 'ujjain-experiences',
    destinations: 'Ujjain',
    duration: '1 Full Day',
    startingLocation: 'Ujjain',
    endingLocation: 'Ujjain',
  });

  usePageSeo({
    title: 'Admin Console | My Ujjain Darshan',
    description: 'Protected administration dashboard for My Ujjain Darshan.',
    canonicalPath: '/admin',
  });

  const flash = (msg: string) => {
    setNotice(msg);
    setErrorMsg(null);
    window.setTimeout(() => setNotice(null), 4000);
  };

  const loadAllAdminData = useCallback(async () => {
    if (!adminProfile) return;
    setBusy(true);
    setErrorMsg(null);
    try {
      const headers = await getAuthHeaders();
      const [pkgRes, enqRes, vehRes, faqRes, artRes, revRes, setRes] =
        await Promise.all([
          fetch('/api/admin/packages', { headers }),
          fetch('/api/admin/enquiries', { headers }),
          fetch('/api/admin/vehicles', { headers }),
          fetch('/api/admin/faqs', { headers }),
          fetch('/api/admin/articles', { headers }),
          fetch('/api/admin/testimonials', { headers }),
          fetch('/api/admin/settings', { headers }),
        ]);

      const [pkgData, enqData, vehData, faqData, artData, revData, setData] =
        await Promise.all([
          pkgRes.json(),
          enqRes.json(),
          vehRes.json(),
          faqRes.json(),
          artRes.json(),
          revRes.json(),
          setRes.json(),
        ]);

      const pkgs: AdminPackage[] = pkgData.packages || [];
      setPackages(pkgs);
      const editMap: typeof pkgEdits = {};
      pkgs.forEach((p) => {
        editMap[p.id] = {
          publishedPrice: p.publishedPrice !== null ? String(p.publishedPrice) : '',
          pricingStatus: p.pricingStatus as 'pending-approval' | 'approved' | 'request-only',
          publishingStatus: p.publishingStatus as 'published' | 'draft' | 'archived',
          isFeatured: p.isFeatured,
        };
      });
      setPkgEdits(editMap);

      const enqs: EnquiryRecord[] = enqData.enquiries || [];
      setEnquiries(enqs);
      const notesMap: Record<number, string> = {};
      enqs.forEach((e) => {
        notesMap[e.id] = e.followUpNotes || '';
      });
      setEnquiryNotes(notesMap);

      setVehicles(vehData.vehicles || []);
      setFaqs(faqData.faqs || []);
      setArticles(artData.articles || []);
      setTestimonials(revData.testimonials || []);
      setSettings(setData.settings || {});
    } catch (err) {
      console.error('Admin load error:', err);
      setErrorMsg('Unable to load administration records.');
    } finally {
      setBusy(false);
    }
  }, [adminProfile, getAuthHeaders]);

  useEffect(() => {
    void loadAllAdminData();
  }, [loadAllAdminData]);

  const handleExportCsv = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/admin/enquiries/export.csv', { headers });
      if (!res.ok) throw new Error('CSV export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `my-ujjain-darshan-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      flash('Enquiries exported to CSV.');
    } catch {
      setErrorMsg('Unable to export CSV right now.');
    }
  };

  const handleSavePackage = async (id: number) => {
    const draft = pkgEdits[id];
    if (!draft) return;
    try {
      const headers = await getAuthHeaders();
      const parsedPrice =
        draft.publishedPrice.trim() === '' ? null : Number(draft.publishedPrice);
      if (draft.pricingStatus === 'approved' && (!parsedPrice || parsedPrice <= 0)) {
        setErrorMsg('Enter an approved selling price (INR) before setting status to Approved.');
        return;
      }
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          publishedPrice: parsedPrice,
          pricingStatus: draft.pricingStatus,
          publishingStatus: draft.publishingStatus,
          isFeatured: draft.isFeatured,
        }),
      });
      if (!res.ok) throw new Error('Update failed');
      await loadAllAdminData();
      await refreshData();
      flash('Package pricing & publishing status saved.');
    } catch {
      setErrorMsg('Could not save package changes.');
    }
  };

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/admin/packages', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          slug: newPkg.slug.trim().toLowerCase(),
          name: newPkg.name.trim(),
          subtitle: newPkg.subtitle.trim(),
          summary: newPkg.summary.trim(),
          fullDescription: newPkg.fullDescription.trim(),
          category: newPkg.category,
          catalogType: 'proposed-experience',
          destinations: newPkg.destinations
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          duration: newPkg.duration.trim(),
          startingLocation: newPkg.startingLocation.trim(),
          endingLocation: newPkg.endingLocation.trim(),
          featuredImage: MEDIA.mahakaleshwarTemple,
          seoTitle: `${newPkg.name.trim()} | My Ujjain Darshan`,
          seoDescription: newPkg.summary.trim().slice(0, 155),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create package');
      setShowNewPkg(false);
      setNewPkg({
        slug: '',
        name: '',
        subtitle: '',
        summary: '',
        fullDescription: '',
        category: 'ujjain-experiences',
        destinations: 'Ujjain',
        duration: '1 Full Day',
        startingLocation: 'Ujjain',
        endingLocation: 'Ujjain',
      });
      await loadAllAdminData();
      await refreshData();
      flash('New journey package created.');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unable to create package.');
    }
  };

  const handleUpdateEnquiry = async (id: number, leadStatus: string) => {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          leadStatus,
          followUpNotes: enquiryNotes[id] ?? '',
        }),
      });
      if (!res.ok) throw new Error('Failed to update enquiry');
      await loadAllAdminData();
      flash('Enquiry status and notes updated.');
    } catch {
      setErrorMsg('Unable to update enquiry.');
    }
  };

  const handleToggleVehicle = async (veh: VehicleRecord) => {
    try {
      const headers = await getAuthHeaders();
      const nextStatus =
        veh.availabilityStatus === 'confirmed' ? 'reference-unconfirmed' : 'confirmed';
      const res = await fetch(`/api/admin/vehicles/${veh.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ availabilityStatus: nextStatus }),
      });
      if (!res.ok) throw new Error('Update failed');
      await loadAllAdminData();
      await refreshData();
      flash(`Updated ${veh.modelName} availability.`);
    } catch {
      setErrorMsg('Unable to update vehicle status.');
    }
  };

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers,
        body: JSON.stringify(newFaq),
      });
      if (!res.ok) throw new Error('Create FAQ failed');
      setNewFaq({ category: 'General', question: '', answer: '' });
      await loadAllAdminData();
      await refreshData();
      flash('FAQ added.');
    } catch {
      setErrorMsg('Unable to add FAQ. Please complete all fields.');
    }
  };

  const handleDeleteFaq = async (id: number) => {
    try {
      const headers = await getAuthHeaders();
      await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE', headers });
      await loadAllAdminData();
      await refreshData();
      flash('FAQ deleted.');
    } catch {
      setErrorMsg('Unable to delete FAQ.');
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers,
        body: JSON.stringify(newReview),
      });
      if (!res.ok) throw new Error('Create testimonial failed');
      setNewReview({
        guestName: '',
        originCity: '',
        journeyTitle: 'Ujjain Darshan',
        quote: '',
        verifiedSource: 'Direct WhatsApp Confirmation',
        isApproved: true,
      });
      await loadAllAdminData();
      await refreshData();
      flash('Verified guest reflection saved.');
    } catch {
      setErrorMsg('Unable to save testimonial. Check all fields.');
    }
  };

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...newArticle,
          coverImage: MEDIA.heroRamGhat,
          publishingStatus: 'published',
        }),
      });
      if (!res.ok) throw new Error('Failed to create article');
      setNewArticle({
        slug: '',
        title: '',
        category: 'Pilgrimage Planning',
        readTime: '5 min read',
        excerpt: '',
        bodyText: '',
      });
      await loadAllAdminData();
      await refreshData();
      flash('Travel Journal article published.');
    } catch {
      setErrorMsg('Unable to publish article. Ensure slug is lowercase-hyphenated and unique.');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ settings }),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      await refreshData();
      flash('Site settings updated.');
    } catch {
      setErrorMsg('Unable to save settings.');
    }
  };

  // Unauthenticated / Unauthorized Gate
  if (loading) {
    return (
      <div className="pt-36 pb-24 text-center text-sm text-[#655C54]">
        Verifying administrator credentials...
      </div>
    );
  }

  if (!user || !adminProfile) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#FBF8F3] flex items-center justify-center px-5">
        <div className="bg-white border border-[#E5DCD0] max-w-md w-full p-8 sm:p-10 space-y-6 text-center">
          <img
            src={BRAND.logoEmblem}
            alt="My Ujjain Darshan"
            className="w-14 h-14 mx-auto rounded-full object-contain"
          />
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#7A0806]">
              <Lock className="w-3.5 h-3.5" />
              <span>Protected Admin Console</span>
            </div>
            <h1 className="font-editorial text-3xl font-medium text-[#1F1A17]">
              My Ujjain Darshan CMS
            </h1>
            <p className="text-xs text-[#574F48] leading-relaxed">
              Sign in with your authorized Google account to manage customer enquiries, approve official selling prices, update packages, and publish content.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 bg-[#FDF2F2] border border-[#E5B4B4] text-xs text-[#8B1A1A] text-left">
              {authError}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              className="w-full py-3.5 px-5 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold tracking-wide rounded-sm transition-colors"
            >
              Sign In With Google
            </button>

            {user && !adminProfile && (
              <button
                type="button"
                onClick={() => void logout()}
                className="w-full py-2.5 px-4 border border-[#D4C7B5] text-xs font-semibold text-[#4A413B] rounded-sm"
              >
                Sign Out ({user.email})
              </button>
            )}
          </div>

          <Link to="/" className="block text-xs text-[#655C54] hover:text-[#7A0806]">
            Return to Public Website
          </Link>
        </div>
      </div>
    );
  }

  const filteredEnquiries = enquiries.filter((e) => {
    if (leadStatusFilter !== 'all' && e.leadStatus !== leadStatusFilter) return false;
    if (leadSearch.trim()) {
      const q = leadSearch.toLowerCase();
      return `${e.referenceCode} ${e.customerName} ${e.contactPhone} ${e.interestedPackageName}`
        .toLowerCase()
        .includes(q);
    }
    return true;
  });

  return (
    <div className="pt-24 pb-20 bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 space-y-8">
        {/* Top Admin Header */}
        <div className="bg-white border border-[#E5DCD0] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7A0806]">
              Operations & Content Management
            </p>
            <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17]">
              My Ujjain Darshan Admin Console
            </h1>
            <p className="text-xs text-[#655C54] mt-1">
              Signed in as {adminProfile.email} · Role: Administrator
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void loadAllAdminData()}
              disabled={busy}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#D4C7B5] text-xs font-semibold text-[#1F1A17] rounded-sm hover:border-[#7A0806]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${busy ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1F1A17] text-white text-xs font-semibold rounded-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Summary Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5DCD0] p-5">
            <div className="text-xs text-[#655C54]">Total Enquiries</div>
            <div className="font-editorial text-4xl font-medium text-[#1F1A17] mt-1 tabular-nums">
              {enquiries.length}
            </div>
            <div className="text-xs text-[#7A0806] mt-1 tabular-nums">
              {enquiries.filter((e) => e.leadStatus === 'new').length} awaiting response
            </div>
          </div>
          <div className="bg-white border border-[#E5DCD0] p-5">
            <div className="text-xs text-[#655C54]">Packages in Catalog</div>
            <div className="font-editorial text-4xl font-medium text-[#1F1A17] mt-1 tabular-nums">
              {packages.length}
            </div>
            <div className="text-xs text-[#655C54] mt-1 tabular-nums">
              {packages.filter((p) => p.pricingStatus === 'approved').length} rates approved
            </div>
          </div>
          <div className="bg-white border border-[#E5DCD0] p-5">
            <div className="text-xs text-[#655C54]">Journal Articles</div>
            <div className="font-editorial text-4xl font-medium text-[#1F1A17] mt-1 tabular-nums">
              {articles.length}
            </div>
            <div className="text-xs text-[#655C54] mt-1">
              {faqs.length} active FAQs
            </div>
          </div>
          <div className="bg-white border border-[#E5DCD0] p-5">
            <div className="text-xs text-[#655C54]">Verified Testimonials</div>
            <div className="font-editorial text-4xl font-medium text-[#1F1A17] mt-1 tabular-nums">
              {testimonials.filter((t) => t.isApproved).length}
            </div>
            <div className="text-xs text-[#655C54] mt-1">
              Zero fabricated reviews
            </div>
          </div>
        </div>

        {/* Alerts */}
        {notice && (
          <div className="p-4 bg-[#EEF8F2] border border-[#B9DEC8] text-xs text-[#175935] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notice}</span>
          </div>
        )}
        {errorMsg && (
          <div className="p-4 bg-[#FDF2F2] border border-[#E5B4B4] text-xs text-[#8B1A1A]">
            {errorMsg}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[#E5DCD0] pb-2">
          {[
            { id: 'enquiries', label: `Enquiries (${enquiries.length})` },
            { id: 'packages', label: `Packages & Pricing (${packages.length})` },
            { id: 'vehicles', label: 'Fleet Vehicles' },
            { id: 'content', label: 'Journal, FAQs & Reviews' },
            { id: 'settings', label: 'Site Settings' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id as AdminTab)}
              className={`px-4 py-2 text-xs font-semibold rounded-sm whitespace-nowrap ${
                tab === t.id
                  ? 'bg-[#7A0806] text-white'
                  : 'text-[#4A413B] hover:bg-[#EFE8DC]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: ENQUIRIES */}
        {tab === 'enquiries' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="search"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Search name, phone, reference, or package..."
                  className="px-3.5 py-2 bg-white border border-[#DDD2C2] text-xs w-64 rounded-sm"
                />
                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="px-3.5 py-2 bg-white border border-[#DDD2C2] text-xs rounded-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => void handleExportCsv()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F1A17] text-white text-xs font-semibold rounded-sm whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            {filteredEnquiries.length === 0 ? (
              <div className="bg-white border border-[#E5DCD0] p-10 text-center text-sm text-[#655C54]">
                No customer enquiries match the current filter yet.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white border border-[#E5DCD0] p-6 space-y-4"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#EFE8DC]">
                      <div>
                        <div className="text-xs text-[#7A0806] font-semibold tabular-nums">
                          {enq.referenceCode} · {new Date(enq.createdAt).toLocaleString()}
                        </div>
                        <h3 className="font-editorial text-2xl font-medium text-[#1F1A17] mt-0.5">
                          {enq.customerName} — {enq.interestedPackageName}
                        </h3>
                        <div className="text-xs text-[#574F48] mt-1 tabular-nums">
                          Phone: {enq.contactPhone}
                          {enq.email ? ` · ${enq.email}` : ''} · Preferred: {enq.preferredContactMethod}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          aria-label={`Lead status for ${enq.referenceCode}`}
                          value={enq.leadStatus}
                          onChange={(e) => void handleUpdateEnquiry(enq.id, e.target.value)}
                          className="px-3 py-2 bg-[#FBF8F3] border border-[#DDD2C2] text-xs font-semibold rounded-sm"
                        >
                          <option value="new">Status: New</option>
                          <option value="contacted">Status: Contacted</option>
                          <option value="quoted">Status: Quoted</option>
                          <option value="confirmed">Status: Confirmed</option>
                          <option value="closed">Status: Closed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-[#4A413B]">
                      <div>
                        <strong className="text-[#1F1A17]">Dates:</strong>{' '}
                        {enq.arrivalDate || 'Flexible'}
                        {enq.returnDate ? ` → ${enq.returnDate}` : ''}
                      </div>
                      <div>
                        <strong className="text-[#1F1A17]">Group:</strong> {enq.adults} Adults,{' '}
                        {enq.children} Children {enq.seniorTravelers ? '(Senior Travelers)' : ''}
                      </div>
                      <div>
                        <strong className="text-[#1F1A17]">Pickup / Drop:</strong>{' '}
                        {enq.pickupLocation || '-'} → {enq.dropLocation || '-'}
                      </div>
                      <div>
                        <strong className="text-[#1F1A17]">Vehicle:</strong>{' '}
                        {enq.vehiclePreference || 'Unassigned'}
                      </div>
                    </div>

                    {enq.specialRequirements && (
                      <p className="text-xs text-[#4A413B] bg-[#FBF8F3] p-3 border border-[#EFE8DC]">
                        <strong className="text-[#1F1A17]">Guest Notes:</strong>{' '}
                        {enq.specialRequirements}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <input
                        type="text"
                        value={enquiryNotes[enq.id] ?? ''}
                        onChange={(e) =>
                          setEnquiryNotes((prev) => ({ ...prev, [enq.id]: e.target.value }))
                        }
                        placeholder="Add internal follow-up note or quoted amount..."
                        className="flex-1 px-3.5 py-2 bg-[#FBF8F3] border border-[#DDD2C2] text-xs rounded-sm"
                      />
                      <button
                        type="button"
                        onClick={() => void handleUpdateEnquiry(enq.id, enq.leadStatus)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#7A0806] text-white text-xs font-semibold rounded-sm"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Note</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PACKAGES & PRICING GOVERNANCE */}
        {tab === 'packages' && (
          <div className="space-y-6">
            <div className="p-5 bg-[#FFF9ED] border border-[#E5CFA3] text-xs text-[#614718] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="leading-relaxed">
                <strong>Pricing Governance:</strong> Competitor reference rates from{' '}
                <code className="font-mono">ujjaintourtravels.in</code> are stored separately for internal reference only and are <strong>never</strong> published publicly. Enter your confirmed My Ujjain Darshan rate and set status to <em>Approved</em> to display a price on the website.
              </p>
              <button
                type="button"
                onClick={() => setShowNewPkg((s) => !s)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#7A0806] text-white text-xs font-semibold rounded-sm whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>

            {showNewPkg && (
              <form
                onSubmit={handleCreatePackage}
                className="bg-white border border-[#E5DCD0] p-6 space-y-4"
              >
                <h2 className="font-editorial text-2xl text-[#1F1A17]">
                  Create New Proposed Package
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <input
                    required
                    placeholder="URL slug (e.g., ujjain-indore-food-heritage)"
                    value={newPkg.slug}
                    onChange={(e) => setNewPkg({ ...newPkg, slug: e.target.value })}
                    className="px-3.5 py-2.5 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                  />
                  <input
                    required
                    placeholder="Package Name"
                    value={newPkg.name}
                    onChange={(e) => setNewPkg({ ...newPkg, name: e.target.value })}
                    className="px-3.5 py-2.5 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                  />
                  <input
                    required
                    placeholder="Short Subtitle"
                    value={newPkg.subtitle}
                    onChange={(e) => setNewPkg({ ...newPkg, subtitle: e.target.value })}
                    className="px-3.5 py-2.5 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                  />
                  <input
                    required
                    placeholder="Duration (e.g., 2 Days / 1 Night)"
                    value={newPkg.duration}
                    onChange={(e) => setNewPkg({ ...newPkg, duration: e.target.value })}
                    className="px-3.5 py-2.5 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                  />
                  <input
                    required
                    placeholder="Destinations (comma separated)"
                    value={newPkg.destinations}
                    onChange={(e) => setNewPkg({ ...newPkg, destinations: e.target.value })}
                    className="px-3.5 py-2.5 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                  />
                  <select
                    value={newPkg.category}
                    onChange={(e) => setNewPkg({ ...newPkg, category: e.target.value })}
                    className="px-3.5 py-2.5 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                  >
                    <option value="ujjain-experiences">Ujjain Experiences</option>
                    <option value="jyotirlinga-journeys">Jyotirlinga Journeys</option>
                    <option value="spiritual-circuits">Spiritual Circuits</option>
                    <option value="heritage-escapes">Heritage Escapes</option>
                    <option value="family-journeys">Family Journeys</option>
                    <option value="airport-transport">Airport & Transport</option>
                  </select>
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="Concise summary..."
                  value={newPkg.summary}
                  onChange={(e) => setNewPkg({ ...newPkg, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-[#DDD2C2] bg-[#FBF8F3] text-xs rounded-sm"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Detailed editorial overview..."
                  value={newPkg.fullDescription}
                  onChange={(e) =>
                    setNewPkg({ ...newPkg, fullDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-[#DDD2C2] bg-[#FBF8F3] text-xs rounded-sm"
                />
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#7A0806] text-white text-xs font-semibold rounded-sm"
                  >
                    Create Package
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewPkg(false)}
                    className="px-4 py-2.5 text-xs text-[#655C54]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white border border-[#E5DCD0] overflow-x-auto">
              <table className="w-full min-w-[920px] text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E5DCD0] bg-[#F7F2E9] text-[#574F48]">
                    <th className="py-3 px-4 font-semibold">Package</th>
                    <th className="py-3 px-4 font-semibold">Ref. Rate (Internal)</th>
                    <th className="py-3 px-4 font-semibold">Approved Rate (₹)</th>
                    <th className="py-3 px-4 font-semibold">Pricing Status</th>
                    <th className="py-3 px-4 font-semibold">Visibility</th>
                    <th className="py-3 px-4 font-semibold">Featured</th>
                    <th className="py-3 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8DC]">
                  {packages.map((pkg) => {
                    const edit = pkgEdits[pkg.id];
                    if (!edit) return null;
                    return (
                      <tr key={pkg.id}>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#1F1A17]">{pkg.name}</div>
                          <div className="text-[11px] text-[#7A6F65]">
                            /{pkg.slug} · {pkg.catalogType}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 tabular-nums text-[#7A6F65]">
                          {pkg.referencePrice
                            ? `₹${pkg.referencePrice.toLocaleString('en-IN')}`
                            : '—'}
                        </td>
                        <td className="py-3.5 px-4">
                          <input
                            type="number"
                            min={0}
                            placeholder="On Request"
                            value={edit.publishedPrice}
                            onChange={(e) =>
                              setPkgEdits((prev) => ({
                                ...prev,
                                [pkg.id]: { ...edit, publishedPrice: e.target.value },
                              }))
                            }
                            className="w-28 px-2.5 py-1.5 bg-[#FBF8F3] border border-[#DDD2C2] tabular-nums rounded-sm"
                          />
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={edit.pricingStatus}
                            onChange={(e) =>
                              setPkgEdits((prev) => ({
                                ...prev,
                                [pkg.id]: {
                                  ...edit,
                                  pricingStatus: e.target.value as
                                    | 'pending-approval'
                                    | 'approved'
                                    | 'request-only',
                                },
                              }))
                            }
                            className="px-2.5 py-1.5 bg-[#FBF8F3] border border-[#DDD2C2] rounded-sm"
                          >
                            <option value="pending-approval">Pending Approval</option>
                            <option value="request-only">Request Only</option>
                            <option value="approved">Approved (Public)</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={edit.publishingStatus}
                            onChange={(e) =>
                              setPkgEdits((prev) => ({
                                ...prev,
                                [pkg.id]: {
                                  ...edit,
                                  publishingStatus: e.target.value as
                                    | 'published'
                                    | 'draft'
                                    | 'archived',
                                },
                              }))
                            }
                            className="px-2.5 py-1.5 bg-[#FBF8F3] border border-[#DDD2C2] rounded-sm"
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4">
                          <input
                            type="checkbox"
                            checked={edit.isFeatured}
                            onChange={(e) =>
                              setPkgEdits((prev) => ({
                                ...prev,
                                [pkg.id]: { ...edit, isFeatured: e.target.checked },
                              }))
                            }
                            className="accent-[#7A0806]"
                          />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => void handleSavePackage(pkg.id)}
                            className="px-3 py-1.5 bg-[#7A0806] hover:bg-[#580605] text-white font-semibold rounded-sm"
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: FLEET VEHICLES */}
        {tab === 'vehicles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vehicles.map((veh) => (
              <div
                key={veh.id}
                className="bg-white border border-[#E5DCD0] p-6 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-wider text-[#7A0806]">
                    {veh.category}
                  </div>
                  <h3 className="font-editorial text-2xl text-[#1F1A17]">
                    {veh.modelName}
                  </h3>
                  <p className="text-xs text-[#655C54]">{veh.capacityLabel}</p>
                  <p className="text-[11px] text-[#8B8075] pt-1">
                    Current Status:{' '}
                    <strong className="text-[#1F1A17]">{veh.availabilityStatus}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleToggleVehicle(veh)}
                  className="px-4 py-2 border border-[#7A0806] text-[#7A0806] hover:bg-[#7A0806] hover:text-white text-xs font-semibold rounded-sm whitespace-nowrap"
                >
                  {veh.availabilityStatus === 'confirmed'
                    ? 'Mark Unconfirmed'
                    : 'Confirm Available'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: JOURNAL, FAQS & VERIFIED REVIEWS */}
        {tab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Verified Guest Review */}
            <form
              onSubmit={handleAddReview}
              className="bg-white border border-[#E5DCD0] p-6 space-y-4"
            >
              <h2 className="font-editorial text-2xl text-[#1F1A17]">
                Add Verified Guest Review
              </h2>
              <p className="text-xs text-[#655C54]">
                Publish only genuine, attributable reviews from real travelers.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <input
                  required
                  placeholder="Guest Full Name"
                  value={newReview.guestName}
                  onChange={(e) =>
                    setNewReview({ ...newReview, guestName: e.target.value })
                  }
                  className="px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                />
                <input
                  required
                  placeholder="Origin City (e.g., Pune)"
                  value={newReview.originCity}
                  onChange={(e) =>
                    setNewReview({ ...newReview, originCity: e.target.value })
                  }
                  className="px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                />
              </div>
              <input
                required
                placeholder="Journey Completed"
                value={newReview.journeyTitle}
                onChange={(e) =>
                  setNewReview({ ...newReview, journeyTitle: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] text-xs rounded-sm"
              />
              <textarea
                required
                rows={3}
                placeholder="Verified guest quote..."
                value={newReview.quote}
                onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                className="w-full px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] text-xs rounded-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#7A0806] text-white text-xs font-semibold rounded-sm"
              >
                Publish Verified Review
              </button>
            </form>

            {/* Publish Travel Journal Article */}
            <form
              onSubmit={handleAddArticle}
              className="bg-white border border-[#E5DCD0] p-6 space-y-4"
            >
              <h2 className="font-editorial text-2xl text-[#1F1A17]">
                Publish Travel Journal Essay
              </h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <input
                  required
                  placeholder="slug-like-this"
                  value={newArticle.slug}
                  onChange={(e) => setNewArticle({ ...newArticle, slug: e.target.value })}
                  className="px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                />
                <input
                  required
                  placeholder="Category"
                  value={newArticle.category}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, category: e.target.value })
                  }
                  className="px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                />
              </div>
              <input
                required
                placeholder="Article Title"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                className="w-full px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] text-xs rounded-sm"
              />
              <input
                required
                placeholder="Short excerpt (1–2 sentences)"
                value={newArticle.excerpt}
                onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                className="w-full px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] text-xs rounded-sm"
              />
              <textarea
                required
                rows={3}
                placeholder="Essay paragraphs (separate paragraphs with a blank line)..."
                value={newArticle.bodyText}
                onChange={(e) => setNewArticle({ ...newArticle, bodyText: e.target.value })}
                className="w-full px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] text-xs rounded-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#7A0806] text-white text-xs font-semibold rounded-sm"
              >
                Publish Article
              </button>
            </form>

            {/* Manage FAQs */}
            <div className="lg:col-span-2 bg-white border border-[#E5DCD0] p-6 space-y-5">
              <h2 className="font-editorial text-2xl text-[#1F1A17]">Manage FAQs</h2>
              <form onSubmit={handleAddFaq} className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                <input
                  required
                  placeholder="Category"
                  value={newFaq.category}
                  onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                  className="md:col-span-2 px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                />
                <input
                  required
                  placeholder="Question"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="md:col-span-4 px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                />
                <input
                  required
                  placeholder="Answer"
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="md:col-span-4 px-3 py-2 border border-[#DDD2C2] bg-[#FBF8F3] rounded-sm"
                />
                <button
                  type="submit"
                  className="md:col-span-2 px-4 py-2 bg-[#7A0806] text-white font-semibold rounded-sm"
                >
                  Add FAQ
                </button>
              </form>

              <div className="divide-y divide-[#EFE8DC]">
                {faqs.map((f) => (
                  <div key={f.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                    <div>
                      <div className="font-semibold text-[#1F1A17]">{f.question}</div>
                      <p className="text-[#574F48] mt-1">{f.answer}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleDeleteFaq(f.id)}
                      aria-label={`Delete FAQ ${f.question}`}
                      className="text-[#8B1A1A] hover:underline p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SITE SETTINGS */}
        {tab === 'settings' && (
          <form
            onSubmit={handleSaveSettings}
            className="bg-white border border-[#E5DCD0] p-7 max-w-2xl space-y-5"
          >
            <div>
              <h2 className="font-editorial text-3xl text-[#1F1A17]">
                Site-Wide Contact & Social Settings
              </h2>
              <p className="text-xs text-[#655C54] mt-1">
                Social media links appear in the website footer only when valid HTTPS account URLs are saved below.
              </p>
            </div>

            {[
              { key: 'brandPhone', label: 'Primary Phone Display' },
              { key: 'brandLocation', label: 'Primary Location' },
              { key: 'instagramUrl', label: 'Instagram URL (https://...)' },
              { key: 'facebookUrl', label: 'Facebook URL (https://...)' },
              { key: 'youtubeUrl', label: 'YouTube URL (https://...)' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-[#2B2420] mb-1.5">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={settings[field.key] || ''}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#DDD2C2] text-sm rounded-sm"
                />
              </div>
            ))}

            <button
              type="submit"
              className="px-6 py-3 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold rounded-sm"
            >
              Save Settings
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
