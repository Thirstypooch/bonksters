import RestaurantPage from '@/components/Restaurant/RestaurantPage';

export default async function Page({ params }: { params: { id: string } }) {
  return <RestaurantPage id={params.id} />;
}

