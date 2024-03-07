import styles from './CustomButton.module.css';

export const CustomButton = ({
  className,
  onClick,
  children,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.customButton} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
