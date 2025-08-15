import Link from "next/link";

export const Button = () => {
  return (
    <div>button</div>
  );
}

export const LinkButton = ({
  href,
  label,
  className,
}: {
  href: string,
  label: string,
  className?: string,
}) => {
  return (
    <Link
      href={href}
      className={`
        ${className}`}
    >
      {label}
    </Link>
  );
}