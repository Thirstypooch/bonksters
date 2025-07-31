import RestaurantPage from '@/components/Restaurant/RestaurantPage';

type PageProps = {
  params: { id: string };
};


export default function Page({ params }: PageProps) {
  return <RestaurantPage id={params.id} />;
}

