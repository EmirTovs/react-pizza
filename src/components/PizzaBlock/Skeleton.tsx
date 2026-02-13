import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="136" cy="136" r="125" />
    <rect x="0" y="285" rx="10" ry="10" width="280" height="31" />
    <rect x="0" y="420" rx="5" ry="5" width="140" height="20" />
    <rect x="0" y="340" rx="10" ry="10" width="280" height="60" />
    <rect x="175" y="420" rx="5" ry="5" width="100" height="20" />
  </ContentLoader>
);

export default Skeleton;
