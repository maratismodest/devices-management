import { useEffect, useState } from "react";

export const BugButton = () => {
  const [error, setError] = useState(false);

  const onThrow = () => setError(true);

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return (
    <button
      onClick={onThrow}
    >
      Throw Error
    </button>
  );
};
