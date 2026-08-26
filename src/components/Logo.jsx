function Logo() {
    return (
      <a href="/" className="logo">
        <div className="logo-symbol">
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 31V15"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
  
            <path
              d="M34 31V15"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
  
            <path
              d="M8 17C13 10 29 10 34 17"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
  
            <circle
              cx="8"
              cy="14"
              r="2.5"
              fill="currentColor"
            />
  
            <circle
              cx="34"
              cy="14"
              r="2.5"
              fill="currentColor"
            />
          </svg>
        </div>
  
        <div className="logo-text">
          <span className="logo-name">NYAYSETU</span>
          <span className="logo-tagline">
            न्याय • सेवा • समाधान
          </span>
        </div>
      </a>
    );
  }
  
export default Logo;