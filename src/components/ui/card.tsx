import { userTypes } from '../data-types';
import Rate from '../rate';
import User from '../user';
import { Delete, Edit, Reply } from './utility-buttons';

type CardProps = {
  onReplyClick: (id: string | undefined) => void;
  onOpenModal?: () => void;
  id: string | undefined;
  className: string;
  content: string;
  score: number;
  createdAt: string;
  user: userTypes;
  replyingTo?: string;
  curUser: userTypes | undefined;
  urlPlus: string;
  urlMinus: string;
};

const Card = (props: CardProps) => {
  const {
    onReplyClick,
    onOpenModal,
    id,
    content,
    className,
    replyingTo,
    score,
    createdAt,
    user,
    curUser,
    urlPlus,
    urlMinus,
  } = props;

  const handleReplyClick = (id: string | undefined) => {
    onReplyClick(id);
  };
  const classes = 'bg-white rounded-xl flex gap-7 ' + className;
  return (
    <div className={classes}>
      <Rate urlMinus={urlMinus} urlPlus={urlPlus} score={score} />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between">
          <User user={user} createdAt={createdAt} curUser={curUser} />
          {user.username !== curUser?.username && (
            <button onClick={() => handleReplyClick(id)}>
              <Reply />
            </button>
          )}
          {user.username === curUser?.username && (
            <div className="flex items-center gap-4">
              <button onClick={onOpenModal}>
                <Delete />
              </button>
              <button>
                <Edit />
              </button>
            </div>
          )}
        </div>
        <div className="text-lg">
          <p className="text-[#67727e]">
            {replyingTo && (
              <span className="font-medium text-[#5457b6]">{`@${replyingTo}`}</span>
            )}{' '}
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
