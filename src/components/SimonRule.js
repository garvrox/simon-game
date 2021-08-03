import "../style/simonRule.scss";

function SimonRule() {
  return (
    <ul className="rule-container">
      <li className="rule-item">
        Click the PLAY button. Simon will give the first signal. Repeat the
        signal by pressing the same color lens.
      </li>
      <li className="rule-item">
        Simon will duplicate the first signal and add one. Repeat these two
        signals by pressing the same color lenses, in order.
      </li>
      <li className="rule-item">
        Simon will duplicate these first two signals and add one.
      </li>
      <li className="rule-item">
        Continue playing as long as you can repeat each sequence of signals
        correctly.
      </li>
      <li className="rule-item">
        If you fail to repeat a sequence exactly, This means you've lost, and
        the sequence of signals ends.
      </li>
    </ul>
  );
}

export default SimonRule;
