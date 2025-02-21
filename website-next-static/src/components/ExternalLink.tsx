type ExternalLinkProps = {
  url: string;
  text: string;
  className: string;
};

export const ExternalLink = ({ url, text, className }: ExternalLinkProps) => (
  <a href={url} target="_blank" rel="noopener" className={className}>
    {text}
  </a>
);
