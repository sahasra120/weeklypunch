import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { message, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_URL, INCREMENT_VIEW } from '../data/constants';
import { getStorage, setStorage } from '../utils/utilsFunctions';

interface Props {
  slug: string;
  id: number;
  like_count: number;
  rating: number;
  title: string;
}

const customIcons: any = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

function Rating({ slug, title, like_count, rating, id }: Props) {
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDisabled(getStorage(slug));
  }, []);

  const feedbackChange = (rate: number) => {
    message.info({
      content: 'Submitting your feedback',
      duration: 0,
      key: 'feedback',
    });
    (async () => {
      await fetch(API_URL + INCREMENT_VIEW + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            likes_count: like_count + 1,
            rating: rating + rate,
          },
        }),
      }).catch((err) => {
        message.destroy('feedback');
        message.error('Something Went Wrong');
      });
      message.destroy('feedback');
      message.success(`Liked ${title} article `);
      setStorage(slug);
      setDisabled(true);
    })();
  };

  return (
    <div>
      <Rate
        defaultValue={rating / like_count}
        character={({ index }: { index: number }) => customIcons[index + 1]}
        onChange={feedbackChange}
        disabled={disabled}
        style={{ color: 'blue', marginLeft: '20px', fontSize: '24px' }}
      />
    </div>
  );
}

export default Rating;
