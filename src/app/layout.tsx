import '@site/assets/style.css';
import { RootProvider } from '@site/components/providers';
import { HeaderSection } from '@site/features/layout/components';
import { createMetadata } from '@site/lib/seo';

export const metadata = createMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootProvider>
          <HeaderSection />
          <main className="mx-auto max-w-7xl p-6 lg:px-8">{children}</main>
        </RootProvider>
      </body>
    </html>
  );
}
