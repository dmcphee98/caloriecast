import React from 'react';
import './BoolToggle.css';

const BoolToggle = ({ boolValue, setBoolValue, id, defaultText, alternateText, activeColor, activeTextColor, index, pageIndex, activePageIndex }) => {

  const setBool = (e, isDefaultValue) => {
    if (e.target.classList.contains("button-spacer")) {
      setBoolValue(!boolValue);
    } else {
      setBoolValue(isDefaultValue);
    }
  }

  const toggleBool = () => {
    setBoolValue(!boolValue);
  }

  let active = {       
    backgroundColor: activeColor,
    transition: 'background-color 0.2s ease',
    color: activeTextColor,
    borderRadius: '1rem'
  }

  return (
    <div 
      className={`bool-toggle-container element-${index}`}
      id={id}
      tabIndex={pageIndex === activePageIndex ? 1 : -1}
      onKeyDown={(event) => {if (event.key === 'Enter') toggleBool()}}
    >
        <div 
          className="default-button"
          style={boolValue ? active : {}}
          onClick={(e) => setBool(e, true)}
        >
          {defaultText}</div>
        <div 
          className={`button-spacer a element-${index}`}
          onClick={(e) => setBool(e, false)}
        />
        <div 
          className="alternate-button"
          style={boolValue ? {} : active}
          onClick={(e) => setBool(e, false)}
        >{alternateText}</div>
    </div>
  )
}

export default BoolToggle