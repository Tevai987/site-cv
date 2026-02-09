import express from 'express';
import {createArticle} from '../controllers/articlesController.js';
import {getArticleById } from '../controllers/articlesController.js';
import {showAllArticle} from '../controllers/articlesController.js';
import {updateArticle} from '../controllers/articlesController.js';
import {deleteArticle} from '../controllers/articlesController.js';

const router = express.Router();

router.post('/', createArticle);
router.put('/:id', updateArticle);
router.get('/:id', getArticleById);
router.get('/', showAllArticle);

router.delete('/:id', deleteArticle);

export default router;