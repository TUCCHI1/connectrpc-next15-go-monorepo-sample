import { AntdRegistry } from '@ant-design/nextjs-registry';

type RootLayoutProps = {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}