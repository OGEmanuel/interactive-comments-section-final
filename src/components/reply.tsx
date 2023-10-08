import { useState } from 'react';
import { replies, userTypes } from './data-types';
import Card from './ui/card';
import Input from './ui/input';

type ReplyPropsType = {
  replies: replies;
  curUser: userTypes | undefined;
  commentId: string;
};

const Reply = (props: ReplyPropsType) => {
  const [isReplying, setIsReplying] = useState<string | undefined>(undefined);
  const { replies, curUser, commentId } = props;

  const handleReplyClick = (id: string | undefined) => {
    if (isReplying === id) {
      return setIsReplying(undefined);
    }

    setIsReplying(id);
  };

  return (
    <>
      <Card
        urlMinus={`http://localhost:8080/decrement-reply-score/${commentId}?id=${replies.id}`}
        urlPlus={`http://localhost:8080/increment-reply-score/${commentId}?id=${replies.id}`}
        onReplyClick={handleReplyClick}
        id={replies.id}
        className="px-7 py-7 ml-10"
        replyingTo={replies.replyingTo}
        content={replies.content}
        createdAt={replies.createdAt}
        score={replies.score}
        user={replies.user}
        curUser={curUser}
      />
      {replies.user.username !== curUser?.username &&
        isReplying === replies.id && (
          <div className="ml-10">
            <Input
              url={`http://localhost:8080/add-reply/${commentId}`}
              type="REPLY"
              curUser={curUser}
              replyingTo={replies.user.username}
              hideInput={setIsReplying}
            />
          </div>
        )}
    </>
  );
};

export default Reply;
