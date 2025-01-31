import { useMemo } from 'react';

export const useShortcut = () => {
    const isMac = useMemo(() => navigator.platform.toUpperCase().indexOf('MAC') >= 0, []);

    const getShortcutText = (key: string) => isMac ? `⌥ opt + ${key}` : `alt + ${key}`;

    // Different tooltip styles for sidebar and new chat buttons
    const sidebarTooltipStyles = "relative before:content-[attr(data-tip)] before:absolute before:px-2 before:py-1 before:left-[3rem] before:top-[0.85rem] before:w-max before:max-w-xs before:bg-gray-700 before:text-white before:rounded-md before:opacity-0 before:transition-all before:pointer-events-none hover:before:opacity-100 before:text-sm before:z-[60]";

    const newChatTooltipStyles = "relative before:content-[attr(data-tip)] before:absolute before:px-2 before:py-1 before:left-1/2 before:-translate-x-1/2 before:bottom-[-2.5rem] before:w-max before:max-w-xs before:bg-gray-700 before:text-white before:rounded-md before:opacity-0 before:transition-all before:pointer-events-none hover:before:opacity-100 before:text-sm before:z-[60]";

    const sendButtonTooltipStyles = "relative before:content-[attr(data-tip)] before:absolute before:px-2 before:py-1 before:left-1/2 before:-translate-x-1/2 before:top-[-2.5rem] before:w-max before:max-w-xs before:bg-gray-700 before:text-white before:rounded-md before:opacity-0 before:transition-all before:pointer-events-none hover:before:opacity-100 before:text-sm before:z-[60]";

    return {
        isMac,
        getShortcutText,
        sidebarTooltipStyles,
        newChatTooltipStyles,
        sendButtonTooltipStyles
    };
}; 