import RestaurantPage from '@/components/Restaurant/RestaurantPage';

// Making the Page component async aligns its signature with the async RootLayout,
// which resolves the TypeScript inference issue during the build process.
export default async function Page({ params }: { params: { id: string } }) {
  return <RestaurantPage id={params.id} />;
}