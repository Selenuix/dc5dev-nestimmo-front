'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createPost } from "@/services/post.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type FormPostProps = {
    setOpen: (open: boolean) => void;
}

const FormPost = ({ setOpen } : FormPostProps) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getAllPosts']
            })
            setOpen(false);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const createPostDTO = {
            title: e.target.title.value,
            description: e.target.description.value
        }

        mutation.mutate(createPostDTO);
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <Input 
                    type="text" 
                    placeholder="Post title" 
                    name="title"
                />
            </div>
            <div className="mb-2">
                <Textarea 
                  placeholder="Post description"
                    name="description"
                />
            </div>
            <div>
                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending && <span className="mr-4 h-4 w-4 rounded-full bg-white animate-pulse"></span>}
                    Create post
                </Button>
            </div>
        </form>
     );
}
 
export default FormPost;