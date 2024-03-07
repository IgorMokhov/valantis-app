import styles from './CustomButton.module.css';

export const CustomButton = ({
  className,
  onClick,
  children,
  type = 'button',
}) => {
  return (
    <button
      className={`${styles.customButton} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
