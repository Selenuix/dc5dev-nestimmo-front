'use client';

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

import { Button } from '@/components/ui/button';
import FormPost from './FormPost';
import { useState } from 'react';

type DrawerPostProps = {
	initialData?: any;
};

const DrawerPost = ({ initialData }: DrawerPostProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="default">{initialData ? 'Update' : 'Create new post'}</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle className="text-center">
						{initialData ? 'Update' : 'Add new'} post
					</DrawerTitle>
					<DrawerDescription className="text-center">
						Renseignez l'ensemble des champs.
					</DrawerDescription>
					<FormPost setOpen={setOpen} initialData={initialData} />
				</DrawerHeader>
				<DrawerFooter>
					<DrawerClose>
						<Button variant="outline" className="w-full">
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerPost;
