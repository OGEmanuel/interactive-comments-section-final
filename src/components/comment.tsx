import Card from './ui/card';
import Reply from './reply';
import { commentsDataTypes, userTypes } from './data-types';
import { useContext, useState } from 'react';
import CommentsContext from '../store/get-comments';
import Input from './ui/input';

type CommentPropsType = {
  curUser: userTypes | undefined;
};

const Comment = (props: CommentPropsType) => {
  const { curUser } = props;
  const [isReplying, setIsReplying] = useState<string | undefined>(undefined);
  const comments: commentsDataTypes[] = useContext(CommentsContext) || [];

  const handleReplyClick = (id: string | undefined) => {
    if (isReplying === id) {
      return setIsReplying(undefined);
    }

    setIsReplying(id);
  };

  return (
    <div className="flex flex-col gap-5">
      {comments.map(comment => (
        <div key={comment.id} className="flex flex-col gap-5">
          <Card
            urlPlus={`http://localhost:8080/increment-score?id=${comment.id}`}
            urlMinus={`http://localhost:8080/decrement-score?id=${comment.id}`}
            onReplyClick={handleReplyClick}
            id={comment.id}
            className="px-7 py-7"
            content={comment.content}
            score={comment.score}
            user={comment.user}
            createdAt={comment.createdAt}
            curUser={curUser}
          />
          {comment.replies.length > 0 && (
            <div className="border-l-[.2rem] ml-12 flex flex-col gap-5">
              {comment.replies.map(reply => (
                <div key={reply.id} className="flex flex-col gap-5">
                  <Reply
                    commentId={comment.id}
                    replies={reply}
                    curUser={curUser}
                  />
                </div>
              ))}
            </div>
          )}

          {comment.user.username !== curUser?.username &&
            isReplying === comment.id && (
              <Input
                replyingTo={comment.user.username}
                url={`http://localhost:8080/add-reply/${comment.id}`}
                type="REPLY"
                curUser={curUser}
                hideInput={setIsReplying}
              />
            )}
        </div>
      ))}
    </div>
  );
};

export default Comment;
