import { Empty } from 'antd';
import React from 'react';
import BlogComment from './BlogComment';
import useSWR from 'swr';
import { API_URL, UPDATE_COMMENT } from '../data/constants';

interface Props {
  slug: any;
  comments: any;
}

function CommentsSection({ slug, comments }: Props) {
  const fetchNewComments = () => {
    return fetch(API_URL + UPDATE_COMMENT + slug).then((response) => response.json());
  };

  const newComments = useSWR(UPDATE_COMMENT, fetchNewComments, {
    dedupingInterval: undefined,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateIfStale: false,
  });

  return (
    <>
      {!newComments.data ? (
        comments.length > 0 ? (
          comments.map((comment: any) => {
            return (
              <BlogComment
                key={comment.id}
                name={comment.attributes.author_name}
                content={comment.attributes.comment}
                date={comment.attributes.createdAt}
                commentId={comment.id}
              >
                {comment.attributes.replies.data.map((reply: any) => {
                  return (
                    <BlogComment
                      key={reply.id}
                      commentId={comment.id}
                      name={reply.attributes.author_name}
                      content={reply.attributes.comment}
                      date={reply.attributes.createdAt}
                    />
                  );
                })}
              </BlogComment>
            );
          })
        ) : (
          <Empty description={'Add Your Comment Here'} />
        )
      ) : (
        newComments.data &&
        newComments.data.data[0].attributes.comments.data.map((comment: any) => {
          return (
            <BlogComment
              key={comment.id}
              name={comment.attributes.author_name}
              content={comment.attributes.comment}
              date={comment.attributes.createdAt}
              commentId={comment.id}
            >
              {comment.attributes.replies.data.map((reply: any) => {
                return (
                  <BlogComment
                    key={reply.id}
                    commentId={comment.id}
                    name={reply.attributes.author_name}
                    content={reply.attributes.comment}
                    date={reply.attributes.createdAt}
                  />
                );
              })}
            </BlogComment>
          );
        })
      )}
    </>
  );
}

export default CommentsSection;
