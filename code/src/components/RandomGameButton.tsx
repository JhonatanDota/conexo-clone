type RandomGameButtonProps = {
  onClick: () => void;
};

export default function RandomGameButton(props: RandomGameButtonProps) {
  const { onClick } = props;

  return (
    <button onClick={onClick} className="text-orange-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="orange"
        width="24"
        height="26"
        viewBox="0 0 24 24"
      >
        <path
          stroke="orange"
          strokeWidth="2"
          d="M5.115 3.515c4.617-4.618 12.056-4.676 16.756-.195l2.129-2.258v7.938h-7.484l2.066-2.191c-2.82-2.706-7.297-2.676-10.073.1-4.341 4.341-1.737 12.291 5.491 12.291v4.8c-3.708 0-6.614-1.244-8.885-3.515-4.686-4.686-4.686-12.284 0-16.97z"
        />
      </svg>
    </button>
  );
}
