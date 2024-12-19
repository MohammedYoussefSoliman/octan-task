import { SVGprop } from "./types";

function FavoriteChart({ size }: SVGprop) {
  return (
    <svg
      width={size || "41"}
      height={size || "41"}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.9933 13.4498V25.5773C36.5148 25.3463 35.9868 25.1813 35.3928 25.0823L34.8813 24.9998L34.4523 24.1088C33.5448 22.2608 32.0598 21.1883 30.3933 21.1883C28.7268 21.1883 27.2418 22.2608 26.3343 24.1088L25.8888 24.9998L25.3938 25.0823C23.4303 25.4123 22.0113 26.5013 21.4998 28.0523C21.0048 29.6198 21.5163 31.3358 22.9188 32.7548L23.4303 33.2663L23.3808 33.4643C23.0508 34.9328 23.1828 36.0548 23.4963 36.8633H13.5798C7.57378 36.8633 3.99329 33.2828 3.99329 27.2768V13.4498C3.99329 7.44378 7.57378 3.86328 13.5798 3.86328H27.4068C33.4128 3.86328 36.9933 7.44378 36.9933 13.4498Z"
        fill="white"
      />
      <path
        d="M32.2411 25.2148L32.7691 26.2873C33.0331 26.8153 33.7096 27.3103 34.2706 27.4093L34.9801 27.5248C37.1416 27.8878 37.6366 29.4718 36.1021 31.0228L35.4421 31.6828C34.9966 32.1283 34.7656 32.9863 34.8976 33.6133L34.9801 34.0093C35.5741 36.6163 34.1881 37.6228 31.9276 36.2533L31.4491 35.9563C30.8716 35.6098 29.9146 35.6098 29.3371 35.9563L28.8586 36.2533C26.5816 37.6228 25.2121 36.6163 25.8061 34.0093L25.8886 33.6133C26.0206 33.0028 25.7896 32.1283 25.3441 31.6828L24.6841 31.0228C23.1496 29.4553 23.6446 27.8878 25.8061 27.5248L26.5156 27.4093C27.0931 27.3103 27.7531 26.8153 28.0171 26.2873L28.5451 25.2148C29.5681 23.1523 31.2181 23.1523 32.2411 25.2148Z"
        fill="#FFCD2E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.3069 13.6267C27.847 14.0454 27.9455 14.8227 27.5267 15.3629L23.7079 20.2893C22.7264 21.5307 20.9166 21.7571 19.654 20.7815L19.6454 20.7748L16.6316 18.4032C16.4454 18.2618 16.1857 18.297 16.0443 18.4794C16.0441 18.4796 16.0444 18.4792 16.0443 18.4794L12.118 23.5769C11.701 24.1183 10.924 24.2192 10.3825 23.8021C9.84106 23.3851 9.7402 22.6081 10.1572 22.0666L14.0854 16.9666C15.0654 15.6984 16.8824 15.4692 18.1478 16.447L18.1564 16.4537L21.1703 18.8253C21.3584 18.9682 21.6236 18.9314 21.764 18.7573L25.5706 13.8466C25.9894 13.3064 26.7667 13.208 27.3069 13.6267Z"
        fill="#7C32DC"
      />
    </svg>
  );
}

export default FavoriteChart;
