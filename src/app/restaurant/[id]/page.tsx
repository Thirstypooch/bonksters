import RestaurantPage from '@/components/Restaurant/RestaurantPage';

// Define a more explicit type for the page props, including searchParams.
type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: PageProps) {
  // Ensure the id from params is passed to the client component.
  return <RestaurantPage id={params.id} />;
}