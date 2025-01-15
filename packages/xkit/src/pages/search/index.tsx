import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandFooter,
} from '@/components/ui/command';
import { useState } from 'react';

import { invoke } from '@tauri-apps/api/core';

const Search: React.FC = () => {
  const [state, setState] = useState<'empty' | 'list' | 'view'>('empty');
  const [search, setSearch] = useState<string>('');

  const handleSearch = (value: string) => {
    if (state === 'empty' && value) {
      invoke('set_window_size');
      setState('list');
    } else if (state === 'list' && !value) {
      setState('empty');
    }
    setSearch(value);
  };

  return (
    <>
      <div className="fixed w-full h-3 z-50" data-tauri-drag-region />
      <Command onValueChange={(value) => console.log(value)} shouldFilter={false}>
        <CommandInput value={search} onValueChange={handleSearch} placeholder="请输入需要搜索的内容" />
        <CommandList hidden={state !== 'list'}>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
        <div hidden={state !== 'view'}></div>
        <CommandFooter>底部栏</CommandFooter>
      </Command>
    </>
  );
};

export default Search;
