import React from 'react';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/Menubar';
import { useAppStore } from '../stores/useAppStore';
import { cx } from '../utils';
import { Moon, MoonIcon, Settings, Sun, SunMoon } from 'lucide-react';

const themes = [
    { value: 'light', label: 'Light', Icon: <Sun /> },
    { value: 'dark', label: 'Dark', Icon: <MoonIcon /> },
    { value: 'system', label: 'System', icon: <Settings /> },
];

export const ThemeSwitcher = () => {
    const { mode, setMode } = useAppStore();

    return (
        <Menubar className="flex border-none bg-transparent shadow-none">
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer data-[state=open]:bg-light-900 focus:bg-light-900 focus-visible:outline-none dark:data-[state=open]:bg-dark-200 dark:focus:bg-dark-200">
                    <SunMoon color={mode === 'light' ? '#212734' : '#DCE3F1'} className="text-dark100_light900" />
                </MenubarTrigger>
                <MenubarContent className="text-light-700_dark200 absolute right-[-3rem] mt-3 min-w-[120px] rounded border bg-light-800 py-2 dark:border-dark-400 dark:bg-dark-300">
                    {themes.map(({ icon, label, value }) => (
                        <MenubarItem
                            className="flex cursor-pointer items-center gap-4 px-2.5 py-2 focus:bg-light-850 focus-visible:outline-none dark:focus:bg-dark-400"
                            key={value}
                            onClick={() => {
                                setMode(value);
                            }}
                        >
                            {/* wiem ze chujowo to jest zrobione, ale nie moge zmappowac przez arraya, jest pozno, do ogarniecia jutro */}
                            {value === 'light' ? (
                                <Sun color={mode === 'light' ? '#212734' : '#7B8EC8'} />
                            ) : value === 'dark' ? (
                                <Moon color={mode === 'light' ? '#212734' : '#7B8EC8'} />
                            ) : (
                                <Settings color={mode === 'light' ? '#212734' : '#7B8EC8'} />
                            )}
                            <p
                                className={cx(
                                    'body-semibold text-dark100_light900 text-light-500',
                                    mode === value && 'text-primary-500',
                                )}
                            >
                                {label}
                            </p>
                        </MenubarItem>
                    ))}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};
