import "./Spin.scss";

interface SpinProps {
  width?: string;
  height?: string;
}

const Spin: React.FC<SpinProps> = ({ width = "60px", height = "60px" }) => {
  return (
    <>
      <svg viewBox='0 0 800 800' width={width} height={height} xmlns='http://www.w3.org/2000/svg'>
        <circle
          className='spin2'
          cx='400'
          cy='400'
          fill='none'
          r='200'
          strokeWidth='60'
          stroke='#E387FF'
          strokeDasharray='700 1400'
          strokeLinecap='round'
        />
      </svg>
    </>
  );
};

export default Spin;
