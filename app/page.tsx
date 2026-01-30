import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ModuleNavigation } from '@/components/module-navigation';
import { getSiteConfiguration } from '@/lib/cms-service';
import { cmsData as staticData } from '@/lib/cms-data';

// Force dynamic rendering to always get fresh data from DB
export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const cmsData = await getSiteConfiguration() || staticData;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header config={cmsData} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Module Navigation Section - Main Interaction Area */}
        <ModuleNavigation
          title={cmsData.moduleNavigation.title}
          description={cmsData.moduleNavigation.description}
          modules={cmsData.moduleNavigation.modules}
          company={cmsData.company}
        />
      </main>

      {/* Footer */}
      <Footer config={cmsData} />
    </div>
  );
}
