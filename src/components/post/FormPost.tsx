'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createPost } from '@/services/post.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { fetchAllCategories, updateCategory } from '@/services/category.service';
import { PostCreateDTO } from '@/types/post';
import { useRouter } from 'next/navigation';

type FormPostProps = {
	setOpen: (open: boolean) => void;
	initialData?: { id: number; name: string; description: string; category: any };
};

const FormPost = ({ setOpen, initialData }: FormPostProps) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { data } = useQuery({
		queryKey: ['getAllCategories'],
		queryFn: fetchAllCategories,
	});

	const createMutation = useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getAllPosts'],
			});
			setOpen(false);
		},
	});

	const updateMutation = useMutation({
		mutationFn: updateCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['posts'],
			});
			queryClient.invalidateQueries({
				queryKey: ['repoData'],
			});
			setOpen(false);
		},
	});

	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedCategoryName, setSelectedCategoryName] = useState('');

	useEffect(() => {}, [selectedCategory, selectedCategoryName]);

	const handleCategoryChange = (value: string) => {
		const category = data.find((category: any) => category.id === value);
		if (category) {
			setSelectedCategory(category.id);
			setSelectedCategoryName(category.name);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const createPostDTO = {
			// @ts-expect-error - We know that these values exist
			title: e.currentTarget.title.value,
			description: e.currentTarget.description.value,
			category: selectedCategory,
		};

		if (initialData) {
			updateMutation.mutate({
				id: initialData?.id,
				title: createPostDTO.title,
				description: createPostDTO.description,
			});
		} else {
			createMutation.mutate(createPostDTO);
			router.push('/');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-2">
				<Input type="text" placeholder="My Awesome Post" name="title" />
			</div>
			<div className="mb-2">
				<Textarea placeholder="This is my awesome post." name="description" />
			</div>
			<div className="mb-2">
				<Select
					name="category"
					required={true}
					value={selectedCategory || 'Select a category'}
					onValueChange={handleCategoryChange}
				>
					<SelectTrigger>
						<SelectValue>{selectedCategoryName || 'Select a category'}</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{data &&
							data.map((category: any) => (
								<SelectItem key={category.id} value={category.id}>
									{category.name}
								</SelectItem>
							))}
					</SelectContent>
				</Select>
			</div>
			<div>
				<Button type="submit" className="w-full" disabled={createMutation.isPending}>
					{createMutation.isPending && (
						<span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>
					)}
					{initialData ? 'Update category' : 'Create category'}
				</Button>
			</div>
		</form>
	);
};

export default FormPost;
