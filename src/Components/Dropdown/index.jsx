import React from 'react';
import * as Styles from './styles';

export default function Dropdown({ options, def, onSelect }) {
  const [isActive, setActive] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const eventRef = React.useRef(null);

  React.useEffect(() => {
    setSelected(def);
  }, [options]);

  const toggleActive = () => {
    setActive(!isActive);
  };

  const selectItem = (e) => {
    setSelected(e.target.innerText);
    setActive(false);
    onSelect(e.target.innerText);
  };

  const handleClickOutside = (e) => {
    if (eventRef.current && !eventRef.current.contains(e.target)) {
      setActive(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, []);

  return (
    <Styles.Wrapper ref={eventRef}>
      {console.log(selected)}
      <Styles.ToggleBttn role="button" onClick={toggleActive}>
        <Styles.ToggleContent>
          {selected}
        </Styles.ToggleContent>
      </Styles.ToggleBttn>
      { isActive
        ? (
          <Styles.DropviewContent>
            <Styles.DropviewList>
              {options.map((opt) => <Styles.DropviewListItem key={opt.qid} onClick={selectItem}>{opt}</Styles.DropviewListItem>)}
            </Styles.DropviewList>
          </Styles.DropviewContent>
        ) : null}
    </Styles.Wrapper>
  );
}
