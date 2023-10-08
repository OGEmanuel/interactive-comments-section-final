import { userTypes } from './data-types';

type UserPropsType = {
  user: userTypes;
  createdAt: string;
  curUser: userTypes | undefined;
};

const User = (props: UserPropsType) => {
  const { user, createdAt, curUser } = props;
  return (
    <div className="flex items-center gap-4">
      <img src={user.image.png} alt={user.username} className="w-[2.5rem]" />
      <p className="font-medium text-lg text-[#324152]">{user.username}</p>
      {user.username === curUser?.username && (
        <p className="bg-[#5457b6] text-white rounded-sm py-[0.1rem] px-2 text-sm">
          you
        </p>
      )}
      <p className="text-[#67727e] text-lg">{createdAt}</p>
    </div>
  );
};

export default User;
