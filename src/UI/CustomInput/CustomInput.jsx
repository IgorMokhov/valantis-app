import searchIcon from '../../assets/icon-search.svg';
import styles from './CustomInput.module.css';

export const CustomInput = ({
  type,
  value,
  placeholder,
  onChange,
  className,
  id
}) => {
  return (
    <label htmlFor={id} className={styles.label}>
      <img src={searchIcon} alt="searchIcon" />
      <input
        className={className}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};
