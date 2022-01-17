import React from 'react';
import { Button, Card } from 'antd';
import {
  ClockCircleOutlined,
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import ErrorBoundry from './HOC/ErrorBoundy';
import { SITE_URL } from '../data/constants';

interface Props {
  width: string | number;
  coverImage: string;
  title: string;
  description: string;
  author: string;
  date: string;
  views: number;
  likes: number;
  slug: string;
}

function BlogCard(props: Props) {
  return (
    <ErrorBoundry>
      <Card
        style={{ width: props.width, margin: '20px' }}
        cover={
          <img
            loading="eager"
            alt={props.title}
            src={props.coverImage}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        }
        hoverable
        actions={[
          <div key="author">
            <EditOutlined />
            <p>{props.author}</p>
          </div>,
          <div key="date">
            <ClockCircleOutlined />
            <p>
              {new Date(props.date).getDate().toString() +
                '/' +
                (new Date(props.date).getMonth() + 1).toString() +
                '/' +
                new Date(props.date).getFullYear().toString()}
            </p>
          </div>,
          <div key="likes">
            <HeartOutlined />
            <p>{props.likes}</p>
          </div>,
        ]}
      >
        <span>
          <EyeOutlined /> {props.views}
        </span>
        <br />
        <br />
        <Card.Meta title={props.title} description={props.description} />
        <br />
        <Button
          type="link"
          href={SITE_URL + '/article/' + props.slug}
          shape="circle"
          icon={<ReadOutlined />}
        >
          Read More
        </Button>
      </Card>
    </ErrorBoundry>
  );
}

export default BlogCard;
