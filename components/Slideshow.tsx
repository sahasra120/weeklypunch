import React from 'react';
import { Carousel } from 'antd';
import Hero from './Hero';
import { CarouselEffect, DotPosition } from 'antd/lib/carousel';
import { BLOGS_META_PROPS } from '../utils/BlogTypes';
import { SITE_URL } from '../data/constants';

interface Props {
  width: string | number;
  height: string | number;
  dot?: DotPosition;
  effect?: CarouselEffect;
  data: BLOGS_META_PROPS[];
}

function Slideshow({ width, height, dot, effect, data }: Props) {
  return (
    <div style={{ width, height }}>
      <Carousel autoplay dotPosition={dot} effect={effect}>
        {data.map((blog) => {
          return (
            <div key={blog.id}>
              <Hero
                src={blog.attributes.image.data.attributes.url}
                style={{ width, height }}
                title={blog.attributes.title}
                href={SITE_URL + '/article/' + blog.attributes.slug}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Slideshow;
