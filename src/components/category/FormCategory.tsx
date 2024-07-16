'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory, updateCategory } from '@/services/category.service';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CategoryCreateDTO } from '@/types/category';

type FormCategoryProps = {
	setOpen: (open: boolean) => void;
	initialData?: { id: number; name: string };
};

const FormCategory = ({ setOpen, initialData }: FormCategoryProps) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const createMutation = useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['categories'],
			});
			setOpen(false);
			router.push('/');
		},
	});

	const updateMutation = useMutation({
		mutationFn: updateCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['categories'],
			});
			queryClient.invalidateQueries({
				queryKey: ['repoData'],
			});
			setOpen(false);
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const categoryData: CategoryCreateDTO = {
			// @ts-ignore
			name: e.target.name.value,
		};

		if (initialData) {
			updateMutation.mutate({ id: initialData.id, name: categoryData.name });
		} else {
			createMutation.mutate(categoryData);
			router.push('/');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-2">
				<Input
					type="text"
					placeholder="Category name"
					name="name"
					defaultValue={initialData?.name || ''}
					autoFocus={true}
				/>
			</div>
			<div>
				<Button
					type="submit"
					className="w-full"
					disabled={createMutation.isPending || updateMutation.isPending}
				>
					{(createMutation.isPending || updateMutation.isPending) && (
						<span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>
					)}
					{initialData ? 'Update category' : 'Create category'}
				</Button>
			</div>
		</form>
	);
};

export default FormCategory;
