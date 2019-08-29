/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PropType from 'prop-types';
import { WidthProvider, Responsive } from 'react-grid-layout';
import GlobalStyle from './Styles';
import Header, { Help } from './Components/Header';
import { FormDataContext } from './Contexts/FormsContext';
import promisify from './Utils';
import ModalController from './Components/ModalController';
import { ModalContext } from './Contexts/ModalContext';
import History from './History';
import Tabs from './Components/Tabs/Index';
import { CleanDatabase, GetFormReports } from './DataStore';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function Page({ match }) {
  const [, setData] = React.useContext(FormDataContext);
  const [modal, setModal] = React.useContext(ModalContext);
  const [reports, setReports] = React.useState([]);

  React.useEffect(() => {
    const prom = promisify(global.JF.getFormQuestions);
    setModal(
      {
        isOpen: true,
        modalName: 'createReport',
      },
    );
    prom(match.params.id)
      .then(() => {
        setData(match.params.id);
      });
  }, [match]);

  React.useEffect(() => {
    const prom = GetFormReports(match.params.id);
    prom.then((reps) => {
      if (!reps) {
        setReports([]);
      } else {
        setReports(reps);
      }
    });
  }, [modal]);

  return (
    <div>
      <Header />
      <Tabs>
        {reports.map((rep) => (
          <div label={rep.name} key={rep.id} id={rep.id} />
        ))}
      </Tabs>

      <ResponsiveReactGridLayout
        className="layout"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
      >
        <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
          <span className="text">1</span>
        </div>
        <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>
          <span className="text">2</span>
        </div>
        <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}>
          <span className="text">3</span>
        </div>
        <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}>
          <span className="text">4</span>
        </div>
        <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}>
          <span className="text">5</span>
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default function App() {
  return (
    <Router history={History}>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Page} />
        <Route path="/help" component={Help} />
        <Route path="/:id(\d+)" component={Page} />
      </Switch>
      <ModalController />
    </Router>
  );
}

Page.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropType.object.isRequired,
};
