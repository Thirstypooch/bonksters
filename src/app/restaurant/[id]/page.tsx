import RestaurantPage from '@/components/Restaurant/RestaurantPage';

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  return <RestaurantPage id={params.id} />;
}