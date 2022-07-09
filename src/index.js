import React from 'react';
import ReactDOM from 'react-dom';
import {
  AdaptivityProvider,
  ConfigProvider,
  useAdaptivity,
  AppRoot,
  SplitLayout,
  SplitCol,
  ViewWidth,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  Button,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import MailItem from './components/MailItem';

const Example = () => {
  const [emailItems, setEmailItems] = React.useState([]);
  const [toggledMailItemIds, setToggledMailItemIds] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5000/mails')
      .then((data) => data.json())
      .then((data) => {
        setEmailItems(data);
      });
  }, []);

  const { viewWidth } = useAdaptivity();

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
  return (
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol spaced={viewWidth > ViewWidth.MOBILE}>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>MAIL</PanelHeader>

              <div>
                <Button disabled={toggledMailItemIds.length === 0} onClick={sendToToggleMailItems}>
                  Изменить прочитанность выделенных сообщений на противоположную
                </Button>
                <Button onClick={toggleAllHandle}>Выделить все сообщения</Button>
              </div>
              <Group header={<Header mode="secondary">Сообщения</Header>}>
                {emailItems.map((data, id) => (
                  <MailItem
                    checkBoxValue={toggledMailItemIds.includes(id)}
                    onCheckBoxClick={() => checkBoxClickHandle(id)}
                    key={data.author + data.dateTime}
                    data={data}>
                    {' '}
                  </MailItem>
                ))}
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};

ReactDOM.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <Example />
    </AdaptivityProvider>
  </ConfigProvider>,
  document.getElementById('root'),
);
