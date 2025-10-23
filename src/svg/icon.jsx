import {
  IconO,
  IconX,
  IconLogo,
  IconOutlineO,
  IconOutlineX,
  IconRestart,
} from '.';

const Icon = ({ name }) => {
  switch (name) {
    case 'O':
      return <IconO />;
    case 'X':
      return <IconX />;
    case 'logo':
      return <IconLogo />;
    case 'o-outline':
      return <IconOutlineO />;
    case 'x-outline':
      return <IconOutlineX />;
    case 'restart':
      return <IconRestart />;
    default:
      return <IconLogo />;
  }
};

export default Icon;
