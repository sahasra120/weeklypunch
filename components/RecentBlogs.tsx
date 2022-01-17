import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { PER_PAGE } from '../data/constants';
import { BLOGS_META_PROPS } from '../utils/BlogTypes';
import BlogCard from './BlogCard';
interface Props {
  data: BLOGS_META_PROPS[];
  totalBlogs: number;
}

function RecentBlogs({ data, totalBlogs }: Props) {
  const Router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);

  let indexOfLastPost = currentPage * PER_PAGE;
  let indexOfFirstPost = indexOfLastPost - PER_PAGE;
  let currentPageBlogs = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginationHandller = (page: number) => {
    setCurrentPage(page);
    Router.push(`/#blogs`);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          transition: 'height 5s ease',
        }}
      >
        {currentPageBlogs.map((blog) => {
          return (
            <BlogCard
              key={blog.id}
              width={300}
              title={blog.attributes.title}
              author={blog.attributes.author}
              description={blog.attributes.description}
              coverImage={blog.attributes.image.data.attributes.url}
              date={blog.attributes.updatedAt}
              likes={blog.attributes.likes_count}
              views={blog.attributes.views_count}
              slug={blog.attributes.slug}
            />
          );
        })}
      </div>
      <br />
      <div style={{ textAlign: 'center' }}>
        <Pagination
          current={currentPage}
          total={totalBlogs}
          defaultCurrent={1}
          onChange={paginationHandller}
          defaultPageSize={PER_PAGE}
          pageSize={PER_PAGE}
        />
      </div>
    </>
  );
}

export default React.memo(RecentBlogs);
