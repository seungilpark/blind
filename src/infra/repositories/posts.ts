import { firestore } from '../firebase';

interface PostData {
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  replies: number;
  postDate: Date;
  deleted: boolean;
}

class PostsRepository {
  private postsRef = firestore.collection('posts');

  async createPost(postData: PostData): Promise<string | null> {
    try {
      await this.postsRef.add({
        ...postData,
        deleted: false, // Initialize the 'deleted' field as false for new posts
      });
      return 'Post created successfully';
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
  }

  async getPosts(): Promise<PostData[] | null> {
    try {
      const snapshot = await this.postsRef
        .where('deleted', '==', false) // Exclude soft-deleted posts
        .get();

      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as PostData[];
      return posts;
    } catch (error) {
      console.error('Error getting posts:', error);
      return null;
    }
  }

  async updatePost(postId: string, newData: Partial<PostData>): Promise<string | null> {
    try {
      await this.postsRef.doc(postId).update(newData);
      return 'Post updated successfully';
    } catch (error) {
      console.error('Error updating post:', error);
      return null;
    }
  }

  async deletePost(postId: string): Promise<string | null> {
    try {
      // Set the 'deleted' field to true for the post
      await this.postsRef.doc(postId).update({ deleted: true });

      return 'Post soft deleted successfully';
    } catch (error) {
      console.error('Error deleting post:', error);
      return null;
    }
  }
}

export default PostsRepository;
