// Import button colors css file
import './ButtonColors.css';

export interface ClickableButtonProps {
    onClick: () => void;
    isCollapsed: boolean;
}