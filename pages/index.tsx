import { AutoComplete, Card, Steps } from 'antd';
import ErrorBoundary from '../components/HOC/ErrorBoundy';
import Seo from '../components/Seo';
import Slideshow from '../components/Slideshow';
import Footer from '../components/Footer';
import { API_URL, BLOGS_META_QUERY, SITE_URL } from '../data/constants';
import { API_PROPS, BLOGS_META_PROPS } from '../utils/BlogTypes';
import RecentBlogs from '../components/RecentBlogs';
import { useState } from 'react';
import Search from 'antd/lib/input/Search';
import { useRouter } from 'next/router';

interface Props {
  data: BLOGS_META_PROPS[];
}

const Home = ({ data }: Props) => {
  const Router = useRouter();

  const searchBlogs = (query: string) => {
    const result: { value: string; label: string }[] = [];
    data.forEach((blog) => {
      if (blog.attributes.title.toLowerCase().includes(query.toLowerCase())) {
        result.push({
          value: blog.attributes.slug,
          label: blog.attributes.title,
        });
      }
    });
    return result;
  };

  const [options, setOptions] = useState<{ label: string; value: string }[]>(searchBlogs(''));

  const onSearch = (value: string) => {
    setOptions(searchBlogs(value));
  };

  const searchSelectHandller = (slug: string) => {
    Router.push(SITE_URL + '/article/' + slug);
  };

  return (
    <div>
      <Seo />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            height: '520px',
            position: 'relative',
          }}
        >
          <ErrorBoundary style={{ width: '32vw', height: '300px' }}>
            <Slideshow width={'32vw'} height={'300px'} data={[...data].reverse().slice(0, 3)} />
          </ErrorBoundary>
          <div style={{ paddingLeft: '1vw' }}></div>
          <ErrorBoundary style={{ width: '40vw', height: '500px' }}>
            <Slideshow
              width={'40vw'}
              height={'500px'}
              dot="right"
              effect={'fade'}
              data={data.slice(0, 3)}
            />
          </ErrorBoundary>
          <div
            style={{
              position: 'absolute',
              top: '320px',
              left: 0,
              width: '32vw',
              padding: '5px',
              minHeight: '180px',
            }}
          >
            <h1 className="title">Weeklypunch</h1>
            <p style={{ fontSize: '16px' }}>
              Our goal to motivate all to reach their full potenial while living happy lives !
            </p>
          </div>
        </div>
      </div>
      <section id="blogs">
        <h1 className="title">Recent Blogs</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AutoComplete
            onSearch={onSearch}
            onSelect={searchSelectHandller}
            options={options}
            style={{ width: '80%' }}
          >
            <Search placeholder="search" allowClear enterButton="Search" size="large" />
          </AutoComplete>
        </div>

        <br />
        <br />
        <RecentBlogs data={data} totalBlogs={data.length} />
      </section>

      <br />
      <h1 className="title">Subscribe For More Updates</h1>
      <ErrorBoundary>
        <Steps size="small">
          <Steps.Step
            title="Click the bell icon"
            description="click the bell icon on the bottom right"
          ></Steps.Step>
          <Steps.Step title="Allow" description="allow the notifications"></Steps.Step>
          <Steps.Step
            title="Subscribe"
            description="you can get more updates from us!!"
          ></Steps.Step>
        </Steps>
      </ErrorBoundary>
      <br />

      <section id="about-us">
        <h1 className="title">About Us</h1>
        <Card hoverable>
          <p>
            {` Hi there I'm so glad you're here ! I'm honoured that you want to get to know me a little
            better if you stumbled across this page on accident. I'm a blogger , I write all about
            motivational and inspirational stories here , I started this blog without any idea what
            I wanted to do , then it becomes my goal to motivate all to reach their full potenial
            while living happy lives !`}
          </p>
          <br />
          <Card.Meta description="instagram.com/weekly_punch" />
        </Card>
      </section>

      <br />
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch(API_URL + BLOGS_META_QUERY);
  if (response.ok) {
    const RawData: API_PROPS = await response.json();
    return {
      props: {
        data: RawData.data,
      },
      revalidate: 1500,
    };
  }
}

export default Home;
