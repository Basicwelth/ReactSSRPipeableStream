export const Spinner = (props) => {
  let { active } = props;
  (!active) ? active = true : null;
  return (
	<div
	  className={['spinner', active && 'spinner--active'].join(' ')}
	  role="progressbar"
	  aria-busy={active ? 'true' : 'false'}
	/>
  );
};
