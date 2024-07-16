'use client';

import DialogConfirmDelete from '@/components/globals/DialogConfirmDelete';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { deleteCategory, fetchCategoryById } from '@/services/category.service';
import Loader from '@/components/globals/Loader';
import DrawerCategory from '@/components/category/DrawerCategory';

type CategoryDetailParams = {
	id: string;
};

const CategoryDetail = () => {
	const { id } = useParams<CategoryDetailParams>();
	const router = useRouter();
	const { toast } = useToast();

	const { isPending, data } = useQuery({
		queryKey: ['repoData'],
		queryFn: () => fetchCategoryById(id),
	});

	const mutationDelete = useMutation({
		mutationFn: deleteCategory,
		onSuccess: () => {
			toast({
				title: 'Category deleted',
				description: 'Your category has been deleted',
			});
			router.push('/');
		},
	});

	const handleDelete = () => {
		mutationDelete.mutate(id);
	};

	if (isPending) return <Loader />;

	return (
		<div>
			<h2 className={'text-4xl font-extrabold dark:text-white'}>{data?.name}</h2>

			<DialogConfirmDelete handleDelete={handleDelete} isPending={mutationDelete.isPending} />
			<DrawerCategory initialData={data} />
		</div>
	);
};

export default CategoryDetail;
