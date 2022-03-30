import { Post, PostService } from 'danielbonifacio-sdk';
import { useCallback, useState } from 'react';

// Cria um hook
export default function useLatestPosts() {
  const [posts, setPosts] = useState<Post.Paginated>();

  const fetchPosts = useCallback(() => {
    // Obtem os ultimos 3 posts ordenados de maneira descendente pela data de criacao
    PostService.getAllPosts({
      sort: ['createdAt', 'desc'],
      page: 0,
      size: 3,
    }).then(setPosts); // Define o estado atual com os dados recuperados
  }, []);
  return {
    posts: posts?.content,
    fetchPosts,
  };
}
