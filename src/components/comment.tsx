import Card from './ui/card';
import Reply from './reply';
import { commentsDataTypes, userTypes } from './data-types';
import { useContext, useState } from 'react';
import CommentsContext from '../store/get-comments';
import Input from './ui/input';
import Modal from './ui/modal';

type CommentPropsType = {
  curUser: userTypes | undefined;
};

const Comment = (props: CommentPropsType) => {
  const { curUser } = props;
  const [isReplying, setIsReplying] = useState<string | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const comments: commentsDataTypes[] = useContext(CommentsContext) || [];

  const handleReplyClick = (id: string | undefined) => {
    if (isReplying === id) {
      return setIsReplying(undefined);
    }

    setIsReplying(id);
  };

  const handleOpenModal = (id: string) => {
    setOpenModal(!openModal);
    console.log(id);
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
            onOpenModal={() => handleOpenModal(comment.id)}
          />

          {comment.replies.length > 0 && (
            <div className="border-l-[.2rem] ml-12 flex flex-col gap-5">
              {comment.replies.map(reply => (
                <div key={reply.id} className="flex flex-col gap-5">
                  <Reply
                    commentId={comment.id}
                    replies={reply}
                    curUser={curUser}
                    modalActive={() => handleOpenModal(comment.id)}
                    modalOpen={openModal}
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

          {openModal && (
            <Modal
              url={`http://localhost:8080/delete-comment/${comment.id}`}
              modalActive={() => handleOpenModal(comment.id)}
            />
          )}
          {/* {openModal && (
            <Modal
              closeModal={handleOpenModal}
              url={`http://localhost:8080/delete-comment/${comment.id}`}
            />
          )} */}
        </div>
      ))}
    </div>
  );
};

export default Comment;
