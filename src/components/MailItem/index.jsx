import { Checkbox, Text } from '@vkontakte/vkui';
import './styles/MailItem.css';

const MailItem = ({ data, onCheckBoxClick, checkBoxValue }) => {
  console.log('====================================');
  console.log(checkBoxValue);
  console.log('====================================');
  return (
    <div className="mail-item">
      <Checkbox checked={checkBoxValue} onClick={onCheckBoxClick}></Checkbox>

      <div className="mail-item__author">{data.author.name}</div>
      <div className="mail-item__title">{data.title}</div>
      <div className="mail-item__text">{data.text}</div>
      <div className="mail-item__date-time">{data.dateTime}</div>
      <div className="mail-item__date-time">{data.read ? 'Прочитано' : 'Не прочитано'}</div>
    </div>
  );
};

export default MailItem;
