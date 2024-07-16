'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchAllCategories } from '@/services/category.service';
import Loader from '@/components/globals/Loader';

const CategoryList = () => {
	const { isPending, data } = useQuery({
		queryKey: ['getAllCategories'],
		queryFn: fetchAllCategories,
	});

	if (isPending) return <Loader />;

	return (
		<div>
			<h2 className="text-4xl font-bold my-5 text-cyan-700">Categories</h2>

			<div className="grid grid-cols-4 gap-2">
				{data?.map((category: any) => (
					<Link key={category.id} href={`/categories/${category.id}`}>
						<div key={category.id} className="bg-white rounded-lg shadow-md p-4">
							<h3 className="text-lg font-medium mb-2">{category.name}</h3>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default CategoryList;
