import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import FormsProvider, { FormsContext} from '../Contexts/FormsContext';
import * as Styles from '../Styles/ModalStyles';


const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
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
    return ReactDOM.createPortal(
      this.props.children,
      modalRoot,
    );
  }
}

export function Parent(){
  return(
    <Modal>
    <FormsProvider>
      <Styles.Root>
        <List />
      </Styles.Root>
    </FormsProvider>
    </Modal>
  )
}


function List(){
  const [forms, setForms] = useContext(FormsContext)
  new Promise((resolve, reject) => {
    global.JF.getForms({ limit: 200 } ,response => {
      if(response) {
        resolve(response);
      }
    })
  }).then((res) => setForms(res) )
  


  return(
    <Styles.ModalDiv>
      <Styles.GlobalStyle />
      <Styles.FormListHeader>
          <h1>Select A Form</h1>
      </Styles.FormListHeader>
      <Styles.FormListContainer>
        {forms.map((f,index) => {
          return <Card key={index} name={f.title} desc={f.created_at} />
        })}
      </Styles.FormListContainer>
  
    </Styles.ModalDiv>
  )
}

function Card(props){
  return(
    <Styles.FormListItem>
      <Styles.ItemContent>
        <Styles.ItemTitle>{props.name}</Styles.ItemTitle>
          <Styles.ItemDesc>{props.desc}</Styles.ItemDesc>
      </Styles.ItemContent>
      <Styles.ItemLabels>

      </Styles.ItemLabels>
    </Styles.FormListItem>
  )
}