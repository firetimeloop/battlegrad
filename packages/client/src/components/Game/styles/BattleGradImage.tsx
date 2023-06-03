enum LogoColors {
  first = '#c500ff',
  second = '#0dff00',
  third = '#ff2f00',
  fourth = '#f9ff00',
  fifth = '#2800ff',
}
const Duration = '10s';

function BattleGradImage() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="200"
      fillRule="evenodd"
      clipRule="evenodd">
      <defs>
        <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={LogoColors.first}>
            <animate
              attributeName="stop-color"
              values={`${LogoColors.first}; ${LogoColors.second}; ${LogoColors.first}`}
              dur={Duration}
              repeatCount="indefinite" />
          </stop>
          <stop offset="200%" stopColor={LogoColors.second}>
            <animate
              attributeName="stop-color"
              values={`${LogoColors.second}; ${LogoColors.third}; ${LogoColors.second}`}
              dur={Duration}
              repeatCount="indefinite" />
          </stop>
          <stop offset="300%" stopColor={LogoColors.third}>
            <animate
              attributeName="stop-color"
              values={`${LogoColors.third}; ${LogoColors.fourth}; ${LogoColors.third}`}
              dur={Duration}
              repeatCount="indefinite" />
          </stop>
          <stop offset="400%" stopColor={LogoColors.fourth}>
            <animate
              attributeName="stop-color"
              values={`${LogoColors.fourth}; ${LogoColors.fifth}; ${LogoColors.fourth}`}
              dur={Duration}
              repeatCount="indefinite" />
          </stop>
          <stop offset="500%" stopColor={LogoColors.fifth}>
            <animate
              attributeName="stop-color"
              values={`${LogoColors.fifth}; ${LogoColors.first}; ${LogoColors.fifth}`}
              dur={Duration}
              repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      <path
        fill="url('#logo-gradient')"
        d="M8.5 37.5c11.338-.166 22.672 0 34 .5C66.633 45.763 75.466 61.93 69
         86.5a103.09 103.09 0 0 1-4.5 8.5c14.886 13.709 19.052 30.209 12.5
          49.5-10.254 19.497-26.42 27.497-48.5 24a214.256 214.256 0 0 1-20.5-1
          2833.27 2833.27 0 0 1 .5-130Zm23 24c12.982.784 17.15 7.118 12.5
     19-3.45 3.331-7.616 4.998-12.5 5v-24Zm0 48c17.324-.188 24.824 8.146 22.5
     25-5.294 8.047-12.794 11.38-22.5 10v-35Z" />
      <path
        fill="url('#logo-gradient')"
        d="M106.5 37.5c12.58-.322 25.08.011 37.5 1a24925.584 24925.584 0 0 1
         23.5 126 7.93 7.93 0 0 1-1
         3.5c-7.913.814-15.746.647-23.5-.5-2.61-13.326-5.11-26.66-7.5-40h-21a504.71
          504.71 0 0 1-7.5 40c-7.754 1.147-15.587 1.314-23.5.5a6.291 6.291
          0 0 1-1-3 16958.732 16958.732 0 0 1 24-127.5Zm18
             35c2.737 10.07 4.737 20.402 6 31h-11a1256.941 1256.941 0 0 0 5-31Z" />
      <path
        fill="url('#logo-gradient')"
        d="M166.5 37.5h74c.315 7.92-.018 15.753-1 23.5-7.993.5-15.993.666-24
    .5v107c-8.439.616-16.606-.051-24.5-2-.5-34.998-.667-69.998-.5-105h-24v-24Z" />
      <path
        fill="url('#logo-gradient')"
        d="M249.5 37.5h73a82.723 82.723 0 0 1 0
     23 144.874 144.874 0 0 1-24 1c.167 35.335 0 70.668-.5 106a153.949 153.949 0 0
     1-24.5 1v-107c-8.007.166-16.007 0-24-.5a70.329 70.329 0 0 1 0-23.5Z" />
      <path
        fill="url('#logo-gradient')"
        d="M331.5 37.5c8.252-.316 16.419.017 24.5 1
     .5 35.332.667 70.665.5 106 14.004-.167 28.004 0 42 .5a66.641 66.641 0 0 1 0
      23c-22.331.5-44.664.667-67 .5v-131Z" />
      <path
        fill="url('#logo-gradient')"
        d="M407.5 37.5h61v24h-36v24h29v24h-29v35h36v24h-61v-131Z" />
      <path
        fill="url('#logo-gradient')"
        d="M500 37.5c8.673-.166 17.34 0 26 .5 11.452
     3.786 18.285 11.62 20.5 23.5a64.218 64.218 0 0 1 0 16 153.913 153.913 0 0 1-24.5 1
     98.433 98.433 0 0 0-.5-14 4.458 4.458 0 0 0-1.5-2c-4.611-1.11-9.278-1.277-14-.5a4.451
      4.451 0 0 0-2 1.5 819.927 819.927 0 0 0-1 40 786.83 786.83 0 0 0 1 39.5c5.936
      2.132 11.769 1.965 17.5-.5.5-7.659.666-15.326.5-23h-13v-24h38c.167 16.337 0
      32.67-.5 49-2.202 11.869-9.035 19.702-20.5 23.5-9 .667-18 .667-27
      0-11.465-3.798-18.298-11.631-20.5-23.5a1680.41 1680.41 0 0 1
       0-82c2.056-12.88 9.222-21.212 21.5-25Z" />
      <path
        fill="url('#logo-gradient')"
        d="M555.5 37.5c13.337-.167 26.671 0 40 .5 15.216 4.553 24.049 14.72
        26.5 30.5.667 8 .667 16 0 24-1.396 9.626-5.562 17.792-12.5
      24.5a1014.017 1014.017 0 0 1 19 48.5 4.933
      4.933 0 0 1-1 2.5c-8.327.5-16.66.666-25
      .5a1143.685 1143.685 0 0 0-16-43 9.86 9.86 0 0 0-6-1c.167
      14.337 0 28.671-.5 43a153.949
       153.949 0 0 1-24.5 1v-131Zm25 24c13.414-.237 19.081 6.43
        17 20 1.612 13.048-4.055 19.382-17 19v-39Z" />
      <path
        fill="url('#logo-gradient')"
        d="M658.5 37.5c12.58-.322 25.08.011
    37.5 1a24925.584 24925.584 0 0 1 23.5 126 7.93 7.93 0 0
    1-1 3.5c-7.913.814-15.746.647-23.5-.5-2.61-13.326-5.11-26.66-7.5-40h-21a504.71 504.71
     0 0 1-7.5 40c-7.754 1.147-15.587 1.314-23.5.5a6.293
      6.293 0 0 1-1-3 16999.127
      16999.127 0 0 1 24-127.5Zm18 35c2.737 10.07 4.737 20.402
       6 31h-11a1256.941 1256.941 0 0 0 5-31Z" />
      <path
        fill="url('#logo-gradient')"
        d="M728.5 37.5c52.528-8.806
    75.194 13.194 68 66 6.518 53.324-16.315 74.324-68.5
     63a2804.33 2804.33 0 0 1
     .5-129Zm24 24c7.644-1.072 13.477 1.595 17.5 8a303.58 303.58
     0 0 1 1.5 34l-.5 31c-3.612 7.891-9.778 11.225-18.5 10v-83Z" />
    </svg>
  );
}
export default BattleGradImage;