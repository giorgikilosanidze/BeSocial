import { Post } from './post.types.js';

export async function createPost(postData: Post) {
	console.log(postData.text);
}
