type Props = {
  count: number;
  one?: string;
  few?: string;
  many?: string;
  other?: string;
};

export const Plural = ({ count, many, few, one, other }: Props) => {
  if (count === 1 || count === -1) return <span>{one}</span>;

  if ((count >= 2 && count <= 4) || (count <= -2 && count >= -4)) return <span>{few}</span>;

  if (count > 4 || count < -4) return <span>{many}</span>;

  return <span>{other}</span>;
};
