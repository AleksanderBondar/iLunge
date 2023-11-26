import React from 'react';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/Menubar';
import { useAppStore } from '../stores/useAppStore';
import { cx } from '../utils';

const themes = [
    { value: 'light', label: 'Light', icon: `/assets/icons/sun.svg` },
    { value: 'dark', label: 'Dark', icon: `/assets/icons/moon.svg` },
    { value: 'system', label: 'System', icon: `/assets/icons/computer.svg` },
];

export const ThemeSwitcher = () => {
    const { mode, setMode } = useAppStore();

    return (
        <Menubar className="flex border-none bg-transparent shadow-none">
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer data-[state=open]:bg-light-900 focus:bg-light-900 focus-visible:outline-none dark:data-[state=open]:bg-dark-200 dark:focus:bg-dark-200">
                    {mode === 'light' ? (
                        <img src={`/assets/icons/sun.svg`} alt="Sun" height={20} width={20} className="active-theme" />
                    ) : (
                        <img
                            src={`/assets/icons/moon.svg`}
                            alt="Moon"
                            height={20}
                            width={20}
                            className="active-theme"
                        />
                    )}
                </MenubarTrigger>
                <MenubarContent className="text-light-700_dark200 absolute right-[-3rem] mt-3 min-w-[120px] rounded border bg-light-800 py-2 dark:border-dark-400 dark:bg-dark-300">
                    {themes.map(item => (
                        <MenubarItem
                            className="flex cursor-pointer items-center gap-4 px-2.5 py-2 focus:bg-light-850 focus-visible:outline-none dark:focus:bg-dark-400"
                            key={item.value}
                            onClick={() => {
                                setMode(item.value);
                            }}
                        >
                            <img
                                src={item.icon}
                                alt={item.value}
                                height={16}
                                width={16}
                                className={cx(mode === item.value) && 'active-theme'}
                            />
                            <p
                                className={cx(
                                    'body-semibold text-dark100_light900 text-light-500',
                                    mode === item.value && 'text-primary-500',
                                )}
                            >
                                {item.label}
                            </p>
                        </MenubarItem>
                    ))}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};
