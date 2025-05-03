// Repository ve service modüllerini dahil ediyoruz
import {
    commentRepository,
    followRepository,
    likeRepository,
    postRepository,
    savedRepository,
    searchRepository,
    userRepository,
} from "../repositories/index.js";
import {
    authService as authServiceFactory,
    commentService as commentServiceFactory,
    followService as followServiceFactory,
    likeService as likeServiceFactory,
    postService as postServiceFactory,
    savedService as savedServiceFactory,
    searchService as searchServiceFactory,
    userService as userServiceFactory,
} from "../services/index.js";

// Her bir repository dosyasini bir değişken olarak tanımlıyoruz
const userRepo = userRepository;
const followRepo = followRepository;
const likeRepo = likeRepository;
const postRepo = postRepository;
const savedRepo = savedRepository;
const commentRepo = commentRepository;
const searchRepo = searchRepository;

// Burada servislere ihtiyacımız olan repositoryleri ve servisleri, parametre olarak gonderiyoruz
const userSvc = userServiceFactory(userRepo);
const followSvc = followServiceFactory(followRepo, userRepo);
const likeSvc = likeServiceFactory(likeRepo);
const commentSvc = commentServiceFactory(commentRepo);
const searchSvc = searchServiceFactory(postRepo, searchRepo);
const postSvc = postServiceFactory(likeRepo, postRepo, savedRepo, followSvc);
const authSvc = authServiceFactory(userRepo, userSvc);
const savedSvc = savedServiceFactory(savedRepo, postSvc);

// Dependency Injection Container'da servisleri ve repositoryleri tutuyoruz
const diContainer = {
    authService: authSvc,
    commentService: commentSvc,
    followService: followSvc,
    likeService: likeSvc,
    postService: postSvc,
    savedService: savedSvc,
    searchService: searchSvc,
    userService: userSvc,
};

// Dependency Injection Container'i export ediyoruz
export default diContainer;
