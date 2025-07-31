import RestaurantPage from '@/components/Restaurant/RestaurantPage';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page(props: PageProps) {
  return <RestaurantPage id={props.params.id} />;
}

