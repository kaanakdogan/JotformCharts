/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PropType from 'prop-types';
import Header, { Help, Home } from './Components/Header';
import { ModalView } from './Components/Modal/Index';
import { FormDataContext } from './Contexts/FormsContext';
import promisify from './Utils';
import List from './Components/FormsList/Index';

function Page({ match }) {
  const [, setData] = React.useContext(FormDataContext);

  React.useEffect(() => {
    const prom = promisify(global.JF.getFormQuestions);
    prom(match.params.id)
      .then((res) => {
        setData(Object.values(res));
      });
  }, []);

  return (
    <div>
      <Header />
      <h1>Form Data: {match.params.id}</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/help" component={Help} />
        <Route path="/:id(\d+)" component={Page} />
      </Switch>
      <ModalView header={<h1>Select A Form</h1>}><List /></ModalView>
    </Router>
  );
}

Page.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropType.object.isRequired,
};
