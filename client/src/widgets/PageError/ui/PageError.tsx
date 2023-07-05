import clsx from "clsx";

import cls from "./ErrorPage.module.css";

interface PageErrorProps {
  className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={clsx(cls.PageError, className)}>
      <p>Something went wrong</p>
      <button onClick={reloadPage}>
        Reload Page
      </button>
    </div>
  );
};
