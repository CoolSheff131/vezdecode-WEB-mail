import { Checkbox, Text } from '@vkontakte/vkui';
import './styles/MailItem.css';

const MailItem = ({ style, data, onCheckBoxClick, checkBoxValue, setMailToShow }) => {
  const checkBoxClickHandle = (event) => {
    event.stopPropagation();
    onCheckBoxClick();
  };
  return (
    <div
      style={style}
      className="mail-item"
      onClick={() => {
        setMailToShow(data);
      }}>
      <Checkbox checked={checkBoxValue} onClick={checkBoxClickHandle}></Checkbox>

      <div className="mail-item__author">{data.author.name}</div>
      <div className="mail-item__title">{data.title}</div>
      <div className="mail-item__text">{data.text}</div>
      {data.finance && <div className="mail-item__finance">₽</div>}
      <div className="mail-item__date-time">{data.dateTime}</div>

      {!data.read && <div className="mail-item__new">New</div>}

      {data.important && <div className="mail-item__important">!</div>}
    </div>
  );
};

export default MailItem;
