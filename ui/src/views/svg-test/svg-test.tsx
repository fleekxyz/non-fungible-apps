/**
 * This file is just proof of concept and a code example
 * to be split in correct component files and use the correct
 * components from the project that still under development.
 *
 * This file should be removed after used as example.
 */

import { useRef, useState } from 'react';
// @ts-ignore
import ColorThief from 'colorthief';

type SVGPreviewProps = {
  color: string;
  logo: string;
  name: string;
  ens: string;
  size: string;
};

/**
 * SVGPreview renders the NFA image based in the provided props.
 */
const SVGPreview: React.FC<SVGPreviewProps> = ({
  color,
  logo,
  name,
  ens,
  size,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1065 1065"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1065" height="1065" fill="url(#background)" />
      <rect
        opacity="0.2"
        width="1065"
        height="1065"
        fill="url(#background-radial)"
      />

      <g filter="url(#diskette-shadow)">
        <path
          d="M857.231 279.712L902.24 286.675C910.547 287.96 917.915 292.721 922.5 299.768L938.894 324.964C942.249 330.12 943.311 336.437 941.827 342.406L937.798 358.615L924.049 356.65L919.416 374.084L934.068 376.24L791.947 922.152C788.109 936.896 773.694 946.308 758.651 943.893L179.636 850.928C162.318 848.147 151.215 830.987 155.776 814.051L160.478 796.59L704.315 879.574L857.231 279.712Z"
          fill="#050505"
        />
      </g>
      <path
        d="M840.231 240.712L885.24 247.675C893.547 248.961 900.915 253.722 905.5 260.768L921.894 285.965C925.249 291.12 926.311 297.437 924.827 303.406L920.798 319.616L907.049 317.65L902.416 335.084L917.068 337.241L774.947 883.152C771.109 897.896 756.694 907.308 741.651 904.893L162.636 811.928C145.318 809.147 134.215 791.987 138.776 775.051L143.478 757.59L687.315 840.574L840.231 240.712Z"
        fill="url(#main)"
      />

      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M319.847 161.502C310.356 160.007 300.674 166.326 298.221 175.616L138.724 779.758C136.271 789.048 141.977 797.79 151.468 799.285L740.061 891.973C749.553 893.467 759.235 887.148 761.687 877.858L902.405 344.854L889.158 342.768L898.872 305.972L912.119 308.059L913.733 301.946C914.837 297.762 914.309 293.476 912.251 289.927L893.484 257.569C891.153 253.549 887.063 250.823 882.221 250.061L828.205 241.554C822.224 240.613 815.869 242.783 811.427 247.284L805.686 253.103C804.205 254.603 802.087 255.326 800.093 255.013L783.611 252.417L734.3 439.196C731.439 450.035 720.143 457.407 709.07 455.663L328.847 395.788C317.774 394.045 311.117 383.845 313.978 373.007L366.528 173.962L366.533 173.941C367.234 171.24 365.572 168.702 362.81 168.267L319.847 161.502ZM369.392 174.414L368.652 177.217L316.843 373.458C314.39 382.748 320.096 391.49 329.587 392.985L709.81 452.86C719.301 454.354 728.983 448.035 731.436 438.745L780.747 251.966L783.245 242.504L783.985 239.701L369.392 174.414Z"
        fill="#131316"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        stroke="url(#main)"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M319.847 161.502C310.356 160.007 300.674 166.326 298.221 175.616L138.724 779.758C136.271 789.048 141.977 797.79 151.468 799.285L740.061 891.973C749.553 893.467 759.235 887.148 761.687 877.858L902.405 344.854L889.158 342.768L898.872 305.972L912.119 308.059L913.733 301.946C914.837 297.762 914.309 293.476 912.251 289.927L893.484 257.569C891.153 253.549 887.063 250.823 882.221 250.061L828.205 241.554C822.224 240.613 815.869 242.783 811.427 247.284L805.686 253.103C804.205 254.603 802.087 255.326 800.093 255.013L783.611 252.417L734.3 439.196C731.439 450.035 720.143 457.407 709.07 455.663L328.847 395.788C317.774 394.045 311.117 383.845 313.978 373.007L366.528 173.962L366.533 173.941C367.234 171.24 365.572 168.702 362.81 168.267L319.847 161.502ZM369.392 174.414L368.652 177.217L316.843 373.458C314.39 382.748 320.096 391.49 329.587 392.985L709.81 452.86C719.301 454.354 728.983 448.035 731.436 438.745L780.747 251.966L783.245 242.504L783.985 239.701L369.392 174.414Z"
        fill="url(#diskette-gradient)"
        fill-opacity="0.2"
      />

      <path
        d="M335.38 208.113C335.922 208.198 336.417 207.686 336.283 207.179L330.39 184.795C330.249 184.261 329.529 184.148 329.129 184.597L312.358 203.411C311.978 203.838 312.174 204.458 312.716 204.544L317.962 205.37C318.357 205.432 318.595 205.796 318.493 206.183L314.7 220.551C314.597 220.938 314.835 221.302 315.231 221.364L324.539 222.83C324.935 222.893 325.338 222.629 325.44 222.242L329.233 207.875C329.336 207.488 329.739 207.224 330.135 207.286L335.38 208.113Z"
        fill="url(#main)"
      />
      <path
        d="M319.282 269.087C319.824 269.173 320.319 268.661 320.186 268.154L314.292 245.77C314.151 245.236 313.431 245.123 313.031 245.572L296.261 264.386C295.88 264.812 296.076 265.433 296.618 265.518L301.864 266.344C302.259 266.407 302.497 266.771 302.395 267.158L298.602 281.526C298.5 281.913 298.737 282.277 299.133 282.339L308.441 283.805C308.837 283.867 309.24 283.604 309.343 283.217L313.136 268.849C313.238 268.462 313.641 268.199 314.037 268.261L319.282 269.087Z"
        fill="black"
        fill-opacity="0.5"
      />
      <path
        d="M303.184 330.062C303.726 330.148 304.221 329.636 304.088 329.128L298.194 306.745C298.053 306.211 297.333 306.098 296.933 306.547L280.163 325.361C279.782 325.787 279.979 326.408 280.52 326.493L285.766 327.319C286.161 327.382 286.399 327.746 286.297 328.133L282.504 342.501C282.402 342.888 282.639 343.252 283.035 343.314L292.344 344.78C292.739 344.842 293.142 344.579 293.245 344.192L297.038 329.824C297.14 329.437 297.543 329.174 297.939 329.236L303.184 330.062Z"
        fill="black"
        fill-opacity="0.5"
      />

      <path
        stroke="url(#main)"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M290.109 463.418C292.358 454.902 301.233 449.11 309.933 450.48L771.07 523.096C779.77 524.467 785 532.48 782.752 540.996L692.086 884.418L199.443 806.84L290.109 463.418Z"
        fill="black"
        fill-opacity="0.14"
      />

      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        stroke="url(#main)"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M787.589 237.349L460.354 185.818L406.325 390.469C403.872 399.759 409.578 408.501 419.069 409.996L711.934 456.114C721.425 457.609 731.107 451.29 733.56 442L787.589 237.349ZM660.269 245.01C655.523 244.263 650.682 247.423 649.456 252.068L607.386 411.418C606.16 416.063 609.013 420.434 613.759 421.181L682.499 432.006C687.245 432.753 692.086 429.594 693.312 424.949L735.382 265.599C736.608 260.954 733.755 256.583 729.01 255.835L660.269 245.01Z"
        fill="url(#main)"
      />

      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M864.643 283.937C865.186 283.605 865.708 284.257 865.239 284.683L844.268 303.719C843.938 304.018 844.093 304.517 844.526 304.548L853.726 305.207C854.184 305.24 854.321 305.787 853.942 306.071L833.884 321.112C833.506 321.396 833.643 321.943 834.101 321.976L844.007 322.685C844.491 322.72 844.605 323.319 844.177 323.58L797.752 351.954C797.209 352.286 796.687 351.634 797.156 351.209L818.403 331.922C818.733 331.622 818.577 331.123 818.145 331.092L808.748 330.42C808.292 330.387 808.154 329.843 808.529 329.558L828.054 314.744C828.43 314.459 828.291 313.915 827.835 313.882L818.389 313.206C817.904 313.171 817.79 312.572 818.218 312.311L864.643 283.937Z"
        fill="white"
      />

      <g transform="matrix(0.987827 0.155557 -0.255261 0.966872 250 735)">
        <text
          font-family="Inter, sans-serif"
          font-weight="bold"
          font-size="42"
          fill="#E5E7F8"
        >
          {name}
        </text>
        <text
          font-family="Inter, sans-serif"
          font-weight="normal"
          y="40"
          font-size="22"
          fill="#7F8192"
        >
          {ens}
        </text>
      </g>

      <image
        width="167"
        height="167"
        transform="matrix(0.987827 0.155557 -0.255261 0.966872 444.117 524.17)"
        href={logo}
      />

      <defs>
        <filter
          id="diskette-shadow"
          x="70.7489"
          y="195.712"
          width="955.733"
          height="832.558"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" />
          <feBlend in="SourceGraphic" />
          <feGaussianBlur stdDeviation="42" />
        </filter>

        <linearGradient
          id="background"
          x1="532.5"
          y1="0"
          x2="532.5"
          y2="1065"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stop-color="#131313" />
        </linearGradient>
        <radialGradient
          id="background-radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(532.5 532.5) rotate(89.961) scale(735)"
        >
          <stop stop-color={color} />
          <stop offset="1" stop-color={color} stop-opacity="0" />
        </radialGradient>

        <linearGradient
          id="diskette-gradient"
          x1="925.626"
          y1="256.896"
          x2="136.779"
          y2="800.203"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={color} />
          <stop offset="1" stop-color="#2C313F" />
        </linearGradient>

        <linearGradient id="main">
          <stop stop-color={color} />
        </linearGradient>
      </defs>
    </svg>
  );
};

/**
 * Converts the File from the input to a base64 string.
 */
const fileToBase64 = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = reject;
  });

/**
 * Converts a hex color string to a number.
 */
const parseColorToNumber = (color: string): number => {
  const hexColor = color.replace('#', '');
  return parseInt(hexColor, 16);
};

export const SVGTestScreen: React.FC = () => {
  // These states are the properties that will be sent to the contract
  const [name, setName] = useState('');
  const [ens, setENS] = useState('');
  const [logo, setLogo] = useState(''); // The logo needs to be a base64 of a SVG capped at 10kb
  const [color, setColor] = useState(''); // The color used in preview is a hex string (e.g. #ffffff) but it requires to be a number when sending to the contract

  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileBase64 = await fileToBase64(file);
    setLogo(fileBase64);
    // To send to the contract the logo needs to be a base64 string
    console.log('Sending to contract:', fileBase64);
  };

  const handleLogoLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const colorArray = new ColorThief().getColor(imageRef.current);
    const hexColor = `#${colorArray
      .map((c: number) => c.toString(16).padStart(2, '0'))
      .join('')}`;
    setColor(hexColor);
    // To send to the contract the color needs to be a number
    console.log('Sending to contract:', parseColorToNumber(hexColor));
  };

  return (
    <div
      style={{
        marginTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        color: 'black',
      }}
    >
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={ens} onChange={(e) => setENS(e.target.value)} />
      <input type="file" onChange={handleFileChange} />
      <input
        value={color}
        type="color"
        onChange={(e) => setColor(e.target.value)}
      />
      {logo && (
        <img
          src={logo}
          ref={imageRef}
          onLoad={handleLogoLoad}
          style={{ width: '50px', height: '50px' }}
        />
      )}
      <SVGPreview
        name={name}
        ens={ens}
        logo={logo}
        color={color}
        size="600px"
      />
    </div>
  );
};
