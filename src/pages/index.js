import Head from 'next/head';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import FeaturesSection from '@/components/FeaturesSection';
import DashboardSection from '@/components/DashboardSection';
import WhoSection from '@/components/WhoSection';
import StatsSection from '@/components/StatsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

export default function Home() {
  return (
    <>
      <Head>
        <title>PureSight — Making Water Quality Visible</title>
        <meta name="description" content="PureSight is an IoT-based water purifier monitoring system that brings real-time transparency to water quality in public spaces. Monitor filter health, UV lamp status, water flow, and purifier health live." />
        <meta name="keywords" content="water quality monitoring, IoT purifier, real-time water safety, PureSight, smart water purifier" />
        <meta property="og:title" content="PureSight — Making Water Quality Visible" />
        <meta property="og:description" content="Real-time purifier monitoring for universities, hospitals, airports, offices, and public spaces." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative min-h-screen bg-[#020a0a] overflow-hidden">
        <ParticleBackground />
        <Navbar />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <FeaturesSection />
          <DashboardSection />
          <StatsSection />
          <WhoSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
