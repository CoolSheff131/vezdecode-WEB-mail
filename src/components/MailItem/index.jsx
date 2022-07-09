import { Checkbox, Text } from '@vkontakte/vkui';
import './styles/MailItem.css';

const MailItem = ({ data }) => {
  return (
    <div className="mail-item">
      <Checkbox></Checkbox>

      <div className="mail-item__author">{data.author.name}</div>
      <div className="mail-item__title">{data.title}</div>
      <div className="mail-item__text">{data.text}</div>
      <div className="mail-item__date-time">{data.dateTime}</div>
    </div>
  );
};

export default MailItem;
