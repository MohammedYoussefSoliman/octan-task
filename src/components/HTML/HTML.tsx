type HTMLProps = {
  content: string;
};

export default function HTML({ content }: HTMLProps) {
  return (
    <div
      className="html-content"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
