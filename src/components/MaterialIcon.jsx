export default function MaterialIcon({ name, className = '', size = 24, filled = false }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: filled ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400",
      }}
    >
      {name}
    </span>
  );
}
