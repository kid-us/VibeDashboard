import Loader from "../Loader/Loader";

interface Props {
  label: string;
  loader?: boolean;
  bg?: string;
}

const Button = ({ label, loader }: Props) => {
  return (
    <>
      {loader ? (
        <div className="btn-bg w-full py-3 rounded font-poppins mt-5 shadow-lg">
          <Loader />
        </div>
      ) : (
        <button className="btn-bg w-full py-3 rounded font-poppins mt-5 shadow-lg">
          {label}
        </button>
      )}
    </>
  );
};

export default Button;
