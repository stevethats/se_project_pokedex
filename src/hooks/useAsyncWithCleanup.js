import React from "react";

function useAsyncWithCleanup(asyncFunction) {
  const [loading, setLoading] = React.useState(false);

  const executeAsync = async (...args) => {
    setLoading(true);
    try {
      asyncFunction(...args);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
    setLoading(false);
  };

  return { loading, setLoading, executeAsync };
}
export default useAsyncWithCleanup;
