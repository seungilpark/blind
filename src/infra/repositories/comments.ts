import { firestore } from '../firebase';

interface CommentData {
  content: string;
  postId: string;
  parentId: string | null;
  likes: number;
  dislikes: number;
  replies: number;
  commentDate: Date;
  deleted: boolean;
}

class CommentsRepository {
  private commentsRef = firestore.collection('comments');

  async createComment(commentData: CommentData): Promise<string | null> {
    try {
      await this.commentsRef.add({
        ...commentData,
        deleted: false, // Initialize the 'deleted' field as false for new comments
      });
      return 'Comment created successfully';
    } catch (error) {
      console.error('Error creating comment:', error);
      return null;
    }
  }

  async getCommentsByPostId(postId: string): Promise<CommentData[] | null> {
    try {
      const snapshot = await this.commentsRef
        .where('postId', '==', postId)
        .where('deleted', '==', false) // Exclude soft-deleted comments
        .get();

      const comments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as CommentData[];
      return comments;
    } catch (error) {
      console.error('Error getting comments:', error);
      return null;
    }
  }

  async getCommentsByParentId(parentId: string): Promise<CommentData[] | null> {
    try {
      const snapshot = await this.commentsRef
        .where('parentId', '==', parentId)
        .where('deleted', '==', false) // Exclude soft-deleted comments
        .get();

      const comments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as CommentData[];
      return comments;
    } catch (error) {
      console.error('Error getting child comments:', error);
      return null;
    }
  }

  async deleteComment(commentId: string): Promise<string | null> {
    try {
      // Set the 'deleted' field to true for the comment
      await this.commentsRef.doc(commentId).update({ deleted: true });

      // No need to recursively delete child comments in soft delete

      return 'Comment soft deleted successfully';
    } catch (error) {
      console.error('Error deleting comment:', error);
      return null;
    }
  }
}

export default CommentsRepository;
