import * as React from 'react';

export const Avatar = ({ imageUrl }: { imageUrl: string }) => {
  const placeholder = '/images/placeholder.png';
  return (
    <figure>
      <style jsx>
        {`
          @property --rotate {
            syntax: '<angle>';
            initial-value: 132deg;
            inherits: false;
          }

          figure {
            z-index: 1;
            background: #191c29;
            width: var(--avatar-width);
            max-width: calc(var(--avatar-width) * 0.6);
            height: auto;
            padding: 3px;
            position: relative;
            border-radius: 6px;
            justify-content: center;
            align-items: center;
            text-align: center;
            display: flex;
            font-size: 1.5em;
            color: rgb(88 199 250 / 0%);
            cursor: pointer;
            font-family: cursive;
          }

          figure:hover {
            color: rgb(88 199 250 / 100%);
            transition: color 1s;
          }
          figure:hover:before,
          figure:hover:after {
            animation: none;
            opacity: 0;
          }

          figure::before {
            content: '';
            width: 104%;
            height: 102%;
            border-radius: 8px;
            background-image: linear-gradient(var(--rotate), #49b0cd, #2f53bf 43%, #26005e);
            position: absolute;
            z-index: -1;
            top: -1%;
            left: -2%;
            animation: spin 2.5s linear infinite;
          }

          figure::after {
            position: absolute;
            content: '';
            top: calc(var(--avatar-height) / 10);
            left: 0;
            right: 0;
            z-index: -1;
            height: 100%;
            width: 100%;
            margin: 0 auto;
            transform: scale(0.5);
            filter: blur(calc(var(--avatar-height) / 4));
            background-image: linear-gradient(var(--rotate), #4bafcb, #3158ce 43%, #340181);
            opacity: 1;
            transition: opacity 0.5s;
            animation: spin 5s linear infinite;
          }

          @keyframes spin {
            0% {
              --rotate: 0deg;
            }
            100% {
              --rotate: 360deg;
            }
          }
        `}
      </style>
      <img src={imageUrl || placeholder} alt="Avatar" />
    </figure>
  );
};
