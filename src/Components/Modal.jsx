import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FormsProvider, { FormsContext } from '../Contexts/FormsContext';
import ModalProvider, { ModalContext } from '../Contexts/ModalContext';
import * as Styles from '../Styles/ModalStyles';
import { promisify } from '../Utils';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  static contextType = ModalContext;

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    console.log(this.context[0]);
    return (

        <Test isOpen={this.context[0]} rt={this.el}>
          {this.props.children}
        </Test>

    )
  }
}

const Test = ({children, isOpen, rt}) => {
  return isOpen ? ReactDOM.createPortal(children, rt) : null;
}

export function ModalView(){
  return(
    <ModalProvider>
      <Modal>
        <FormsProvider>
          <Styles.Root>
            <List />
          </Styles.Root>
        </FormsProvider>
      </Modal>
    </ModalProvider>
  )
}


function List(){
  const [forms, setForms] = useContext(FormsContext)
  const [isOpen, setIsOpen] = useContext(ModalContext)
  

  useEffect(() => {
    const prom = promisify(global.JF.getForms)
    prom({ limit: 200 })
    .then((res) => setForms(res))
  },[])

  const handleClick = (e) => {
    console.log("beforeset : " + isOpen)
    setIsOpen(false)
    console.log("afterset : " + isOpen)
  }

  return(
    <Styles.ModalDiv>
      <Styles.GlobalStyle />
      <Styles.FormListHeader>
          <h1>Select A Form</h1>
      </Styles.FormListHeader>
      <Styles.FormListContainer>
        {forms.map((f) => {
          return <Card key={f.id} name={f.title} desc={f.created_at} id={f.id} onClick={handleClick}/>
        })}
      </Styles.FormListContainer>
    </Styles.ModalDiv>
  )
}

function Card(props){
  return(
    <Styles.FormListItem href={"/#/" + props.id} onClick={props.onClick}>
      <Styles.ItemContent>
        <Styles.ItemTitle>{props.name}</Styles.ItemTitle>
          <Styles.ItemDesc>{props.desc}</Styles.ItemDesc>
      </Styles.ItemContent>
      <Styles.ItemLabels>

      </Styles.ItemLabels>
    </Styles.FormListItem>
  )
}