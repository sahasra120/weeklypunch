import React, { useState } from 'react';
import { Form, Input, Mentions, Card, Button, message } from 'antd';
import { CloseCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import ErrorBoundry from './HOC/ErrorBoundy';
import { validateEmail } from '../utils/utilsFunctions';
import { ADD_COMMENT, ADD_REPLY, API_URL, UPDATE_COMMENT } from '../data/constants';
import { useSWRConfig } from 'swr';

interface Props {
  onClose?: () => void;
  isReplyEditor?: boolean;
  blogId?: number;
  commentId?: number;
}
function CommentEditor({ onClose, isReplyEditor = false, blogId, commentId }: Props) {
  const { mutate } = useSWRConfig();
  const [comment, setComment] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const closeEditor = (x: () => void) => {
    x();
  };

  const submitHandller = async () => {
    if (validateEmail(email!)) {
      if (name == null || comment == null) {
        message.info('All fields are required');
      } else {
        if (isReplyEditor) {
          message.loading({
            content: 'Your Reply is submitting...',
            key: 'loading-reply',
            duration: 0,
          });
          const response = await fetch(API_URL + ADD_REPLY, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: {
                author_name: name,
                author_email: email,
                comment: comment,
                parent_comment: commentId,
              },
            }),
          });
          message.destroy('loading-reply');
          if (response.ok) {
            message.success('Reply Submitted');
            mutate(UPDATE_COMMENT);
            setName(null);
            setComment(null);
            setEmail(null);
            closeEditor(onClose!);
          } else {
            message.error('Something Happened Wrong. Try again later');
          }
        } else {
          message.loading({
            content: 'Your Comment is submitting...',
            key: 'loading-comment',
            duration: 0,
          });
          const response = await fetch(API_URL + ADD_COMMENT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: {
                author_name: name,
                author_email: email,
                comment: comment,
                blog: blogId,
              },
            }),
          });
          message.destroy('loading-comment');
          if (response.ok) {
            message.success('Comment Submitted');
            mutate(UPDATE_COMMENT);
            setName(null);
            setComment(null);
            setEmail(null);
          } else {
            message.error('Something Happened Wrong. Try again later');
          }
        }
      }
    } else {
      message.error('Invalid Email Address');
    }
  };

  return (
    <ErrorBoundry>
      <Card
        hoverable
        title={isReplyEditor ? 'Add Your Reply' : 'Add Your Comment'}
        extra={isReplyEditor && <CloseCircleOutlined onClick={onClose} />}
      >
        <Form.Item>
          <Input
            type="text"
            placeholder="your name"
            maxLength={40}
            prefix={<UserOutlined />}
            required
            onChange={(e) => setName(e.target.value)}
            value={name!}
          ></Input>
        </Form.Item>
        <Form.Item>
          <Input
            type="email"
            placeholder="your email"
            maxLength={40}
            prefix={<MailOutlined />}
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email!}
          ></Input>
        </Form.Item>
        <Form.Item>
          <Mentions
            rows={5}
            placeholder="your message"
            value={comment!}
            onChange={(text) => setComment(text)}
          >
            <Mentions.Option value="Sahasra">Sahasra</Mentions.Option>
            <Mentions.Option value="Rithika">Rithika</Mentions.Option>
          </Mentions>
        </Form.Item>
        <Button type="ghost" onClick={submitHandller}>
          {isReplyEditor ? 'Add Reply' : 'Add Comment'}
        </Button>
      </Card>
    </ErrorBoundry>
  );
}

export default CommentEditor;
