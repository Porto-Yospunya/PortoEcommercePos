export const useModal = ({  }) => {

}

export const Modal = ({ children, active }: { children: React.ReactNode, active: boolean }) => {
  return (
    <div
      className={`
        fixed z-30 left-0 top-0 w-full h-full flex items-center justify-center bg-[#00000050]
        duration-300 transform transition-all ease-in-out
        ${active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      {children}
    </div>
  );
}