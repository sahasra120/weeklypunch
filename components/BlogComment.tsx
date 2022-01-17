import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Comment, Divider } from 'antd';
import React, { useState } from 'react';
import CommentEditor from './CommentEditor';
import ErrorBoundry from './HOC/ErrorBoundy';

interface Props {
  children?: React.ReactNode;
  name: string;
  content: string;
  date: string;
  commentId: number;
}

function BlogComment(props: Props) {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const onEditorClose = () => setShowEditor(false);

  return (
    <ErrorBoundry>
      <Comment
        author={<a>{props.name}</a>}
        avatar={<Avatar>{props.name[0]}</Avatar>}
        content={<p>{props.content}</p>}
        datetime={<p>{new Date(props.date).toDateString()}</p>}
        actions={[
          <Button type="text" size="small" onClick={() => setShowEditor(true)}>
            Reply
          </Button>,
        ]}
      >
        {showEditor && (
          <CommentEditor isReplyEditor={true} onClose={onEditorClose} commentId={props.commentId} />
        )}
        {props.children}
      </Comment>
    </ErrorBoundry>
  );
}

export default BlogComment;
