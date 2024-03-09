import searchIcon from '../../assets/icon-search.svg';
import styles from './CustomInput.module.css';

export const CustomInput = ({
  type,
  value,
  placeholder,
  onChange,
  className,
  id,
}) => {
  return (
    <label htmlFor={id} className={`${styles.label} ${className}`}>
      <img src={searchIcon} alt="searchIcon" />
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};
