import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { SiteDataProvider } from './context/SiteDataContext.tsx';
import { Layout } from './components/Layout.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { UjjainDarshanPage } from './pages/UjjainDarshanPage.tsx';
import { PackagesPage } from './pages/PackagesPage.tsx';
import { PackageDetailPage } from './pages/PackageDetailPage.tsx';
import { DestinationsPage } from './pages/DestinationsPage.tsx';
import { DestinationDetailPage } from './pages/DestinationDetailPage.tsx';
import { FleetPage } from './pages/FleetPage.tsx';
import { PlanYourJourneyPage } from './pages/PlanYourJourneyPage.tsx';
import { JournalPage } from './pages/JournalPage.tsx';
import { ArticleDetailPage } from './pages/ArticleDetailPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { FaqPage } from './pages/FaqPage.tsx';
import { LegalPage } from './pages/LegalPage.tsx';
import { AdminPage } from './pages/AdminPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteDataProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/ujjain-darshan" element={<UjjainDarshanPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/packages/:slug" element={<PackageDetailPage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
              <Route path="/our-fleet" element={<FleetPage />} />
              <Route path="/plan-your-journey" element={<PlanYourJourneyPage />} />
              <Route path="/travel-journal" element={<JournalPage />} />
              <Route path="/travel-journal/:slug" element={<ArticleDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
              <Route
                path="/terms-and-conditions"
                element={<LegalPage type="terms" />}
              />
              <Route
                path="/cancellation-policy"
                element={<LegalPage type="cancellation" />}
              />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </SiteDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
