import './App.css';

import React from 'react';

import { AppRoot, Header, Group, Button, FormItem, RadioGroup, Radio } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import MailItem from './components/MailItem';
import VirtualizedList from './components/VirtualizedList';
import MailPage from './components/MailPage';

function App() {
  const [emailItems, setEmailItems] = React.useState([]);
  const [toggledMailItemIds, setToggledMailItemIds] = React.useState([]);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [mailToShow, setMailToShow] = React.useState(null);
  const [theme, setTheme] = React.useState('black');

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
    setTheme(themeValue);
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
      {!mailToShow && (
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
                <Radio
                  name="theme"
                  className="radio"
                  value="light"
                  defaultChecked={theme === 'light'}>
                  Светлая
                </Radio>
                <Radio
                  name="theme"
                  className="radio"
                  value="black"
                  defaultChecked={theme === 'black'}>
                  Темная
                </Radio>
                <Radio name="theme" className="radio" value="cat" defaultChecked={theme === 'cat'}>
                  C котиками
                </Radio>
                <Radio name="theme" className="radio" value="dog" defaultChecked={theme === 'dog'}>
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
                setMailToShow,
              }}
              itemHeight={40}
              renderItem={MailItem}
              windowHeight={800}></VirtualizedList>
          </div>
        </div>
      )}

      {mailToShow && (
        <div>
          <Button onClick={() => setMailToShow(null)}>Показать список</Button>
          <MailPage data={mailToShow}></MailPage>
        </div>
      )}
    </AppRoot>
  );
}

export default App;
