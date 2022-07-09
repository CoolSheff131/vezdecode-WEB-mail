import './App.css';

import React from 'react';

import { AppRoot, Header, Group, Button, FormItem, RadioGroup, Radio } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import MailItem from './components/MailItem';
import VirtualizedList from './components/VirtualizedList';

function App() {
  const [emailItems, setEmailItems] = React.useState([]);
  const [toggledMailItemIds, setToggledMailItemIds] = React.useState([]);
  const [backgroundImage, setBackgroundImage] = React.useState(null);

  React.useEffect(() => {
    fetch('http://localhost:5000/mails')
      .then((data) => data.json())
      .then((data) => {
        setEmailItems(data);
      });
  }, []);

  const checkBoxClickHandle = (mailItemId) => {
    if (toggledMailItemIds.includes(mailItemId)) {
      setToggledMailItemIds(toggledMailItemIds.filter((id) => id !== mailItemId));
    } else {
      setToggledMailItemIds([...toggledMailItemIds, mailItemId]);
    }
  };

  const sendToToggleMailItems = () => {
    const body = { ids: toggledMailItemIds };

    fetch('http://localhost:5000/mails/toggleread', {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setEmailItems(data);
      });
  };
  const toggleAllHandle = () => {
    setToggledMailItemIds(emailItems.map((_, index) => index));
  };

  const themeChangeHandle = (theme) => {
    let themeValue = theme.target.value;

    switch (themeValue) {
      case 'light':
        document.documentElement.style.setProperty('--main-color', '#fff');
        setBackgroundImage(null);
        document.documentElement.style.setProperty('--secondary-color', '#fff');
        break;
      case 'cat':
        document.documentElement.style.setProperty('--main-color', '#fff');
        setBackgroundImage('cat');
        document.documentElement.style.setProperty('--secondary-color', '#fff');
        break;
      case 'dog':
        document.documentElement.style.setProperty('--main-color', '#fff');
        setBackgroundImage('dog');
        document.documentElement.style.setProperty('--secondary-color', '#fff');
        break;
      default:
        setBackgroundImage(null);
        document.documentElement.style.setProperty('--main-color', '#000');
        document.documentElement.style.setProperty('--secondary-color', '#222');
    }
  };
  return (
    <AppRoot className="root">
      <div
        className={`container background ${
          backgroundImage === 'cat'
            ? 'background-cat'
            : backgroundImage === 'dog'
            ? 'background-dog'
            : ''
        }`}>
        <div className="settings">
          <Button disabled={toggledMailItemIds.length === 0} onClick={sendToToggleMailItems}>
            Изменить прочитанность выделенных сообщений на противоположную
          </Button>
          <Button onClick={toggleAllHandle}>Выделить все сообщения</Button>

          <FormItem onChange={themeChangeHandle}>
            <h1>Тема</h1>
            <RadioGroup>
              <Radio name="theme" className="radio" value="light">
                Светлая
              </Radio>
              <Radio name="theme" className="radio" value="black" defaultChecked>
                Темная
              </Radio>
              <Radio name="theme" className="radio" value="cat">
                C котиками
              </Radio>
              <Radio name="theme" className="radio" value="dog">
                С собачками
              </Radio>
            </RadioGroup>
          </FormItem>
        </div>
        <div>
          <VirtualizedList
            data={emailItems}
            renderItemProps={{
              checkBoxValue: (id) => toggledMailItemIds.includes(id),
              onCheckBoxClick: (id) => checkBoxClickHandle(id),
            }}
            itemHeight={40}
            renderItem={MailItem}
            windowHeight={800}></VirtualizedList>
        </div>
      </div>
    </AppRoot>
  );
}

export default App;
