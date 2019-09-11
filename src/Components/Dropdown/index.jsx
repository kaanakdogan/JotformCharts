import React from 'react';
import * as Styles from './styles';

export default function Dropdown({ options, def, onSelect }) {
  const [isActive, setActive] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const eventRef = React.useRef(null);

  React.useEffect(() => {
    setSelected(def);
  }, [options, def]);

  const toggleActive = () => {
    setActive(!isActive);
  };

  const selectItem = (opt) => {
    setActive(false);
    onSelect(opt.qid);
    setSelected(opt.text);
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
      <Styles.ToggleBttn role="button" onClick={toggleActive}>
        <Styles.ToggleContent>
          {selected}
        </Styles.ToggleContent>
      </Styles.ToggleBttn>
      { isActive
        ? (
          <Styles.DropviewContent>
            <Styles.DropviewList>
              {options.map((opt) => <ListItem opt={opt} onClick={selectItem} selected={selected} />)}
            </Styles.DropviewList>
          </Styles.DropviewContent>
        ) : null}
    </Styles.Wrapper>
  );
}

function ListItem({ opt, onClick, selected }) {
  const handleClick = (e) => {
    onClick(opt);
  };

  return (
    <Styles.DropviewListItem key={opt.qid} onClick={handleClick} selected={selected === opt.text}>{opt.text}</Styles.DropviewListItem>
  );
}
