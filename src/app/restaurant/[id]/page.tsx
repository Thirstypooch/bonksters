import RestaurantPage from '@/components/Restaurant/RestaurantPage';

// Define the params type using Record utility type
type PageParams = Record<string, string>;

// Define the props type for the page component
interface PageProps {
  params: PageParams;
}

// Use a simple approach with proper typing
export default function Page(props: PageProps) {
  // Extract the id from params and pass it to the client component
  const id = props.params.id;
  return <RestaurantPage id={id} />;
}

