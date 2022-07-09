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
  SimpleCell,
  Checkbox,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import smalData from './data/small.json';
import MailItem from './components/MailItem';

const Example = () => {
  const { viewWidth } = useAdaptivity();

  return (
    <AppRoot>
      <SplitLayout header={<PanelHeader separator={false} />}>
        <SplitCol spaced={viewWidth > ViewWidth.MOBILE}>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader>MAIL</PanelHeader>
              <Group header={<Header mode="secondary">Сообщения</Header>}>
                {smalData.map((data) => (
                  <MailItem key={data.author + data.dateTime} data={data}>
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
