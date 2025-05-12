import {
    appSettingsRepository,
    commentRepository,
    followRepository,
    likeRepository,
    postRepository,
    savedRepository,
    searchRepository,
    userRepository,
} from "../repositories/index.js";
import {
    adminService as adminServiceFactory,
    authService as authServiceFactory,
    commentService as commentServiceFactory,
    followService as followServiceFactory,
    likeService as likeServiceFactory,
    postService as postServiceFactory,
    savedService as savedServiceFactory,
    searchService as searchServiceFactory,
    userService as userServiceFactory,
} from "../services/index.js";

const appSettingsRepo = appSettingsRepository;
const userRepo = userRepository;
const followRepo = followRepository;
const likeRepo = likeRepository;
const postRepo = postRepository;
const savedRepo = savedRepository;
const commentRepo = commentRepository;
const searchRepo = searchRepository;

// First create the services that don't have dependencies on others
const userSvc = userServiceFactory(userRepo);
const likeSvc = likeServiceFactory(likeRepo, postRepo);
const searchSvc = searchServiceFactory(postRepo, searchRepo);

// Then create followService which depends on userRepo
const followSvc = followServiceFactory(followRepo, userRepo);

// Create postService next (needs likeRepo, postRepo, savedRepo, followSvc)
const postSvc = postServiceFactory(likeRepo, postRepo, savedRepo, followSvc);

// Now create commentService with the postService
const commentSvc = commentServiceFactory(commentRepo, postSvc);

// Then create the remaining services
const authSvc = authServiceFactory(userRepo, userSvc);
const savedSvc = savedServiceFactory(savedRepo, postSvc);
const adminSvc = adminServiceFactory(
    userRepo,
    postRepo,
    commentRepo,
    appSettingsRepo
);

const diContainer = {
    adminService: adminSvc,
    authService: authSvc,
    commentService: commentSvc,
    followService: followSvc,
    likeService: likeSvc,
    postService: postSvc,
    savedService: savedSvc,
    searchService: searchSvc,
    userService: userSvc,
};

export default diContainer;
