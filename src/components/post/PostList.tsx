'use client';

import { fetchAllPosts } from '@/services/post.service';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Loader from '@/components/globals/Loader';

const PostList = () => {
	const { isPending, data } = useQuery({
		queryKey: ['getAllPosts'],
		queryFn: fetchAllPosts,
	});

	if (isPending) return <Loader />;

	return (
		<div>
			<h2 className="text-4xl font-bold my-5 text-cyan-700">Posts</h2>

			<div className="grid grid-cols-4 gap-2">
				{data?.map((post: any) => (
					<Link key={post.id} href={`/posts/${post.id}`}>
						<div key={post.id} className="bg-white rounded-lg shadow-md p-4">
							<h3 className="text-lg font-bold mb-2">{post.title}</h3>
							{post.category && <h4 className="text-sm font-medium mb-2">{post.category.name}</h4>}
							<p className="text-gray-500">{post.description}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default PostList;
