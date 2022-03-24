import React from 'react';
import classnames from 'classnames';

import styles from './fields.module.scss';

function Option({ option }) {
  return (
    <option value={option.value} disabled={option.disabled}>
      {option.label}
    </option>
  );
}
function Options({ options }) {
  return options.map((option, index) => {
    if (option.options) {
      return (
        <optgroup label={option.label} key={index}>
          {option.options.map((subOption) => (
            <Option option={subOption} key={subOption.value} />
          ))}
        </optgroup>
      );
    } else {
      return <Option option={option} key={option.value} />;
    }
  });
}

export function Select({
  name,
  id,
  placeholder = 'Please select:',
  label,
  options,
  disabled,
  option,
  onChange,
  edit = false,
  editValue = '',
  editLabel = '',
  className = null,
}) {
  return (
    <div className={classnames(styles.field, className)}>
      {label && (
        <label htmlFor={id || name} className={styles.label}>
          {label}
        </label>
      )}
      <select
        id={id || name}
        onChange={onChange}
        className={classnames(styles.input, styles.select)}
        disabled={disabled}
      >
        {edit && <option value={editValue}>{editLabel}</option>}
        <option value="">{placeholder}</option>
        <Options options={options} />
      </select>
    </div>
  );
}
