// SubMenuList.jsx
export default function SubMenuList({ items, isCollapsedUI }) {
  return (
    <ul className="mx-4 mt-2">
      {items.map((item) => {
        const isDisabled = item.disabled;
        const baseStyle = 'flex items-center gap-2 p-2 w-full text-sm rounded-md transition-colors';
        const activeStyle = 'text-white hover:bg-[#475569]';
        const disabledStyle = 'text-gray-400 cursor-not-allowed';

        return (
          <li key={item.name}>
            <button
              onClick={() => {
                if (!isDisabled) item.action();
              }}
              disabled={isDisabled}
              title={isCollapsedUI ? item.name : ''}
              className={`${baseStyle} ${isDisabled ? disabledStyle : activeStyle}`}
            >
              <span>{item.icon}</span>
              {!isCollapsedUI && <span>{item.name}</span>}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
