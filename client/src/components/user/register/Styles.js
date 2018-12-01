import styled, { css } from "styled-components";

const btn = (light, dark) => css`
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
  color: white;
  &:visited {
    color: white;
  }
  background-image: linear-gradient(${light}, ${dark});
  border: 1px solid ${dark};
  &:hover {
    background-image: linear-gradient(${light}, ${dark});
    &[disabled] {
      background-image: linear-gradient(${light}, ${dark});
    }
  }
  &:visited {
    color: black;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const btnDefault = css`
  ${btn("#ffffff", "#d5d5d5")} color: #555;
`;

const btnPrimary = btn("#4f93ce", "#285f8f");
const btnDanger = btn("#e27c79", "#c9302c");

export default styled.div`
  font-family: "Open Sans", sans-serif;

  h1,
  h2 {
    text-align: center;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #0075c1;
  }

  h3,
  h4,
  h5,
  h6 {
    margin-top: 0.5em;
    margin-bottom: 1.5em;
  }

  h3 {
    margin-left: 20px;
  }

  a {
    display: block;
    text-align: center;
    color: #222;
    margin-bottom: 10px;
  }

  p {
    max-width: 500px;
    margin: 10px auto;
    text-align: center;
    & > a {
      display: inline;
    }
  }

  form {
    width: 50vw;
    margin: 25px auto;
    border: 1px solid #ccc;
    padding: 10px 30px 30px 30px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    position: relative;
    text-align: left;

    .loading {
      text-align: center;
      display: block;
      position: absolute;
      background: url("https://media.giphy.com/media/130AxGoOaR6t0I/giphy.gif")
        center center;
      background-size: fill;
      font-size: 2em;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 50px 0 0 0;
      z-index: 2;
    }

    fieldset {
      width: 100%;
      border: 1px solid #ccc;
      margin-top: 1em;

      & > legend {
        color: #0075c1;
        text-transform: uppercase;
        padding: 0 0.5em;
        font-size: 0.9em;
        font-weight: 600;
        font-family: "Open Sans Condensed";
      }

      & > div {
        display: flex;
        flex-flow: row nowrap;
        line-height: 2em;
        margin-bottom: 5px;
        position: relative;

        & > label {
          color: #333;
          width: 33%;
          min-width: 60px;
          font-size: 1em;
          line-height: 32px;
        }

        & > input,
        & > select,
        & > textarea {
          flex: 1;
          padding: 3px 5px;
          font-size: 1em;
          margin-left: 15px;
          border: 1px solid #ccc;
          border-radius: 3px;
        }

        & > input[type="checkbox"] {
          margin-top: 7px;
        }

        & > div {
          margin-left: 16px;
          & > label {
            display: block;
            & > input {
              margin-right: 3px;
            }
          }
        }

        & > span {
          line-height: 32px;
          margin-left: 10px;
          color: #800;
          font-weight: bold;
        }

        & > button.remove {
          ${btnDanger};
        }
      }

      .error {
        display: flex;
        font-weight: bold;
        color: #800;
        flex-flow: row nowrap;
        justify-content: center;
      }
    }

    & > div {
      display: flex;
      flex-flow: row nowrap;
      line-height: 2em;
      margin: 5px;
      position: relative;

      & > label {
        color: #333;
        width: 25%;
        min-width: 60px;
        font-size: 1em;
        line-height: 32px;
      }

      & > input,
      & > select,
      & > textarea {
        flex: 1;
        padding: 3px 5px;
        font-size: 1em;
        margin-left: 15px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }

      & > input[type="checkbox"] {
        margin-top: 7px;
      }

      & > input[type="radio"] {
        text-align: right;
      }

      & > div {
        margin-left: 16px;
        background-color: red;

        & > label {
          display: block;

          & > input {
            margin-right: 3px;
          }
        }
      }
      & > span {
        line-height: 32px;
        margin-left: 10px;
        color: #800;
        font-weight: bold;
      }
      & > button.remove {
        ${btnDanger};
      }
    }
    & > .buttons {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      margin-top: 15px;
    }

    .error {
      display: flex;
      font-weight: bold;
      color: #800;
      flex-flow: row nowrap;
      justify-content: center;
    }
    pre {
      position: relative;
      border: 1px solid #ccc;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
      padding: 20px;
    }
  }
  button {
    margin: 0 10px;
    &[type="submit"] {
      ${btnPrimary};
    }
    &[type="button"] {
      ${btnDefault};
    }
  }
`;
