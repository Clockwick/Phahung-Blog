import { useLocation } from 'react-router-dom';

export default (): URLSearchParams => new URLSearchParams(useLocation().search);
