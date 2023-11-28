import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { cx } from '../utils';
import { X } from 'lucide-react';

export const AutoCompleteSearch = () => {
    const { searchResults, selectedStation, selectStation, initSearch, searchValue, setSearchValue } = useAppStore();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const handleChangeStation = async (id: number, city: string) => {
        if (!inputRef.current) return;
        inputRef.current.value = city;
        setIsSearchOpen(false);
        await new Promise(resolve => setTimeout(resolve, 700));
        if (selectedStation?.id === id) {
            inputRef.current.value = '';
            setSearchValue(null);
            return;
        }
        selectStation(id);
        setSearchValue(city);
    };

    const listRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(e.target as Node)) setIsSearchOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative">
            <X
                className="text-light-700_dark200 absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                onClick={() => {
                    setSearchValue(null);
                    selectStation(null);
                }}
            />

            <input
                value={searchValue || ''}
                ref={inputRef}
                type="text"
                placeholder="Wybierz stację..."
                onChange={e => setSearchValue(e.target.value)}
                onFocus={() => {
                    if (isSearchOpen) return;
                    setIsSearchOpen(true);
                    initSearch();
                }}
                className={cx(
                    'text-light-700_dark200 border-light700_dark400  hover-light-700_dark-400 w-full rounded-lg border bg-transparent px-[1.2rem] py-[0.8rem] transition-all duration-700 ease-in-out',
                    'focus:border-black focus:outline-none',
                    isSearchOpen && 'rounded-b-none',
                )}
            />

            <div
                className={cx(
                    'absolute top-[100%] grid max-h-[24rem] w-full  transition-all duration-700 ease-in-out',
                    isSearchOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
            >
                <div
                    ref={listRef}
                    className={cx(
                        'border-light700_dark400 border-t-none z-10 h-full w-full overflow-hidden rounded-b-lg  shadow-lg',
                        isSearchOpen ? 'border border-t-0' : '',
                    )}
                >
                    <div
                        className={cx(
                            'scrollbar-thumb-rounded-full background-light900_dark200 h-full w-full overflow-y-auto scrollbar-thin  scrollbar-thumb-[#FF7000]',
                            !!Object.entries(searchResults).length && 'py-[0.4rem]',
                        )}
                    >
                        {Object.entries(searchResults)
                            .sort(([city, val], [city2, val2]) => city.localeCompare(city2))
                            .map(([city, val], idx) => {
                                const haveAddress = val.some(station => station.addressStreet);
                                const isSelected = selectedStation?.id === val[0].id;

                                return (
                                    <div className={cx('flex flex-col')} key={city + idx}>
                                        <div
                                            className={cx(
                                                'text-light-700_dark200 flex  flex-col px-[1.2rem] py-[0.4rem] transition-colors duration-300 ease-in-out',
                                                !haveAddress && isSelected && 'background-light800_dark300',
                                                !haveAddress && 'cursor-pointer',
                                            )}
                                            onClick={async () => {
                                                if (!haveAddress) await handleChangeStation(val[0].id, city);
                                            }}
                                        >
                                            <h1
                                                className={cx(
                                                    'select-none',
                                                    !haveAddress && isSelected && 'text-white',
                                                    haveAddress && 'cursor-default',
                                                )}
                                            >
                                                {city}
                                            </h1>
                                        </div>
                                        {haveAddress && (
                                            <div className="text-light-700_dark200 flex flex-col">
                                                {val.map((station, _index) =>
                                                    !station?.addressStreet?.includes('bez ulicy') ? (
                                                        <div
                                                            key={station.id}
                                                            className={cx(
                                                                'hover-light-700_dark-400 flex cursor-pointer flex-col px-[2.4rem] py-[0.4rem] transition-colors duration-300 ease-in-out',
                                                                selectedStation?.id === station.id &&
                                                                    'background-light800_dark300',
                                                            )}
                                                            onClick={async () =>
                                                                await handleChangeStation(station.id, city)
                                                            }
                                                        >
                                                            <p className="select-none">
                                                                {val.length > 1
                                                                    ? `${_index + 1} ${station.addressStreet}`
                                                                    : station.addressStreet}
                                                            </p>
                                                        </div>
                                                    ) : null,
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};
