import Link from "next/link";

interface Props {
  text: string;
  url: string;
  disabled?: boolean;
}

export default function OrangeTextButton(props: Props) {
  return (
    <button
      disabled={props.disabled ?? false}
      className="bg-white text-orange-500 font-bold py-2 px-4 rounded-full hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out"
    >
      <Link href={props.url}>{props.text}</Link>
    </button>
  );
}
