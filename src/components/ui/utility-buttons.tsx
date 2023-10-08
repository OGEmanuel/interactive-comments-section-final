import IconDelete from '../../assets/icons/icon-delete';
import IconEdit from '../../assets/icons/icon-edit';
import IconReply from '../../assets/icons/icon-reply';

export const Reply = () => {
  return (
    <div className="flex items-center gap-2">
      <IconReply />
      <p className="font-medium text-lg text-[#5457b6]">Reply</p>
    </div>
  );
};

export const Delete = () => {
  return (
    <div className="flex items-center gap-2">
      <IconDelete />
      <p className="font-medium text-lg text-[#ED6368]">Delete</p>
    </div>
  );
};

export const Edit = () => {
  return (
    <div className="flex items-center gap-2">
      <IconEdit />
      <p className="font-medium text-lg text-[#5457b6]">Edit</p>
    </div>
  );
};
