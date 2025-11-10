import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Achievements from '@/components/Achievements';
import WhoWeSeek from '@/components/WhoWeSeek';
import TermsDownload from '@/components/TermsDownload';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Achievements />
      <WhoWeSeek />
      <TermsDownload />
      <Footer />
    </main>
  );
}
