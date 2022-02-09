// https://v1.tailwindcss.com/components/buttons

// simple, fill, outline, bordered, disabled, 3d, elevated, icons

const COLORS = {
  primary: 'bg-blue-500 hover:bg-blue-300 text-white ',
  success: 'bg-green-500 hover:bg-green-300 text-white ',
  green: 'bg-green-500 text-white hover:bg-green-300 ',
  pink: 'bg-pink-400 text-white hover:bg-pink-300 ',
  purple: 'bg-purple-500 text-white hover:bg-purple-300 ',
  // TODO: 다양한 스타일 추가
};

function Button({ type, children, onClick }) {
  return (
    // 원래 button컴포넌트에 있는 애들을 쓰는 것
    <button
      onClick={onClick}
      className={`${COLORS[type]} font-bold py-2 px-4 rounded cursor-pointer mr-1`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'primary',
};

export default Button;
