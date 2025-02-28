import { Popover } from "flowbite-react";
import PropTypes from "prop-types";
function PopOver({ title, action, children }) {
  const content = (
    <div className="text-sm text-gray-500 dark:text-gray-400 rounded border border-blue-200 dark:border-blue-600">
      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {action}
        </h3>
      </div>
      <div className="p-3">
        <p>{children}</p>
      </div>
    </div>
  );

  return (
    <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded border border-blue-200 dark:border-blue-600">
      <Popover content={content} trigger="hover">
        <p>{title}</p>
      </Popover>
    </div>
  );
}

PopOver.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default PopOver;
