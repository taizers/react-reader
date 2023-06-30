import express from 'express';

import {
  signUpAction,
  loginAction,
  refreshAction,
  logoutAction,
} from '../controllers/auth.controller';
import {
  getCEOAction,
  uploadUserAvatarAction,
} from '../controllers/users.controller';
// import {
//   searchProjectAction,
//   getProjectsStatisticAction,
//   getUserProjectsAction,
// } from '../controllers/news.controller';
// import {
//   getAssignedTasksAction,
//   getMemberTasksAction,
//   getProjectTasksAction,
//   getUserTasksAction,
//   uploadTaskAttachmentAction,
// } from '../controllers/tasks.controller';
import {
  getAdministartionGroupAction,
  getGroupsListAction,
} from '../controllers/groups.controller';

import {
  signUpValidation,
  loginValidation,
  cookiesValidation,
} from '../validations/auth.validation';

import galeriesRouter from './galeries.routes';
import groupsRouter from './groups.routes';
import pagesRouter from './pages.routes';
import newsRouter from './news.routes';
import commentsRouter from './comments.routes';
import usersRouter from './users.routes';
import storageGroupsRouter from './storage-groups.routes';
import storageRouter from './storages.routes';

import { uploadAvatarMiddleware } from '../middlewares/upload.middleware';
import verifyToken from '../middlewares/auth.middleware';
import { getStorageGroupsListAction } from '../controllers/storage-groups.controller';
import { getPagesdListAction } from '../controllers/pages.controller';

const router = express.Router();

// Authorization

router.post('/sign-up', signUpValidation, signUpAction);
router.post('/sign-in', loginValidation, loginAction);
router.post('/refresh-token', cookiesValidation, refreshAction);
router.post('/sign-out', cookiesValidation, logoutAction);

// Routers

router.use('/galeries', galeriesRouter);
router.use('/groups', groupsRouter);
router.use('/storage', verifyToken, storageRouter);
router.use('/storage-groups', verifyToken, storageGroupsRouter);
router.use('/pages', pagesRouter);
router.use('/news', newsRouter);
router.use('/comments', commentsRouter);
router.use('/users', verifyToken, usersRouter);

router.get('/storage-groups-list', verifyToken, getStorageGroupsListAction);
router.get('/pages-list', verifyToken, getPagesdListAction);
router.get('/users-ceo', getCEOAction);

// Search

// router.get(
//   '/projects-search',
//   verifyToken,
//   searchValidation,
//   searchProjectAction
// );
// router.get(
//   '/task-members-search',
//   verifyToken,
//   searchValidation,
//   searchMembersAction
// );

// Upload Files

router.post(
  '/users-avatar',
  verifyToken,
  uploadAvatarMiddleware.single('file'),
  uploadUserAvatarAction
);

// Get Files

router.use('/avatars', express.static('storage/avatars'));
router.use('/galeries-items', express.static('storage/galeries-items'));
router.use('/files', express.static('storage/files'));
router.use('/news-covers', express.static('storage/news-covers'));

router.get('/administration-group', getAdministartionGroupAction);
router.get('/groups-list', verifyToken, getGroupsListAction);

export default router;
