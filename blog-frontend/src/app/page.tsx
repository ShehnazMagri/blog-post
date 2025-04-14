import BlogList from '@/components/blogList';
import ClientProvider from '@/components/clientProvider';

export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome to the Blog</h1>
      <ClientProvider>
        <BlogList />
      </ClientProvider>
    </main>
  );
}