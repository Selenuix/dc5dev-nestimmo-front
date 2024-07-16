import { CATEGORY_ENDPOINT } from '@/utils/constants';
import { CategoryCreateDTO } from '@/types/category';

export const fetchAllCategories = async () => {
	const response = await fetch(CATEGORY_ENDPOINT);
	return await response.json();
};

export const fetchCategoryById = async (id: string) => {
	const response = await fetch(`${CATEGORY_ENDPOINT}/${id}`);
	return await response.json();
};

export const createCategory = async (createCategoryDTO: CategoryCreateDTO) => {
	const response = await fetch(CATEGORY_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(createCategoryDTO),
	});
	return await response.json();
};

export const deleteCategory = async (id: string) => {
	const response = await fetch(`${CATEGORY_ENDPOINT}/${id}`, {
		method: 'DELETE',
	});
	return await response.json();
};

export const updateCategory = async (category: any) => {
	const response = await fetch(`${CATEGORY_ENDPOINT}/${category?.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(category),
	});
	return await response.json();
};
