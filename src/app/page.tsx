import PostList from "@/components/post/PostList";
import CategoryList from "@/components/category/CategoryList";

export default function Home() {
  return (
    <div className="px-10">
      <PostList/>
      <CategoryList/>
    </div>
  );
}
