import { Image, message } from 'antd';
import {
  AliyunOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import ErrorBoundry from '../../components/HOC/ErrorBoundy';
import Seo from '../../components/Seo';
import CommentEditor from '../../components/CommentEditor';
import VoiceDialog from '../../components/VoiceDialog';
import {
  ALL_BLOGS_SLUG,
  API_URL,
  GET_BLOG_BY_SLUG,
  INCREMENT_VIEW,
  SITE_URL,
} from '../../data/constants';
import { API_PROPS } from '../../utils/BlogTypes';
import ReactMarkdown from 'react-markdown';
import CommentsSection from '../../components/CommentsSection';
import Rating from '../../components/Rating';

function Article({ data }: any) {
  useEffect(() => {
    (async () => {
      await fetch(API_URL + INCREMENT_VIEW + data.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            views_count: data.attributes.views_count + 1,
          },
        }),
      }).catch((err) => console.error(err));
    })();
  }, []);

  const clipboard = (url: string) => {
    if (!navigator.clipboard) {
      message.info('your browser does not support clipboard');
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          message.success('link copied to clipboard');
        })
        .catch((err) => {
          message.error('link not copied to clipboard');
        });
    }
  };

  function isMobileOrTablet() {
    return /(android|iphone|ipad|mobile)/i.test(navigator.userAgent);
  }

  const openPopup = (url: string) => {
    window.open(url, 'Share', 'popup,width=400,height=400');
  };

  return (
    <>
      <Seo
        title={data.attributes.title}
        description={data.attributes.description}
        author={data.attributes.author}
        ogImage={data.attributes.image.data.attributes.url}
      />
      <div>
        <h1 className="title">Weeklypunch</h1>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '38px' }}>{data.attributes.title}</h1>
          <p style={{ fontWeight: '700', color: 'gray' }}>{data.attributes.author}</p>
          <p style={{ color: '#808080' }}>{new Date(data.attributes.updatedAt).toDateString()}</p>
          <ErrorBoundry>
            <Image
              src={data.attributes.image.data.attributes.url}
              alt=""
              fallback="data:image/png;base64,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"
              preview
              width="550px"
              height="350px"
              style={{ objectFit: 'cover' }}
            />
          </ErrorBoundry>
        </div>
        <br />
        <VoiceDialog content={data.attributes.content} />
        <br />
        <article style={{ textAlign: 'justify', padding: '20px' }}>
          <ReactMarkdown>{data.attributes.content}</ReactMarkdown>
        </article>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Rating
            slug={data.attributes.slug}
            id={data.id}
            title={data.attributes.title}
            like_count={data.attributes.likes_count > 0 ? data.attributes.likes_count : 1}
            rating={data.attributes.rating != null ? parseInt(data.attributes.rating) : 3}
          />

          <div style={{ display: 'flex' }}>
            <FacebookOutlined
              style={{ fontSize: '24px', padding: '0 2.5px' }}
              onClick={() => {
                openPopup(
                  `https://www.facebook.com/sharer/sharer.php?u=${
                    SITE_URL + '/article/' + data.attributes.slug
                  }`,
                );
              }}
            />
            <WhatsAppOutlined
              style={{ fontSize: '24px', padding: '0 2.5px' }}
              onClick={() => {
                openPopup(
                  `https://'${isMobileOrTablet() ? 'api' : 'web'}'.whatsapp.com/send?text=${
                    SITE_URL + '/article/' + data.attributes.slug
                  }`,
                );
              }}
            />
            <LinkedinOutlined
              style={{ fontSize: '24px', padding: '0 2.5px' }}
              onClick={() =>
                openPopup(
                  `https://linkedin.com/shareArticle?url=${
                    SITE_URL + '/article/' + data.attributes.slug
                  }`,
                )
              }
            />
            <AliyunOutlined
              style={{ fontSize: '24px', padding: '0 2.5px' }}
              onClick={() => clipboard(`${SITE_URL + '/article/' + data.attributes.slug}`)}
            />
          </div>
        </div>
        <br />
        <h1 className="title">Comments</h1>

        <CommentsSection slug={data.attributes.slug} comments={data.attributes.comments.data} />

        <br />

        <CommentEditor blogId={data.id} />

        <Footer />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetch(API_URL + ALL_BLOGS_SLUG);
  if (response.ok) {
    const RawData: API_PROPS = await response.json();
    const data = RawData.data;
    const params: {}[] = data.map((blog: any) => {
      return {
        params: {
          slug: blog.attributes.slug,
        },
      };
    });
    return {
      paths: params,
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }: any) {
  const { slug } = params;
  const response = await fetch(
    API_URL +
      GET_BLOG_BY_SLUG +
      slug +
      '&populate[comments][populate][0]=replies&populate[image]=*',
  );
  if (response.ok) {
    const RawData: API_PROPS = await response.json();
    const data: any = RawData.data;
    return {
      props: {
        data: data[0],
      },
      revalidate: 1500,
    };
  }
}

export default Article;
