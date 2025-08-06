import styles from "./Button.module.css";

export default function Button({ children, variant = "primary", ...props }) {
  const classNames = [styles.button];

  if (variant === "outline") {
    classNames.push(styles.outline);
  } else if (variant === "ghost") {
    classNames.push(styles.ghost);
  }

  return (
    <button className={classNames.join(" ")} {...props}>
      {children}
    </button>
  );
}