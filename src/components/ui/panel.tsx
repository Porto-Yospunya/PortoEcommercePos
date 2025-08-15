export const PanelField = ({
  title,
  button,
  modal,
  children,
}: {
  title: string,
  button?: React.ReactNode,
  modal?: React.ReactNode,
  children: React.ReactNode,
}) => {
  return (
    <div className="relative grid gap-4">

      {modal}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {button}
      </div>

      <div className="grid bg-white border-2 border-gray-200">
        {children}
      </div>

    </div>
  );
}