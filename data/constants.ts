export const SITE_URL: string = 'https://weeklypunch.vercel.app';
export const MOBILE_SITE_URL: string = 'https://m-weeklypunch.me';
export const API_URL: string = 'https://weeklypunch-backend.herokuapp.com';

export const BLOGS_META_QUERY =
  '/api/blogs?fields[0]=title&fields[1]=description&fields[2]=views_count&fields[3]=author&fields[4]=likes_count&fields[5]=updatedAt&fields[6]=slug&populate[image]=*&pagination[pageSize]=50&sort[1]=publishedAt:DESC';

export const ALL_BLOGS_SLUG = '/api/blogs?fields[0]=slug';

export const GET_BLOG_BY_SLUG = '/api/blogs?filters[slug][$eq]=';

export const ADD_COMMENT = '/api/comments';

export const UPDATE_COMMENT =
  '/api/blogs?&fields[0]=slug&populate[comments][populate][0]=replies&filters[slug][$eq]=';

export const ADD_REPLY = '/api/replies';

export const INCREMENT_VIEW = '/api/blogs/';

export const PER_PAGE = 6;
