import { Router } from 'express';
import { TopicController } from '../controllers/Topic';
import { CommentController } from '../controllers/Comment';
import { ReactionController } from '../controllers/Reaction';

const router = Router();

router.get('/topics/', TopicController.getTopics);
router.post('/topics/', TopicController.postTopic);
router.delete('/topics/:topic_id', TopicController.deleteTopic);
router.get('/comments/:topic_id', CommentController.getCommentsByTopicId);
router.post('/comments/', CommentController.postComment);
router.get('/reactions/:topic_id', ReactionController.getReactionsByTopicId);
router.post('/reactions/', ReactionController.postReaction);
router.delete('/reactions/:reaction_id', ReactionController.deleteReaction);

export default router;
