import Head from 'next/head';
interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
}

function Seo({ title, description, keywords, author, ogImage }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title}></meta>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta property="og:description" content={description}></meta>
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta property="og:image" content={`https://www.weeklypunch.me/${ogImage}`}></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=The+Nautigal:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />

        <meta
          name="google-site-verification"
          content="dBxrxqZ8TcvDMO0dWi1XP1eL4W4A54p6JnJiKvwtvGg"
        />
        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></script>
      </Head>
    </>
  );
}

Seo.defaultProps = {
  title: 'Home | weeklypunch',
  description:
    "Weeklypunch is a home for motivational and inspirational blogs.Weekly you all get a new update here .From here let's start our journey together...",
  keywords: 'sahasra , blogging, motivate quotes, weeklypunch kec',
  author: 'sahasra',
  ogImage: '/ogImage.jpg',
};

export default Seo;
