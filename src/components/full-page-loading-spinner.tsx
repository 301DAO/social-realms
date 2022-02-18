import * as React from 'react';

export const FullPageLoadingSpinner = () => (
  <div className="flex min-h-screen items-center justify-center">
    <style jsx>
      {`
        /* KEYFRAMES */
        @keyframes spin {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(359deg);
          }
        }

        @keyframes spin3D {
          from {
            transform: rotate3d(0.5, 0.5, 0.5, 360deg);
          }
          to {
            transform: rotate3d(0deg);
          }
        }

        @keyframes configure-clockwise {
          0% {
            transform: rotate(0);
          }
          25% {
            transform: rotate(90deg);
          }
          50% {
            transform: rotate(180deg);
          }
          75% {
            transform: rotate(270deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes configure-xclockwise {
          0% {
            transform: rotate(45deg);
          }
          25% {
            transform: rotate(-45deg);
          }
          50% {
            transform: rotate(-135deg);
          }
          75% {
            transform: rotate(-225deg);
          }
          100% {
            transform: rotate(-315deg);
          }
        }

        @keyframes pulse {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0.25;
            transform: scale(0.75);
          }
        }
        /* SOLAR SYSTEM */

        .solar-system {
          width: 250px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .orbit {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #fafbfc;
          border-radius: 50%;
        }

        .earth-orbit {
          width: 165px;
          height: 165px;
          -webkit-animation: spin 12s linear 0s infinite;
        }

        .venus-orbit {
          width: 120px;
          height: 120px;
          -webkit-animation: spin 7.4s linear 0s infinite;
        }

        .mercury-orbit {
          width: 90px;
          height: 90px;
          -webkit-animation: spin 3s linear 0s infinite;
        }

        .planet {
          position: absolute;
          top: -5px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #3ff9dc;
        }

        .sun {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: #ffab91;
        }

        .leo {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
        }

        .blue-orbit {
          width: 165px;
          height: 165px;
          border: 1px solid #91daffa5;
          -webkit-animation: spin3D 3s linear 0.2s infinite;
        }

        .green-orbit {
          width: 120px;
          height: 120px;
          border: 1px solid #91ffbfa5;
          -webkit-animation: spin3D 2s linear 0s infinite;
        }

        .red-orbit {
          width: 90px;
          height: 90px;
          border: 1px solid #ffca91a5;
          -webkit-animation: spin3D 1s linear 0s infinite;
        }

        .white-orbit {
          width: 60px;
          height: 60px;
          border: 2px solid #ffffff;
          -webkit-animation: spin3D 10s linear 0s infinite;
        }

        .w1 {
          transform: rotate3D(1, 1, 1, 90deg);
        }

        .w2 {
          transform: rotate3D(1, 2, 0.5, 90deg);
        }

        .w3 {
          transform: rotate3D(0.5, 1, 2, 90deg);
        }

        .three-quarter-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid #fb5b53;
          border-top: 3px solid transparent;
          border-radius: 50%;
          animation: spin 0.5s linear 0s infinite;
        }
      `}
    </style>
    <div className="spinner-box">
      <div className="solar-system">
        <div className="earth-orbit orbit">
          <div className="planet earth"></div>
          <div className="venus-orbit orbit">
            <div className="planet venus"></div>
            <div className="mercury-orbit orbit">
              <div className="planet mercury"></div>
              <div className="sun"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
