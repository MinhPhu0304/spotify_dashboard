/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useState } from "react";

export function Bio({ bioParts }) {
  const [viewAll, setViewAll] = useState(false);

  if (viewAll) {
    return (
      <>
        {bioParts.map((part, i) => (
          <p className="bio__txt" key={i}>
            {part}
          </p>
        ))}
        <a
          className="link__button"
          role="button"
          onClick={() => setViewAll(false)}
        >
          View less...
        </a>
      </>
    );
  }

  return (
    <>
      <p className="bio__txt">{bioParts.length > 0 && bioParts[0]}</p>
      {bioParts.length > 1 && (
        <a
          className="link__button"
          role="button"
          onClick={() => setViewAll(true)}
        >
          {" "}
          View more...
        </a>
      )}
    </>
  );
}
