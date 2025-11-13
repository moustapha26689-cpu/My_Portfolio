import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Timeline from '@/components/Timeline';
import SkillGrid from '@/components/SkillGrid';
import CertificateSection from '@/components/CertificateSection';
import AwardSection from '@/components/AwardSection';
import TestScoreSection from '@/components/TestScoreSection';
import VolunteerSection from '@/components/VolunteerSection';
import ContactPopup from '@/components/ContactPopup';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <SkillGrid />
      <Education />
      <Timeline />
      <CertificateSection />
      <VolunteerSection />
      <AwardSection />
      <TestScoreSection />
      <ContactPopup />
    </>
  );
}
