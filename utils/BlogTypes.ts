export interface API_PROPS {
  data: [];
  meta: {};
}

export interface BLOGS_META_PROPS {
  id: number;
  attributes: {
    title: string;
    description: string;
    views_count: number;
    author: string;
    likes_count: number;
    updatedAt: string;
    slug: string;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
}
