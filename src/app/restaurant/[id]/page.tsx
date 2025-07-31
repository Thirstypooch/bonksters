import RestaurantPage from '@/components/Restaurant/RestaurantPage';
import { createCaller } from '@/lib/trpc/server';
import { notFound } from 'next/navigation';

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const trpc = createCaller;
  const restaurant = await trpc.restaurant.getRestaurantById({ id: params.id });
  const menu = await trpc.restaurant.getMenuByRestaurantId({ id: params.id });

  if (!restaurant) {
    notFound();
  }

  return <RestaurantPage restaurant={restaurant} menu={menu} />;
}