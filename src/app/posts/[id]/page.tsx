'use client';

import DialogConfirmDelete from '@/components/globals/DialogConfirmDelete';
import { useToast } from '@/components/ui/use-toast';
import { deletePost, fetchPostById } from '@/services/post.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Loader from '@/components/globals/Loader';

type PostDetailParams = {
	id: string;
};

const PostDetail = () => {
	const { id } = useParams<PostDetailParams>();
	const router = useRouter();
	const { toast } = useToast();

	const { isPending, data } = useQuery({
		queryKey: ['repoData'],
		queryFn: () => fetchPostById(id),
	});

	const mutation = useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			toast({
				title: 'Post deleted',
				description: 'Your post has been deleted',
			});
			router.push('/');
		},
	});

	const handleDelete = () => {
		mutation.mutate(id);
	};

	if (isPending) return <Loader />;

	return (
		<div>
			<h1>{data.title}</h1>
			<p>{data.description}</p>

			<DialogConfirmDelete handleDelete={handleDelete} isPending={mutation.isPending} />
		</div>
	);
};

export default PostDetail;
