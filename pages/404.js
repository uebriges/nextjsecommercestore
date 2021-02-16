/** @jsxImportSource @emotion/react */
import { error404Styles } from '../styles/styles';

export default function Error404() {
  return (
    <div css={error404Styles}>
      <div>
        404 - "Spieler haben gespielt wie flasche leer... ich habe fertig!"
        <br />
        Giovanni Trapattoni
      </div>
    </div>
  );
}
